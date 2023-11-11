import { User } from "../models";


export interface UserToken {
  token: string;
  user: User
}


export interface RegisterUser {

  run(user: User): Promise<UserToken>;

}
