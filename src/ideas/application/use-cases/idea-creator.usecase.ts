import { Comment } from '@/comments/domain/models';
import { Idea } from '@/ideas/domain/models';
import { IdeasRepository } from '@/ideas/domain/repositories';
import { CreateIdea } from '@/ideas/domain/use-cases';


type RunParams = {
  id: number;
  title: string;
  description: string;
  userId: number;
  comments: Comment[];
};


export class IdeaCreator implements CreateIdea {

  ///* DI
  constructor(private readonly ideasRepository: IdeasRepository) {}


  run(ideaLike: RunParams): Promise<Idea> {
    ///* register DomainEvents
    const idea = Idea.create(ideaLike);

    return this.ideasRepository.create(idea);
  }

}
