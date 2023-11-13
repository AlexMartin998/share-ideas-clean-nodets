import { Comment } from '../models';


export interface CreateComment {

  run(commentLike: unknown): Promise<Comment>;

}
