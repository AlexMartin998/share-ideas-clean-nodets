import { InvalidArgumentError } from '@/shared/domain/errors';
import { Role } from './role';

type UserProps = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: Role;
};


export class User {

  constructor(
    readonly id: number,
    readonly username: string,
    readonly email: string,
    readonly password: string,
    readonly role: Role
  ) {}


  static create({ id, username, email, password, role }: UserProps) {
    this.validate({ id, username, email, password, role });

    const user = new User(id, username, email, password, role);

    ///* Domain Event

    return user;
  }


  private static validate({
    id,
    username,
    email,
    password,
    role,
  }: UserProps) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (id) {
      // throw new InvalidArgumentError('ID is required')
    }
    if (username.length < 3)
      throw new InvalidArgumentError('Username has less than 3 characters ');
    if (!emailPattern.test(email))
      throw new InvalidArgumentError('Invalid email');
    if (password.length < 6)
      throw new InvalidArgumentError('Password has less than 6 characters');
    if (!role.name) throw new InvalidArgumentError('Role is required');
  }

}
