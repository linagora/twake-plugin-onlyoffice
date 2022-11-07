import userService from '@/services/user.service';
import { NextFunction, Request, Response } from 'express';

interface RequestQuery {
  mode: string;
  company_id: string;
  preview: string;
  token: string;
  file_id: string;
}

export default async (req: Request<{}, {}, {}, RequestQuery>, res: Response, next: NextFunction) => {
  const { token } = req.query;

  if (!token) {
    return res.status(401);
  }

  const user = await userService.getCurrentUser(token);

  if (!user || !user.id) {
    return res.status(401).json({ message: 'invalid token' });
  }

  req.user = user;

  next();
};
