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
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Nom de l'award</th>
          <th className="py-2 px-4 border-b">Total des tickets</th>
          <th className="py-2 px-4 border-b">Tickets trouvés</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="hover:bg-gray-100">
            <td className="border px-4 py-2">{row.name}</td>
            <td className="border px-4 py-2">{row.totalTickets}</td>
            <td className="border px-4 py-2">{row.foundTickets}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
