/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@/auth/domain/models';
import { UserRepository } from '@/auth/domain/repositories';
import { prisma } from '@/shared/insfrastructure/persistence/postgres';
import { UserMapper } from '../mappers';



export class PostgresUsersRepository implements UserRepository {

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users.map(UserMapper.entityToDomainModel);
  }

  async findOne(id: number): Promise<User> {
    const user = await prisma.user.findFirst({
      where: { id },
      include: { role: true },
    });
    if (!user) return null as any;

    return UserMapper.entityToDomainModel(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: { email },
      include: { role: true },
    });
    if (!user) return null as any;

    return UserMapper.entityToDomainModel(user);
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

    return UserMapper.entityToDomainModel(newUser);
  }

  async update(id: number, user: User): Promise<User> {
    const { role, ...rest } = user;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: rest,
      include: { comments: true },
    });

    return UserMapper.entityToDomainModel(updatedUser);
  }

  async delete(id: number): Promise<boolean> {
    await prisma.user.delete({ where: { id } });
    return true;
  }

}
