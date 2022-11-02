import express from 'express';
import { Routes } from '@interfaces/routes.interface';
import { NODE_ENV } from '@config';
import cors from 'cors';
import { renderFile } from 'eta';
import path from 'path';
import errorMiddleware from './middlewares/error.middleware';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV;

    this.initViews();
    this.initMiddlewares();
    this.initRoutes(routes);
    this.initErrorHandling();
  }

  public listen = () => {
    this.app.listen(this.port || 3000, () => {
      console.debug(`🚀 App listening on port ${this.port || 3000}`);
    });
  };

  public getServer = () => this.app;

  private initRoutes = (routes: Routes[]) => {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  };

  private initMiddlewares = () => {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  };

  private initViews = () => {
    this.app.engine('eta', renderFile);
    this.app.set('view engine', 'eta');
    this.app.set('views', path.join(__dirname, 'views'));
  };

  private initErrorHandling = () => {
    this.app.use(errorMiddleware);
  };
}

export default App;
