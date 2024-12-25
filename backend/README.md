# sat-track
This is a satellite tracker app. Uses Cesium JS to plot the locations of satellites at given time. TLE data is used to estimate the location.
We are also using ML to improve the location.
Predicting the footprint.

## Installation instructions

```commandline
cd satTrack
pip install -r requirements.txt
python manage.py runserver
```

## API endpoint
```
GET /satellites/: List all satellites.
GET /satellites/<norad_id>/: Retrieve satellite details.
GET /satellites/<norad_id>/sensors/: List sensors for a satellite.
GET /satellites/<norad_id>/tle/: Retrieve TLE data for a satellite.
POST /satellites/<norad_id>/fetch-tle/: Fetch and update the latest TLE for a satellite.
POST /satellites/<norad_id>/compare-tle/: Compare two TLEs.
GET /satellites/search/?word=<name>: Search satellites by name.
GET /satellites/<norad_id>/data/: Retrieve live satellite positional data.
GET /satellites/<norad_id>/data-buffer/: Retrieve satellite data over time.
GET /satellites/paginated/: Paginated list of satellites.
```