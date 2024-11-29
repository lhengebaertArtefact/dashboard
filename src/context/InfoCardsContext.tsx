"use client";
import React, { createContext, useContext } from "react";

interface RewardsInfo {
  terminal: string;
  award: { award: string };
}

interface RewardsContextType {
  rewards: RewardsInfo[];
  upgradeRewards: () => void;
}

const InfoCardsContext = createContext<RewardsContextType | null>(null);

export const useInfoCards = () => {
  const context = useContext(InfoCardsContext);
  if (!context) {
    throw new Error("useInfoCards must be used within InfoCardsProvider");
  }
  return context;
};

export const InfoCardsProvider = ({
  children,
  rewards,
  upgradeRewards,
}: {
  children: React.ReactNode;
  rewards: RewardsInfo[];
  upgradeRewards: () => void;
}) => {
  return (
    <InfoCardsContext.Provider value={{ rewards, upgradeRewards }}>
      {children}
    </InfoCardsContext.Provider>
  );
};
