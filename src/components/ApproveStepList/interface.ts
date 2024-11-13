export enum TaskActionType {
  重新提交 = 'Send',
  同意 = 'Agree',
  退回 = 'Return',
  撤回 = 'Recall',
  转交 = 'Handover',
  确认 = 'Confirm',
  提交 = 'Create',
  删除 = 'Delete',
  否决 = 'Reject'
}

export interface ApproveStepListItem {
  taskId?: string | null;
  taskName?: string | null;
  assigneeName?: string | null;
  comment?: string | null;
  endTime?: string | null;
  durationDesc?: string | null;
  action?: string | null;
  actionName?: string | null;
}

export type ApproveStepListData = ApproveStepListItem[];

export interface ApproveStepListProps {
  title?: string;
  data?: ApproveStepListData | null;
  loading?: boolean;
  isExpand?: boolean;
  onExpandClick?: (value: boolean) => void;
}
