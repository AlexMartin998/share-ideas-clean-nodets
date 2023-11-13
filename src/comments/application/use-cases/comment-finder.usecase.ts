import { Comment } from '@/comments/domain/models';
import { CommentsRepository } from '@/comments/domain/repositories';
import { FindComment } from '@/comments/domain/use-cases';
import { ResourceNotFoundError } from '@/shared/domain';


export class CommentFinder implements FindComment {

  ///* DI
  constructor(private readonly commentsRepository: CommentsRepository) {}


  async run(id: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOne(id);
    if (!comment)
      throw new ResourceNotFoundError(`Idea not found with ID: : ${id}`);

    return comment;
  }

}

