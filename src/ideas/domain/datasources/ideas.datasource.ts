import { Nullable } from '@/shared/domain';
import { Idea } from '../models';


export interface IdeasDatasource {

  findAll(): Promise<Idea[]>;

  findOne(id: number): Promise<Nullable<Idea>>;

  create(idea: Idea): Promise<Idea>;

  update(id: number, idea: Idea): Promise<Idea>;

  delete(id: number): Promise<boolean>;

}
