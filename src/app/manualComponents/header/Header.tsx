import React from "react";
import { Search, ChevronDown, Calendar, User } from "lucide-react";

export default function Header() {
  return (
    <header className="relative z-20 backdrop-blur-xl bg-slate-900/80 border-b border-white/10">
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Sweet Time Dashboard
          </span>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur group-hover:blur-md transition-all duration-300"></div>
            <div className="relative flex items-center backdrop-blur-xl bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full px-4 py-2 text-sm text-gray-300 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-500"
              />
              <div className="pr-4">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <span className="text-sm text-gray-300">Last 30 days</span>
          </div>

          <button className="p-2 rounded-xl hover:bg-white/5 transition-colors">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
