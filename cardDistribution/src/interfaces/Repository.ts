export interface Repository<T, ID> {
  create(entity: T): T;
  findById(id: ID): T;
  findAll(): T[];
}
