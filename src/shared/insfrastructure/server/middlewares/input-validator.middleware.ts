import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';


export class InputValidator {

  static validate: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map(error => error.msg),
      });
    }
  
    return next();
  };

}
