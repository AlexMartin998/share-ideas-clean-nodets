import { body } from 'express-validator';

import { InputValidator } from '@/shared/insfrastructure/server/middlewares';



export class IdeasValidatorMiddleware {

  static createRules = () => [
    body('title', 'Invalid title').notEmpty(),
    body('description', 'Invalid description').notEmpty(),
    InputValidator.validate,
  ];

}
