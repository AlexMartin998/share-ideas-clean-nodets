import { Idea } from '@/ideas/domain/models';
import { IdeasRepository } from '@/ideas/domain/repositories';
import { FindAllIdeas } from '@/ideas/domain/use-cases';


export class IdeasFinder implements FindAllIdeas {

  ///* DI
  constructor(private readonly ideasRepository: IdeasRepository) {}


  run(): Promise<Idea[]> {
    return this.ideasRepository.findAll();
  }

}
