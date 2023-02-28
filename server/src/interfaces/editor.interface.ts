import { UserType } from './user.interface';

export type EditorInitRequestParams = {
  file_id: string;
  company_id: string;
  token: string;
  user: UserType;
  preview: string;
};

export type EditConfigInitResult = {
  user_id: string;
  username: string;
  language: string;
  user_image: string;
  mode: string;
  onlyoffice_server: string;
  color: string;
  company_id: string;
  file_id: string;
  filename: string;
  file_type: string;
  editable: boolean;
  preview: boolean;
};

export interface IEditorService {
  init: (req: EditorInitRequestParams) => Promise<EditConfigInitResult>;
}

export type ModeParametersType = {
  mode: string;
  color: string;
};
