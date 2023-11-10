import { User } from '../models/user';


export interface UserRepository {

  findAll(): Promise<User[]>;

  findOne(id: number): Promise<User>;

  findOneByEmail(email: String): Promise<User>;

  create(user: User): Promise<User>;

  update(id:number, user: User): Promise<User>;

  // TODO: change to UUID to allow changes to NoSQL DB
  delete(id: number): Promise<boolean>;

}
