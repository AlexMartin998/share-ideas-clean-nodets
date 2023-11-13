import { IdeasDatasource } from '@/ideas/domain/datasources';
import { Idea } from '@/ideas/domain/models';
import { Nullable } from '@/shared/domain';
import { prisma } from '@/shared/insfrastructure/persistence/postgres';
import { IdeaMapper } from '../mappers';



export class PostgresIdeasDatasource implements IdeasDatasource {

  async findAll(): Promise<Idea[]> {
    const ideas = await prisma.idea.findMany();

    return ideas.map(IdeaMapper.entityToDomainModel);
  }

  async findOne(id: number): Promise<Nullable<Idea>> {
    const idea = await prisma.idea.findFirst({
      where: { id },
      include: { comments: true },
    });
    if (!idea) return null;

    return IdeaMapper.entityToDomainModel(idea);
  }

  async create(idea: Idea): Promise<Idea> {
    const newIdea = await prisma.idea.create({
      data: {
        description: idea.description,
        title: idea.title,
        userId: idea.userId,
      },
      include: { comments: true },
    });

    return IdeaMapper.entityToDomainModel(newIdea);
  }

  update(id: number, idea: Idea): Promise<Idea> {
    throw new Error('Method not implemented.');
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.idea.delete({ where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  }

}