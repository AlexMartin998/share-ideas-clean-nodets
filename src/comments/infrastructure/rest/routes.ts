import { Router } from 'express';

import { AuthMiddleware } from '@/shared/insfrastructure/middlewares';
import { CommentsController } from './controller';

export class CommentsRoutes {
  ///* DI
  constructor(
    private readonly commentsController: CommentsController,
    private readonly authMiddleware: AuthMiddleware
  ) {}

  get routes(): Router {
    const router = Router();

    router.get('/', this.commentsController.findAll);

    router.post(
      '/',
      [this.authMiddleware.validateJWT],
      this.commentsController.create
    );

    return router;
  }
}
