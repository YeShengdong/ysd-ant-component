import { isNil } from 'lodash-es';
import numeral from 'numeral';

interface CreateNumberRenderProps {
  format?: string;
  unit?: string;
  defaultValue?: string;
}

export const createNumberRender = (props?: CreateNumberRenderProps) => {
  return (value: string | null) => {
    const { format = '0,0', unit = '', defaultValue } = props || {};

    if (isNil(value)) {
      return defaultValue ?? value;
    }

    return value ? numeral(value).format(format) + unit : value;
  };
};
