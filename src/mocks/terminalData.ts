import { TerminalStats } from "@/types/terminal";

export const mockTerminalStats: TerminalStats = {
  terminalId: "terminal1",
  storeSource: "Relay",
  totalTickets: 2000,
  foundTickets: 1234,
  totalParticipants: 5678,
  stores: [
    {
      name: "Relay",
      rewards: [
        { type: "-5%", count: 150 },
        { type: "-15%", count: 75 },
        { type: "Livre gratuit", count: 25 },
      ],
    },
    {
      name: "EDFP",
      rewards: [
        { type: "-5%", count: 200 },
        { type: "-10%", count: 100 },
        { type: "Café gratuit", count: 50 },
      ],
    },
    {
      name: "Duty Free",
      rewards: [
        { type: "-15%", count: 120 },
        { type: "Échantillon", count: 80 },
      ],
    },
  ],
};

export const mockAllTerminals: Record<string, TerminalStats> = {
  terminal1: {
    terminalId: "terminal1",
    storeSource: "Relay",
    totalTickets: 2000,
    foundTickets: 1234,
    totalParticipants: 5678,
    stores: [
      {
        name: "Relay",
        rewards: [
          { type: "-15%", count: 450 },
          { type: "-5%", count: 320 },
          { type: "Sucette", count: 280 },
        ],
      },
    ],
  },
  terminal2: {
    terminalId: "terminal2",
    storeSource: "Relay",
    totalTickets: 3000,
    foundTickets: 2345,
    totalParticipants: 6789,
    stores: [
      {
        name: "EDFP",
        rewards: [
          { type: "-15%", count: 560 },
          { type: "-5%", count: 430 },
          { type: "Café", count: 295 },
        ],
      },
    ],
  },
};
