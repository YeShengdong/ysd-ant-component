import { RightOutlined, ShopOutlined } from '@ant-design/icons';
import { Breadcrumb, Checkbox, Input, Pagination, Spin } from 'antd';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import {
  alertErrorMessage,
  getPrefixCls,
  isSuccessResponse,
} from '../../../utils';
import { NoDataDisplay } from '../../NoDataDisplay';
import { useStoreContext } from '../StoreContextProvider';
import {
  DEFAULT_PAGINATION,
  PAGE_SIZE,
  ROOT_FILTER_STACK,
  getTreeFilterConfig,
} from '../config';
import './index.less';
import {
  checkHasPagination,
  checkIsArrayParam,
  checkIsRootKey,
  getListApiFilter,
  getRemainingFilterStack,
} from './utils';
import { isNumber } from 'lodash-es';

const COMPONENT_CLASS = 'user-select-filter';

export const FilterSection = ({ ...queryServices }: any) => {
  const { updateRootFilter } = useStoreContext();
  const [isLoading, setIsLoading] = useState(false);
  const [treeFilterConfig, setTreeFilterConfig] = useState<any>(null);
  const [currentFilterConfig, setCurrentFilterConfig] = useState<any>(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchConfirmedValue, setSearchConfirmedValue] = useState('');
  const [listData, setListData] = useState([]);
  const [filterStack, setFilterStack] = useState<any>([ROOT_FILTER_STACK]);
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [pagination, setPagination] = useState<{ current?: number } | null>(
    null,
  );
  const [totalSize, setTotalSize] = useState<number | null>(null);

  const prefixCls = getPrefixCls(COMPONENT_CLASS);
  const { selectable = false } = currentFilterConfig || {};
  const hasData = !!listData?.length;

  const isAllSelected = useMemo(() => {
    return !listData.some(({ value }) => !selectedIds.includes(value));
  }, [selectedIds, listData]);

  useEffect(() => {
    const newConfig = getTreeFilterConfig({
      ...queryServices,
    });

    setTreeFilterConfig(newConfig);
  }, []);

  useEffect(() => {
    if (!currentFilterConfig) {
      return;
    }

    let abortController: AbortController | null = null;

    const updateListData = async () => {
      const { service, search } = currentFilterConfig;

      if (search && !searchConfirmedValue) {
        return;
      }

      setIsLoading(true);

      try {
        abortController = new AbortController();

        const apiFilter = getListApiFilter(filterStack);
        const params: any = {
          queryModel: {
            ...apiFilter,
          },
          ...pagination,
          pageSize: PAGE_SIZE,
        };

        if (search) {
          const { apiField: searchApiField } = search;

          params.queryModel[searchApiField] = searchConfirmedValue;
        }

        const res = await service(params, { signal: abortController.signal });

        if (!isSuccessResponse(res)) {
          throw new Error(res.message);
        }

        const hasPagination = checkHasPagination(res.data);

        if (hasPagination) {
          const { data, total } = res.data;

          setTotalSize(total);
          setListData(data);
        } else {
          setTotalSize(null);
          setListData(res.data);
        }
      } catch (error) {
        alertErrorMessage(error);
      } finally {
        setIsLoading(false);
      }
    };

    updateListData();

    return () => {
      abortController?.abort();
    };
  }, [currentFilterConfig, searchConfirmedValue, pagination]);

  useEffect(() => {
    const { paramKey } = currentFilterConfig || {};
    const stackFilter = getListApiFilter(filterStack);
    const newRootFilter = selectedIds?.length
      ? { ...stackFilter, [paramKey]: selectedIds }
      : {};

    updateRootFilter(newRootFilter);
  }, [selectedIds]);

  const clearListStatus = () => {
    setSearchValue('');
    setSearchConfirmedValue('');
    setListData([]);
    setTotalSize(null);
    setPagination({ ...DEFAULT_PAGINATION });

    if (selectedIds.length) {
      setSelectedIds([]);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setSearchValue(newValue);
  };

  const handleSearchConfirmed = (value: string) => {
    setSearchConfirmedValue(value);
  };

  const handleSelected = (e: any) => {
    const { checked, value } = e.target;
    let newSelectedIds = [...selectedIds];

    if (checked) {
      newSelectedIds.push(value);
    } else {
      newSelectedIds = newSelectedIds.filter((v) => v !== value);
    }

    setSelectedIds(newSelectedIds);
  };

  const handleCheckBoxClick = (e: any) => {
    e.stopPropagation();
  };

  const checkIsSelected = (v: any) => {
    return selectedIds.includes(v);
  };

  const handleAllSelected = (e: any) => {
    const { checked } = e.target;
    let newSelectedIds: any[] = [];

    if (checked) {
      const unselectedItem = listData
        .filter(({ value }) => !selectedIds.includes(value))
        .map(({ value }) => value);

      newSelectedIds = [...selectedIds, ...unselectedItem];
    }

    setSelectedIds(newSelectedIds);
  };

  const handlePaginationChange = (page: number) => {
    setPagination({ current: page });
  };

  const handleBreadcrumbClick = (data: any) => {
    const { key } = data;
    const newFilterStack = getRemainingFilterStack(filterStack, data);

    if (checkIsRootKey(key)) {
      setCurrentFilterConfig(null);
    } else {
      const { filterConfig } = data;
      setCurrentFilterConfig(filterConfig);
    }

    setFilterStack(newFilterStack);
    clearListStatus();
  };

  const handleNextClick = ({ stackConfig, filterConfig }: any) => {
    const newFilterStack = [...(filterStack || []), stackConfig];

    setFilterStack(newFilterStack);
    setCurrentFilterConfig(filterConfig);
    clearListStatus();
  };

  const renderSearchSection = () => {
    const { search } = currentFilterConfig || {};

    if (!search) {
      return null;
    }

    const { placeholder = '请输入' } = search;

    return (
      <div className={`${prefixCls}-search-wrap`}>
        <Input.Search
          placeholder={placeholder}
          maxLength={30}
          onChange={handleSearchChange}
          onSearch={handleSearchConfirmed}
          value={searchValue}
          allowClear
        />
      </div>
    );
  };

  const renderFilterList = () => {
    if (!currentFilterConfig) {
      const { children = [] } = treeFilterConfig || {};

      return (
        <ul>
          {children.map(({ key, label, child, dimensionalityId }: any) => {
            const stackConfig = {
              label,
              key,
              params: {
                dimensionalityId,
              },
              filterConfig: { ...child },
            };

            const clickFn = () =>
              handleNextClick({ stackConfig, filterConfig: child });

            return (
              <li key={key} className={`${prefixCls}-item`} onClick={clickFn}>
                <span className={`${prefixCls}-icon`}>
                  <ShopOutlined />
                </span>
                <span className={`${prefixCls}-name`}>{label}</span>
                <RightOutlined className={`${prefixCls}-next`} />
              </li>
            );
          })}
        </ul>
      );
    }

    if (!listData?.length) {
      return <NoDataDisplay />;
    }

    const { child, key, paramKey, paramType } = currentFilterConfig;
    const isArrayParam = checkIsArrayParam(paramType);
    const hasChild = !!child;

    return (
      <ul>
        {listData.map(({ label, value, alias, totalNumber }: any) => {
          const stackConfig = {
            label,
            key,
            params: {
              [paramKey]: isArrayParam ? [value] : value,
            },
            filterConfig: { ...child },
          };

          const totalText = isNumber(totalNumber)
            ? `（${totalNumber}）`
            : void 0;
          const clickFn = hasChild
            ? () => handleNextClick({ stackConfig, filterConfig: child })
            : void 0;

          return (
            <li key={value} className={`${prefixCls}-item`} onClick={clickFn}>
              {selectable && (
                <Checkbox
                  value={value}
                  checked={checkIsSelected(value)}
                  onChange={handleSelected}
                  onClick={handleCheckBoxClick}
                ></Checkbox>
              )}
              <span className={`${prefixCls}-name`}>
                {alias || label}
                {totalText}
              </span>
              {hasChild ? (
                <RightOutlined className={`${prefixCls}-next`} />
              ) : null}
            </li>
          );
        })}
      </ul>
    );
  };

  const breadcrumbItems = useMemo(() => {
    if (!filterStack?.length) {
      return null;
    }

    return filterStack.map((item: any, index: number) => {
      const { label } = item;

      if (index === filterStack.length - 1) {
        return {
          title: label,
        };
      }

      return {
        title: <a onClick={() => handleBreadcrumbClick(item)}>{label}</a>,
      };
    });
  }, [filterStack]);

  return (
    <div className={`${prefixCls}-root`}>
      <div className={`${prefixCls}-header`}>
        <Breadcrumb
          className={`${prefixCls}-bread-crumb`}
          items={breadcrumbItems}
        />
        {renderSearchSection()}
        {hasData && selectable && (
          <Checkbox onChange={handleAllSelected} checked={isAllSelected}>
            全选
          </Checkbox>
        )}
      </div>
      <div className={`${prefixCls}-content`}>
        <Spin spinning={isLoading}>{renderFilterList()}</Spin>
      </div>
      {totalSize ? (
        <div className={`${prefixCls}-footer`}>
          <Pagination
            {...pagination}
            total={totalSize}
            simple
            pageSize={PAGE_SIZE}
            onChange={handlePaginationChange}
            showSizeChanger={false}
          />
        </div>
      ) : null}
    </div>
  );
};
