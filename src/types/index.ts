export type ResponseData = {
    count: number,
    results: object,
}

export type Pokemon = {
    id: number,
    name: string,
    url: string,
    sprite: string,
}

export type Cart = Pokemon & {
    count: number,
    price: number,
}

export type PokeDetails = Pokemon & {
    types: [],
    weight: number,
    height: number,
    abilities: [],
}

export type Store = {
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

    cartItems: Cart[],
    addItemToCart: (cartItems: any) => void,
    updateItemCount:(cartItems: any) => void,
  }