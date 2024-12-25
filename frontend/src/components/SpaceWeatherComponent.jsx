import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MagneticReconnection = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState([
    [33947.125, 7],
    [33947.25, 6],
    [33947.375, 6],
    [33947.5, 4],
    [33947.625, 3],
    [33947.75, 4],
    [33947.875, 4]]);
  // const location = useLocation();
  // const pathParts = location.pathname.split('/');
  // const currentPage = pathParts[pathParts.length - 1]; // Get the last part of the path

  // Uncomment and modify as needed for fetching data
  // useEffect(() => {
  //   setUrl(currentPage);

  //   // Fetch data from JSON file in public folder
  //   fetch('/data.json') // Adjust the filename as necessary
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(jsonData => {
  //       console.log(jsonData); // Log the fetched data for debugging
  //       setData(jsonData[currentPage] || []); // Set data based on current page
  //     })
  //     .catch(error => console.error('Error fetching data:', error));

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`API_URL/${url}`); // Replace with actual API URL
  //       const result = await response.json();
  //       setData(result);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [currentPage]);

  return (
    <div className="backdrop-blur-lg rounded-lg shadow-md space-y-10 my-10 mx-6 py-10 lg:mx-24">
      <div className="container mx-auto my-10 px-6 lg:px-24 space-y-12">
        {/* Table to display data */}
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Value</th>
              <th className="py-2 px-4 border-b">Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="">
                <td className="py-2 px-4 border-b">{item[0][0]}</td>
                <td className="py-2 px-4 border-b">{item[1][1]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Uncomment and modify as needed for other item types */}
        {data?.map((item, index) => (
          <div key={index} className="mb-12">
            {item.type === 'video' && (
              <>
                <h1 className="text-4xl font-bold mb-6 text-primary">{item.title}</h1>
                <video
                  className="w-full h-[500px] object-cover rounded-lg mb-4"
                  autoPlay
                  loop
                  muted
                  poster={item.poster}
                >
                  <source src={item.videoPath} type="video/mp4" />
                  {item.videoDescription}
                </video>
              </>
            )}
            {item.type === 'section' && (
              <div className={`flex flex-col lg:flex-row items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                <img src={item.imagePath} alt={item.title} className="w-full lg:w-2/5 h-auto rounded-lg mb-4 lg:mb-0 lg:mr-6" />
                <p className="text-lg text-start leading-relaxed lg:w-3/5 lg:pr-6">
                  {item.text}
                </p>
              </div>
            )}
            {item.type === 'conclusion' && (
              <p className="text-lg leading-relaxed">
                <b>{item.title}:</b> {item.text}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagneticReconnection;
