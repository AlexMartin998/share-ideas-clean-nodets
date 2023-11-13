import { Nullable } from '@/shared/domain';
import { Comment } from '../models';


export interface CommentsRepository {

  findAll(): Promise<Comment[]>;

  findOne(id: number): Promise<Nullable<Comment>>;

  create(comment: Comment): Promise<Comment>;

  update(id: number, comment: Comment): Promise<Comment>;

  delete(id: number): Promise<boolean>;

}
