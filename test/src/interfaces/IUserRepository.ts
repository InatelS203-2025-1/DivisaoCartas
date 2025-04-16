import User from "../models/User";

export default interface IUserRepository {
  addUser(user: User): void;
  findById(id: string): User | undefined;
  findAll(): User[]
  getAll(): User[];
  removeUser(id: string): void;
}