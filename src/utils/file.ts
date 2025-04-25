import { IMAGE_ACCEPTS } from '../constants';
import { getCurrentDate } from './date';

export const checkIsImageFileUrl = (
  url?: string,
  fileName?: string,
): boolean => {
  if (!url) {
    return false;
  }

  const urlWithExtension = fileName || url;
  const urlItems = urlWithExtension.split('.');
  const extensionName = urlItems[urlItems.length - 1];

  return IMAGE_ACCEPTS.includes(extensionName.toLowerCase());
};

export const getFileNameWithDate = (name: string, extension = 'xlsx') => {
  const date = getCurrentDate('YYYYMMDDHHmmss');
  const newName = `${name}-${date}`;

  if (extension.startsWith('.')) {
    return newName + extension;
  }

  return `${newName}.${extension}`;
};

export const getUploadFileContent = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const content = e?.target?.result || null;

      resolve(content as any); // 返回文件内容
    };

    fileReader.onerror = (e) => {
      reject(e);
    };

    // 根据文件类型选择合适的读取方式，例如文本或数据URL
    if (file.type === 'text/plain') {
      fileReader.readAsText(file); // 读取文本文件
    } else {
      fileReader.readAsDataURL(file); // 读取非文本文件，以Data URL形式获取文件内容
    }
  });
};

export const removeBase64Prefix = (base64String?: string | null): string => {
  if (!base64String) {
    return '';
  }

  return base64String.replace(/^data:image\/\w+;base64,/, '');
};
