export type ResponseData = {
  count: number;
  results: object;
};

export type Pokemon = {
  id: number;
  name: string;
  url: string;
  sprite: string;
};

export type Cart = Pokemon & {
  count: number;
  price: number;
};

export type Stats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type Types = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type Abilities = {
  slot: number;
  is_hidden: boolean;
  ability: {
    name: string;
    url: string;
  };
};

export type PokeDetails = Pokemon & {
  types: [];
  weight: number;
  height: number;
  abilities: [];
  price: number;
  base_experience: number;
  forms: [];
  game_indices: [];
  held_items: [];
  is_default: boolean;
  location_area_encounters: string;
  moves: [];
  order: number;
  past_types: Types[];
  species: {
    name: string;
    url: string;
  };
  stats: Stats[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  accessToken: string;
};

export type Store = {
  displayPokemons: Pokemon[];
  setDisplayPokemons: (displayPokemons: any) => void;

  totalNumberOfPokemons: number;
  setCurrentNumberOfPokemons: (totalNumberOfPokemons: number) => void;

  currentNumberOfPokemons: number;
  setTotalNumberOfPokemons: (currentNumberOfPokemons: number) => void;

  currentPage: number;
  setCurrentPage: (currentPage: number) => void;

  filterPokemons: Pokemon[];
  setFilterPokemons: (filterPokemons: Pokemon[]) => void;

  isAuthed: boolean;
  setIsAuthed: (isAuthed: boolean) => void;

  userData: User;
  setUserData: (userData: User) => void;

  cartItems: Cart[];
  updateCart: (cartItems: Cart[]) => void;
};
