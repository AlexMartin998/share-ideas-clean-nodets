import express, { Router } from 'express';
import compression from 'compression';



interface Options {
  port: number;
  router: Router;
  public_path?: string;
}


export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  // private readonly publicPath: string;
  private readonly router: Router;


  // Avoid hidden dependencies
  constructor(options: Options) {
    const { port, router, public_path = 'public' } = options;

    this.port = port;
    // this.publicPath = public_path;
    this.router = router;
  }


  async start() {

    ///* Middlewares
    this.app.use(express.json());
    // this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());


    ///* Serve Static Content
    // this.app.use(express.static(this.publicPath));


    ///* Routes
    this.app.use(this.router);


    ///* SPA
    /* this.app.get('*', (_req, res) => {
      // absolute path:
      const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );

      res.sendFile(indexPath);
    }); */


    ///* Express Server
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }

}
