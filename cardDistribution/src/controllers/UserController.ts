import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import z from 'zod';
import User from '../models/User';
import PokeApiService from '../services/pokeApi/pokeApi';
import Card from '../models/Card';
import { requestHelper } from '../utils/requestHelpers';
import { IController } from '../interfaces/IController';

class UserController implements IController {
  async index(request: Request, response: Response): Promise<void> {
    try {
      const users = await User.findAll();
      requestHelper(response, 200, users);
    } catch (error) {
      console.error(error);
      requestHelper(response, 500, { message: 'Erro ao listar usuários' });
    }
  }

  async show(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    try {
      const user = await User.getUserById(id);
      if (!user) {
        requestHelper(response, 404, { message: 'Usuário não encontrado' });
        return;
      }
      requestHelper(response, 200, user);
    } catch (error) {
      console.error(error);
      requestHelper(response, 500, { message: 'Erro ao buscar usuário' });
    }
  }

  async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const schema = z.object({
      name: z.string().min(1),
    });

    try {
      const { name } = schema.parse(request.body);

      const user = await User.findById(id);
      if (!user) {
        requestHelper(response, 404, { message: 'Usuário não encontrado' });
        return;
      }

      await User.updateUserName(id, name);
      requestHelper(response, 200, { message: 'Usuário atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      requestHelper(response, 500, { message: 'Erro ao atualizar usuário' });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const user = await User.findById(id);
      if (!user) {
        requestHelper(response, 404, { message: 'Usuário não encontrado' });
        return;
      }

      await User.deleteUserById(id);
      requestHelper(response, 200, { message: 'Usuário deletado com sucesso' });
    } catch (error) {
      console.error(error);
      requestHelper(response, 500, { message: 'Erro ao deletar usuário' });
    }
  }

  //funções antigas

  static async createUser(request: Request, response: Response): Promise<void> {
    const createUserBodySchema = z.object({
      username: z.string(),
    });
    const { username } = createUserBodySchema.parse(request.body);
    const userId: string = uuidv4();

    try {
      // await checkUsernameValidity(username);
      const userPokemons = await PokeApiService.sortUserPokemons();
      const cards: Card[] = userPokemons.map((id) => ({ id, user_id: userId }));

      User.createUser({ id: userId, card: cards, name: username });

      const returnCards = cards.map((card) => card.id);

      requestHelper(response, 201, { username, cards: returnCards, userId });
    } catch (error) {
      console.error(error);
      response.status(500).json();
      requestHelper(response, 500, { message: 'Server error' });
    }
  }

  static async getUserCards(request: Request, response: Response): Promise<void> {
    const userId = request.params.id;

    try {
      // const user = await User.getUserById(userId);
      // console.log(cards);

      // if (!cards) {
      //   response.status(404).json({ message: 'Usuário não encontrado ou sem cartas.' });
      //   return;
      // }

      // requestHelper(response, 200, { userId, cards });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Erro ao buscar cartas do usuário.' });
    }
  }

  static async tradeCard(request: Request, response: Response): Promise<void> {
    const {
      user1Id, user2Id, card1Id, card2Id,
    } = request.body;

    try {
      const user1 = await User.getUserById(user1Id);
      const user2 = await User.getUserById(user2Id);

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
        user2: updatedUser2,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Erro no servidor' });
    }
  }
}
