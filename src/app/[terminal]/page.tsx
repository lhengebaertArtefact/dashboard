"use client";
import { useState, useEffect } from "react";
import { DashboardGrid } from "../manualComponents/dashboardGrid/DashbordGrid";
import { KPICard } from "../manualComponents/features/KPICard";
import { GeneralInfo } from "../manualComponents/features/GeneralInfo";
import { QRCodeCard } from "../manualComponents/features/QRCodeCard";
import { DataTable } from "../manualComponents/features/DataTable";
import { LineChart } from "../manualComponents/features/LineChart";
import useStore from "@/store/useStore";

interface Stats {
  terminalId: string;
  storeSource: string;
  totalTickets: number;
  foundTickets: number;
  totalParticipants: number;
  rewards: Array<{ type: string; count: number; found: number }>;
  collectionsFromSource: string[];
}

interface PageProps {
  params: {
    terminal: string;
  };
}

export default function TerminalPage({ params }: PageProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { item } = useStore();

  const terminalParams = params.terminal;

  const fetchStats = async (utm_term: string, utm_source: string) => {
    try {
      const response = await fetch("/api/get-awards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ utm_term, utm_source }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }

      const data = await response.json();
      setStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const source = item[0];
    const term = item[1];

    fetchStats(term, source);
    console.log("mon term ", term);
  }, [terminalParams, item]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!stats) return <div>Aucune donnée disponible</div>;

  const dataTableData = stats.rewards.map((reward, index) => ({
    id: index + 1,
    name: reward.type,
    value: reward.count,
  }));

  const source = item[0];
  const term = item[1];

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-6 mb-6">
        <div className="w-2/3">
          <GeneralInfo
            terminalName={stats.terminalId}
            storeSource={stats.storeSource}
            totalTickets={stats.totalTickets}
            foundTickets={stats.foundTickets}
            totalParticipants={stats.totalParticipants}
          />
        </div>

        <div className="w-1/3">
          <QRCodeCard terminalId={term} storeSource={source} />
        </div>
      </div>

      <DashboardGrid>
        <div className="col-span-3 space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <div>
            <h3 className="text-lg font-semibold mb-4">Liste des awards</h3>

            {stats.collectionsFromSource.map((award: string) => {
              const extractAwardName = (name: string) => {
                const match = name.match(/(\d+)|Sucette/);
                return match
                  ? match[0] === "Sucette"
                    ? "Sucette"
                    : `-${match[0]}%`
                  : name;
              };

              return (
                <div key={award}>
                  <h3 className="text-lg font-semibold mb-4 p-6 rounded-lg shadow-md border border-gray-300">
                    {extractAwardName(award)}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {stats.rewards.map((reward, index) => (
                      <KPICard
                        key={index}
                        title={reward.type}
                        value={reward.count.toString()}
                        change={((reward.found / reward.count) * 100).toFixed(
                          1
                        )}
                        isPositive={reward.found > 0}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-2">
          <LineChart />
        </div>

        <div className="col-span-2">
          <DataTable data={dataTableData} />
        </div>
      </DashboardGrid>
    </div>
  );
}
