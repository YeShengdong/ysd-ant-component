import { restCode, RestResponse } from '../constants';
import { fisMessage } from './fisMessage';

const SUCCESS_MESSAGE = '操作成功！';

export const isSuccessResponse = (response: RestResponse): boolean => {
  return response.code === restCode.success;
};

export const isOtherResponse = (response: RestResponse): boolean => {
  return response.code === restCode.other;
};

export const showSuccessMessage = () => {
  fisMessage.success(SUCCESS_MESSAGE);
};
