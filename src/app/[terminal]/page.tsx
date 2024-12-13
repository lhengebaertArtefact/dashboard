import { KPICard } from "../manualComponents/features/KPICard";
import { GeneralInfo } from "../manualComponents/features/GeneralInfo";
import { QRCodeCard } from "../manualComponents/features/QRCodeCard";
import { DataTable } from "../manualComponents/features/DataTable";
import { KPICardTickets } from "../manualComponents/features/KPICardTickets";
import { notFound } from "next/navigation";

export default async function Terminal({
  params,
}: {
  params: { terminal: string };
}) {
  try {
    // Si le terminal contient un "-", c'est une page store ?
    if (params.terminal.includes("-")) {
      const [utm_source, utm_term] = params.terminal.split("-");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/get-store`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ utm_source, utm_term }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { store } = await response.json();
      if (!store) return <div>Aucune donnée disponible</div>;

      return (
        <div className="w-full min-h-screen p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8">
            <div className="lg:col-span-2">
              <GeneralInfo
                terminalName={store.location}
                storeSource={store.utm_source}
                utmTerm={store.utm_term}
                totalTickets={store.config.reduce(
                  (acc: number, gift: { nb_gift_projected: string | number }) =>
                    acc + (Number(gift.nb_gift_projected) || 0),
                  0
                )}
                foundTickets={store.config.reduce(
                  (acc: number, gift: { nb_gift_find: string | number }) =>
                    acc + (Number(gift.nb_gift_find) || 0),
                  0
                )}
                totalParticipants={0}
              />
            </div>
            <div className="lg:col-span-1">
              <QRCodeCard
                terminalId={store.utm_term}
                storeSource={store.utm_source}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div className="xl:col-span-2 order-2 xl:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                {store.config.map(
                  (
                    gift: {
                      nb_gift_projected: string | number;
                      nb_gift_find: string | number;
                      gift: string;
                      min: string;
                      max: string;
                    },
                    index: number
                  ) => {
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
                        percentage_Found_Tickets={(
                          (found / total) *
                          100
                        ).toFixed(1)}
                        remaining_tickets={`${remaining}/${total}`}
                      />
                    );
                  }
                )}
              </div>
            </div>
            <div className="xl:col-span-1 order-1 xl:order-2">
              <DataTable
                data={store.config.map(
                  (
                    gift: {
                      nb_gift_projected: string | number;
                      nb_gift_find: string | number;
                      gift: string;
                      min: string;
                      max: string;
                    },
                    index: number
                  ) => ({
                    id: index + 1,
                    name: String(gift.gift),
                    totalTickets: Number(gift.nb_gift_projected),
                    foundTickets: Number(gift.nb_gift_find),
                  })
                )}
              />
            </div>
          </div>
        </div>
      );
    } else {
      // C'est une page collection
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/get-tickets`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ collectionPrefix: params.terminal }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { collections } = await response.json();

      if (!collections?.length) {
        notFound();
      }

      return (
        <div className="w-full min-h-screen p-4 md:p-6 lg:p-8">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-6">
            Collections {params.terminal}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {collections.map(
              (
                collection: {
                  collectionName: string;
                  totalTickets: number;
                  foundTickets: number;
                  locations: string[];
                  utmSources: string[];
                },
                index: number
              ) => (
                <KPICardTickets
                  key={index}
                  award={collection.collectionName}
                  remainingTickets={
                    collection.totalTickets - collection.foundTickets
                  }
                  totalTickets={collection.totalTickets}
                  utm_source={collection.utmSources}
                  location={collection.locations}
                />
              )
            )}
          </div>
        </div>
      );
    }
  } catch (error) {
    throw error; // Next.js affichera error.tsx
  }
}
