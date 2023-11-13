import { Router } from 'express';

import { AuthController } from './controller';
import { AuthValidatorMiddleware } from './middlewares';
import { AuthMiddleware } from '@/shared/insfrastructure/middlewares';

export class AuthRoutes {
  ///* DI
  constructor(
    private readonly authController: AuthController,
    private readonly authMiddleware: AuthMiddleware
  ) {}

  get routes(): Router {
    const router = Router();

    router.post(
      '/register',
      AuthValidatorMiddleware.registerRules(),
      this.authController.register
    );

    router.post('/login', this.authController.login);

    router.get(
      '/renew-token',
      [this.authMiddleware.validateJWT],
      this.authController.renewJwt
    );

    return router;
  }
}
