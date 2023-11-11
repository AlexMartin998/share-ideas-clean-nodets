import { JwtConstants } from '@/auth/domain/constants';
import { User } from '@/auth/domain/models';
import { UserRepository } from '@/auth/domain/repositories';
import {
  HandleAuthToken,
  RegisterUser,
  UserToken,
} from '@/auth/domain/use-cases';


export class UserRegistrator implements RegisterUser {

  ///* DI
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authTokenHandler: HandleAuthToken
  ) {}

  async register(user: User): Promise<UserToken> {
    const userEntity = await this.userRepository.create(user);

    const token = await this.authTokenHandler.generateToken(
      { id: user.id },
      JwtConstants.duration
    );
    if (!token) throw new Error('Something went wrong while creating JWT');

    return {
      token,
      user: userEntity,
    };
  }

}
