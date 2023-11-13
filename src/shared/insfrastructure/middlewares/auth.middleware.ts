import { RequestHandler } from 'express';

import { FindUser, HandleAuthToken } from '@/auth/domain/use-cases';


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
      if (!user) return res.status(401).json({ errors: ['Invalid token'] });

      // isActive?
      req.body.user = user;

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

}
