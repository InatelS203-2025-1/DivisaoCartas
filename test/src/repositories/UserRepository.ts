import IUserRepository from "../interfaces/IUserRepository";
import User from "../models/User";


class UserRepository implements IUserRepository  {
    async findAll() {}
    async findById(id) {}
    async deleteById(id) {}
    async create(user: User) {
        console.log('created');
    }
    async update({ id, username, cards }: User) {}
}

export default new UserRepository();