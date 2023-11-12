import { Idea } from '../models';


export interface CreateIdea {

  run(ideaLike: Object): Promise<Idea>;

}
