interface KPICardTicketsProps {
  award: string;
  remainingTickets: number;
  totalTickets: number;
  utm_source: string[];
  location: string[];
}

export function KPICardTickets({
  award,
  remainingTickets,
  totalTickets,
  utm_source,
  location,
}: KPICardTicketsProps) {
  return (
    <div className="group relative h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur transition-all duration-300 group-hover:scale-105"></div>
      <div className="relative h-full backdrop-blur-xl bg-white/10 rounded-2xl p-4 md:p-6 border border-white/10 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl"></div>

        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
            {award}
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Tickets restants</span>
              <div className="flex items-center">
                <span className="text-blue-400 font-medium">
                  {remainingTickets}
                </span>
                <span className="text-gray-500 mx-1">/</span>
                <span className="text-gray-400">{totalTickets}</span>
              </div>
            </div>

            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${(remainingTickets / totalTickets) * 100}%` }}
              />
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Source</span>
                <span className="text-sm text-purple-400">{utm_source}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Location</span>
                <span className="text-sm text-blue-400">{location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
