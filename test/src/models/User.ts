import Card from './Card';
import UserRepository from '../repositories/UserRepository';

export default class User {
    id: string;
    username: string;
    cards: Card[];
    UserRepository: typeof UserRepository;
    constructor(username: User['username'], id: User['id']) {
        this.id = id;
        this.username = username;
        this.cards = [];
        this.UserRepository = UserRepository;
    };
}