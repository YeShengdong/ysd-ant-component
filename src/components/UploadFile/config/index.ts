import {
  EXCEL_ACCEPTS,
  IMAGE_ACCEPTS,
  OTHER_ACCEPTS,
} from '../../../constants';

export const DEFAULT_MAX_FILE_SIZE = 50;

export const imageTypes = IMAGE_ACCEPTS.map((v) => `.${v}`);
export const defaultImageAccept = imageTypes.join(',');
export const defaultExcelAccept = EXCEL_ACCEPTS.map((v) => `.${v}`).join(',');
export const defaultAllAccept = [
  ...IMAGE_ACCEPTS,
  ...EXCEL_ACCEPTS,
  ...OTHER_ACCEPTS,
]
  .map((v) => `.${v}`)
  .join(',');
