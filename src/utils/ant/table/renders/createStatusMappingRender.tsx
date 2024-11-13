import { toString } from 'lodash-es';

export const createStatusMappingRender = ({ mapping }: any) => {
  return (value: string) => {
    const key = toString(value);

    if (!key) {
      return value;
    }

    return mapping[key] || value;
  };
};
