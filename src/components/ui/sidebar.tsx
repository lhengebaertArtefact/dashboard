"use client";
import { Home, BarChart, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

interface Store {
  _id: string;
  location: string;
  utm_source: string;
  utm_term: string;
}
interface SidebarProps {
  setItem: (newItem: string[] | ((prev: string[]) => string[])) => void;
  terminalName: Array<Store>;
}

export const Sidebar: React.FC<SidebarProps> = ({ setItem, terminalName }) => {
  // const [stores, setStores] = useState<{ _id: string; location: string }[]>([]);

  // useEffect(() => {
  //   const fetchStores = async () => {
  //     try {
  //       const response = await fetch("/api/get-stores");

  //       if (!response.ok) {
  //         throw new Error("Erreur lors de la récupération des terminaux.");
  //       }

  //       const data = await response.json();
  //       setStores(data.stores || []);
  //     } catch (error) {
  //       console.error("Erreur :", error);
  //     } finally {
  //     }
  //   };
  //   fetchStores();
  // }, []);

  const router = useRouter();
  const handleSelect = (terminal: string, source: string, term: string) => {
    setItem([source, term]); // Remplacer le tableau au lieu d'ajouter
    const terminalNameRefacto = terminal.replace(/\s+/g, "");
    router.push(`/${terminalNameRefacto}`);
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-gray-100/40 dark:bg-gray-800/40">
      <div className="flex h-14 items-center border-b px-4">
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex-1 space-y-2 p-4">
          {terminalName.map((item) => (
            <Button
              key={item._id}
              variant="ghost"
              className="w-full justify-start"
              onClick={() =>
                handleSelect(item.location, item.utm_source, item.utm_term)
              }
            >
              <Home className="mr-2 h-4 w-4" />
              {item.location}
            </Button>
          ))}

          <div className="flex items-center border-b px-4" />
        </nav>
      </ScrollArea>
    </div>
  );
};
