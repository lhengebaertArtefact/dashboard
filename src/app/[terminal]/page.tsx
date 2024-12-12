"use client";

import { DashboardGrid } from "../manualComponents/dashboardGrid/DashbordGrid";
import { KPICard } from "../manualComponents/features/KPICard";
import { GeneralInfo } from "../manualComponents/features/GeneralInfo";
import { QRCodeCard } from "../manualComponents/features/QRCodeCard";
import { DataTable } from "../manualComponents/features/DataTable";
import { useStore } from "@/store/useStore";

export default function TerminalPage() {
  const { item, selectedStore } = useStore();
  const [source, term] = item;

  console.log("store = ", selectedStore);

  if (!selectedStore) return <div>Aucune donnée disponible</div>;

  return (
    <div className="w-full min-h-screen p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8">
        <div className="lg:col-span-2">
          <GeneralInfo
            terminalName={selectedStore.location}
            storeSource={selectedStore.utm_source}
            utmTerm={selectedStore.utm_term}
            totalTickets={selectedStore.config.reduce(
              (acc, gift) => acc + (Number(gift.nb_gift_projected) || 0),
              0
            )}
            foundTickets={selectedStore.config.reduce(
              (acc, gift) => acc + (Number(gift.nb_gift_find) || 0),
              0
            )}
            totalParticipants={0}
          />
        </div>
        <div className="lg:col-span-1">
          <QRCodeCard terminalId={term} storeSource={source} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        <div className="xl:col-span-2 order-2 xl:order-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {selectedStore.config.map((gift, index) => {
              const total = Number(gift.nb_gift_projected);
              const found = Number(gift.nb_gift_find);
              const remaining = total - found;

              return (
                <KPICard
                  key={index}
                  title={`${gift.gift}`}
                  probability={`${gift.min}% - ${gift.max}%`}
                  found_Tickets={found}
                  isPositive={found > 0}
                  percentage_Found_Tickets={((found / total) * 100).toFixed(1)}
                  remaining_tickets={`${remaining}/${total}`}
                />
              );
            })}
          </div>
        </div>
        <div className="xl:col-span-1 order-1 xl:order-2">
          <DataTable
            data={selectedStore.config.map((gift, index) => ({
              id: index + 1,
              name: String(gift.gift),
              totalTickets: Number(gift.nb_gift_projected),
              foundTickets: Number(gift.nb_gift_find),
            }))}
          />
        </div>
      </div>
    </div>
  );
}
