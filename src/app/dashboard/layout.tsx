"use client";
import { Sidebar } from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import { useState } from "react";
import { InfoCardsProvider } from "@/context/InfoCardsContext";
import { Store } from "@/models/store.model";

interface Store {
  _id: string;
  location: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [item, setItem] = useState<string>();

  const infosCards = [
    {
      terminal: {
        name: "Terminal 1",
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
      terminal: {
        name: "Terminal 2",
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
      terminal: {
        name: "Terminal 3",
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
      terminal: {
        name: "Terminal 4",
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

  const terminalNames = infosCards.map((item) => item.terminal.name);
  const [stores, setStores] = useState<Store[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch("/api/get-stores");
        if (!response.ok) {
          throw new Error("error comes when tried to catch stores");
        }
        const data = await response.json();
        setStores(data.stores || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStores();
  }, []);

  console.log(stores);

  if (isLoading) {
    <div>...chargement en cours</div>;
  }

  if (error) {
    <div>Erreur : {error}</div>;
  }

  return (
    <InfoCardsProvider rewards={infosCards}>
      <div className="flex h-screen">
        <Sidebar setPage={setItem} terminalName={stores} />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </InfoCardsProvider>
  );
}
