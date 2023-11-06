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
  }


  async start() {

    ///* Middlewares
    this.app.use(express.json());
    this.app.use(compression());


    ///* Routes
    this.app.use(this.router);


    ///* final middlewares
    this.app.use(notFoundMiddleware);


    ///* Express Server
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }

}
