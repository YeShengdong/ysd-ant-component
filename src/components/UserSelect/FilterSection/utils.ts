import { ROOT_FILTER_STACK } from '../config';
import { FilterKeyTypeEnum } from '../data';
import { FilterParamTypeEnum } from '../interface';

export const getListApiFilter = (filterStack: any[]) => {
  if (!filterStack?.length) {
    return {};
  }

  return filterStack.reduce((acc, cur) => {
    const { params = {} } = cur;

    return { ...acc, ...params };
  }, {});
};

export const checkIsArrayParam = (type?: FilterParamTypeEnum): boolean => type === FilterParamTypeEnum.Array;

export const checkHasPagination = (data?: any): boolean => !!data?.pageSize;

export const checkIsRootKey = (value: FilterKeyTypeEnum): boolean => value === FilterKeyTypeEnum.根目录;

export const getRemainingFilterStack = (currentData: any[], config: any): any[] => {
  const remainingData: any[] = [];
  const { key } = config;

  if (checkIsRootKey(key)) {
    remainingData.push(ROOT_FILTER_STACK);
  } else {
    for (let i = 0; i < currentData.length; i++) {
      const item = currentData[i];
      const { key: itemKey } = item;

      remainingData.push(item);

      if (itemKey === key) {
        break;
      }
    }
  }

  return remainingData;
};
