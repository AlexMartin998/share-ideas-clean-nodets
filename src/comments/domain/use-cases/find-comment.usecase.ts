import { Comment } from '../models';


export interface FindComment {

  run(id: number): Promise<Comment>;

}
