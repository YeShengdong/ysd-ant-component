import { fisAlert } from './fisAlert';

export const alertErrorMessage = (error: any): void => {
  const { code, message } = error || {};

  if (code === 'ERR_CANCELED') {
    return;
  }

  const errorMessage = message || '操作失败！';

  fisAlert.error(errorMessage);
};
