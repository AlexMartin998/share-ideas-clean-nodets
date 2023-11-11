import { Router } from 'express';

import { AuthController } from './controller';
import { AuthValidatorMiddleware } from './middlewares';


export class AuthRoutes {

  ///* DI
  constructor(private readonly authController: AuthController) {}

  get routes(): Router {
    const router = Router();

    router.post(
      '/register',
      AuthValidatorMiddleware.registerRules(),
      this.authController.register
    );

    router.post('/login', this.authController.login);

    return router;
  }

}
