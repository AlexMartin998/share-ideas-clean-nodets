import { Idea } from '../models';


export interface FindIdea {

  run(): Promise<Idea>;

}
