import { Router } from 'express';

import { PostgresRoleDatasource, PostgresUserDatasource } from '../datasources';
import { RoleRepositoryImpl, UserRepositoryImpl } from '../repositories';
import { AuthController } from './controller';
import { AuthValidatorMiddleware } from './middlewares';


export class AuthRoutes {

  static get routes(): Router {
    const router = Router();

    ///* DI
    const userDatasource = new PostgresUserDatasource();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const roleDatasource = new PostgresRoleDatasource();
    const roleRepository = new RoleRepositoryImpl(roleDatasource);

    const authController = new AuthController(userRepository, roleRepository);

    
    router.post(
      '/register',
      AuthValidatorMiddleware.registerRules(),
      authController.register
    );

    router.post('/login', authController.login);


    return router;
  }

}
