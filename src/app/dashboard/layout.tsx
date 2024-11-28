"use client";
import { Sidebar } from "@/components/ui/sidebar";
import { useState } from "react";

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
  return (
    <div className="flex h-screen">
      <Sidebar setPage={setItem} terminalName={terminalNames} />

      <main className="flex-1 overflow-y-auto p-6 bg-gray-100">{children}</main>
    </div>
  );
}
