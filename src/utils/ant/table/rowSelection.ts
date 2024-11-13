import { Key } from 'react';

export interface SelectedRowKeyData {
  selectedRowKeys?: Key[];
  selectedRows?: Record<string, any>[];
}

export interface SelectedRowKeyGroup {
  [key: string]: SelectedRowKeyData;
}

const GROUP_KEY_PREFIX = 'page-';

export const updateSelectedRowKeyGroup = (
  groupData: SelectedRowKeyGroup | null,
  newData: SelectedRowKeyData,
  currentPage: number,
): SelectedRowKeyGroup => {
  const newGroup = groupData ? { ...groupData } : {};
  const groupKey = GROUP_KEY_PREFIX + currentPage;

  newGroup[groupKey] = { ...newData };

  return newGroup;
};

export const getSelectedRowDataFromKeyGroup = (
  groupData: SelectedRowKeyGroup | null,
  currentPage: number,
): SelectedRowKeyData => {
  const groupKey = GROUP_KEY_PREFIX + currentPage;

  return groupData?.[groupKey] || {};
};

export const getAllSelectedRowDataFromKeyGroup = (
  groupData: SelectedRowKeyGroup | null,
): { allSelectedRows: Record<string, any>[]; allSelectedRowKeys: Key[] } => {
  const allSelectedRows = [];
  const allSelectedRowKeys = [];

  if (groupData) {
    for (const key of Object.keys(groupData)) {
      const { selectedRowKeys = [], selectedRows = [] } = groupData[key];

      allSelectedRowKeys.push(...selectedRowKeys);
      allSelectedRows.push(...selectedRows);
    }
  }

  return {
    allSelectedRows,
    allSelectedRowKeys,
  };
};
