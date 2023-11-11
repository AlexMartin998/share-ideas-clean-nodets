import { User } from '@/auth/domain/models';
import { UserResponseDto } from '../dtos';


export class UserMapper {

  // // would manages the domain event registration
  // public static entityToDomain(object: { [key: string]: any }): User {
  //   const { id, username, email, password, role } = object;

  //   return User.create({ id, username, email, password, role });
  // }
  

  public static entityToDomainModel(object: { [key: string]: any }): User {
    const { id, username, email, password, role } = object;

    return new User(id, username, email, password, role);
  }
  
  public static createUserDtoToDomainModel(object: {
    [key: string]: any;
  }): User {
    const { id, username, email, password, role } = object;

    return new User(id, username, email, password, role);
  }

  public static domainModelToResponseDto(object: {
    [key: string]: any;
  }): UserResponseDto {
    const { user, token } = object;

    return UserResponseDto.create({ user, token });
  }

}
