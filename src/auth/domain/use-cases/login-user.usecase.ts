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

  static create(object: { [key: string]: any }): [string?, LoginDto?] {
    const { email, password } = object;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) throw new InvalidArgumentError('Missing email');
    if (!emailPattern.test(email))
      throw new InvalidArgumentError('Invalid email');
    if (!password) throw new InvalidArgumentError('Missing password');
    if (password.length < 6)
      throw new InvalidArgumentError('Password too short');

    return [undefined, new LoginDto(email, password)];
  }

}
