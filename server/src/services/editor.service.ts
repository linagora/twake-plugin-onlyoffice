import { EditConfigInitResult, EditorInitRequestParams, IEditorService, ModeParametersType } from '@/interfaces/editor.interface';
import { ONLY_OFFICE_SERVER } from '@config';
import fileService from './file.service';

class EditorService implements IEditorService {
  public init = async (request: EditorInitRequestParams): Promise<EditConfigInitResult> => {
    const { file_id, company_id, user, preview } = request;

    const file = await fileService.get({
      file_id,
      company_id,
    });

    if (!file) {
      throw Error("can't find file");
    }

    const { color, mode: fileMode } = this.getFileMode(file.metadata.name);

    return {
      color,
      file_id,
      file_type: file.metadata.name.split('.').pop(),
      filename: file.metadata.name,
      language: user.preferences.locale || 'en',
      mode: fileMode,
      onlyoffice_server: ONLY_OFFICE_SERVER,
      preview: user.id !== file.user_id,
      user_id: user.id,
      user_image: user.thumbnail || user.picture || '',
      username: user.username,
      company_id,
      editable: user.id === file.user_id && !preview,
    };
  };

  private getFileMode = (filename: string): ModeParametersType => {
    const extension = filename.split('.').pop();

    if (
      [
        'doc',
        'docm',
        'docx',
        'docxf',
        'dot',
        'dotm',
        'dotx',
        'epub',
        'fodt',
        'fb2',
        'htm',
        'html',
        'mht',
        'odt',
        'oform',
        'ott',
        'oxps',
        'pdf',
        'rtf',
        'txt',
        'djvu',
        'xml',
        'xps',
      ].includes(extension)
    ) {
      return {
        mode: 'word',
        color: '#aa5252',
      };
    }

    if (['csv', 'fods', 'ods', 'ots', 'xls', 'xlsb', 'xlsm', 'xlsx', 'xlt', 'xltm', 'xltx'].includes(extension)) {
      return {
        mode: 'cell',
        color: '#40865c',
      };
    }

    if (['fodp', 'odp', 'otp', 'pot', 'potm', 'potx', 'pps', 'ppsm', 'ppsx', 'ppt', 'pptm', 'pptx'].includes(extension)) {
      return {
        mode: 'slide',
        color: '#aa5252',
      };
    }

    return {
      mode: 'text',
      color: 'grey',
    };
  };
}

export default new EditorService();
