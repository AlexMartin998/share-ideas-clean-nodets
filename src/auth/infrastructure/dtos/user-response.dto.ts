import { User } from '@/auth/domain/models';


export class UserResponseDto {

  private constructor(
    public user: User,
    public token: String
  ) {}


  static create(object: { [key: string]: any }): UserResponseDto {
    const { user, token } = object;
    delete user.password;

    return new UserResponseDto(user, token);
  }

}
