import { Idea } from '../models';


export interface FindAllIdeas {
  
  run(): Promise<Idea[]>

}