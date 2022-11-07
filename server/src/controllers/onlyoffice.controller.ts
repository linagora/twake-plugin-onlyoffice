import fileService from '@/services/file.service';
import { Request, Response, NextFunction } from 'express';

interface RequestQuery {
  company_id: string;
  file_id: string;
}

class OnlyOfficeController {
  public read = async (req: Request<{}, {}, {}, RequestQuery>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { file_id, company_id } = req.query;

      const file = await fileService.download({
        company_id,
        file_id,
      });

      res.send(file);
    } catch (error) {
      next(error);
    }
  };
}

export default OnlyOfficeController;
