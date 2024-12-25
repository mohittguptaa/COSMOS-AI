import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DstGraphTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://lasp.colorado.edu/space-weather-portal/latis/dap/kyoto_dst_index_service.json?time,dst&time%3E=2024-12-10T01:06:00Z&time%3C=2024-12-11T01:12:00Z'
      );
      const result = await response.json();

      // Assuming that the data is already sorted by time, get the last 5 records.
      const latestData = result?.kyoto_dst_index_service?.samples.slice(-5);
      setData(latestData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // fetch data every hour
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 3600000);

    return () => clearInterval(interval);
  });

  // Classify storms based on Dst index value
  const classifyStorm = (dst) => {
    if (dst < -250) {
      return 'Great Storm';
    } else if (dst < -100) {
      return 'Intense Storm';
    } else if (dst < -50) {
      return 'Moderate Storm';
    } else if (dst < -30) {
      return 'Minor Storm';
    } else {
      return 'No Significant Storm';
    }
  };
  const satelliteLost = (dst) => {
    if (dst < -250) {
      return 'Satellite can Lost.Do Maneuvering';
    } else if (dst < -100) {
      return 'Circuit can Demage, Shutdown Satellite';
    } else if (dst < -50) {
      return 'Malfunctioning of Satellite, Shutdown Satellite';
    } else if (dst < -30) {
      return 'Loss of Data';
    } else {
      return 'Everything is Fine';
    }
  };

  // Prepare data for the bar chart
  const chartData = {
    labels: data?.map(item => item.time),
    datasets: [
      {
        label: 'Dst Index',
        data: data?.map(item => item.dst),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Dst Index Bar Chart',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dstValue = tooltipItem.raw;
            const classification = classifyStorm(dstValue);
            return `Dst: ${dstValue} nT (${classification})`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className='w-full flex-row'>
          <div className="w-full mx-10 mt-5">
            <Bar data={chartData} options={options} />
          </div>
          <div className="overflow-x-auto mt-5">
            <table className="table w-full overflow-scroll h-96">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Dst Index</th>
                  <th>Storm Classification</th>
                  <th>DST Empect</th>
                </tr>
              </thead>
              <tbody >
                {data?.map((item, index) => (
                  <tr key={index} >
                    <td>{item.time}</td>
                    <td>{item.dst}</td>
                    <td>{classifyStorm(item.dst)}</td>
                    <td>{satelliteLost(item.dst)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DstGraphTable;
