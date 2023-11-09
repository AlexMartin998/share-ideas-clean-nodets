import { envs } from './infrastructure/config';
import { AppRouter } from './presentation/router';
import { Server } from './presentation/server';


(async () => {
  main();
})();


function main() {

  // Avoid hidden dependencies
  const server = new Server({
    port: envs.PORT,
    // public_path: envs.PUBLIC_PATH,
    router: AppRouter.routes,
  });


  server.start();

}
