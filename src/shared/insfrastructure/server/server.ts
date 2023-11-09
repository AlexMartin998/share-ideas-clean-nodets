import compression from 'compression';
import express, { Router } from 'express';

import { notFoundMiddleware } from './middlewares';



interface Options {
  port: number;
  router: Router;
  public_path?: string;
}


export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly router: Router;


  // Avoid hidden dependencies
  constructor(options: Options) {
    const { port, router } = options;

    this.port = port;
    this.router = router;

    this.configureMiddlewares();
    this.configureRouter();
    this.configureFinalMiddlewares();
  }


  async start() {
    ///* Express Server
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${this.port}`);
    });
  }

  close() {
    this.serverListener?.close();
  }


  ///* Router
  private configureRouter() {
    this.app.use(this.router);
  }


  ///* Middlewares
  private configureMiddlewares() {
    this.app.use(express.json());
    this.app.use(compression());
  }

  private configureFinalMiddlewares() {
    this.app.use(notFoundMiddleware);
  }

}
