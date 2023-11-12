import { Idea } from '../models';


export interface UpdateIdea {

  run(id: number, idea: Object): Promise<Idea>;

}
