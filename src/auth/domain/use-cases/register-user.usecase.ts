import { User } from "../models";


export interface UserToken {
  token: string;
  user: User
}


export interface RegisterUser {

  register(user: User): Promise<UserToken>;

}
