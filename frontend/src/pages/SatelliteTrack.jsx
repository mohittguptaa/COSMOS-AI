import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CulminationEvents from '../components/CulminationEvents';

function SatelliteTrack() {
    const location = useLocation();
    const [currLoc, setCurrLoc] = useState({ lat: null, lon: null });
    const [selectedTle, setSelectedTle] = useState(null);
    const [satelliteData, setSatelliteData] = useState(null);
    const [tleList, setTleList] = useState([]);
    const [satelliteDataBuffer, setSatelliteDataBuffer] = useState(null);
    const iframeRef = useRef(null);

    const useQuery = () => new URLSearchParams(location.search);
    const query = useQuery();
    const noradId = query.get('norad_id');

    const getLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrLoc({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Error obtaining location: ', error);
                    setCurrLoc({ lat: 0, lon: 0 });
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
            setCurrLoc({ lat: 0, lon: 0 });
        }
    };

    const fetchTleData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/satellites/${noradId}/tle/`);
            if (!response.ok) {
                throw new Error("Failed to fetch TLE data");
            }
            const data = await response.json();
            setTleList(data.tle);
            if (data.tle.length > 0) {
                setSelectedTle(data.tle[data.tle.length - 1]);
            }
        } catch (error) {
            console.error("Error fetching TLE data:", error);
        }
    };

    const fetchSatelliteDataBuffer = async () => {
        const url = `${import.meta.env.VITE_API_URL}/api/satellites/${noradId}/data-buffer/`;
        try {
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setSatelliteDataBuffer(data.context);
        } catch (error) {
            console.error('Error fetching satellite data:', error);
        }
    };

    useEffect(() => {
        fetchTleData();
        getLocation();
    }, [noradId]);

    useEffect(() => {
        if (selectedTle) {
            fetchSatelliteDataBuffer();
        }
    }, [selectedTle]);

    useEffect(() => {
        let intervalId;
        if (selectedTle) {
            intervalId = setInterval(() => {
                getSatelliteData();
            }, 1000);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [selectedTle]);

    useEffect(() => {
        if (satelliteDataBuffer && iframeRef.current) {
            iframeRef.current.contentWindow.postMessage({ 'dataBuffer': satelliteDataBuffer, 'location': currLoc }, '*');
            console.log('useEffect in iframe');
        }
    }, [satelliteDataBuffer]);

    async function getSatelliteData() {
        const url = `${import.meta.env.VITE_API_URL}/api/satellites/data/`;
        const data = {
            norad_id: noradId,
            cur_loc_lat: currLoc.lat,
            cur_loc_lon: currLoc.lon,
            compare_tle: selectedTle ? selectedTle.id : null
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setSatelliteData(result);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
                <iframe
                    ref={iframeRef}
                    src="/satelliteContainer.html"
                    title="Content"
                    className="w-full h-[164px] lg:w-[1240px] lg:h-[570px] shadow-lg rounded-2xl"
                ></iframe>

                <div className="flex flex-col items-center justify-center w-full lg:w-1/4 backdrop-blur-lg shadow-lg rounded-2xl">
                    <h1 className="text-center text-3xl mb-4">Satellite Details</h1>

                    <table className="p-4 w-full">
                        <tbody className='space-y-10 '>
                            <tr>
                                <td className="font-bold">NORAD ID:</td>
                                <td className='font-digital text-2xl'>{noradId}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">UTC:</td>
                                <td id="utc" className='font-digital text-2xl'>{satelliteData?.position?.time || '--'}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">LATITUDE:</td>
                                <td id="lat" className='font-digital text-2xl'>{satelliteData?.position?.lat || '--'}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">LONGITUDE:</td>
                                <td id="lon" className='font-digital text-2xl'>{satelliteData?.position?.lon || '--'}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">ALTITUDE [km]:</td>
                                <td id="h" className='font-digital text-2xl'>{satelliteData?.position?.height || '--'}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">SPEED [km/s]:</td>
                                <td id="speed" className='font-digital text-2xl'>{satelliteData?.position?.speed || '--'}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">AZIMUTH:</td>
                                <td id="az" className='font-digital text-2xl'>{satelliteData?.position?.azimuth || '--'}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">ELEVATION:</td>
                                <td id="ele" className='font-digital text-2xl'>{satelliteData?.position?.elevation || '--'}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">RIGHT ASCENSION:</td>
                                <td id="ra" className='font-digital text-2xl'>{satelliteData?.position?.ra || '--'}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">DECLINATION:</td>
                                <td id="dec" className='font-digital text-2xl'>{satelliteData?.position?.dec || '--'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mt-4">
                <select
                    id="select_box1"
                    className="select select-bordered w-full lg:w-auto font-digital"
                    value={selectedTle ? selectedTle.id : ''}
                    onChange={(e) => setSelectedTle(tleList.find(tle => tle.id.toString() === e.target.value))}
                >
                    {tleList.map((tle) => (
                        <option key={tle.id} value={tle.id} className='font-digital'>
                            {new Date(tle.epoch_date).toLocaleString()}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-between w-full mt-4">
                <CulminationEvents noradId={noradId} currLoc={currLoc} />
            </div>
        </div>
    );
}

export default SatelliteTrack;