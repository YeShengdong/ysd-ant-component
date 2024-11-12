import { message } from 'antd';
import { ArgsProps } from 'antd/es/message';
import { ReactNode } from 'react';

type FisMessageConfig = Omit<ArgsProps, 'content' | 'type' | 'style'>;

const style = {
  marginTop: '20vh',
};

export const fisMessage = {
  success: (content: ReactNode, config?: FisMessageConfig) => {
    message.open({
      ...config,
      content,
      type: 'success',
      style,
    });
  },
  error: (content: ReactNode, config?: FisMessageConfig) => {
    message.open({
      ...config,
      content,
      type: 'error',
      style,
    });
  },
  loading: (content: ReactNode, config?: FisMessageConfig) => {
    message.open({
      ...config,
      content,
      type: 'loading',
      style,
    });
  },
  warning: (content: ReactNode, config?: FisMessageConfig) => {
    message.open({
      ...config,
      content,
      type: 'warning',
      style,
    });
  },
  destroy: (key = '') => {
    message.destroy(key);
  },
};
