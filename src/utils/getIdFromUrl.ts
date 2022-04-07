export const getIdFromUrl = (url: string): number => {
    return parseInt(url.replace("https://pokeapi.co/api/v2/pokemon/", "")
    .replace("/", ""))
} 