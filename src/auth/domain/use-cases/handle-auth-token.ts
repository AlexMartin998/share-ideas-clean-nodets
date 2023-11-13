import { Nullable } from '@/shared/domain';


export interface HandleAuthToken { // <T = null> Optional generic

  generateToken(payload: object, duration: string): Promise<Nullable<string>>;

  validateToken<T>(token: string): Promise<Nullable<T>>;

}
