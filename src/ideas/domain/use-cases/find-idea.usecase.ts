import { Idea } from '../models';


export interface FindIdea {

  run(id: number): Promise<Idea>;

}
