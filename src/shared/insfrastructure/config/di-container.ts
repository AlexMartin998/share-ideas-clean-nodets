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
import { IdeaCreator, IdeasFinder } from '@/ideas/application/use-cases';
import { PostgresIdeasDatasource } from '@/ideas/infrastructure/datasources';
import { IdeasRepositoryImpl } from '@/ideas/infrastructure/repositories';
import { IdeasController } from '@/ideas/infrastructure/rest/controller';
import { IdeasRoutes } from '@/ideas/infrastructure/rest/routes';
import { AppRouter } from '../server/router';

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container
  .register({
    // // Datasources
    userDatasource: asClass(PostgresUserDatasource),
    roleDatasource: asClass(PostgresRoleDatasource),
    ideasDatasource: asClass(PostgresIdeasDatasource),
  })
  .register({
    // // Repositories
    userRepository: asClass(UserRepositoryImpl),
    roleRepository: asClass(RoleRepositoryImpl),
    ideasRepository: asClass(IdeasRepositoryImpl),
  })
  .register({
    // // UseCases
    userRegistrator: asClass(UserRegistrator),
    userLogin: asClass(UserLogin),
    ideasFinder: asClass(IdeasFinder),
    ideaCreator: asClass(IdeaCreator),
  })
  .register({
    // // Controllers
    authController: asClass(AuthController),
    ideasController: asClass(IdeasController),
  })
  .register({
    // // Routes
    authRoutes: asClass(AuthRoutes),
    ideasRoutes: asClass(IdeasRoutes),
    AppRouter: asClass(AppRouter),
  })
  .register({
    // // UseCases - Adapters
    passwordHandler: asClass(BcryptAdapter),
    authTokenHandler: asClass(JwtAdapter),
  });

export { container as diContainer };
