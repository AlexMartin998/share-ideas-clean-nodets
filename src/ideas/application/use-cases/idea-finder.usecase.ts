import { Idea } from '@/ideas/domain/models';
import { IdeasRepository } from '@/ideas/domain/repositories';
import { FindIdea } from '@/ideas/domain/use-cases';
import { ResourceNotFoundError } from '@/shared/domain';


export class IdeaFinder implements FindIdea {

  ///* DI
  constructor(private readonly ideasRepository: IdeasRepository) {}


  async run(id: number): Promise<Idea> {
    const idea = await this.ideasRepository.findOne(id);
    if (!idea)
      throw new ResourceNotFoundError(`Idea does not found with ID : ${id}`);

    return idea;
  }

}
