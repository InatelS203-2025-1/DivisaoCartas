import pokeApi from "./axios";

export const getPokemon = async () => {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    const userPokemons = await pokeApi.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
    return userPokemons;
}
