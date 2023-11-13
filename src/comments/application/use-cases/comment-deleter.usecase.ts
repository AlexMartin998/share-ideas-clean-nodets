import { CommentsRepository } from '@/comments/domain/repositories';
import { DeleteComment, FindComment } from '@/comments/domain/use-cases';
import { ResourceNotFoundError } from '@/shared/domain';


export class CommentDeleter implements DeleteComment {

  ///* DI
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly commentFinder: FindComment,
  ) {}


  async run(id: number, userId: number): Promise<boolean> {
    const comment = await this.commentFinder.run(id);
    if (comment.userId !== userId)
      throw new ResourceNotFoundError(`Idea not found with ID: ${id}`);

    return this.commentsRepository.delete(id);
  }

}
