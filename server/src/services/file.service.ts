import { FileRequestParams, FileType, IFileService } from '@/interfaces/file.interface';
import apiService from './api.service';
import loggerService from './logger.service';
import { Stream } from 'stream';
import FormData from 'form-data';

class FileService implements IFileService {
  public get = async (params: FileRequestParams): Promise<FileType> => {
    try {
      const { company_id, file_id } = params;
      const { resource } = await apiService.get<{ resource: FileType }>({
        url: `/internal/services/files/v1/companies/${company_id}/files/${file_id}`,
      });

      return resource;
    } catch (error) {
      loggerService.error('Failed to fetch file metadata: ', error.message);

      return Promise.reject();
    }
  };

  public download = async (params: FileRequestParams): Promise<any> => {
    try {
      const { company_id, file_id } = params;
      const file = await apiService.get({
        url: `/internal/services/files/v1/companies/${company_id}/files/${file_id}/download`,
        responseType: 'stream',
      });

      return file;
    } catch (error) {
      loggerService.error('Failed to download file: ', error.message);
    }
  };

  public save = async (params: FileRequestParams): Promise<void> => {
    try {
      const { company_id, file_id, url, user_id } = params;

      if (!url) {
        throw Error('no url found');
      }

      const originalFile = await this.get(params);

      if (!originalFile) {
        throw Error('original file not found');
      }

      if (originalFile.user_id !== user_id) {
        throw Error("can't save file, user is not the owner");
      }

      const newFile = await apiService.get<Stream>({
        url,
        responseType: 'stream',
      });

      const form = new FormData();

      form.append('file', newFile, {
        filename: originalFile.metadata.name,
      });

      await apiService.post({
        url: `/internal/services/files/v1/companies/${company_id}/files/${file_id}`,
        payload: form,
        headers: form.getHeaders(),
      });
    } catch (error) {
      loggerService.error('Failed to save file: ', error.message);
    }
  };
}

export default new FileService();
