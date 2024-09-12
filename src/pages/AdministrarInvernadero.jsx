import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { useState } from "react";
import {
  Data,
  HumidityData,
  temperaturaData,
  phData,
  conductividadData,
} from "../utils/data.js";
import { BarChart } from "../components/charts/BarChart.jsx";
import DoughnutComponent from "../components/charts/Doughnut.jsx";
import LineChart from "../components/charts/LineChart.jsx";
import PieChart from "../components/charts/PieChart.jsx";
import useAuth from "../hooks/useAuth.jsx";
import CalendarX from "../components/CalendarX.jsx";
import SemillaPapaya from "../public/papaya.svg";

Chart.register(CategoryScale);

const AdministrarInvernadero = () => {
  const { auth } = useAuth();

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

  const [chartTemperaturaData, setChartTemperaturaData] = useState({
    labels: temperaturaData.map((data) => data.fecha),
    datasets: [
      {
        label: "Temperatura",
        data: temperaturaData.map((data) => data.temperatura),
        backgroundColor: ["rgba(75, 192, 192, 1)"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [chartConductividadData, setChartConductividadData] = useState({
    labels: conductividadData.map((data) => data.nivel),
    datasets: [
      {
        label: "Conductividad",
        data: conductividadData.map((data) => data.cantidad),
        backgroundColor: ["#70ff00", "#fff300", "#ff2d00"],

        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [chartPhData, setChartPhData] = useState({
    labels: phData.map((data) => data.nivel),
    datasets: [
      {
        label: "ph",
        data: phData.map((data) => data.cantidad),
        backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0"],

        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [chartHumidityData, setChartHumidityData] = useState({
    labels: HumidityData.map((data) => data.month),
    datasets: [
      {
        label: "Humedad",
        data: HumidityData.map((data) => data.humidity),
        backgroundColor: ["#ecf0f1"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const refreshChartData = () => {
    setChartData({
      labels: Data.map((data) => data.year),
      datasets: [
        {
          label: "Users Gained",
          data: Data.map((data) => data.userGain * Math.random()),
          backgroundColor: [
            "rgba(75,192,192,1)",
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
  };

  return (
    <>
      <main className="min-h-screen">
        <div className="flex mb-10 justify-center lg:justify-start">
          <h1 className="font-bold uppercase text-gray-400">/ Home /</h1>
        </div>
        <div className="flex gap-10 flex-col lg:flex-row items-center lg:items-start">
          <div className="container grid grid-cols-1 mx-auto w-5/6 lg:grid-cols-2 gap-10 shadow-xl p-10 rounded-xl bg-white mb-10 lg:max-w-full">
            <PieChart chartData={chartPhData} />
            <DoughnutComponent chartData={chartConductividadData} />
            <BarChart chartData={chartTemperaturaData} />
            <LineChart chartData={chartHumidityData} />
          </div>
          <div className="w-96 bg-white p-10 rounded-lg shadow-lg mb-10">
            <h3 className="mb-4">
              ¡Hola {auth?.nombre || auth.grower?.nombre}!{" "}
            </h3>
            <CalendarX />
            <h3 className="mt-10 font-bold">Semilla activa: </h3>
            <div className="mt-4 flex flex-col items-center">
              <p className="italic">Papaya </p>
              <img src={SemillaPapaya} alt="Logo" />
              <p>Crecimiento: 9 a 12 meses</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdministrarInvernadero;
