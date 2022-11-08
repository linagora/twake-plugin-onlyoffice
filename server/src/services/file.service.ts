import { FileRequestParams, FileType, IFileService } from '@/interfaces/file.interface';
import apiService from './api.service';
import loggerService from './logger.service';

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
      });

      return file;
    } catch (error) {
      loggerService.error('Failed to download file: ', error.message);
    }
  };
}

export default new FileService();
