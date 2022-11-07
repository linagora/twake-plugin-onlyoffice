import OnlyOfficeController from '@/controllers/onlyoffice.controller';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import requirementsMiddleware from '@/middlewares/requirements.middleware';
import { Router } from 'express';

class OnlyOfficeRoute implements Routes {
  public path = '/only_office';
  public router = Router();
  public onlyOfficeController: OnlyOfficeController;

  constructor() {
    this.onlyOfficeController = new OnlyOfficeController();
    this.initRoutes();
  }

  private initRoutes = () => {
    this.router.get(`${this.path}/:mode/read`, requirementsMiddleware, authMiddleware, this.onlyOfficeController.read);
  };
}

export default OnlyOfficeRoute;
