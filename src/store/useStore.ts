import { Store } from "@/models/store.model";
import mongoose from "mongoose";
import { create } from "zustand";

export type StoreDocument = {
  _id: string;
  utm_source: string;
  utm_term: string;
  location: string;
  config: Array<{
    min: Number;
    max: Number;
    gift: String;
    nb_gift_projected: Number;
    nb_gift_max: Number;
    nb_gift_find: Number;
    next: Number;
  }>;
  users: mongoose.Types.ObjectId[];
} & mongoose.Document;

interface StoreState {
  item: string[];
  selectedStore: StoreDocument | null;
  setItem: (newItem: string[]) => void;
  setSelectedStore: (store: StoreDocument) => void;
}

export const useStore = create<StoreState>((set) => ({
  item: [],
  selectedStore: null,
  setItem: (newItem) => set({ item: newItem }),
  setSelectedStore: (store) => set({ selectedStore: store }),
}));
