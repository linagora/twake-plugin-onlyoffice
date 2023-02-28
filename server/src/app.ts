import express from 'express';
import { Routes } from '@interfaces/routes.interface';
import { NODE_ENV } from '@config';
import cors from 'cors';
import { renderFile } from 'eta';
import path from 'path';
import errorMiddleware from './middlewares/error.middleware';
import { SERVER_PORT, SERVER_PREFIX } from '@config';
import loggerService from './services/logger.service';

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
    this.app.listen(SERVER_PORT, () => {
      loggerService.info(`🚀 App listening on port ${SERVER_PORT}`);
    });
  };

  public getServer = () => this.app;

  private initRoutes = (routes: Routes[]) => {
    routes.forEach(route => {
      this.app.use(SERVER_PREFIX, route.router);
    });

    this.app.use('/assets', express.static(path.join(__dirname, '../assets')));
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
