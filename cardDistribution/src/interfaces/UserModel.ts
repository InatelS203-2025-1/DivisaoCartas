import Card from '../models/Card';

export interface UserModel {
  id: string;
  name: string;
  card: Card[];
}
