import { User } from '@/auth/domain/models';
import { UserRepository } from '@/auth/domain/repositories';
import { FindUser } from '@/auth/domain/use-cases';
import { ResourceNotFoundError } from '@/shared/domain';


export class UserFinder implements FindUser {

  constructor(private readonly userRepository: UserRepository) {}

  async run(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new ResourceNotFoundError(`User not found with ID: ${id}`);

    return user;
  }

}
