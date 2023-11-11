import { Router } from 'express';

import { AuthRoutes } from '@/auth/infrastructure/rest/routes';


export class AppRouter {

  ///* DI
  constructor(private readonly authRoutes: AuthRoutes){}

  get routes(): Router {
    const router = Router();

    router.use('/api/auth', this.authRoutes.routes);

    return router;
  }

}
