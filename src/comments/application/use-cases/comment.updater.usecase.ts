import { Comment } from '@/comments/domain/models';
import { CommentsRepository } from '@/comments/domain/repositories';
import { FindComment, UpdateComment } from '@/comments/domain/use-cases';
import { ResourceNotFoundError } from '@/shared/domain';


type RunParams = {
  text: string;
  userId: number;
  ideaId: number;
};


export class CommentUpdater implements UpdateComment {

  ///* DI
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly commentFinder: FindComment
  ) {}


  async run(id: number, { text, userId, ideaId }: RunParams): Promise<Comment> {
    const comment = await this.commentFinder.run(id);
    if (comment.userId !== userId)
      throw new ResourceNotFoundError(`Idea not found with ID: ${id}`);

    const newComment = new Comment(id, text, userId, ideaId);

    return this.commentsRepository.update(id, newComment);
  }

}
