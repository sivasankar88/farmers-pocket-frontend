import { create } from "zustand";
import { CropDetails } from "../type/types";

type DataState = {
  data: CropDetails;
  setData: (newData: CropDetails) => void;
};

export const useDataStore = create<DataState>((set) => ({
  data: {
    id: "",
    name: "",
    acres: 0,
    totalIncome: 0,
    totalExpense: 0,
    profit: 0,
    profitPerAcres: 0,
  },
  setData: (newData) => set({ data: newData }),
}));
