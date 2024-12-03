"use client";

import { useEffect, useState } from "react";

interface GeneralInfoProps {
  terminalName: string;
  storeSource: string;
  totalTickets: number;
  foundTickets: number;
  totalParticipants: number;
}

export function GeneralInfo({
  terminalName,
  storeSource,
  totalTickets,
  foundTickets,
  totalParticipants,
}: GeneralInfoProps) {
  const [date, setDate] = useState("");
  const DateDisplay = () => {
    useEffect(() => {
      setDate(
        new Date().toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      );
    }, []);

    return <span>Dernière mise à jour: {date}</span>;
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Terminal {terminalName}</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Store source</span>
          <span className="font-semibold">{storeSource}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total des Tickets</span>
          <span className="font-semibold">{totalTickets}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tickets Trouvés</span>
          <span className="font-semibold">{foundTickets}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Participants</span>
          <span className="font-semibold">{totalParticipants}</span>
        </div>
        <div className="mt-6 pt-4 border-t">
          <p className="text-sm text-gray-500">
            Dernière mise à jour: {DateDisplay()}
          </p>
        </div>
      </div>
    </div>
  );
}
