import createHook from "zustand";
import { Pokemon } from "./types";

type store = {
    displayPokemons: Pokemon[],
    setDisplayPokemons: (displayPokemons: any) => void,

    numberOfPokemons: number,
    setnumberOfPokemons: (numberOfPokemons: any) => void,

    currentPage: number,
    setCurrentPage: (numberOfPokemons: any) => void,

    filterPokemons: Pokemon[],
    setFilterPokemons: (displayPokemons: any) => void,
  }

export const useStore = createHook<store>((set) => ({
    displayPokemons: [],
    setDisplayPokemons: (displayPokemons) => set({ displayPokemons }),

    numberOfPokemons: 0,
    setnumberOfPokemons: (numberOfPokemons) => set({ numberOfPokemons }),

    currentPage: 0,
    setCurrentPage: (currentPage) => set({ currentPage }),

    filterPokemons: [],
    setFilterPokemons: (filterPokemons) => set({ filterPokemons })
}));
