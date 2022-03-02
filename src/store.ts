import createHook from "zustand";
import { Pokemon } from "./types";

type store = {
    displayPokemons: Pokemon[],
    setDisplayPokemons: (displayPokemons: any) => void,

    totalNumberOfPokemons: number,
    setCurrentNumberOfPokemons: (totalNumberOfPokemons: any) => void,

    currentNumberOfPokemons: number,
    setTotalNumberOfPokemons: (currentNumberOfPokemons: any) => void,

    currentPage: number,
    setCurrentPage: (currentPage: any) => void,

    filterPokemons: Pokemon[],
    setFilterPokemons: (filterPokemons: any) => void,

    cartItems: Pokemon[],
    addItemToCart: (cartItems: any) => void,
    increaseItemCount:(cartItems: any) => void,
  }

export const useStore = createHook<store>((set) => ({
    displayPokemons: [],
    setDisplayPokemons: (displayPokemons) => set({ displayPokemons }),

    totalNumberOfPokemons: 0,
    setTotalNumberOfPokemons: (totalNumberOfPokemons) => set({ totalNumberOfPokemons }),

    currentNumberOfPokemons: 0,
    setCurrentNumberOfPokemons: (currentNumberOfPokemons) => set({ currentNumberOfPokemons }),

    currentPage: 0,
    setCurrentPage: (currentPage) => set({ currentPage }),

    filterPokemons: [],
    setFilterPokemons: (filterPokemons) => set({ filterPokemons }),

    cartItems: [],
    addItemToCart: (item) => set(state => ({ cartItems: [...state.cartItems, item] })),
    increaseItemCount: (cartItems) => set({ cartItems })
}));
