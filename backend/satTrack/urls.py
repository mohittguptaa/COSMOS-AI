from django.urls import path 
# from .views import data, data_buffer, list_view, search_page, search_word, sensor_list, detail_view, compare_tle,about_page, fetch_latest
from . import views

urlpatterns = [
    path('satellites/', views.satellite_list, name='satellite_list'),
    path('satellitesdetails/', views.satellite_detail, name='satellite_detail'),
    path('satellites/<int:norad_id>/sensors/', views.satellite_sensors, name='satellite_sensors'),
    path('satellites/<int:norad_id>/tle/', views.satellite_tle, name='satellite_tle'),
    path('satellites/<int:norad_id>/fetch-tle/', views.fetch_latest_tle, name='fetch_latest_tle'),
    path('satellites/<int:norad_id>/compare-tle/', views.compare_tle, name='compare_tle'),
    path('satellites/search/', views.search_satellites, name='search_satellites'),
    path('satellites/data/', views.satellite_data, name='satellite_data'),
    path('satellites/<int:norad_id>/data-buffer/', views.satellite_data_buffer, name='satellite_data_buffer'),
    path('satellites/paginated/', views.PaginatedSatelliteListView.as_view(), name='paginated_satellite_list'),
    path('api/data/<int:norad_id>/', views.get_live_data, name='get_live_data'),
    path('api/databuffer/<int:norad_id>/', views.get_data_buffer, name='get_data_buffer'),
    path('culmination/', views.satellite_culmination_api, name='get_satellite_culmination_times'),

]

# urlpatterns = [
#     path('', search_page, name="search_page"),
#     # path('searchword', search_word, name='search_word'),
#     # path('sat', list_view.as_view(), name='list_view'),
#     # path('sat/<int:norad_id>', sensor_list, name="detail_view"),
#     # path('sat/<int:norad_id>/save',fetch_latest, name='fetch'),
#     # path('data/<int:norad_id>', data, name='data',),
#     # path('sat/<int:norad_id>/compare', compare_tle, name='compare',),
#     # path('databuffer/<int:norad_id>', data_buffer, name='databuffer'),
#     # path('sat/<int:norad_id>/<str:sensor_name>', detail_view, name='detail_view'),
#     # path('about', about_page, name="about_page"),
# ]
