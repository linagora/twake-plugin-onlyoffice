import { CREDENTIALS_SECRET } from '@/config';
import loggerService from '@/services/logger.service';
import userService from '@/services/user.service';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface RequestQuery {
  mode: string;
  company_id: string;
  preview: string;
  token: string;
  file_id: string;
}

export default async (req: Request<{}, {}, {}, RequestQuery>, res: Response, next: NextFunction) => {
  const token = req.query?.token;

  if (!token && req.cookies.token) {
    try {
      const userJwt = jwt.verify(req.cookies.token, CREDENTIALS_SECRET, { complete: true });
      if (JSON.parse(userJwt.payload as string).id) {
        req.user = JSON.parse(userJwt.payload as string);
        next();
      }
    } catch (error) {
      loggerService.error('invalid token', error);
      res.clearCookie('token');
    }
  }

  if (!token) {
    return res.status(401);
  }

  const user = await userService.getCurrentUser(token);

  if (!user || !user.id) {
    return res.status(401).json({ message: 'invalid token' });
  }

  res.cookie(
    'token',
    jwt.sign(JSON.stringify(user), CREDENTIALS_SECRET, {
      expiresIn: 60 * 60 * 24 * 30,
    }),
    { maxAge: 60 * 60 * 24 * 30 },
  );

  req.user = user;
  next();
};
