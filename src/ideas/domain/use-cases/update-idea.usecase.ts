import { Idea } from '../models';


export interface UpdateIdea {

  run(id: number, ideaLike: Object): Promise<Idea>;

}
