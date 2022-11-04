export type FileType = {
  id: string;
  name: string;
  company_id: string;
  user_id: string;
  metadata: {
    name: string;
    mime: string;
  };
};

export type FileRequestParams = {
  file_id: string;
  company_id: string;
};

export interface IFileService {
  get: (params: FileRequestParams, token: string) => Promise<FileType>;
  download: (params: FileRequestParams, token: string) => Promise<any>;
}
