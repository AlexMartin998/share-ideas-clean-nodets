import { Idea } from '@/ideas/domain/models';
import { IdeasRepository } from '@/ideas/domain/repositories';
import { FindIdea, UpdateIdea } from '@/ideas/domain/use-cases';
import { ResourceNotFoundError } from '@/shared/domain';

type RunParams = {
  title: string;
  description: string;
  userId: number;
};


export class IdeaUpdater implements UpdateIdea {

  ///* DI
  constructor(
    private readonly ideasRepository: IdeasRepository,
    private readonly ideaFinder: FindIdea
  ) {}


  async run(
    id: number,
    { title, description, userId }: RunParams
  ): Promise<Idea> {
    const idea = await this.ideaFinder.run(id);
    if (idea.userId !== userId) throw new ResourceNotFoundError(`Idea not found with ID: ${id}`);

    const newIdea = new Idea(id, title, description, userId, []);

    return this.ideasRepository.update(id, newIdea);
  }

}
