"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";

interface RewardStats {
  [key: string]: number;
}

const TerminalDashboard = ({ terminal }: { terminal: string | null }) => {
  const [stats, setStats] = useState<RewardStats>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!terminal) return;

    const fetchRewards = async () => {
      try {
        const response = await fetch("/api/get-rewards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ terminal }),
        });

        if (!response.ok)
          throw new Error("Erreur lors de la récupération des récompenses.");

        const data = await response.json();
        setStats(data.stats || {});
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRewards();
  }, [terminal]);

  if (isLoading) return <p>Chargement des données...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {Object.entries(stats).map(([award, count]) => (
        <Card key={award} title={award} count={count} />
      ))}
    </div>
  );
};

export default TerminalDashboard;
