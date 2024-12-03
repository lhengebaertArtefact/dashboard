export interface Reward {
  type: string;
  count: number;
}

export interface Store {
  name: string;
  rewards: Reward[];
}

export interface TerminalStats {
  terminalId: string;
  storeSource: string;
  totalTickets: number;
  foundTickets: number;
  totalParticipants: number;
  stores: Store[];
}
