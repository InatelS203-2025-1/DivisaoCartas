import axios from "axios";

const pokeApi = axios.create({
    baseURL: process.env.POKEAPI,
    timeout: 10000
});

export default pokeApi;
