import fileService from '@/services/file.service';
import { Request, Response, NextFunction } from 'express';

interface RequestQuery {
  company_id: string;
  file_id: string;
  token: string;
}

interface SaveRequestBody {
  filetype: string;
  key: string;
  status: number;
  url: string;
  users: string[];
}

class OnlyOfficeController {
  public read = async (req: Request<{}, {}, {}, RequestQuery>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { file_id, company_id } = req.query;

      const file = await fileService.download({
        company_id,
        file_id,
      });

      file.pipe(res);
    } catch (error) {
      next(error);
    }
  };

  public save = async (req: Request<{}, {}, SaveRequestBody, RequestQuery>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { url } = req.body;
      const { company_id, file_id } = req.query;

      if (url) {
        await fileService.save({
          company_id,
          file_id,
          url,
          user_id: req.user.id,
        });
      }

      res.send({
        error: 0,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default OnlyOfficeController;
