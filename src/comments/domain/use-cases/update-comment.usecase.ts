import { Comment } from '../models';


export interface UpdateComment {

  run(id: number, commentLike: object): Promise<Comment>;

}
