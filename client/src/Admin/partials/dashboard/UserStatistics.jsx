import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import {
  FaUsers,
  FaUserTie,
  FaUserNinja,
  FaUserCog,
  FaUser,
  FaCheckCircle,
} from 'react-icons/fa';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const UserStatistics = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetchUserStatistics();
    const interval = setInterval(fetchUserStatistics, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchUserStatistics = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          auth: token,
        },
      };

      const response = await axios.get(
        `${BASE_URL}/userdetails/statistics`,
        config
      );
      setStatistics(response.data);
    } catch (error) {
      console.log('Error fetching user statistics:', error);
    }
  };

  const renderChart = () => {
    if (!statistics) {
      return null;
    }

    const chartData = {
      labels: [
        'Admin Users',
        'Employee Users',
        'HR Users',
        'Regular Users',
        'Subscription Active',
      ],
      datasets: [
        {
          label: 'User Statistics',
          data: [
            statistics.adminCount,
            statistics.employeeCount,
            statistics.hrCount,
            statistics.userCount,
            statistics.activeSubscriptionCount,
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 205, 86, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'User Statistics',
        },
      },
    };

    return <Pie data={chartData} options={chartOptions} />;
  };

  return (
    <div className="p-4 mt-6">
      {statistics ? (
        <>
          <h1 className="text-2xl font-bold mb-6">User Statistics</h1>

          <div className="p-4 rounded-xl dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-center rounded h-68 bg-white mb-4">
                  <div className="container md:w-[500px] md:h-[500px] w-[250px]" >{renderChart()}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                  <FaUsers className="text-8xl text-blue-500 mb-4" />
                  <div className="text-gray-900 font-bold text-xl mb-2">Total</div>
                  <h1 className="text-2xl font-bold">{statistics.totalCount}</h1>
                  <div className="mt-4">
                    <a href="#" className="text-blue-500 font-bold leading-none">
                      More Info
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                  <FaUserCog className="text-8xl text-blue-500 mb-4" />
                  <div className="text-gray-900 font-bold text-xl mb-2">Admin</div>
                  <h1 className="text-2xl font-bold">{statistics.adminCount}</h1>
                  <div className="mt-4">
                    <a href="#" className="text-blue-500 font-bold leading-none">
                      More Info
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                  <FaUserTie className="text-8xl text-blue-500 mb-4" />
                  <div className="text-gray-900 font-bold text-xl mb-2">Employee</div>
                  <h1 className="text-2xl font-bold">{statistics.employeeCount}</h1>
                  <div className="mt-4">
                    <a href="#" className="text-blue-500 font-bold leading-none">
                      More Info
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                  <FaUserNinja className="text-8xl text-blue-500 mb-4" />
                  <div className="text-gray-900 font-bold text-xl mb-2">HR</div>
                  <h1 className="text-2xl font-bold">{statistics.hrCount}</h1>
                  <div className="mt-4">
                    <a href="#" className="text-blue-500 font-bold leading-none">
                      More Info
                    </a>
                  </div>
                </div>

              </div>

              <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                <FaUser className="text-8xl text-blue-500 mb-4" />
                <div className="text-gray-900 font-bold text-xl mb-2">Regular</div>
                <h1 className="text-2xl font-bold">{statistics.userCount}</h1>
                <div className="mt-4">
                  <a href="#" className="text-blue-500 font-bold leading-none">
                    More Info
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                <FaCheckCircle className="text-8xl text-blue-500 mb-4" />
                <div className="text-gray-900 font-bold text-xl mb-2">Subscription Active</div>
                <h1 className="text-2xl font-bold">{statistics.activeSubscriptionCount}</h1>
                <div className="mt-4">
                  <a href="#" className="text-blue-500 font-bold leading-none">
                    More Info
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-2xl font-bold">Loading...</p>
      )}
    </div>
  );
};

export default UserStatistics;