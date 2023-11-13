import { Idea } from '@/ideas/domain/models';
import { IdeasRepository } from '@/ideas/domain/repositories';
import { FindIdea, UpdateIdea } from '@/ideas/domain/use-cases';

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
    await this.ideaFinder.run(id);

    const idea = new Idea(id, title, description, userId, []);

    return this.ideasRepository.update(id, idea);
  }

}
