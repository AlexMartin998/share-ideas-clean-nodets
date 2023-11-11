import { InvalidArgumentError } from '@/shared/domain';
import { UserToken } from './register-user.usecase';


export interface LoginUser {
  run(user: LoginDto): Promise<UserToken>;
}



export class LoginDto {

  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): LoginDto {
    const { email, password } = object;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email))
      throw new InvalidArgumentError('Invalid email');
    if (!password || password.length < 6)
      throw new InvalidArgumentError('Password has less than 6 characters');

    return new LoginDto(email, password);
  }

}
