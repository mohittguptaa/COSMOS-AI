import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';


const TLEComparision = () => {
  const [tleList, setTleList] = useState([]);
  const [satelliteName, setSateliiteName] = useState("");
  const [selectedTle1, setSelectedTle1] = useState(null);
  const [selectedTle2, setSelectedTle2] = useState(null);
  const [inputTime, setInputTime] = useState("2023-08-15T16:30");
  const [difference, setDifference] = useState({ latitude: "", longitude: "", altitude: "" });
  const location = useLocation();

  // Function to get the value of a query parameter by name
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const norad_id = query.get('norad_id');

  const fetchTleData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/satellites/${norad_id}/tle/`);
      if (!response.ok) {
        throw new Error("Failed to fetch TLE data");
      }
      const data = await response.json();
      console.log(data);
      setTleList(data.tle);
      setSateliiteName(data.satellite_name);
    } catch (error) {
      console.error("Error fetching TLE data:", error);
    }
  };

  useEffect(() => {
    fetchTleData();
  }, []);

  const handleFetchDifference = () => {
    if (!selectedTle1 || !selectedTle2 || !inputTime) {
      alert("Please select both TLEs and enter a time");
      return;
    }

    const passedData = {
      tle1: selectedTle1.id,
      tle2: selectedTle2.id,
      time: inputTime,
    };

    fetch(`${import.meta.env.VITE_API_URL}/api/satellites/${norad_id}/tle/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passedData),
    })
      .then((response) => response.json())
      .then((data) => {
        setDifference({
          latitude: data.context.lat,
          longitude: data.context.lon,
          altitude: data.context.height + " km",
        });
      })
      .catch((error) => {
        console.error("Error fetching difference:", error);
      });
  };

  return (
    <div className="p-6 mx-48 my-20 space-y-10 rounded-lg shadow-lg backdrop-blur-lg">
      <div>
        <h1 className="text-2xl font-semibold">
          {satelliteName}
        </h1>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full form-control md:w-1/2">
          <label htmlFor="select_box1" className="font-semibold label">Select TLE 1</label>
          <select id="select_box1" className="select select-bordered" value={selectedTle1 ? selectedTle1.id : ""} onChange={(e) => setSelectedTle1(tleList.find(tle => tle.id.toString() === e.target.value))}>
            <option disabled value="">Choose a TLE</option>
            {tleList.map((tle) => (
              <option key={tle.id} value={tle.id}><span className="font-digital"> {new Date(tle.epoch_date).toLocaleString()}</span></option>
            ))}
          </select>
        </div>

        <div className="w-full form-control md:w-1/2">
          <label htmlFor="select_box2" className="font-semibold label">Select TLE 2</label>
          <select id="select_box2" className="select select-bordered" value={selectedTle2 ? selectedTle2.id : ""} onChange={(e) => setSelectedTle2(tleList.find(tle => tle.id.toString() === e.target.value))}>
            <option disabled value="">Choose a TLE</option>
            {tleList.map((tle) => (
              <option key={tle.id} value={tle.id}>{new Date(tle.epoch_date).toLocaleString()}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex">
        <div className="w-1/2 form-control">
          <label htmlFor="time" className="font-semibold label">Enter time at which you want to get location</label>
          <input id="time" type="datetime-local" name="sat-time" value={inputTime} onChange={(e) => setInputTime(e.target.value)} className="input input-bordered" />
        </div>

        <div className="flex items-end ml-4">
          <button id="fetch" type="button" onClick={handleFetchDifference} className="btn btn-primary">Get Difference</button>
        </div>
      </div>

      <div className="">
        <div className="stat place-items-center">
          <div className="stat-title">Latitude Difference:</div>
          <div className="stat-value">{difference.latitude ? difference.latitude : "0.000000000"}</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-title">Longitude Difference:</div>
          <div className="stat-value text-secondary">{ difference.longitude ? difference.longitude : "0.0000" }</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-title">Altitude Difference:</div>
          <div className="stat-value">{ difference.altitude ? difference.altitude : "0.00000000" }</div>
        </div>
      </div>
    </div>
  );
};

export default TLEComparision;