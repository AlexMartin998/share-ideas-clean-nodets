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
import { IdeaFinder } from '@/ideas/application/use-cases/idea-finder.usecase';
import { AppRouter } from '../server/router';

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container
  .register({
    // // Datasources
    userDatasource: asClass(PostgresUserDatasource),
    roleDatasource: asClass(PostgresRoleDatasource),
  })
  .register({
    // // Repositories
    userRepository: asClass(UserRepositoryImpl),
    roleRepository: asClass(RoleRepositoryImpl),
    // ideasRepository: asClass(),
  })
  .register({
    // // UseCases
    userRegistrator: asClass(UserRegistrator),
    userLogin: asClass(UserLogin),
    ideaFinder: asClass(IdeaFinder),
  })
  .register({
    // // Controllers
    authController: asClass(AuthController),
  })
  .register({
    // // Routes
    authRoutes: asClass(AuthRoutes),
    AppRouter: asClass(AppRouter),
  })
  .register({
    // // UseCases - Adapters
    passwordHandler: asClass(BcryptAdapter),
    authTokenHandler: asClass(JwtAdapter),
  });

export { container as diContainer };
