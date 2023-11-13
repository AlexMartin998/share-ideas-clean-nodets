import { Comment } from '@/comments/domain/models';
import { CommentsRepository } from '@/comments/domain/repositories';
import { Nullable } from '@/shared/domain';
import { prisma } from '@/shared/insfrastructure/persistence/postgres';
import { CommentMapper } from '../mappers/comment.mapper';

export class PostgresCommentsRepository implements CommentsRepository {
  async findAll(): Promise<Comment[]> {
    const ideas = await prisma.comment.findMany();
    return ideas.map(CommentMapper.entityToDomainModel);
  }

  async findOne(id: number): Promise<Nullable<Comment>> {
    const comment = await prisma.comment.findFirst({
      where: { id },
    });
    if (!comment) return null;

    return CommentMapper.entityToDomainModel(comment);
  }

  async create(comment: Comment): Promise<Comment> {
    const newComment = await prisma.comment.create({
      data: comment,
    });

    return CommentMapper.entityToDomainModel(newComment);
  }

  async update(id: number, comment: Comment): Promise<Comment> {
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: comment,
    });

    return CommentMapper.entityToDomainModel(updatedComment);
  }

  async delete(id: number): Promise<boolean> {
    await prisma.comment.delete({ where: { id } });
    return true;
  }
}
