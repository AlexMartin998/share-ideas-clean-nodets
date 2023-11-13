import { IdeasDatasource } from '@/ideas/domain/datasources';
import { Idea } from '@/ideas/domain/models';
import { IdeasRepository } from '@/ideas/domain/repositories';
import { Nullable } from '@/shared/domain';



export class IdeasRepositoryImpl implements IdeasRepository {

  ///* DI
  constructor(private readonly ideasDatasource: IdeasDatasource) {}


  findAll(): Promise<Idea[]> {
    return this.ideasDatasource.findAll();
  }

  findOne(id: number): Promise<Nullable<Idea>> {
    return this.ideasDatasource.findOne(id);
  }

  create(idea: Idea): Promise<Idea> {
    return this.ideasDatasource.create(idea);
  }

  update(id: number, idea: Idea): Promise<Idea> {
    return this.ideasDatasource.update(id, idea);
  }

  delete(id: number): Promise<boolean> {
    return this.ideasDatasource.delete(id);
  }

}
