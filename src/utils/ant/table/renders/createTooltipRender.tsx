import { Tooltip, TooltipProps } from 'antd';
import React from 'react';

interface CreateTooltipRenderProps {
  defaultValue?: string;
  tooltipProps?: TooltipProps;
}

export const createTooltipRender = (props?: CreateTooltipRenderProps) => {
  return (value: string | null) => {
    const { defaultValue, tooltipProps = {} } = props || {};

    if (!value) {
      return defaultValue || value;
    }

    return (
      <Tooltip placement="topLeft" {...tooltipProps} title={value}>
        {value}
      </Tooltip>
    );
  };
};
