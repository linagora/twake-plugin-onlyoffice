export type EditorInitRequestParams = {
  workspace_id: string;
  group_id: string;
  file_id: string;
  preview: string;
};

export type EditConfigInitResult = {
  user_id: string;
  username: string;
  language: string;
  user_image: string;
  mode: string;
  onlyoffice_server: string;
  default_extension: string;
  color: string;
  workspace_id: string;
  server: string;
  file_id: string;
  filename: string;
  group_id: string;
  file_type: string;
  preview: string;
};

export interface IEditorService {
  init: (req: EditorInitRequestParams, mode: string) => Promise<EditConfigInitResult>;
}

export type ModeParametersType = {
  mode: string;
  color: string;
};
