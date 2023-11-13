import { Role } from '@/auth/domain/models';
import { RoleRepository } from '@/auth/domain/repositories';
import { Nullable } from '@/shared/domain';
import { prisma } from '@/shared/insfrastructure/persistence/postgres';
import { RoleMapper } from '../mappers/role.mapper';


export class PostgresRolesRepository implements RoleRepository {

  async findByName(name: string): Promise<Nullable<Role>> {
    const role = await prisma.role.findFirst({ where: { name } });
    if (!role) return null;

    return RoleMapper.entityToDomainModel(role);
  }

}
