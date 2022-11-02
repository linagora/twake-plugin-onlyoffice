import { EditConfigInitResult, EditorInitRequestParams, IEditorService, ModeParametersType } from '@/interfaces/editor.interface';

class EditorService implements IEditorService {
  constructor(private readonly Api) {}

  public init = async (request: EditorInitRequestParams, mode: string): Promise<EditConfigInitResult> => {
    const { file_id, group_id, preview, workspace_id } = request;
    const { color, mode: fileMode } = this.getModeParams(mode);

    return {
      color,
      default_extension: '',
      file_id,
      file_type: '',
      filename: '',
      group_id,
      language: '',
      mode: fileMode,
      onlyoffice_server: '',
      preview: preview ? 'true' : 'false',
      user_id: '',
      server: '',
      user_image: '',
      username: '',
      workspace_id,
    };
  };

  private getModeParams = (mode: string): ModeParametersType => {
    switch (mode) {
      case 'presentation':
      case 'slide':
        return {
          mode: 'presentation',
          color: '#aa5252',
        };
      case 'spreadsheet':
        return {
          mode,
          color: '#40865c',
        };
      default:
        return {
          mode: 'text',
          color: '#446995',
        };
    }
  };
}

export default EditorService;
