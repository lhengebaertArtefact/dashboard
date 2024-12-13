"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface StoreBasicInfo {
  location: string;
  utm_source: string;
  utm_term: string;
}

interface SidebarProps {
  stores: StoreBasicInfo[];
  collectionsTickets: string[];
}

export function Sidebar({ stores, collectionsTickets }: SidebarProps) {
  const router = useRouter();
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );

  const handleCollectionClick = (collection: string) => {
    setSelectedCollection(collection);
    router.push(`/${collection}`);
  };

  return (
    <div className="relative w-80 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-white/10 overflow-y-auto max-h-screen">
      <div className="relative z-10 p-4">
        <nav className="mt-6 space-y-1">
          {stores?.map((store) => (
            <button
              key={`${store.utm_source}-${store.utm_term}`}
              onClick={() =>
                router.push(`/${store.utm_source}-${store.utm_term}`)
              }
              className="w-full group flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 
                hover:bg-white/10 hover:backdrop-blur-sm hover:border-white/10 hover:border
                focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              <span className="text-gray-300 group-hover:text-white transition-colors truncate">
                {store.location}
              </span>
            </button>
          ))}
        </nav>

        {/* Separator */}
        <div className="my-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-gray-400">Tickets</span>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {collectionsTickets.map((collection) => (
            <button
              key={collection}
              onClick={() => handleCollectionClick(collection)}
              className={`w-full group flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 
                hover:bg-white/10 hover:backdrop-blur-sm hover:border-white/10 hover:border
                focus:outline-none focus:ring-2 focus:ring-purple-500/20
                ${
                  selectedCollection === collection
                    ? "bg-white/10 border border-white/20"
                    : ""
                }`}
            >
              <span className="text-gray-300 group-hover:text-white transition-colors truncate">
                {collection}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
