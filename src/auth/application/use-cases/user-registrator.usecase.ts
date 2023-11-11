import { JwtConstants } from '@/auth/application/constants';
import { UserAlreadyExistError } from '@/auth/domain/errors';
import { User } from '@/auth/domain/models';
import { UserRepository } from '@/auth/domain/repositories';
import {
  HandleAuthToken,
  RegisterUser,
  UserToken,
} from '@/auth/domain/use-cases';
import { InvalidArgumentError } from '@/shared/domain';


export class UserRegistrator implements RegisterUser {

  ///* DI
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authTokenHandler: HandleAuthToken
  ) {}


  async run(user: User): Promise<UserToken> {
    const userSaved = await this.userRepository.findOneByEmail(user.email);
    if (userSaved) throw new UserAlreadyExistError('Email already registered');

    const newUser: User = await this.userRepository.create(user);

    const token = await this.authTokenHandler.generateToken(
      { id: newUser.id },
      JwtConstants.duration
    );
    if (!token)
      throw new InvalidArgumentError('Something went wrong while creating JWT');

    return {
      token,
      user: newUser,
    };
  }

}
