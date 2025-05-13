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

  //lilyan

  async getUserCards(request: Request, response: Response): Promise<void> {
  const userId = request.params.id;

  try {
    const cards = await User.getUserCards(userId);

    if (!cards) {
      response.status(404).json({ message: 'Usuário não encontrado ou sem cartas.' });
      return;
    }

    response.status(200).json({ userId, cards });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Erro ao buscar cartas do usuário.' });
  }
}

}

export default new UserController();