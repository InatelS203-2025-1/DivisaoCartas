import { UserModel } from "../interfaces/UserModel";
export default class Card {
  constructor(public readonly id: number, public readonly user_id: UserModel['id']) {}
}