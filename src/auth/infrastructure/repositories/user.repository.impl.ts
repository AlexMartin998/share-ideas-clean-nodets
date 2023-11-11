import { UserDatasource } from "@/auth/domain/datasources";
import { User } from "@/auth/domain/models";
import { UserRepository } from "@/auth/domain/repositories";


export class UserRepositoryImpl implements UserRepository {

  ///* DI
  constructor(private readonly userDatasource: UserDatasource) {}


  findAll(): Promise<User[]> {
    return this.userDatasource.findAll();
  }

  findOne(id: number): Promise<User> {
    return this.userDatasource.findOne(id);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userDatasource.findOneByEmail(email);
  }

  create(user: User): Promise<User> {
    return this.userDatasource.create(user);
  }

  update(id: number, user: User): Promise<User> {
    return this.userDatasource.update(id, user);
  }

  delete(id: number): Promise<boolean> {
    return this.userDatasource.delete(id);
  }

}
