import { ReactNode } from 'react';

type Filter = Record<string, any>;

export interface User {
  account: string;
  userName: string;
  mobile?: string;
}

export interface StoreContextValue {
  rootFilter: Filter;
  updateRootFilter: (value: Filter) => void;
  userList: any[];
  updateUserList: (value: any[]) => void;
  selectedUserList: any[];
  updateSelectedUserList: (value: any[]) => void;
  clearStatus: () => void;
}

export interface UserSelectProps {
  value?: User[];
  onChange?: (value: User[]) => void;
  disabled?: boolean;
  name?: string;
  children?: ReactNode;
  isShowSelectedInfo?: boolean;
  queryUserListService: (params: any, options: any) => Promise<any>;
  queryStoreListService: (params: any, options: any) => Promise<any>;
  queryRoleListService: (params: any, options: any) => Promise<any>;
  queryAreaListService: (params: any, options: any) => Promise<any>;
  queryMarketListService: (params: any, options: any) => Promise<any>;
  queryMarketBrandListService: (params: any, options: any) => Promise<any>;
}

export enum FilterParamTypeEnum {
  Array,
}
