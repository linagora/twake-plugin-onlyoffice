import IndexController from '@/controllers/index.controller';
import { Routes } from '@/interfaces/routes.interface';
import ApiService from '@/services/api.service';
import EditorService from '@/services/editor.service';
import { Router } from 'express';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController: IndexController;

  constructor() {
    const api = new ApiService('http://localhost:3000');
    const editor = new EditorService(api);
    this.indexController = new IndexController(editor);
    this.initRoutes();
  }

  private initRoutes = () => {
    this.router.get(`${this.path}`, this.indexController.index);
  };
}

export default IndexRoute;
