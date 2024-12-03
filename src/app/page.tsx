"use client";
import { useState } from "react";
import { DashboardGrid } from "./manualComponents/dashboardGrid/DashbordGrid";
import { KPICard } from "./manualComponents/features/KPICard";
import { GeneralInfo } from "./manualComponents/features/GeneralInfo";
import { QRCodeCard } from "./manualComponents/features/QRCodeCard";
import { mockTerminalStats } from "@/mocks/terminalData";
import { DataTable } from "./manualComponents/features/DataTable";
import { LineChart } from "./manualComponents/features/LineChart";

export default function Home() {
  const [stats] = useState(mockTerminalStats);

  const dataTableData = stats.stores.flatMap((store) =>
    store.rewards.map((reward, index) => ({
      id: index + 1,
      name: `${reward.type} (${store.name})`,
      value: reward.count,
    }))
  );

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
          <QRCodeCard terminalId={stats.terminalId} />
        </div>
      </div>

      <DashboardGrid>
        <div className="col-span-3 space-y-6">
          {stats.stores.map((store, storeIndex) => (
            <div
              key={storeIndex}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="text-lg font-semibold mb-4">{store.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {store.rewards.map((reward, rewardIndex) => (
                  <KPICard
                    key={rewardIndex}
                    title={reward.type}
                    value={reward.count.toString()}
                    change={reward.count > 100 ? 5 : -3}
                    isPositive={reward.count > 100}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Section graphique */}
        <div className="col-span-2">
          <LineChart />
        </div>

        {/* Section tableau */}
        <div className="col-span-2">
          <DataTable data={dataTableData} />
        </div>
      </DashboardGrid>
    </div>
  );
}
