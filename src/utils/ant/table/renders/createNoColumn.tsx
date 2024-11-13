import { ColumnType } from 'antd/es/table';
import { getRowBaseIndex } from '../rowIndex';

export const createNoColumn = (pagination?: {
  current: number;
  pageSize: number;
}): ColumnType<any> => {
  const baseIndex = getRowBaseIndex(pagination);

  return {
    title: 'No.',
    dataIndex: 'no',
    fixed: 'left',
    width: 58 + (baseIndex.toString().length - 1) * 8,
    render: (text: unknown, record: unknown, index: number) => {
      return baseIndex + index + 1;
    },
  };
};
