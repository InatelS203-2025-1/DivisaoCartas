import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import z from 'zod';
import User from '../models/User';
import PokeApiService from '../services/pokeApi/pokeApi';
import Card from '../models/Card';
import { requestHelper } from '../utils/requestHelpers';
import { IController } from '../interfaces/IController';

class UserController implements IController {

  async create(request: Request, response: Response): Promise<void> {
  const schema = z.object({
    name: z.string().min(1),
  });

  try {
    const { name } = schema.parse(request.body);

    const user = await User.create({ name });

    requestHelper(response, 201, {
      message: 'Usuário criado com sucesso',
      data: user,
    });
  } catch (error) {
    console.error(error);
    requestHelper(response, 500, {
      message: 'Erro ao criar usuário',
    });
  }
}

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
}

export default new UserController();