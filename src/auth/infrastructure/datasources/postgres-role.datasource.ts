import { RoleDatasource } from '@/auth/domain/datasources';
import { Role } from '@/auth/domain/models';
import { Nullable } from '@/shared/domain';
import { prisma } from '@/shared/insfrastructure/persistence/postgres';
import { RoleMapper } from '../mappers/role.mapper';


export class PostgresRoleDatasource implements RoleDatasource {

  async findByName(name: string): Promise<Nullable<Role>> {
    const role = await prisma.role.findFirst({ where: { name } });
    if (!role) return null;

    return RoleMapper.entityToDomainModel(role);
  }

}
