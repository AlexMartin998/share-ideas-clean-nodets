import { RequestHandler } from 'express';

import { FindUser, HandleAuthToken } from '@/auth/domain/use-cases';
import { ResourceNotFoundError } from '@/shared/domain';


export class AuthMiddleware {

  constructor(
    private readonly userFinder: FindUser,
    private readonly authTokenHandler: HandleAuthToken
  ) {}


  validateJWT: RequestHandler = async (req, res, next) => {
    const bearerToken = req.header('Authorization');
    if (!bearerToken || !bearerToken.startsWith('Bearer'))
      return res.status(401).json({ errors: ['Unauthorized'] });

    const jwt = bearerToken.split(' ')[1];

    try {
      const payload = await this.authTokenHandler.validateToken<{ id: string }>(
        jwt
      );
      if (!payload) return res.status(401).json({ errors: ['Invalid token'] });

      const user = await this.userFinder.run(+payload.id);

      // isActive?
      req.body.user = user;

      next();
    } catch (error: unknown) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(401).json({ errors: ['Invalid token'] });
      }
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

}
