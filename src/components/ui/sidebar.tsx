"use client";
import { Home, BarChart, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import type { StoreDocument } from "@/store/useStore";

interface SidebarProps {
  setItem: (newItem: string[]) => void;
  terminalName: Array<StoreDocument>;
}

export function Sidebar({ setItem, terminalName }: SidebarProps) {
  const { setSelectedStore } = useStore();

  return (
    <div className="relative min-h-screen w-80 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-white/10">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>

      <div className="relative z-10 p-4">
        <h2 className="px-4 py-2 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Dashboard
        </h2>

        <nav className="mt-6 space-y-1">
          {terminalName?.map((terminal) => (
            <button
              key={terminal._id}
              onClick={() => {
                setItem([terminal.utm_source, terminal.utm_term]);
                setSelectedStore(terminal);
              }}
              className="w-full group flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 
                hover:bg-white/10 hover:backdrop-blur-sm hover:border-white/10 hover:border
                focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              <svg
                className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-gray-300 group-hover:text-white transition-colors truncate">
                {terminal.location}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
