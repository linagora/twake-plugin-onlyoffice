import editorService from '@/services/editor.service';
import { NextFunction, Request, Response } from 'express';
import { SERVER_PORT, SERVER_PREFIX } from '@config';

interface RequestQuery {
  mode: string;
  company_id: string;
  preview: string;
  token: string;
  file_id: string;
}

class IndexController {
  public index = async (req: Request<{}, {}, {}, RequestQuery>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { file_id, company_id, token, preview } = req.query;
      const { user } = req;

      const initResponse = await editorService.init({
        file_id,
        token,
        company_id,
        user,
        preview,
      });

      res.render('index', {
        ...initResponse,
        server: (SERVER_ORIGIN.replace(/\/+$/, "") + "/" + SERVER_PREFIX.replace(/\/+$/, "")) || `${req.protocol}://${req.get('host')}/`,
        token,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
