import { Typography } from 'antd';
import React from 'react';

const { Link } = Typography;

interface CreateClickableRenderProps {
  clickHandler: (row: Record<string, any>) => void;
}

export const createClickableRender = ({
  clickHandler,
}: CreateClickableRenderProps) => {
  return (value: string, row: Record<string, any>) => {
    return (
      <Link
        onClick={() => {
          clickHandler(row);
        }}
      >
        {value}
      </Link>
    );
  };
};
