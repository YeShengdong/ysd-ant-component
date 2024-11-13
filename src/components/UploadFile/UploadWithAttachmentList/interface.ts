import { ButtonProps, UploadProps } from 'antd';
import { AttachmentListItem } from '../../AttachmentList';

export interface UploadWithAttachmentListProps {
  value?: number | string | null; // attachmentId
  maxUploadSize?: number;
  onChange?: (value: number) => void;
  onAttachmentListChange?: (data: { total: number }) => void;
  uploadConfig?: UploadProps;
  buttonConfig?: ButtonProps;
  readonly?: boolean;
  isDeleteAble?: boolean;
  isDownloadAble?: boolean;
  isPreviewAble?: boolean;
  queryAttachmentListService: (params: any, options: any) => Promise<any>;
  downloadAttachmentService: (params: any) => Promise<any>;
  deleteAttachmentService: (params: any) => Promise<any>;
  createPreviewUrlFn?: (row: AttachmentListItem) => string;
}
