/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import z from 'zod';
import { requestHelper } from '../utils/requestHelpers';
import { IController } from '../interfaces/IController';
import UserRepository from '../repositories/UserRepository';
import PokeApiService from '../services/pokeApi/pokeApi';

class UserController implements IController {
  async create(request: Request, response: Response): Promise<void> {
    const schema = z.object({
      name: z.string().min(1),
    });

    try {
      const { name } = schema.parse(request.body);
      const userCards = await PokeApiService.sortUserPokemons();

      const user = await UserRepository.create({ name, card: userCards });

      requestHelper(response, 201, {
        message: 'Usuário criado com sucesso',
        data: user,
      });
    } catch (error) {
      requestHelper(response, 500, {
        message: 'Erro ao criar usuário',
      });
    }
  }

  async index(request: Request, response: Response): Promise<void> {
    try {
      const users = await UserRepository.findAll();
      requestHelper(response, 200, users);
    } catch (error) {
      requestHelper(response, 500, { message: 'Erro ao listar usuários' });
    }
  }

  async show(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    try {
      const userCards = await UserRepository.findCardsById(id);
      if (!userCards) {
        requestHelper(response, 404, { message: 'Usuário não possui cartas' });
        return;
      }
      requestHelper(response, 200, userCards);
    } catch (error) {
      requestHelper(response, 500, { message: 'Erro ao buscar usuário' });
    }
  }

  async update(request: Request, response: Response): Promise<void> {
    response.send(200);
  }

  async registerTrade(request: Request, response: Response) {
    const tradeSchema = z.object({
      user1Id: z.string().uuid(),
      user2Id: z.string().uuid(),
      card1Id: z.number(),
      card2Id: z.number(),
    });

    try {
      const {
        user1Id,
        user2Id,
        card1Id,
        card2Id,
      } = tradeSchema.parse(request.body);

      const user1 = await UserRepository.findById(user1Id);
      const user2 = await UserRepository.findById(user2Id);

      if (!user1 || !user2) {
        return requestHelper(response, 404, { message: 'Um ou ambos os usuários não foram encontrados' });
      }

      UserRepository.update(user1Id, card2Id, card1Id);
      UserRepository.update(user2Id, card1Id, card2Id);

      return requestHelper(response, 200, { message: 'Troca realizada com sucesso' });
    } catch (error) {
      return requestHelper(response, 500, { message: 'Erro ao realizar a troca' });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const user = await UserRepository.findById(id);
      if (!user) {
        requestHelper(response, 404, { message: 'Usuário não encontrado' });
        return;
      }

      await UserRepository.deleteById(id);
      requestHelper(response, 200, { message: 'Usuário deletado com sucesso' });
    } catch (error) {
      requestHelper(response, 500, { message: 'Erro ao deletar usuário' });
    }
  }
}

export default new UserController();
