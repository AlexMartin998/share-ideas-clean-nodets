import { Router } from 'express';
import { IdeasController } from './controller';
import { IdeasValidatorMiddleware } from '../middlewares';

export class IdeasRoutes {
  ///* DI
  constructor(private readonly ideasController: IdeasController) {}

  get routes(): Router {
    const router = Router();

    router.post(
      '/',
      IdeasValidatorMiddleware.createRules(),
      this.ideasController.create
    );
    router.get('/', this.ideasController.findAll);
    router.get('/:id', this.ideasController.findOne);

    return router;
  }
}
