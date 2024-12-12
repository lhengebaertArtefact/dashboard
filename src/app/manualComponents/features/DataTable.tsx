import React from "react";

interface DataTableProps {
  data: Array<{
    id: number;
    name: string;
    totalTickets: number;
    foundTickets: number;
  }>;
}

export function DataTable({ data }: DataTableProps) {
  return (
    <div className="group relative h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur transition-all duration-300 group-hover:scale-105"></div>
      <div className="relative h-full backdrop-blur-xl bg-white/10 rounded-2xl border border-white/10 overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>

        {/* Content */}
        <div className="relative z-10 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Nom de l'award
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Total des tickets
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Tickets trouvés
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                      {row.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-blue-400">
                      {row.totalTickets}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-sm text-emerald-400">
                        {row.foundTickets}
                      </span>
                      <div className="ml-2 h-1.5 w-12 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                          style={{
                            width: `${
                              (row.foundTickets / row.totalTickets) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
