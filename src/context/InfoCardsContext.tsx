"use client";
import React, { createContext, useContext } from "react";

// Typage de chaque terminal

interface TerminalInfo {
  terminal: {
    name: string;
    card1: string;
    card2: string;
    card3: string;
    card4: string;
  };
}

// Typage du contexte
interface InfoCardsContextType {
  infoCards: TerminalInfo[];
}

const InfoCardsContext = createContext<InfoCardsContextType | null>(null);

export const useInfoCards = () => {
  const context = useContext(InfoCardsContext);
  if (!context) {
    throw new Error("useInfoCards must be used within InfoCardsProvider");
  }
  return context;
};

export const InfoCardsProvider = ({
  children,
  infoCards,
}: {
  children: React.ReactNode;
  infoCards: TerminalInfo[];
}) => {
  return (
    <InfoCardsContext.Provider value={{ infoCards }}>
      {children}
    </InfoCardsContext.Provider>
  );
};
