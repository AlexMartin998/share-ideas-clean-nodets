import { UnauthorizedError } from '@/auth/domain/errors';
import { User } from '@/auth/domain/models';
import { UserRepository } from '@/auth/domain/repositories';
import {
  HandleAuthToken,
  LoginDto,
  LoginUser,
  HandlePassword,
  UserToken,
} from '@/auth/domain/use-cases';
import { InvalidArgumentError } from '@/shared/domain';
import { JwtConstants } from '../constants';


export class UserLogin implements LoginUser {

  ///* DI
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authTokenHandler: HandleAuthToken,
    private readonly passwordHandler: HandlePassword
  ) {}


  async run(loginDto: LoginDto): Promise<UserToken> {
    const user: User = await this.userRepository.findOneByEmail(loginDto.email);
    const passwordsMatched = this.passwordHandler.compare(
      loginDto.password,
      user?.password ?? ''
    );

    if (!user || !passwordsMatched)
      throw new UnauthorizedError(
        'There was a problem logging in. Check your email and password or create an account.'
      );

    // TODO: create UseCase for this
    const token = await this.authTokenHandler.generateToken(
      { id: user.id },
      JwtConstants.duration
    );
    if (!token)
      throw new InvalidArgumentError('Something went wrong while creating JWT');

    return {
      token,
      user: user,
    };
  }

}
