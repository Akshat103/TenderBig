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
  FaHandshake 
} from 'react-icons/fa';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const UserStatistics = () => {
  const [statistics, setStatistics] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

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

  let adminLabels;
  let hrLabels;
  let employeeLabels;
  let franchiseLabels;
  let adminData;
  let hrData;
  let employeeData;
  let franchiseData;

  if (statistics) {
    adminLabels = ['Admin', 'HR', 'Employee', 'Franchise', 'Regular Users', 'Subscription Active'];
    hrLabels = ['Employee', 'Franchise', 'Regular Users', 'Subscription Active'];
    employeeLabels = ['Franchise', 'Regular Users', 'Subscription Active'];
    franchiseLabels = ['Regular Users', 'Subscription Active'];

    adminData = [
      statistics.adminCount,
      statistics.employeeCount,
      statistics.hrCount,
      statistics.franchiseCount,
      statistics.userCount,
      statistics.activeSubscriptionCount,
    ];

    hrData = [
      statistics.employeeCount,
      statistics.franchiseCount,
      statistics.userCount,
      statistics.activeSubscriptionCount,
    ];

    employeeData = [
      statistics.franchiseCount,
      statistics.userCount,
      statistics.activeSubscriptionCount,
    ];

    franchiseData = [
      statistics.userCount,
      statistics.activeSubscriptionCount,
    ];
  }


  const renderChart = (label, datas) => {
    if (!statistics) {
      return null;
    }

    const chartData = {
      labels: label,
      datasets: [
        {
          label: 'User Statistics',
          data: datas,
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

          {(user.userRole == 'admin') ? <div className="p-4 rounded-xl dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-center rounded h-68 bg-white mb-4">
                  <div className="container md:w-[500px] md:h-[500px] w-[250px]" >{renderChart(adminLabels, adminData)}</div>
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

            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                <FaUser className="text-8xl text-blue-500 mb-4" />
                <div className="text-gray-900 font-bold text-xl mb-2">Regular Users</div>
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

              <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                <FaHandshake className="text-8xl text-blue-500 mb-4" />
                <div className="text-gray-900 font-bold text-xl mb-2">Franchise</div>
                <h1 className="text-2xl font-bold">{statistics.franchiseCount}</h1>
                <div className="mt-4">
                  <a href="#" className="text-blue-500 font-bold leading-none">
                    More Info
                  </a>
                </div>
              </div>

            </div>
          </div> : <></>}

          {(user.userRole == 'hr') ? <div className="p-4 rounded-xl dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-center rounded h-68 bg-white mb-4">
                  <div className="container md:w-[500px] md:h-[500px] w-[250px]" >{renderChart(hrLabels, hrData)}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">




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
                  <FaUser className="text-8xl text-blue-500 mb-4" />
                  <div className="text-gray-900 font-bold text-xl mb-2">Users</div>
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

                <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                  <FaHandshake className="text-8xl text-blue-500 mb-4" />
                  <div className="text-gray-900 font-bold text-xl mb-2">Franchise</div>
                  <h1 className="text-2xl font-bold">{statistics.franchiseCount}</h1>
                  <div className="mt-4">
                    <a href="#" className="text-blue-500 font-bold leading-none">
                      More Info
                    </a>
                  </div>
                </div>



              </div>

            </div>

          </div> : <></>}

          {(user.userRole == 'employee') ? <div className="p-4 rounded-xl dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-center rounded h-68 bg-white mb-4">
                  <div className="container md:w-[500px] md:h-[500px] w-[250px]" >{renderChart(employeeLabels, employeeData)}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                  <FaUser className="text-8xl text-blue-500 mb-4" />
                  <div className="text-gray-900 font-bold text-xl mb-2">Users</div>
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

                <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                  <FaHandshake className="text-8xl text-blue-500 mb-4" />
                  <div className="text-gray-900 font-bold text-xl mb-2">Franchise</div>
                  <h1 className="text-2xl font-bold">{statistics.franchiseCount}</h1>
                  <div className="mt-4">
                    <a href="#" className="text-blue-500 font-bold leading-none">
                      More Info
                    </a>
                  </div>
                </div>



              </div>

            </div>

          </div> : <></>}

          {(user.userRole == 'franchise') ? <div className="p-4 rounded-xl dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-center rounded h-68 bg-white mb-4">
                  <div className="container md:w-[500px] md:h-[500px] w-[250px]" >{renderChart(franchiseLabels, franchiseData)}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 justify-center">
                  <FaUser className="text-8xl text-blue-500 mb-4" />
                  <div className="text-gray-900 font-bold text-xl mb-2">Users</div>
                  <h1 className="text-2xl font-bold">{statistics.userCount}</h1>
                  <div className="mt-4">
                    <a href="#" className="text-blue-500 font-bold leading-none">
                      More Info
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 justify-center">
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

          </div> : <></>}
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <img
            src={`${import.meta.env.BASE_URL}loader.gif`}
            alt="Loading..."
            className="w-18 h-18 bg-transparent"
          />
        </div>
      )}
    </div>
  );
};

export default UserStatistics;