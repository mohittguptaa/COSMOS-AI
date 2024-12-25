from rest_framework import serializers
from .models import Satellite, Sensor, TLE

class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = '__all__'

class TLESerializer(serializers.ModelSerializer):
    class Meta:
        model = TLE
        fields = '__all__'

class SatelliteSerializer(serializers.ModelSerializer):
    sensors = SensorSerializer(many=True, read_only=True)  # Nested sensor data
    tle_set = TLESerializer(many=True, read_only=True)  # Nested TLE data

    class Meta:
        model = Satellite
        fields = '__all__'


class SatelliteNameSerializer(serializers.Serializer):
    norad_id = serializers.IntegerField()
    name = serializers.CharField(max_length=255)