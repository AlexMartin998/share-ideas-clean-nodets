import { InjectionMode, asClass, createContainer } from 'awilix';

import { UserLogin, UserRegistrator } from '@/auth/application/use-cases';
import { BcryptAdapter, JwtAdapter } from '@/auth/infrastructure/adapters';
import {
  PostgresRoleDatasource,
  PostgresUserDatasource,
} from '@/auth/infrastructure/datasources';
import {
  RoleRepositoryImpl,
  UserRepositoryImpl,
} from '@/auth/infrastructure/repositories';
import { AuthController } from '@/auth/infrastructure/rest/controller';
import { AuthRoutes } from '@/auth/infrastructure/rest/routes';
import { AppRouter } from '../server/router';



const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});


container
  .register({
    userDatasource: asClass(PostgresUserDatasource),
    roleDatasource: asClass(PostgresRoleDatasource),
  })
  .register({
    userRepository: asClass(UserRepositoryImpl),
    roleRepository: asClass(RoleRepositoryImpl),
  })
  .register({
    userRegistrator: asClass(UserRegistrator),
    userLogin: asClass(UserLogin),
  })
  .register({
    authController: asClass(AuthController),
  })
  .register({
    authRoutes: asClass(AuthRoutes),
    AppRouter: asClass(AppRouter),
  })
  .register({
    passwordHandler: asClass(BcryptAdapter),
    authTokenHandler: asClass(JwtAdapter),
  });

export { container as diContainer };
