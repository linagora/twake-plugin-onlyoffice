import { CREDENTIALS_SECRET } from '@/config';
import { OfficeToken } from '@/interfaces/routes.interface';
import driveService from '@/services/drive.service';
import fileService from '@/services/file.service';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
      const { token } = req.query;

      const officeTokenPayload = jwt.verify(token, CREDENTIALS_SECRET) as OfficeToken;
      const { company_id, drive_file_id, file_id, in_page_token } = officeTokenPayload;
      let fileId = file_id;

      // check token is an in_page_token
      if (!in_page_token) throw new Error('Invalid token, must be a in_page_token');

      if (drive_file_id) {
        //Get the drive file
        const driveFile = await driveService.get({
          company_id,
          drive_file_id,
        });
        if (driveFile) {
          fileId = driveFile?.item?.last_version_cache?.file_metadata?.external_id;
        }
      }

      const file = await fileService.download({
        company_id,
        file_id: fileId,
      });

      file.pipe(res);
    } catch (error) {
      next(error);
    }
  };

  public save = async (req: Request<{}, {}, SaveRequestBody, RequestQuery>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { url } = req.body;
      const { token } = req.query;

      const officeTokenPayload = jwt.verify(token, CREDENTIALS_SECRET) as OfficeToken;
      const { preview, company_id, file_id, user_id, drive_file_id, in_page_token } = officeTokenPayload;

      // check token is an in_page_token and allow save
      if (!in_page_token) throw new Error('Invalid token, must be a in_page_token');
      if (preview) throw new Error('Invalid token, must not be a preview token for save operation');

      if (url) {
        // If token indicate a drive_file_id then check if we want to create a new version or not
        if (drive_file_id) {
          //Get the drive file
          const driveFile = await driveService.get({
            company_id,
            drive_file_id,
          });

          const createNewVersion = driveFile && driveFile.item.last_version_cache.date_added < Date.now() - 1000 * 60 * 60 * 3;

          //After 3h we'll save a new version
          if (createNewVersion) {
            const newVersionFile = await fileService.save({
              company_id,
              file_id,
              url,
              create_new: true,
            });

            // If the last version is more than 3h old, we create a new version
            await driveService.createVersion({
              company_id,
              drive_file_id,
              file_id: newVersionFile?.resource?.id,
            });

            res.send({
              error: 0,
            });

            return;
          }
        }

        await fileService.save({
          company_id,
          file_id,
          url,
          user_id: user_id,
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
