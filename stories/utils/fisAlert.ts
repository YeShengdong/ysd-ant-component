import { Modal, ModalProps } from 'antd';
import { ReactNode } from 'react';

type FisAlertConfig = Omit<ModalProps, 'content'>;

export const fisAlert = {
  info: (content: ReactNode, config?: FisAlertConfig) => {
    Modal.info({
      title: '提示',
      okText: '知道了',
      ...config,
      content,
    });
  },
  error: (content: ReactNode, config?: FisAlertConfig) => {
    Modal.error({
      title: '提示',
      okText: '知道了',
      centered: true,
      ...config,
      content,
    });
  },
  confirm: (content: ReactNode, config?: FisAlertConfig) => {
    Modal.confirm({
      title: '确认',
      okText: '确认',
      cancelText: '取消',
      ...config,
      content,
    });
  },
};
