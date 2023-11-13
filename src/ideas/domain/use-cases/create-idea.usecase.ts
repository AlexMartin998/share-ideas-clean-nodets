import { Idea } from '../models';


export interface CreateIdea {

  run(ideaLike: object): Promise<Idea>;

}
