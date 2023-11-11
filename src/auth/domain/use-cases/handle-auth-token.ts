import { Nullable } from '@/shared/domain';


export interface HandleAuthToken<T = void> { // optional generic

  generateToken(payload: Object, duration: string): Promise<Nullable<string>>;

  validateToken<T>(token: string): Promise<Nullable<string>>;

}
