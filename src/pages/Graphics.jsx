import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { useState } from "react";
import { Data } from "../utils/data.js";
import { BarChart } from "../components/charts/BarChart.jsx";
import DoughnutComponent from "../components/charts/Doughnut.jsx";
import LineChart from "../components/charts/LineChart.jsx";
import PieChart from "../components/charts/PieChart.jsx";

const Graphics = () => {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <main className="bg-white grid grid-cols-3 grid-rows-3 p-10 rounded-lg shadow-lg">
      <div>
        <LineChart chartData={chartData} />
      </div>
      <div>
        <DoughnutComponent chartData={chartData} />
      </div>
      <div>
        <BarChart chartData={chartData} />
      </div>
      <div>
        <BarChart chartData={chartData} />
      </div>
      <div>
        <PieChart chartData={chartData} />
      </div>
      <div>
        <BarChart chartData={chartData} />
      </div>
      <div>
        <LineChart chartData={chartData} />
      </div>
      <div className="col-start-3">
        <BarChart chartData={chartData} />
      </div>
    </main>
  );
};

export default Graphics;
