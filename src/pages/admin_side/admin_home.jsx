import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from '../../Components/admin_components/admin_nav';
import AdminSide from '../../Components/admin_components/admin_side';
import { baseUrl, barchart } from '../../utilits/constants';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, Title, LineElement } from 'chart.js';
import { Bar, Line } from "react-chartjs-2";


// import BarChart from '../../Components/admin_components/barchart';
Chart.register(CategoryScale, LinearScale, BarElement, PointElement, Title, LineElement);
const Dashboard = () => {
  const [barchartdata, setBarchartdata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch datas from your DRF backend
    axios.get(baseUrl + barchart)
      .then(response => {
        setBarchartdata(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const data1 = [
    {
      title: "All",
      description: "Description for All.",
    },
    {
      title: "Professionals",
      description: "Description for professionals .",
    },
    {
      title: "Houseowners ",
      description: "Description for Houseowners .",
    },
    {
      title: "Upgraded",
      description: "Description for Upgraded .",
    },
  ];


  var data = {
    labels: barchartdata.map((item) => item.month),
    datasets: [{
      label: 'User Count',
      data: barchartdata.map((item) => item.count),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 2,
    }]
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Sidebar */}
      <div className="col-span-1">
        <AdminSide />
      </div>

      {/* Main content */}
      <div className="col-span-3 mr-16">
         <AdminNav /> 

        {/* List items */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-28 mr-16">
        {data1.map((item, index) => (
            <div key={index} className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
              <div className="p-6">
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {item.title}
                </h5>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                {item.description}
                </p>
              </div>
              <div className="p-6 pt-0">
              
              </div>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="flex flex-row">
          <div className="w-1/2 flex-grow-0">
            <div className="mt-16 mr-16">
              <h2 style={{ textAlign: "center" }}>Upgraded Users</h2>
              <Bar
                data={data}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Users upgraded in last 3 months",
                    },
                    legend: {
                      display: false,
                    },
                  },
                  // Ensure equal aspect ratio for consistent scaling (adjust as needed)
                  aspectRatio: 1.5,
                }}
              />
            </div>
          </div>
          {/* <div className="w-1/2 h-10 flex-grow-0">
            <div className="mt-16">
              <h2 style={{ textAlign: "center" }}>Bar Chart 2</h2>
              <Line
                data={data}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Users Gained between 2016-2020",
                    },
                    legend: {
                      display: false,

                    },
                  },
                  // Ensure equal aspect ratio for consistent scaling (adjust as needed)
                  aspectRatio: 1.5,
                }}
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );

};

export default Dashboard;