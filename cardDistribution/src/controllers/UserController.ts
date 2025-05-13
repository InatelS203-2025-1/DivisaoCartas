import { Request, Response } from "express";
import User from "../models/User";
import { v4 as uuidv4 } from 'uuid'
import PokeApiService from '../services/pokeApi'
import Card from "../models/Card";
import { requestHelper } from "../utils/requestHelpers";

class UserController {

  async createUser(request: Request, response: Response): Promise<void> {
    const userId: string = uuidv4();
    const { username }: { username: string } = request.body;

    try {
      const userPokemons = await PokeApiService.sortUserPokemons();
      const cards: Card[] = userPokemons.map(id => ({ id, user_id: userId }));

      User.createUser({ id: userId, card: cards, name: username });

      requestHelper(response, 201, { username, cards })
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Server error' });
    }
  }

  //sabrina
  async distributePokemons(request: Request, response: Response): Promise<void> {
    const userId: string = request.params.id;

    try {
      // Verifica se o usuário existe
      const user = User.findById(userId);
      if (!user) {
        response.status(404).json({ message: 'Jogador não encontrado' });
        return;
      }

      // Pega os IDs dos pokémons sorteados
      const pokemonIds = await PokeApiService.sortUserPokemons();

      // Insere as cartas no banco de dados (relacionamento entre pokémons e usuário)
      //const insert = db.prepare('INSERT INTO cards (id, user_id) VALUES (?, ?)');
      //for (const pokeId of pokemonIds) {
      //insert.run(pokeId, userId);
      //}

      // Busca os detalhes dos pokémons usando o ID
      const pokemons = await Promise.all(
        pokemonIds.map(async id => ({
          id,
          nome: await PokeApiService.getPokemonNameById(id)
        }))
      );

      // Retorna os pokémons distribuídos para o usuário
      response.status(200).json({
        id: user.id,
        nome: user.name,
        pokemons
      });

    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Erro no servidor' });
    }
  }

}

export default new UserController();