import { ReactNode } from 'react';
import { RestResponse } from '../../constants';

type Filter = Record<string, any>;

export interface User {
  account: string;
  userName: string;
  mobile?: string;
}

export interface StoreContextValue {
  rootFilter: Filter;
  updateRootFilter: (value: Filter) => void;
  userList: User[];
  updateUserList: (value: User[]) => void;
  selectedUserList: User[];
  updateSelectedUserList: (value: User[]) => void;
  clearStatus: () => void;
}

export interface FilterOptions {
  label: string;
  value: string | number;
}

export interface UserSelectProps {
  value?: User[];
  onChange?: (value: User[]) => void;
  disabled?: boolean;
  name?: string;
  children?: ReactNode;
  isShowSelectedInfo?: boolean;
  queryUserListService: (params: any, options: any) => Promise<RestResponse>;
  queryStoreListService: (params: any, options: any) => Promise<RestResponse>;
  queryRoleListService: (params: any, options: any) => Promise<RestResponse>;
  queryAreaListService: (params: any, options: any) => Promise<RestResponse>;
  queryMarketListService: (params: any, options: any) => Promise<RestResponse>;
  queryMarketBrandListService: (params: any, options: any) => Promise<RestResponse>;
}

export enum FilterParamTypeEnum {
  Array,
}
