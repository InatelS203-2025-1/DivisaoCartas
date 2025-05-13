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


  //Leticia
  async tradeCard(request: Request, response: Response): Promise<void> {
    const { user1Id, user2Id, card1Id, card2Id } = request.body;

    try {
      const user1 = User.getUserById(user1Id);
      const user2 = User.getUserById(user2Id);

      if (!user1 || !user2) {
        requestHelper(response, 404, { message: 'Usuário não encontrado' });
        return;
      }

      const card1 = user1.card.find((c: Card) => c.id === card1Id);
      const card2 = user2.card.find((c: Card) => c.id === card2Id);

      if (!card1 || !card2) {
        requestHelper(response, 404, { message: 'Carta não encontrada' });
        return;
      }

      User.updateUserCards(card1Id, user2Id);
      User.updateUserCards(card2Id, user1Id);

      const updatedUser1 = User.getUserById(user1Id);
      const updatedUser2 = User.getUserById(user2Id);

      requestHelper(response, 200, {
        message: 'Troca realizada com sucesso',
        user1: updatedUser1,
        user2: updatedUser2
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Erro no servidor' });
    }
  }
}

export default new UserController();