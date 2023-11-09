import { envs } from '@/shared/insfrastructure/config';
import { AppRouter } from '@/shared/insfrastructure/server/router';
import { Server } from '@/shared/insfrastructure/server/server';


(async () => {
  main();
})();


function main() {

  // Avoid hidden dependencies
  const server = new Server({
    port: envs.PORT,
    router: AppRouter.routes,
  });


  server.start();

}
