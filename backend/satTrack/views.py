from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Satellite, TLE
from .serializers import SatelliteSerializer, SensorSerializer, TLESerializer, SatelliteNameSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from .serializers import SatelliteSerializer
from satTrack.extract_data import convert, get_live_data, data_over_time, get_position, find_culmination_times

class SatellitePagination(PageNumberPagination):
    page_size = 10

class PaginatedSatelliteListView(ListAPIView):
    queryset = Satellite.objects.all()
    serializer_class = SatelliteSerializer
    pagination_class = SatellitePagination


@api_view(['POST'])  # Now accepts POST requests
def search_satellites(request):  # curl example in docstring
    """
    curl -X POST http://127.0.0.1:8000/api/satellites/search/ \
    -H "Content-Type: application/json" -d '{"word": "CARTOSAT 3"}'
    """
    # Extract the search term from the request body
    word = request.data.get('word', None)

    # Initialize a list to store matching satellites
    satellite_names = []

    # Validate the search term
    if word and len(word) >= 3:
        satellites = Satellite.objects.all()
        for satellite in satellites:
            if word.lower() in satellite.name.lower():  # Case-insensitive match
                satellite_names.append({"norad_id": satellite.norad_id, "name": satellite.name})

        return Response(satellite_names, status=status.HTTP_200_OK)

    # Handle invalid or missing search terms
    elif word:
        return Response({'error': 'Search term must be at least 3 characters long'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Search term not provided'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])  # Now this is a POST endpoint
def satellite_data(request):
    """"
    curl -X POST http://127.0.0.1:8000/api/satellites/data/      -H "Content-Type: application/json"      -d '{
           "norad_id": "44804",
           "cur_loc_lat": "24.598284",
           "cur_loc_lon": "73.7242486",
           "compare_tle": "7"
         }'
    curl -X POST http://127.0.0.1:8000/api/satellites/data/      -H "Content-Type: application/json"      -d '{
           "norad_id": "44804",
         }'
         
    """
    # Extract `norad_id` as a required parameter from the POST data, instead of the URL
    norad_id = request.data.get('norad_id', None)
    if norad_id is None:
        return Response({'error': 'NORAD ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        satellite = Satellite.objects.get(pk=norad_id)
        tle_data = satellite.tle_now
        save_dict = convert(tle_data)

        # Extract latitude and longitude from POST data instead of query parameters
        lat = request.data.get('cur_loc_lat', None)
        lon = request.data.get('cur_loc_lon', None)
        compare_tle = request.data.get('compare_tle', None)

        if lat and lon:
            position = get_live_data(tle_data, {'lat': lat, 'lon': lon})
            if compare_tle:
                tle_compare = TLE.objects.get(id=compare_tle).tle
                position_compare = get_live_data(tle_compare, {'lat': lat, 'lon': lon})
                diff = {
                    'lat': position['lat'] - position_compare['lat'],
                    'lon': position['lon'] - position_compare['lon'],
                    'height': position['height'] - position_compare['height'],
                }

                return Response({'position': position_compare, 'difference': diff})

            return Response({'position': position})

        return Response({'data': save_dict})
    except Satellite.DoesNotExist:
        return Response({'error': 'Satellite not found'}, status=status.HTTP_404_NOT_FOUND)
    except TLE.DoesNotExist:
        return Response({'error': 'Compare TLE not found'}, status=status.HTTP_404_NOT_FOUND)
    


@api_view(['GET']) # curl -X GET http://127.0.0.1:8000/api/satellites/44804/data-buffer/
def satellite_data_buffer(request, norad_id):
    try:
        satellite = Satellite.objects.get(pk=norad_id)
        tle_data = satellite.tle_now
        period = convert(tle_data)['period'] 

        time_scale_pos = data_over_time(tle_data, period) 

        return Response({'context': time_scale_pos})
    except Satellite.DoesNotExist:
        return Response({'error': 'Satellite not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET']) # curl -X GET http://127.0.0.1:8000/api/satellites/
def satellite_list(request):
    satellites = Satellite.objects.all()
    serializer = SatelliteSerializer(satellites, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def satellite_detail(request):
    """
    curl -X POST http://127.0.0.1:8000/api/satellitesdetails/ \
     -H "Content-Type: application/json" \
     -d '{"norad_id": "44804"}'
    """
    norad_id = request.data.get('norad_id')
    if not norad_id:
        return Response({'error': 'norad_id is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        satellite = Satellite.objects.get(pk=norad_id)
        TLE_DATA = satellite.tle_now
        save_dict = convert(TLE_DATA)  # Assuming convert is a function that processes TLE_DATA
        serializer = SatelliteSerializer(satellite)

        # Combine serialized data and save_dict into a single dictionary
        response_data = {
            'satellite_data': serializer.data,
            'save_dict': save_dict
        }
        return Response(response_data, status=status.HTTP_200_OK)

    except Satellite.DoesNotExist:
        return Response({'error': 'Satellite not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET']) # curl -X GET http://127.0.0.1:8000/api/satellites/44804/sensors/
def satellite_sensors(request, norad_id):
    try:
        satellite = Satellite.objects.get(pk=norad_id)
        sensors = satellite.sensors.all()
        serializer = SensorSerializer(sensors, many=True)
        return Response(serializer.data)
    except Satellite.DoesNotExist:
        return Response({'error': 'Satellite not found'}, status=status.HTTP_404_NOT_FOUND)




# @api_view(['GET'])
# def get_live_data(request, norad_id):
#     satellite = Satellite.objects.get(pk=norad_id)
#     TLE_DATA = satellite.tle_now

#     lat = float(request.query_params.get('cur_loc_lat', 0))
#     lon = float(request.query_params.get('cur_loc_lon', 0))
#     compare_tle = request.query_params.get('compare_tle', None)

#     position = get_live_data(TLE_DATA, {'lat': lat, 'lon': lon})
#     if compare_tle:
#         TLE_COMPARE = TLE.objects.get(id=compare_tle).tle
#         position1 = get_live_data(TLE_COMPARE, {'lat': lat, 'lon': lon})
#     else:
#         position1 = position

#     diff = {
#         'lat': position['lat'] - position1['lat'],
#         'lon': position['lon'] - position1['lon'],
#         'height': position['height'] - position1['height'],
#     }

#     return Response({'context': position1, 'difference': diff})

@api_view(['GET'])
def get_data_buffer(request, norad_id):
    satellite = Satellite.objects.get(pk=norad_id)
    TLE_DATA = satellite.tle_now
    period = convert(TLE_DATA)['period']

    time_scale_pos = data_over_time(TLE_DATA, period)
    return Response({'context': time_scale_pos})


@api_view(['GET', 'POST'])
def satellite_tle(request, norad_id):
    try:
        satellite = Satellite.objects.get(pk=norad_id)
        if request.method == 'GET':
            # Fetch TLE list
            tles = satellite.tle_set.all()
            serializer = TLESerializer(tles, many=True)
            return Response({"satellite_name":satellite.name,"tle":serializer.data})

        elif request.method == 'POST':
            # Compare TLEs
            id_1 = request.data.get("tle1")
            id_2 = request.data.get("tle2")
            time = request.data.get("time")

            if not (id_1 and id_2 and time):
                return Response({'error': 'tle1, tle2, and time are required.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                TLE1 = TLE.objects.get(id=id_1).tle
                TLE2 = TLE.objects.get(id=id_2).tle
            except TLE.DoesNotExist:
                return Response({'error': 'TLE not found.'}, status=status.HTTP_404_NOT_FOUND)

            position = get_position(TLE1, time)
            position1 = get_position(TLE2, time)
            diff = {
                'lat': position['lat'] - position1['lat'],
                'lon': position['lon'] - position1['lon'],
                'height': position['height'] - position1['height'],
            }
            return Response({'context': diff})

    except Satellite.DoesNotExist:
        return Response({'error': 'Satellite not found.'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['POST']) # curl -X POST http://127.0.0.1:8000/api/satellites/44804/fetch-tle/
def fetch_latest_tle(request, norad_id):
    try:
        satellite = Satellite.objects.get(pk=norad_id)
        satellite.save()  # This will update the TLE
        return Response({'message': 'TLE updated successfully'}, status=status.HTTP_200_OK)
    except Satellite.DoesNotExist:
        return Response({'error': 'Satellite not found'}, status=status.HTTP_404_NOT_FOUND)



# curl -X POST http://127.0.0.1:8000/api/satellites/44804/compare-tle/ \
# -H "Content-Type: application/json" \
# -d '{"tle1": 1, "tle2": 2, "time": "2024-11-25T12:00:00"}'
@api_view(['POST']) 
def compare_tle(request, norad_id):
    try:
        satellite = Satellite.objects.get(pk=norad_id)
        id_1 = request.data.get("tle1")
        id_2 = request.data.get("tle2")
        time = request.data.get("time")

        if not id_1 or not id_2:
            return Response({'error': 'Two TLE IDs are required'}, status=status.HTTP_400_BAD_REQUEST)

        tle1 = TLE.objects.get(id=id_1).tle
        tle2 = TLE.objects.get(id=id_2).tle

        # position calculation using `get_position` (external funcation)
        position = get_position(tle1, time)
        position1 = get_position(tle2, time)

        diff = {
            'lat': position['lat'] - position1['lat'],
            'lon': position['lon'] - position1['lon'],
            'height': position['height'] - position1['height'],
        }
        return Response({'difference': diff})
    except Satellite.DoesNotExist:
        return Response({'error': 'Satellite not found'}, status=status.HTTP_404_NOT_FOUND)
    except TLE.DoesNotExist:
        return Response({'error': 'One or both TLEs not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST']) 
def satellite_culmination_api(request):
    """
    API endpoint to get the time of satellite culmination (highest point above) within the next 5 days.
        curl -X POST http://127.0.0.1:8000/api/culmination/ \
    -H "Content-Type: application/json" \
    -d '{
        "norad_id": "44804",
        "latitude": "24.598284",
        "longitude": "73.7242486",
        "altitude_degrees": "0.0"
        }'
    """
    if request.method == 'POST':
        # Extract parameters from POST data
        norad_id = request.data.get('norad_id', None)
        latitude = request.data.get('latitude', None)
        longitude = request.data.get('longitude', None)
        altitude_degrees = float(request.data.get('altitude_degrees', 0.0))

        if not norad_id or not latitude or not longitude:
            return Response({'error': 'NORAD ID, latitude, and longitude are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Get satellite TLE data from database
            satellite = Satellite.objects.get(pk=norad_id)
            tle_data = satellite.tle_now

            # Call the Skyfield calculation function
            culmination_times = find_culmination_times(tle_data, latitude, longitude, altitude_degrees)

            # Convert culmination times to string format
            culmination_events = [{'time': time.utc_strftime('%Y-%m-%d %H:%M:%S')} for time in culmination_times]

            # Check if there are any culmination events
            if not culmination_events:
                return Response({'message': 'No culmination events found within the next 5 days.'})

            return Response({'culmination_events': culmination_events})

        except Satellite.DoesNotExist:
            return Response({'error': 'Satellite not found'}, status=status.HTTP_404_NOT_FOUND)

    else:
        return Response({'message': 'This endpoint only accepts POST requests'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)