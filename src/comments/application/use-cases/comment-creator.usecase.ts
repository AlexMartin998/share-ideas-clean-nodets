import { Comment } from '@/comments/domain/models';
import { CommentsRepository } from '@/comments/domain/repositories';
import { CreateComment } from '@/comments/domain/use-cases';


type RunParams = {
  id: number;
  text: string;
  userId: number;
  ideaId: number;
};


export class CommentCreator implements CreateComment {

  ///* DI
  constructor(private readonly commentsRepository: CommentsRepository) {}


  async run(commentLike: RunParams): Promise<Comment> {
    ///* register DomainEvents
    const comment = Comment.create(commentLike);

    return this.commentsRepository.create(comment);
  }

}
