"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Awards trouvé durant l'année",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Nombre d'awards",
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: "rgb(0, 153, 255)",
      backgroundColor: "rgba(0, 153, 255, 0.5)",
    },
  ],
};

export function LineChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <Line options={options} data={data} />
    </div>
  );
}
