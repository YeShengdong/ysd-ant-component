import { dateFormat } from "../../../date";

interface CreateDateTimeRenderProps {
  format?: string;
}

export const createDateRender = (props?: CreateDateTimeRenderProps) => {
  return (value: string | null) => {
    const { format = 'YYYY-MM-DD' } = props || {};

    return value ? dateFormat(value, format) : value;
  };
};
