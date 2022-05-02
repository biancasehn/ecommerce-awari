import createHook from "zustand";
import { Store } from "../types";

export const useStore = createHook<Store>((set) => ({
  displayPokemons: [],
  setDisplayPokemons: (displayPokemons) => set({ displayPokemons }),

  totalNumberOfPokemons: 0,
  setTotalNumberOfPokemons: (totalNumberOfPokemons) =>
    set({ totalNumberOfPokemons }),

  currentNumberOfPokemons: 0,
  setCurrentNumberOfPokemons: (currentNumberOfPokemons) =>
    set({ currentNumberOfPokemons }),

  currentPage: 0,
  setCurrentPage: (currentPage) => set({ currentPage }),

  filterPokemons: [],
  setFilterPokemons: (filterPokemons) => set({ filterPokemons }),

  isAuthed: false,
  setIsAuthed: (isAuthed) => set({ isAuthed }),

  userData: {
    id: "",
    name: "",
    email: "",
    accessToken: "",
  },
  setUserData: (userData) => set({ userData }),

  cartItems: [],
  updateCart: (cartItems) =>
    set(() => {
      localStorage.setItem("items", JSON.stringify(cartItems));
      return { cartItems };
    }),
}));
