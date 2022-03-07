export type Pokemon = {
    name: string,
    url: string,
    count: number,
}

export type ResponseData = {
    count: number,
    next: string,
    previous: null | string,
    results: object,
}