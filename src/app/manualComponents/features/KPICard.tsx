import { ArrowUp, ArrowDown } from "lucide-react";

interface KPICardProps {
  title: string;
  probability: string;
  found_Tickets: number;
  isPositive: boolean;
  percentage_Found_Tickets: string;
  remaining_tickets: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  probability,
  found_Tickets,
  isPositive,
  percentage_Found_Tickets,
  remaining_tickets,
}) => {
  return (
    <div className="group relative h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur transition-all duration-300 group-hover:scale-105"></div>
      <div className="relative h-full backdrop-blur-xl bg-white/10 rounded-2xl p-4 md:p-6 border border-white/10 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="mb-4">
            <p className="text-xl md:text-3xl font-bold bg-clip-text text-gray-100">
              {title}
            </p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs md:text-sm font-medium text-gray-300">
              Probabilité de victoire
            </h3>
            <span className="text-xs md:text-sm font-bold text-purple-400">
              {probability}
            </span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs md:text-sm font-medium text-gray-300">
              Tickets trouvés
            </h3>
            <span className="text-xs md:text-sm font-bold text-purple-400">
              {found_Tickets}
            </span>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <p className="text-gray-100 text-sm">
              Pourcentage de tickets trouvés{" "}
            </p>
            <div
              className={`flex items-center px-2 py-1 rounded-full ${
                isPositive
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-rose-500/20 text-rose-400"
              }`}
            >
              <span className="text-xs font-semibold">
                {percentage_Found_Tickets}%
              </span>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Tickets restants</span>
              <span className="text-sm font-medium text-blue-400">
                {remaining_tickets}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
