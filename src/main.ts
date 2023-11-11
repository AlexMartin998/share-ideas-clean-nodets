import { diContainer, envs } from '@/shared/insfrastructure/config';
import { AppRouter } from '@/shared/insfrastructure/server/router';
import { Server } from '@/shared/insfrastructure/server/server';



(async () => {
  main();
})();


function main() {
  const AppRouter = diContainer.resolve<AppRouter>('AppRouter');
  
  // Avoid hidden dependencies
  const server = new Server({
    port: envs.PORT,
    router: AppRouter.routes,
  });


  server.start();

}
