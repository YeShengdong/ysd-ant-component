import { DimensionalityEnum, FilterKeyTypeEnum } from './data';
import { FilterParamTypeEnum } from './interface';

export const PAGE_SIZE = 20;

export const DEFAULT_PAGINATION = { current: 1 };

export const ROOT_FILTER_STACK = { label: '用户维度', key: FilterKeyTypeEnum.根目录 };

export const getTreeFilterConfig = ({
  queryStoreListService,
  queryRoleListService,
  queryAreaListService,
  queryMarketListService,
  queryMarketBrandListService,
}: any) => {
  return {
    key: FilterKeyTypeEnum.根目录,
    children: [
      {
        key: 'restaurant',
        label: '餐厅列表',
        dimensionalityId: DimensionalityEnum.项目维度,
        child: {
          key: 'restaurantList',
          service: queryStoreListService,
          search: {
            placeholder: '请输入餐厅名称or餐厅编号',
            apiField: 'keyWord',
          },
          paramKey: 'storeId',
          child: {
            key: 'restaurantRoleList',
            service: queryRoleListService,
            paramKey: 'roleIds',
            selectable: true,
          },
        },
      },
      {
        key: 'regionMarket',
        label: '区域-市场',
        dimensionalityId: DimensionalityEnum.区域维度,
        child: {
          key: 'regionMarketRegion',
          service: queryAreaListService,
          paramKey: 'areaIds',
          paramType: FilterParamTypeEnum.Array,
          selectable: true,
          child: {
            key: 'regionMarketMarket',
            service: queryMarketListService,
            paramKey: 'marketIds',
            paramType: FilterParamTypeEnum.Array,
            selectable: true,
            child: {
              key: 'regionMarketRoleList',
              service: queryRoleListService,
              paramKey: 'roleIds',
              selectable: true,
            },
          },
        },
      },
      {
        key: 'marketBrand',
        label: '市场-品牌',
        dimensionalityId: DimensionalityEnum.市场品牌维度,
        child: {
          key: 'marketBrandMarketList',
          service: queryMarketListService,
          paramKey: 'marketIds',
          paramType: FilterParamTypeEnum.Array,
          selectable: true,
          child: {
            key: 'marketBrandMarketBrandList',
            service: queryMarketBrandListService,
            paramKey: 'brandIds',
            paramType: FilterParamTypeEnum.Array,
            selectable: true,
            child: {
              key: 'marketBrandMarketBrandRoleList',
              service: queryRoleListService,
              paramKey: 'roleIds',
              selectable: true,
            },
          },
        },
      },
      {
        key: 'role',
        label: '角色',
        dimensionalityId: DimensionalityEnum.角色维度,
        child: {
          key: 'roleList',
          service: queryRoleListService,
          paramKey: 'roleIds',
          selectable: true,
          search: {
            placeholder: '请输入角色名称',
            apiField: 'keyWord',
          },
        },
      },
    ],
  };
};
