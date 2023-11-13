import { Comment } from '@/comments/domain/models';
import { CommentsRepository } from '@/comments/domain/repositories';
import { FindComments } from '@/comments/domain/use-cases';


export class CommentsFinder implements FindComments {

  ///* DI
  constructor(private readonly commentsRepository: CommentsRepository) {}

  run(): Promise<Comment[]> {
    return this.commentsRepository.findAll();
  }

}
