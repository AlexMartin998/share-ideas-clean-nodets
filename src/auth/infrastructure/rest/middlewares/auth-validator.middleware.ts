import { body } from 'express-validator';

import { InputValidator } from '@/shared/insfrastructure/server/middlewares';


export class AuthValidatorMiddleware {

  static registerRules = () => [
    body('username', 'Invalid username').notEmpty(),
    ...this.emailPassRules(),
    InputValidator.validate,
  ];

  private static emailPassRules = () => [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be longer than 6 characters').isLength({
      min: 6,
    }),
  ];

}
