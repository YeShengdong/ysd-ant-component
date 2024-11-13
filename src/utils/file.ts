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
