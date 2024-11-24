"use client";
import { Home, BarChart, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

interface SidebarProps {
  setPage: React.Dispatch<
    React.SetStateAction<[string, Record<string, any>[]]>
  >;
}

export const Sidebar: React.FC<SidebarProps> = ({ setPage }) => {
  const infosCards = [
    {
      terminal1: {
        card1:
          "Bonjour, voici les informations concernant le Terminal 1. Ceci est la première card",
        card2:
          "Bonjour, voici les informations concernant le Terminal 1. Ceci est la seconde card",
        card3:
          "Bonjour, voici les informations concernant le Terminal 1. Ceci est la troisième card",
        card4:
          "Bonjour, voici les informations concernant le Terminal 1. Ceci est la quatrième card",
      },
    },
    {
      terminal2: {
        card1:
          "Bonjour, voici les informations concernant le Terminal 2. Ceci est la première card",
        card2:
          "Bonjour, voici les informations concernant le Terminal 2. Ceci est la seconde card",
        card3:
          "Bonjour, voici les informations concernant le Terminal 2. Ceci est la troisième card",
        card4:
          "Bonjour, voici les informations concernant le Terminal 2. Ceci est la quatrième card",
      },
    },
    {
      terminal3: {
        card1:
          "Bonjour, voici les informations concernant le Terminal 3. Ceci est la première card",
        card2:
          "Bonjour, voici les informations concernant le Terminal 3. Ceci est la seconde card",
        card3:
          "Bonjour, voici les informations concernant le Terminal 3. Ceci est la troisième card",
        card4:
          "Bonjour, voici les informations concernant le Terminal 3. Ceci est la quatrième card",
      },
    },
    {
      terminal4: {
        card1:
          "Bonjour, voici les informations concernant le Terminal 4. Ceci est la première card",
        card2:
          "Bonjour, voici les informations concernant le Terminal 4. Ceci est la seconde card",
        card3:
          "Bonjour, voici les informations concernant le Terminal 4. Ceci est la troisième card",
        card4:
          "Bonjour, voici les informations concernant le Terminal 4. Ceci est la quatrième card",
      },
    },
  ];

  const handleSelect = (element: string) => {
    setPage([element, infosCards]);
  };

  const sidebarItems = [
    { name: "Terminal1", icon: Home },
    { name: "Terminal2", icon: Home },
    { name: "Terminal3", icon: Home },
    { name: "Terminal4", icon: Home },
  ];

  const stores = [
    { name: "store1", icon: Home },
    { name: "store2", icon: Home },
    { name: "Store3", icon: Home },
    { name: "Store4", icon: Home },
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-gray-100/40 dark:bg-gray-800/40">
      <div className="flex h-14 items-center border-b px-4">
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex-1 space-y-2 p-4">
          {sidebarItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                item.name === "Home" && "bg-gray-200 dark:bg-gray-700"
              )}
              onClick={() => handleSelect(item.name)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          ))}
          <div className="flex items-center border-b px-4" />
          {stores.map((element) => (
            <Button
              key={element.name}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                element.name === "Home" && "bg-gray-200 dark:bg-gray-700"
              )}
            >
              <element.icon className="mr-2 h-4 w-4" />
              {element.name}
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};
