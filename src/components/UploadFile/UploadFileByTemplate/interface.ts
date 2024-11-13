import { UploadFile, UploadProps } from 'antd';
import { ReactNode } from 'react';

interface OnDoneReturn {
  isSuccess: boolean;
  message?: string | null;
}

export interface UploadFileByTemplateProps
  extends Omit<UploadProps, 'onChange'> {
  name?: string;
  children?: ReactNode;
  maxFileSize?: number;
  onDownloadClick: () => void;
  onDone: (file: UploadFile) => Promise<OnDoneReturn>;
  onError?: (file: UploadFile) => Promise<void>;
}
