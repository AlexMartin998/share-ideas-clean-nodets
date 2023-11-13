import { User } from '../models';


export interface FindUser {

  run(id: number): Promise<User>;

}
