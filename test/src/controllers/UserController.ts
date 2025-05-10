import { getPokemon } from "../services/getPokemon";
import { Request, Response } from "express";
import User from "../models/User";

class UserController {

    async getUserInfo(request: Request, response: Response) {
      const userId = request.params.id;

      try {
        const user = await User.findById(userId);
        if(user) {
          console.log(user);
          response.send(user);
        }
        response.status(404)


      } catch (error) {
        console.log(error);
      }
    }
  }


//     async getCards(request: Express.Request, response: Express.Response) {
//       const id = request.id;
//       try {
//         const user = User.findById(id);
//         if(user) {
//           response.send(user.cards);
//         }
        
//       } catch (error) {
//         console.log(error);
//       }
//       // chamar a model de User para pegar as cartas dele
//       //retorna os dados para quem pediu
//     }
// }

//Singleton Pattern
export default new UserController()