import { Router } from 'express';
import { IdeasController } from './controller';
import { IdeasValidatorMiddleware } from '../middlewares';
import { AuthMiddleware } from '@/shared/insfrastructure/middlewares';

export class IdeasRoutes {
  ///* DI
  constructor(
    private readonly ideasController: IdeasController,
    private readonly authMiddleware: AuthMiddleware
  ) {}

  get routes(): Router {
    const router = Router();

    router.post(
      '/',
      [
        this.authMiddleware.validateJWT,
        ...IdeasValidatorMiddleware.createRules(),
      ],
      this.ideasController.create
    );

    router.get('/', this.ideasController.findAll);
    router.get('/:id', this.ideasController.findOne);

    return router;
  }
}
