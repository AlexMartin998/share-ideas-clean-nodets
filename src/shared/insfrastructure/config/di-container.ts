import { InjectionMode, asClass, createContainer } from 'awilix';

import {
  UserFinder,
  UserLogin,
  UserRegistrator,
} from '@/auth/application/use-cases';
import { BcryptAdapter, JwtAdapter } from '@/auth/infrastructure/adapters';
import {
  PostgresRolesRepository,
  PostgresUsersRepository,
} from '@/auth/infrastructure/repositories';
import { AuthController } from '@/auth/infrastructure/rest/controller';
import { AuthRoutes } from '@/auth/infrastructure/rest/routes';
import {
  CommentCreator,
  CommentDeleter,
  CommentFinder,
  CommentUpdater,
  CommentsFinder,
} from '@/comments/application/use-cases';
import { PostgresCommentsRepository } from '@/comments/infrastructure/repositories';
import { CommentsController } from '@/comments/infrastructure/rest/controller';
import { CommentsRoutes } from '@/comments/infrastructure/rest/routes';
import {
  IdeaCreator,
  IdeaDeleter,
  IdeaFinder,
  IdeaUpdater,
  IdeasFinder,
} from '@/ideas/application/use-cases';
import { PostgresIdeasRepository } from '@/ideas/infrastructure/repositories';
import { IdeasController } from '@/ideas/infrastructure/rest/controller';
import { IdeasRoutes } from '@/ideas/infrastructure/rest/routes';
import { AuthMiddleware } from '../middlewares';
import { AppRouter } from '../server/router';



const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});


container
  .register({
    // // Repositories
    userRepository: asClass(PostgresUsersRepository),
    roleRepository: asClass(PostgresRolesRepository),
    ideasRepository: asClass(PostgresIdeasRepository),
    commentsRepository: asClass(PostgresCommentsRepository),
  })
  .register({
    // // UseCases
    userRegistrator: asClass(UserRegistrator),
    userLogin: asClass(UserLogin),
    userFinder: asClass(UserFinder),
    ideaCreator: asClass(IdeaCreator),
    ideasFinder: asClass(IdeasFinder),
    ideaFinder: asClass(IdeaFinder),
    ideaDeleter: asClass(IdeaDeleter),
    ideaUpdater: asClass(IdeaUpdater),
    commentCreator: asClass(CommentCreator),
    commentsFinder: asClass(CommentsFinder),
    commentFinder: asClass(CommentFinder),
    commentUpdater: asClass(CommentUpdater),
    commentDeleter: asClass(CommentDeleter),
  })
  .register({
    // // Controllers
    authController: asClass(AuthController),
    ideasController: asClass(IdeasController),
    commentsController: asClass(CommentsController),
  })
  .register({
    // // Routes
    authRoutes: asClass(AuthRoutes),
    ideasRoutes: asClass(IdeasRoutes),
    commentsRoutes: asClass(CommentsRoutes),
    AppRouter: asClass(AppRouter),
  })
  .register({
    authMiddleware: asClass(AuthMiddleware),
  })
  .register({
    // // UseCases - Adapters
    passwordHandler: asClass(BcryptAdapter),
    authTokenHandler: asClass(JwtAdapter),
  });


export { container as diContainer };
