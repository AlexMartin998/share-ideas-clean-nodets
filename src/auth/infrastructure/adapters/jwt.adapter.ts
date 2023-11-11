import jwt from 'jsonwebtoken';

import { JwtConstants } from '@/auth/domain/constants';
import { HandleAuthToken } from '@/auth/domain/use-cases';
import { Nullable } from '@/shared/domain';
import { envs } from '@/shared/insfrastructure/config';


export class JwtAdapter implements HandleAuthToken {

  async generateToken(
    payload: any,
    duration: string = JwtConstants.duration
  ): Promise<Nullable<string>> {
    return new Promise(resolve => {
      jwt.sign(
        payload,
        envs.JWT_SECRET,
        { expiresIn: duration },
        (err, token) => {
          // null to avoid using try/catch
          if (err || !token) return resolve(null);

          resolve(token);
        }
      );
    });
  }

  validateToken<T>(token: string): Promise<Nullable<T>> {
    return new Promise(resolve => {
      jwt.verify(token, envs.JWT_SECRET, (err, decoded) => {
        if (err) return resolve(null);

        resolve(decoded as T);
      });
    });
  }

}
