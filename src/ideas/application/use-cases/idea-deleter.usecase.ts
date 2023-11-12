import { IdeasRepository } from '@/ideas/domain/repositories';
import { DeleteIdea, FindIdea } from '@/ideas/domain/use-cases';


export class IdeaDeleter implements DeleteIdea {

  ///* DI
  constructor(
    private readonly ideasRepository: IdeasRepository,
    private readonly ideaFinder: FindIdea
  ) {}


  async run(id: number): Promise<boolean> {
    await this.ideaFinder.run(id);

    return this.ideasRepository.delete(id);
  }

}
