import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register necessary chart.js components
ChartJS.register(CategoryScale, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function CulminationEvents({ noradId, currLoc }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCulminationEvents = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/culmination/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        norad_id: noradId,
                        latitude: currLoc.lat.toString(),
                        longitude: currLoc.lon.toString(),
                        altitude_degrees: '0.0',
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setEvents(data.culmination_events);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (noradId && currLoc.lat !== null && currLoc.lon !== null) {
            fetchCulminationEvents();
        }
    }, [noradId, currLoc]);

    const data = {
        labels: events.map(event => {
            const dateTime = new Date(event.time);
            return dateTime.toLocaleDateString();
        }),
        datasets: [
            {
                label: 'Time of Day',
                data: events.map(event => {
                    const dateTime = new Date(event.time);
                    const hours = dateTime.getHours();
                    const minutes = dateTime.getMinutes();
                    const seconds = dateTime.getSeconds();
                    return hours * 3600 + minutes * 60 + seconds;
                }),
                fill: false,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',  // Softer blue
                borderColor: 'rgba(54, 162, 235, 1)',  // Full opacity blue
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Date',
                    color: '#FFFFFF',  // White for contrast
                },
                ticks: {
                    color: '#FFFFFF',  // White for contrast
                },
            },
            y: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Time of Day (hh:mm:ss)',
                    color: '#FFFFFF',  // White for contrast
                },
                ticks: {
                    color: '#FFFFFF',  // White for contrast
                    callback: function (value) {
                        const hours = Math.floor(value / 3600);
                        const minutes = Math.floor((value % 3600) / 60);
                        const seconds = value % 60;
                        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    }
                },
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#FFFFFF',  // White for contrast
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const date = events[context.dataIndex].time;
                        const dateTime = new Date(date);
                        const dateString = dateTime.toLocaleDateString();
                        const timeString = dateTime.toLocaleTimeString();
                        return `Date: ${dateString}, Time: ${timeString}`;
                    }
                }
            }
        },
    };

    return (
        <div className="backdrop-blur-lg shadow-lg rounded-2xl p-4 w-full text-white">  
            <h1 className="text-lg font-bold mb-4 text-center">Culmination Events</h1>
            {loading ? (
                <div className="text-center text-white">Loading...</div>  
            ) : (
                <div className="flex flex-col lg:flex-row justify-center items-stretch">
                    <div className="lg:w-3/4 w-full mb-4 lg:mb-0">
                        <div className="w-full">
                            <Line data={data} options={options} />
                        </div>
                    </div>
                    <div className="lg:w-1/4 w-full flex flex-col items-center justify-center">
                        <div className="text-xl mb-4 text-center">
                            <p>Your current location:</p>
                            <div className="flex justify-center space-x-5">
                                <p>Latitude: <span className='font-digital text-white'>{currLoc.lat}</span></p>  
                                <p>Longitude: <span className='font-digital text-white'>{currLoc.lon}</span></p> 
                            </div>
                        </div>
                        <div className="overflow-y-auto max-h-96 w-full">
                            {events.length > 0 ? (
                                <ul>
                                    {events.map((event, index) => (
                                        <li key={index} className="my-2 p-2 rounded-lg shadow hover:bg-slate-300 hover:text-black">
                                            <p className="text-lg text-white">  
                                                Satellite Pass at <span className='font-digital'>{`${new Date(event.time).toLocaleString()}`}</span>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-white">No events available</p>  
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CulminationEvents;