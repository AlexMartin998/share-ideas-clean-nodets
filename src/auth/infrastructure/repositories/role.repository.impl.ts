import { RoleDatasource } from '@/auth/domain/datasources';
import { Role } from '@/auth/domain/models';
import { RoleRepository } from '@/auth/domain/repositories';
import { Nullable } from '@/shared/domain';


export class RoleRepositoryImpl implements RoleRepository {

  ///* DI
  constructor(private readonly roleDatasource: RoleDatasource) {}


  async findByName(name: string): Promise<Nullable<Role>> {
    return this.roleDatasource.findByName(name);
  }

}
