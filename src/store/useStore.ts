import { create } from "zustand";

interface StoreState {
  item: string[];
  setItem: (newItem: string[] | ((prev: string[]) => string[])) => void;
}

const useStore = create<StoreState>((set) => ({
  item: [],
  setItem: (newItem) =>
    set((state) => ({
      item: typeof newItem === "function" ? newItem(state.item) : newItem,
    })),
}));

export default useStore;
