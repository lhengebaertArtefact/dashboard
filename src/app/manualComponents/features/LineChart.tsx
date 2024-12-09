"use client";

import React, { useEffect, useState } from "react";
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
import useStore from "@/store/useStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Fonction pour générer les 7 derniers jours
const getLast7Days = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(
      date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric" })
    );
  }
  return dates;
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Awards trouvés ces 7 derniers jours",
      font: {
        size: 16,
        weight: "bold" as "bold",
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

export function LineChart() {
  const [awardData, setAwardData] = useState<{ [key: string]: number[] }>({});
  const [error, setError] = useState<string | null>(null);
  const { item } = useStore();

  useEffect(() => {
    const fetchAwardData = async () => {
      try {
        const source = item[0];
        const term = item[1];

        const response = await fetch("/api/get-awards", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ utm_term: term, utm_source: source }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json();

        const awardDataByCollection: { [key: string]: number[] } = {};
        data.stats.collectionsFromSource.forEach((collection: string) => {
          const collectionName = extractAwardName(collection);
          if (!awardDataByCollection[collectionName]) {
            awardDataByCollection[collectionName] = [];
          }
          const foundTickets =
            data.stats.rewards.find(
              (reward: any) => reward.type === collectionName
            )?.found || 0;
          awardDataByCollection[collectionName].push(foundTickets);
        });

        setAwardData(awardDataByCollection);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      }
    };

    fetchAwardData();
  }, [item]);

  const extractAwardName = (name: string) => {
    const match = name.match(/(\d+)|Sucette/);
    return match
      ? match[0] === "Sucette"
        ? "Sucette"
        : `-${match[0]}%`
      : name;
  };

  const data = {
    labels: getLast7Days(),
    datasets: Object.keys(awardData).map((collectionName, index) => ({
      label: collectionName,
      data: awardData[collectionName],
      borderColor: `hsl(${index * 60}, 70%, 50%)`,
      backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.2)`,
      tension: 0.3,
      pointBackgroundColor: `hsl(${index * 60}, 70%, 50%)`,
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    })),
  };

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <Line options={options} data={data} />
    </div>
  );
}
