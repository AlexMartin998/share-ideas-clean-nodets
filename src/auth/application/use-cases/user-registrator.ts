import { User } from '@/auth/domain/models';
import { UserRepository } from '@/auth/domain/repositories';
import { RegisterUser } from '@/auth/domain/use-cases';


export class UserRegistrator implements RegisterUser {

  ///* DI
  constructor(private readonly userRepository: UserRepository) {}

  register(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

}
