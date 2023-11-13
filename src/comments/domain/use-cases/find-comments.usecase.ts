import { Comment } from '../models';


export interface FindComments {

  run(): Promise<Comment[]>;

}
