import pokeApi from "./pokeApiInstance";

class PokeApiService {
  async sortUserPokemons() {
    const ids = new Set<number>();
    while (ids.size < 5) {
      ids.add(Math.floor(Math.random() * 1025) + 1);
    }
    const promises = [...ids].map(id =>
      pokeApi.get(`/pokemon/${id}`).then(() => id)
    );
    const results = await Promise.all(promises);
    return results;
  }

  //Sabrina
  async getPokemonNameById(id: number): Promise<string> {
    const response = await pokeApi.get(`/pokemon/${id}`);
    return response.data.name;
  }


}
export default new PokeApiService();