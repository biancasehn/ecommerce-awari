export const getIdFromUrl = (url: string): string => {
    console.log(url)
    return url.replace("https://pokeapi.co/api/v2/pokemon/", "")
    .replace("/", "")
} 