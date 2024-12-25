import React, { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';

const SatelliteDetails = () => {
  const location = useLocation();
  const [satelliteData, setSatelliteData] = useState(null);

  const useQuery = () => new URLSearchParams(location.search);
  const query = useQuery();
  const noradId = query.get('norad_id');

  async function getSatelliteData() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/satellitesdetails/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ norad_id: noradId })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || 'Network response was not ok');
      }

      setSatelliteData(data);
      console.log(data.save_dict)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  useEffect(() => {
    getSatelliteData();
  }, [noradId]);

  if (!satelliteData) {
    return <span className="loading loading-bars h-screen loading-lg"></span>;
  }


  return (
    <div className="p-4 md:p-8 mx-auto min-h-screen max-w-6xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">{satelliteData?.satellite_data?.name} Satellite Information</h1>

      {/* Basic Satellite Details */}
      <div className="stat backdrop-blur-lg rounded-lg mb-6 p-4">
        <div className="stat-title ">Satellite Name</div>
        <div className="stat-value font-semibold">{satelliteData.satellite_data.name}</div>
        <div className="stat-desc">Norad ID:<span className="font-digital"> {satelliteData.satellite_data.norad_id}</span> | Launch Year:<span className="font-digital">{new Date(satelliteData.satellite_data.launch_date).getFullYear()} </span> </div>
      </div>

      {/* Orbital Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 backdrop-blur-lgrounded-lg p-4">
        <div className="stat shadow-md backdrop-blur-lg p-4 rounded">
          <div className="stat-title">NORAD ID</div>
          <div className="stat-value font-digital">{satelliteData.save_dict.norad_id}</div>
        </div>
        <div className="stat shadow-md backdrop-blur-lg p-4 rounded">
          <div className="stat-title">Launch Year</div>
          <div className="stat-value font-digital">{satelliteData.save_dict.launch_year}</div>
        </div>
        <div className="stat shadow-md backdrop-blur-lg p-4 rounded">
          <div className="stat-title">First Derivative of Mean Motion</div>
          <div className="stat-value font-digital">{satelliteData.save_dict.first_derivative_mean_motion}</div>
        </div>
        <div className="stat shadow-md backdrop-blur-lg p-2 rounded">
          <div className="stat-title">Second Derivative of Mean Motion</div>
          <div className="stat-value font-digital">{satelliteData.save_dict.second_derivative_mean_motion}</div>
        </div>
        <div className="stat shadow-md backdrop-blur-lg p-4 rounded">
          <div className="stat-title">Bstar</div>
          <div className="stat-value font-digital">{satelliteData.save_dict.bstar}</div>
        </div>
        <div className="stat shadow-md backdrop-blur-lg p-4 rounded">
          <div className="stat-title">Inclination</div>
          <div className="stat-value font-digital">{satelliteData.save_dict.inclination}</div>
        </div>
        <div className="stat shadow-md backdrop-blur-lg p-4 rounded">
          <div className="stat-title">RAAN</div>
          <div className="stat-value font-digital">{satelliteData.save_dict.RAAN}</div>
        </div>
        <div className="stat shadow-md backdrop-blur-lg p-4 rounded">
          <div className="stat-title">Longitude of Ascending Node</div>
          <div className="stat-value font-digital">{satelliteData.save_dict.longitude_of_ascending_node}</div>
        </div>
        <div className="stat shadow-md backdrop-blur-lg p-4 rounded">
          <div className="stat-title">Eccentricity</div>
          <div className="stat-value font-digital">{satelliteData.save_dict.eccentricity}</div>
        </div>
        <div className="stat shadow-md backdrop-blur-lg p-4 rounded">
          <div className="stat-title">Argument of Perigee</div>
          <div className="stat-value font-digital">{satelliteData.save_dict.argument_of_perigee}</div>
        </div>
        <div className="stat shadow-md backdrop-blur-lg p-4 rounded">
          <div className="stat-title">Argument of Periapsis</div>
          <div className="stat-value font-digital">{satelliteData.save_dict.argument_of_periapsis}</div>
        </div>
        <div className="stat shadow-md backdrop-blur-lg p-4 rounded">
          <div className="stat-title">Mean Anomaly</div>
          <div className="stat-value font-digital">{satelliteData.save_dict.mean_anomaly}</div>
        </div>
        <div className="stat shadow-md backdrop-blur-lg p-4 rounded">
          <div className="stat-title">Mean Motion</div>
          <div className="stat-value font-digital">{satelliteData.save_dict.mean_motion}</div>
        </div>
        <div className="stat shadow-md backdrop-blur-lg p-4 rounded">
          <div className="stat-title">Semi-Major Axis</div>
          <div className="stat-value font-digital">{satelliteData.save_dict.semi_major_axis}</div>
        </div>
        <div className="stat shadow-md backdrop-blur-lg p-4 rounded">
          <div className="stat-title">Period</div>
          <div className="stat-value font-digital">{satelliteData.save_dict.period}</div>
        </div>

      </div>
      {/* Latest TLE */}
      <div className="mt-8 p-4 md:p-6 backdrop-blur-lg rounded-lg shadow-lg flex flex-wrap gap-4">
        <div>
          <h2 className="font-bold mb-2">Latest TLE (Two Line Element)</h2>
          <pre className="p-2 md:p-4 rounded font-digital text-2xl overflow-x-auto">{satelliteData?.satellite_data.tle_now}</pre>
          <p className="">Last fetch date:<span className="font-digital">{satelliteData?.satellite_data.last_tle_update}</span></p>
        </div>
        <div className="flex flex-col justify-center space-y-1 w-full md:w-auto">
          <button className="btn btn-outline tooltip" data-tip="Fetch TLE data Again" onClick={getSatelliteData}>Fetch Again</button>
          <Link to={`/TleComparision?norad_id=${noradId}`} className="btn btn-outline">Compare Prev. TLE</Link>
        </div>
      </div>

      {/* Available Sensors */}
      <div className="mt-8 p-6 backdrop-blur-lg rounded-lg shadow-lg">
        <h2 className="font-bold mb-4">Available Sensors</h2>
        <div className="space-y-4">
          {satelliteData?.satellite_data.sensors.map((sensor, index) => (
            <div key={sensor.id} className="collapse  rounded-md shadow-md hover:bg-slate-800/50">
              <input type="checkbox" name="sensor-accordion" defaultChecked={index === 0} />
              <div className="collapse-title font-medium flex justify-between">
                <span>{sensor.name} ({sensor.resolution_type})</span>
              </div>
              <div className="collapse-content flex justify-between">
                <p><strong>Resolution:</strong> <span className="font-digital">{sensor.resolution_value}</span> m</p>
                <p><strong>Swath:</strong> <span className="font-digital">{sensor.swath}</span> km</p>
                <p><strong>Tilt:</strong> <span className="font-digital">{sensor.positive_tilting}/{sensor.negative_tilting} </span></p>
                <Link to={`/satellitetrack?norad_id=${noradId}`} className="btn btn-sm btn-outline">Track</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SatelliteDetails;
