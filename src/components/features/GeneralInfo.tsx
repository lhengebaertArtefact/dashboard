"use client";

import { useEffect, useState } from "react";

interface GeneralInfoProps {
  terminalName: string;
  storeSource: string;
  utmTerm: string;
  totalTickets: number;
  foundTickets: number;
  totalParticipants: number;
}

export function GeneralInfo({
  terminalName,
  storeSource,
  utmTerm,
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
    <div className="group relative h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur transition-all duration-300 group-hover:scale-105"></div>
      <div className="relative h-full backdrop-blur-xl bg-white/10 rounded-2xl p-4 md:p-6 border border-white/10 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-gray-100 mb-6">
            Terminal {terminalName}
          </h2>

          <div className="grid gap-4 md:gap-6">
            {[
              { label: "Store source", value: storeSource },
              { label: "Terminal short name", value: utmTerm },
              { label: "Total des Tickets", value: totalTickets },
              { label: "Tickets Trouvés", value: foundTickets },
              { label: "Participants", value: totalParticipants },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="text-sm md:text-base text-gray-300">
                  {label}
                </span>
                <span className="text-sm md:text-base font-semibold text-blue-400">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-sm text-gray-400 flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <DateDisplay />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
