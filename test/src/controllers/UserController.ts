import User from "../models/User"
import UserRepository from "../repositories/UserRepository"

class UserController {
    async create({ id, username, }: User) {
        UserRepository.create()


    }

    

}

//Singleton Pattern
export default new UserController()