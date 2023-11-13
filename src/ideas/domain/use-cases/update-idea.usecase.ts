import { Idea } from '../models';


export interface UpdateIdea {

  run(id: number, ideaLike: object): Promise<Idea>;

}
