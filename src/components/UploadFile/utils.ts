import { fisMessage } from "../../utils";

export const checkFileSizeLimit = (
  value: number,
  maxFileSize: number,
): boolean => {
  return value / 1024 / 1024 < maxFileSize;
};

export const showFileSizeLimitMessage = (maxFileSizeWithUnit: string) => {
  fisMessage.warning(`上传附件要小于${maxFileSizeWithUnit}!`);
};

export const getAcceptDisplayText = (accept: string): string => {
  return accept
    .split(',')
    .join('/')
    .replace(/(\.)|(\s*)/g, '');
};

export const getAcceptMessage = (accept: string): string => {
  return accept
    ?.split(',')
    .map((v) => v.slice(1))
    .join('、');
};
