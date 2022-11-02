import EditorService from '@/services/editor.service';
import { NextFunction, Request, Response } from 'express';

class IndexController {
  constructor(private readonly editorService: EditorService) {}

  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { file_id, group_id, preview, workspace_id, mode } = req.params;

      const initResponse = await this.editorService.init(
        {
          file_id,
          group_id,
          preview,
          workspace_id,
        },
        mode,
      );
      res.render('index', initResponse);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
