import { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClipboardCheck, faUserShield, faEye, faThumbsUp, faHammer, faTools } from '@fortawesome/free-solid-svg-icons';

const TenderStatistics = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchTenderStatistics = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            auth: token
          }
        };

        const response = await axios.get(
          "http://localhost:5000/apiTender/tenderdetails/statistics",
          config
        );
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching tender statistics:", error);
      }
    };

    fetchTenderStatistics();
    const interval = setInterval(fetchTenderStatistics, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const renderChart = () => {
    if (!statistics) {
      return null;
    }

    const chartData = {
      labels: [
        "Reviewed and Approved Tenders",
        "Reviewed Tenders",
        "Approved Tenders",
        "Contractor Tenders",
        "Subcontractor Tenders",
        "Admin Tenders",
      ],
      datasets: [
        {
          label: "Tender Data",
          data: [
            statistics.activeApprovedCount,
            statistics.activeCount,
            statistics.approvedCount,
            statistics.contractorCount,
            statistics.subcontractorCount,
            statistics.adminCount,
          ],
          backgroundColor: [
            "#6CA0DC",
            "#FFCD56",
            "#FF6384",
            "#36A2EB",
            "#9966FF",
            "#FF6384"
          ],
          borderColor: "#fff",
          borderWidth: 1
        }
      ]
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Tender Statistics'
        }
      }
    };

    return <Pie data={chartData} options={chartOptions} />;
  };


  return (
    <>
      <div className="p-4">
        {statistics ? (
          <>
            <h1 className="text-2xl font-bold mb-6">Tender Statistics</h1>

            <div className="p-4 rounded-lg dark:border-gray-700">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">

                <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-8xl text-blue-500 mb-4" />
                  <div className="text-gray-900 font-bold text-xl mb-2">Total Tenders</div>
                  <h1 className="text-2xl font-bold">{statistics.totalCount}</h1>
                  <div className="mt-4">
                    <a href="#" className="text-blue-500 font-bold leading-none">More Info</a>
                  </div>
                </div>

                <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                  <FontAwesomeIcon icon={faClipboardCheck} className="text-8xl text-blue-500 mb-4" />
                  <div className="text-gray-900 font-bold text-xl mb-2">Reviewed and Approved Tenders</div>
                  <h1 className="text-2xl font-bold">{statistics.activeApprovedCount}</h1>
                  <div className="mt-4">
                    <a href="#" className="text-blue-500 font-bold leading-none">More Info</a>
                  </div>
                </div>

                <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                  <FontAwesomeIcon icon={faUserShield} className="text-8xl text-blue-500 mb-4" />
                  <div className="text-gray-900 font-bold text-xl mb-2">Admin Tenders</div>
                  <h1 className="text-2xl font-bold">{statistics.adminCount}</h1>
                  <div className="mt-4">
                    <a href="#" className="text-blue-500 font-bold leading-none">More Info</a>
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center justify-center">
                    <div className="container md:w-[500px] md:h-[500px] w-[250px]">
                      {renderChart()}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                  <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                    <FontAwesomeIcon icon={faEye} className="text-8xl text-blue-500 mb-4" />
                    <div className="text-gray-900 font-bold text-xl mb-2">Reviewed Tenders</div>
                    <h1 className="text-2xl font-bold">{statistics.activeCount}</h1>
                    <div className="mt-4">
                      <a href="#" className="text-blue-500 font-bold leading-none">More Info</a>
                    </div>
                  </div>

                  <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                    <FontAwesomeIcon icon={faThumbsUp} className="text-8xl text-blue-500 mb-4" />
                    <div className="text-gray-900 font-bold text-xl mb-2">Approved Tenders</div>
                    <h1 className="text-2xl font-bold">{statistics.approvedCount}</h1>
                    <div className="mt-4">
                      <a href="#" className="text-blue-500 font-bold leading-none">More Info</a>
                    </div>
                  </div>

                  <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                    <FontAwesomeIcon icon={faHammer} className="text-8xl text-blue-500 mb-4" />
                    <div className="text-gray-900 font-bold text-xl mb-2">Contractor Tenders</div>
                    <h1 className="text-2xl font-bold">{statistics.contractorCount}</h1>
                    <div className="mt-4">
                      <a href="#" className="text-blue-500 font-bold leading-none">More Info</a>
                    </div>
                  </div>

                  <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                    <FontAwesomeIcon icon={faTools} className="text-8xl text-blue-500 mb-4" />
                    <div className="text-gray-900 font-bold text-xl mb-2">Subcontractor Tenders</div>
                    <h1 className="text-2xl font-bold">{statistics.subcontractorCount}</h1>
                    <div className="mt-4">
                      <a href="#" className="text-blue-500 font-bold leading-none">More Info</a>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </>
        ) : (
          <p className="text-2xl font-bold">Loading...</p>
        )}
      </div>

    </>
  );
};

export default TenderStatistics;