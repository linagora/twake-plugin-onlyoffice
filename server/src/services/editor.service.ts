import { EditConfigInitResult, EditorInitRequestParams, IEditorService, ModeParametersType } from '@/interfaces/editor.interface';
import { ONLY_OFFICE_SERVER } from '@config';
import fileService from './file.service';

class EditorService implements IEditorService {
  public init = async (request: EditorInitRequestParams, mode: string): Promise<EditConfigInitResult> => {
    const { file_id, preview, company_id, user } = request;
    const { color, mode: fileMode } = this.getModeParams(mode);

    const file = await fileService.get({
      file_id,
      company_id,
    });

    if (!file) {
      throw Error("can't find file");
    }

    return {
      color,
      file_id,
      file_type: file.metadata.name.split('.').pop(),
      filename: file.metadata.name,
      language: user.preferences.locale || 'en',
      mode: fileMode,
      onlyoffice_server: ONLY_OFFICE_SERVER,
      preview: preview ? 'true' : 'false',
      user_id: user.id,
      user_image: user.thumbnail || user.picture || '',
      username: user.username,
      company_id,
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

export default new EditorService();
