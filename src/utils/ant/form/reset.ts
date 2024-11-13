import { FormInstance } from 'antd';
import { omit } from 'lodash-es';

export const getResetFields = (
  form: FormInstance,
  omitFields: string[],
): string[] => {
  const restFieldsValue = omit(form.getFieldsValue(), omitFields);

  return Object.keys(restFieldsValue);
};
