import { Router } from 'express';

import { AuthRoutes } from '@/auth/infrastructure/rest/routes';
import { IdeasRoutes } from '@/ideas/infrastructure/rest/routes';


export class AppRouter {

  ///* DI
  constructor(
    private readonly authRoutes: AuthRoutes,
    private readonly ideasRoutes: IdeasRoutes
  ) {}


  get routes(): Router {
    const router = Router();

    router.use('/api/auth', this.authRoutes.routes);
    router.use('/api/ideas', this.ideasRoutes.routes);
    // router.use('/api/comments', this.commentsRoutes.routes);

    return router;
  }

}
