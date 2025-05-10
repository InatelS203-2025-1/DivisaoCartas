class User {
  async findById(userId: string) {
    return { username: 'Lilyan', cards: [], userId: userId }
  }
}


export default new User();