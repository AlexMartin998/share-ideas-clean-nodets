import { InvalidArgumentError } from "@/users/domain/errors";

type UserProps = {
  id: number;
  username: string;
  email: string;
  password: string;
};


export class User {

  constructor(
    readonly id: number,
    readonly username: string,
    readonly email: string,
    readonly password: string
  ) {}


  static create({ id, username, email, password }: UserProps) {
    this.validateDomainProperties({ id, username, email, password });

    const user = new User(id, username, email, password);

    ///* Domain Event

    return user;
  }


  private static validateDomainProperties({
    id,
    username,
    email,
    password,
  }: UserProps) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!id) throw new InvalidArgumentError('Id is required');
    if (username.length < 3)
      throw new InvalidArgumentError('Username has less than 3 characters ');
    if (!emailPattern.test(email))
      throw new InvalidArgumentError('Invalid email');
    if (password.length < 12)
      throw new InvalidArgumentError('Password has less than 12 characters');
  }

}
