import { Role } from '@/auth/domain/models';


export class RoleMapper {

  public static entityToDomainModel(object: { [key: string]: any }): Role {
    const { id, name } = object;

    return new Role(id, name);
  }

}
