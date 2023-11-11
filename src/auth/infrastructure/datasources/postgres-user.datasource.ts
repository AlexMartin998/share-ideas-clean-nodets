import { UserDatasource } from '@/auth/domain/datasources';
import { User } from '@/auth/domain/models';
import { prisma } from '@/shared/insfrastructure/persistence/postgres';
import { UserMapper } from '../mappers';


export class PostgresUserDatasource implements UserDatasource {

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users.map(UserMapper.entityToDomainModel);
  }

  findOne(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findOneByEmail(email: String): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async create(user: User): Promise<User> {
    const { role, ...rest } = user;

    const newUser = await prisma.user.create({
      data: {
        ...rest,
        roleId: role.id,
      },
      include: {
        role: true,
      },
    });

    return UserMapper.entityToDomain(newUser);
  }

  update(id: number, user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}
