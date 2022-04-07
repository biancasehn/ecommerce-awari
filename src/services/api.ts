import Axios from 'axios';

const api = Axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
});

const apiUrl = 'https://pokeapi.co/api/v2'

const sprite ='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home'

export {api, apiUrl, sprite};