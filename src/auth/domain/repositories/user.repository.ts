import { Nullable } from '@/shared/domain';
import { User } from '../models/user';


export interface UserRepository {

  findAll(): Promise<User[]>;

  findOne(id: number): Promise<Nullable<User>>;

  findOneByEmail(email: string): Promise<Nullable<User>>;

  create(user: User): Promise<User>;

  update(id:number, user: User): Promise<User>;

  // TODO: change to UUID to allow changes to NoSQL DB
  delete(id: number): Promise<boolean>;

}
