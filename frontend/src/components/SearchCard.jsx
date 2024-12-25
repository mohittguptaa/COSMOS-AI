import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SatelliteSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');

    // Fetch satellite suggestions based on the input
    function searchSatellites(word) {
        const data = { word: word };

        fetch(`${import.meta.env.VITE_API_URL}/api/satellites/search/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setSuggestions(data);
            })
            .catch(error => {
                console.error('Error:', error);
                setError('An error occurred while fetching suggestions.');
            });
    }

    // Fetch suggestions only if the search term has 3+ characters
    useEffect(() => {
        if (searchTerm.length >= 3) {
            searchSatellites(searchTerm);
        } else {
            setSuggestions([]);
            setError('');
        }
    }, [searchTerm]);

    // Handle input changes
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle suggestion click
    const handleSuggestionClick = (name) => {
        console.log('Selected Satellite:', name);
        setSearchTerm(name);
        setSuggestions([]);
    };

    return (
        <div id='search' className="flex backdrop-blur-lg shadow-lg items-center h-auto justify-center py-16 w-full px-4">
            <div className="w-full max-w-lg  rounded-lg shadow-lg p-6">
                <h2 className="text-3xl lg:text-5xl font-thin text-center mb-6">Satellite Search</h2>
                <p className="text-center text-gray-300 mb-6">
                    Search for your favorite satellites by entering at least 3 characters.  
                    Explore detailed satellite information and tracking data.
                </p>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Enter satellite name..."
                    className="input input-bordered w-full mb-4"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <ul className="rounded-lg shadow-md divide-y">
                    {suggestions?.map((satellite, index) => (
                        <Link
                            to={`/satellitedetails?norad_id=${satellite?.norad_id}`}
                            key={index}
                            onClick={() => handleSuggestionClick(satellite?.name)}
                            className="block p-2 hover:bg-gray-900 cursor-pointer "
                        >
                            {satellite.name}
                        </Link>
                    ))}
                </ul>
                {suggestions.length === 0 && searchTerm.length >= 3 && !error && (
                    <p className="text-center text-gray-500 mt-4">
                        No results found. Try searching with a different name or ID.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SatelliteSearch;
