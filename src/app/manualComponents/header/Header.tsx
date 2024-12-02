import React from "react";
import { Search, ChevronDown, Calendar, User } from "lucide-react";

const header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-gray-100 p-2 rounded-md">
          <Search className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 outline-none bg-transparent"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-gray-700 hover:text-blue-600">
            <span className="mr-1 text-lg font-bold">Last 30 days</span>
          </button>
          <button className="text-gray-700 hover:text-blue-600">
            <Calendar className="h-5 w-5" />
          </button>
          <button className="flex items-center text-gray-700 hover:text-blue-600">
            <User className="h-5 w-5" />
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default header;
