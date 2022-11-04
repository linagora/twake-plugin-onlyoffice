import { FileRequestParams, FileType, IFileService } from '@/interfaces/file.interface';
import apiService from './api.service';

class FileService implements IFileService {
  public get = async (params: FileRequestParams, token: string): Promise<FileType> => {
    try {
      const { company_id, file_id } = params;
      const { resource } = await apiService.get<{ resource: FileType }>({
        url: `/files/v1/companies/${company_id}/files/${file_id}`,
        token,
      });

      return resource;
    } catch (error) {
      console.error('Failed to fetch file metadata: ', error.message);

      return Promise.reject();
    }
  };

  public download = async (params: FileRequestParams, token: string): Promise<any> => {
    try {
      const { company_id, file_id } = params;
      const file = await apiService.get({
        url: `/files/v1/companies/${company_id}/files/${file_id}/download`,
        token,
      });

      return file;
    } catch (error) {
      console.error('Failed to download file: ', error.message);
    }
  };
}

export default new FileService();
