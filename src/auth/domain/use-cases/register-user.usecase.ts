import { User } from "../models";


export interface UserToken {
  token: string;
  user: User
}


export interface RegisterUser {

  run(user: Object): Promise<UserToken>;

}
