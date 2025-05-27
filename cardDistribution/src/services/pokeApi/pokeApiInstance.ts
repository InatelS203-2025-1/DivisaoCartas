import axios from 'axios';
import env from '../../env';

const pokeApi = axios.create({
  baseURL: env.POKEAPI,
  timeout: 10000,
});

export default pokeApi;
