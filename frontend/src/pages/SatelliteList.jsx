import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SatelliteList = () => {
    const [satellites, setSatellites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSatellites = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/satellites/`);
                const data = await response.json();
                setSatellites(data);
            } catch (error) {
                console.error('Error fetching satellites:', error);
            }
        };

        fetchSatellites();
    }, []); // Empty dependency array means this effect runs once on mount

    if (satellites.length === 0) {
        return <span className="loading loading-bars loading-lg h-screen"></span>;
    }

    return (
        <div className="flex justify-center min-h-screen p-10 rounded-2xl">
            <div className="backdrop-blur-lg shadow-lg rounded-2xl p-10">
                <table className="w-full max-w-6xl table-auto ">
                    <thead>
                        <tr>
                            <th className="border border-gray-600 px-4 py-2 text-left rounded-2xl w-fit">NORAD ID</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Name</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Launch Date</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Launch Site</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Status</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Orbit Type</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Swath [km]</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Tilt Type</th>
                            <th className="border border-gray-600 px-4 py-2 text-left rounded-tr-2xl">Tilt Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {satellites.map(satellite => (
                            <tr 
                                key={satellite.norad_id}
                                className="cursor-pointer hover:bg-slate-800/50" 
                                onClick={() => navigate(`/satellitedetails?norad_id=${satellite.norad_id}`)}
                            >
                                <td className="border border-gray-600 px-4 py-2">{satellite.norad_id}</td>
                                <td className="border border-gray-600 px-4 py-2">{satellite.name}</td>
                                <td className="border border-gray-600 px-4 py-2">{satellite.launch_date}</td>
                                <td className="border border-gray-600 px-4 py-2">{satellite.launch_site || "Not Provided"}</td>
                                <td className="border border-gray-600 px-4 py-2">{satellite.status}</td>
                                <td className="border border-gray-600 px-4 py-2">{satellite.orbit_type || "-"}</td>
                                <td className="border border-gray-600 px-4 py-2">{satellite.swath || "-"}</td>
                                <td className="border border-gray-600 px-4 py-2">{satellite.tilt_type || "-"}</td>
                                <td className="border border-gray-600 px-4 py-2">{satellite.tilt_value || "-"}</td>
                            </tr>
                            
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SatelliteList;