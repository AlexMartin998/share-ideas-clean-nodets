import { IdeasRepository } from '@/ideas/domain/repositories';
import { DeleteIdea, FindIdea } from '@/ideas/domain/use-cases';
import { ResourceNotFoundError } from '@/shared/domain';


export class IdeaDeleter implements DeleteIdea {

  ///* DI
  constructor(
    private readonly ideasRepository: IdeasRepository,
    private readonly ideaFinder: FindIdea
  ) {}


  async run(id: number, userId: number): Promise<boolean> {
    const idea = await this.ideaFinder.run(id);
    if (idea.userId !== userId) throw new ResourceNotFoundError(`Idea not found with ID: ${id}`)

    return this.ideasRepository.delete(id);
  }

}
