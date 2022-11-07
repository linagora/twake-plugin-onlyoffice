import { NextFunction, Request, Response } from 'express';

interface RequestQuery {
  company_id: string;
  file_id: string;
  token: string;
}

export default (req: Request<{}, {}, {}, RequestQuery>, res: Response, next: NextFunction) => {
  const { company_id, file_id, token } = req.query;

  if (!company_id || !file_id || !token) {
    return res.status(400).json({ message: 'invalid request' });
  }

  next();
};
