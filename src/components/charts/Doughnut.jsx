import { Doughnut } from "react-chartjs-2";

function DoughnutComponent({ chartData }) {
  return (
    <div className="chart-container">
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Conductividad",
            },
          },
        }}
      />
    </div>
  );
}
export default DoughnutComponent;
