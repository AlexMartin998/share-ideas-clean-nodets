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
    router.get('/:id', this.commentsController.findOne);

    router.post(
      '/',
      [this.authMiddleware.validateJWT],
      this.commentsController.create
    );

    router.patch(
      '/:id',
      [this.authMiddleware.validateJWT],
      this.commentsController.update
    );

    return router;
  }
}
