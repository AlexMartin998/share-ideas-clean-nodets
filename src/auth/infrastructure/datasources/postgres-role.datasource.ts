import { RoleDatasource } from '@/auth/domain/datasources';
import { Role } from '@/auth/domain/models';
import { prisma } from '@/shared/insfrastructure/persistence/postgres';
import { RoleMapper } from '../mappers/role.mapper';
import { Nullable } from '@/shared/domain';


export class PostgresRoleDatasource implements RoleDatasource {

  async findByName(name: string): Promise<Nullable<Role>> {
    const role = await prisma.role.findFirst({
      where: {
        name,
      },
    });
    if (!role) return null as any;

    return RoleMapper.entityToDomainModel(role);
  }

}
