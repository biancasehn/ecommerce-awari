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
    price: number,
}

export type Store = {
    displayPokemons: Pokemon[],
    setDisplayPokemons: (displayPokemons: any) => void,

    totalNumberOfPokemons: number,
    setCurrentNumberOfPokemons: (totalNumberOfPokemons: number) => void,

    currentNumberOfPokemons: number,
    setTotalNumberOfPokemons: (currentNumberOfPokemons: number) => void,

    currentPage: number,
    setCurrentPage: (currentPage: number) => void,

    filterPokemons: Pokemon[],
    setFilterPokemons: (filterPokemons: Pokemon[]) => void,

    cartItems: Cart[],
    addItemToCart:(cartItems: Cart[]) => void,
    removeFromCart: (cartItems: Cart[]) => void,
    updateCartItems: (cartItems: Cart[]) => void,
}