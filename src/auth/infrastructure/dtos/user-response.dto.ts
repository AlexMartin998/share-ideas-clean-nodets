import { Role } from '@/auth/domain/models';


export class UserResponseDto {

  private constructor(
    public id: string,
    public username: string,
    public email: string,
    public role: Role
  ) {}


  static create(object: { [key: string]: any }): UserResponseDto {
    const { id, username, email, role } = object;

    return new UserResponseDto(id, username, email, role);
  }

}
