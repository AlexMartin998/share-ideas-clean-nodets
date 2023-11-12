import { Idea } from '../models';


export interface CreateIdea {

  run(idea: Object): Promise<Idea>;

}
