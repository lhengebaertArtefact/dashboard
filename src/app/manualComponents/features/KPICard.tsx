import { ArrowUp, ArrowDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  isPositive: boolean;
}

export function KPICard({ title, value, change, isPositive }: KPICardProps) {
  return (
    <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <div className="flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p
          className={`ml-2 flex items-baseline text-sm font-semibold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? (
            <ArrowUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
          ) : (
            <ArrowDown className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
          )}
          <span className="ml-1">{change}%</span>
        </p>
      </div>
    </div>
  );
}
