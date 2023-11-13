import { Nullable } from '@/shared/domain';
import { Comment } from '../models';


export interface CommentsRepository {

  findAll(): Promise<Comment[]>;

  findOne(id: number): Promise<Nullable<Comment>>;

  create(idea: Comment): Promise<Comment>;

  update(id: number, idea: Comment): Promise<Comment>;

  delete(id: number): Promise<boolean>;

}
