import { DeleteComment, FindComment } from '@/comments/domain/use-cases';
import { IdeasRepository } from '@/ideas/domain/repositories';
import { ResourceNotFoundError } from '@/shared/domain';


export class CommentDeleter implements DeleteComment {

  ///* DI
  constructor(
    private readonly ideasRepository: IdeasRepository,
    private readonly commentFinder: FindComment
  ) {}


  async run(id: number, userId: number): Promise<boolean> {
    const comment = await this.commentFinder.run(id);
    if (comment.userId !== userId)
      throw new ResourceNotFoundError(`Idea not found with ID: ${id}`);

    return this.ideasRepository.delete(id);
  }

}
