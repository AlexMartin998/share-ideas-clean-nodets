import { AuthMiddleware } from '@/shared/insfrastructure/middlewares';
import { Router } from 'express';
import { IdeasValidatorMiddleware } from '../middlewares';
import { IdeasController } from './controller';

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
    router.delete('/:id', this.ideasController.delete);

    return router;
  }
}
