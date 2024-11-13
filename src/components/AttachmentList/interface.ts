export interface AttachmentListItem {
  id: string;
  fileType: string;
  fileName: string;
  createTime: string;
  creatorName: string;
}

export interface AttachmentListProps {
  data: AttachmentListItem[];
  loading: boolean;
  readonly?: boolean;
  isDeleteAble?: boolean;
  isDownloadAble?: boolean;
  isPreviewAble?: boolean;
  onDownload: (row: AttachmentListItem) => void;
  onDelete: (row: AttachmentListItem) => void;
  createPreviewUrlFn?: (row: AttachmentListItem) => string;
}
