import { AuthConstants, JwtConstants } from '@/auth/application/constants';
import { UserAlreadyExistError } from '@/auth/domain/errors';
import { User } from '@/auth/domain/models';
import { RoleRepository, UserRepository } from '@/auth/domain/repositories';
import {
  HandleAuthToken,
  HandlePassword,
  RegisterUser,
  UserToken,
} from '@/auth/domain/use-cases';
import { InvalidArgumentError, ResourceNotFoundError } from '@/shared/domain';


type RunParams = {
  id: number;
  username: string;
  email: string;
  password: string;
};


export class UserRegistrator implements RegisterUser {

  ///* DI
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly authTokenHandler: HandleAuthToken,
    private readonly passwordHandler: HandlePassword
  ) {}


  async run(params: RunParams): Promise<UserToken> {
    const role = await this.roleRepository.findByName(AuthConstants.USER_ROLE);
    if (!role)
      throw new ResourceNotFoundError(
        `Role not found with name ${AuthConstants.USER_ROLE}`
      );

    const userSaved = await this.userRepository.findOneByEmail(params.email);
    if (userSaved) throw new UserAlreadyExistError('Email already registered');

    params.password = this.passwordHandler.hash(params.password);


    ///* create user to egister DomainEvents
    const user = User.create({ ...params, role });
    const newUser: User = await this.userRepository.create(user);
    // usecase (app) is who actually Publish DomainEvents
      // await this.eventBus.publish(course.pullDomainEvents());


    // create usecase for this: 
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
