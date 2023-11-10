import { User } from '@/auth/domain/models';
import { UserResponseDto } from '../dtos';


export class UserMapper {

  public static entityToDomainModel(object: { [key: string]: any }): User {
    const { id, username, email, password, role } = object;

    return new User(id, username, email, password, role);
  }

  public static domainModelToResponseDto(user: User) {
    return UserResponseDto.create(user);
  }

  public static createUserDtoToDomainModel(object: {
    [key: string]: any;
  }): User {
    const { id, username, email, password, role } = object;

    return User.create({ id, username, email, password, role });
  }

}
