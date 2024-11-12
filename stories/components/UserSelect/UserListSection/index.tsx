import { Avatar, Checkbox, Input, Pagination, Spin } from 'antd';
import './index.less';
import { UserOutlined } from '@ant-design/icons';
import { useStoreContext } from '../StoreContextProvider';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { getPrefixCls, alertErrorMessage, isSuccessResponse } from '../../../utils';
import { DEFAULT_PAGINATION, PAGE_SIZE } from '../config';
import { isEmpty } from 'lodash-es';

const COMPONENT_CLASS = 'user-select-list';

export const UserListSection = ({ queryUserListService }: any) => {
  const { userList, updateUserList, selectedUserList, updateSelectedUserList, rootFilter } = useStoreContext();
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchFilterValue, setSearchFilterValue] = useState('');
  const [pagination, setPagination] = useState<{ current?: number } | null>(null);
  const [totalSize, setTotalSize] = useState<number | null>();

  const hasUsers = !!totalSize;
  const prefixCls = getPrefixCls(COMPONENT_CLASS);

  const selectedUserIds = useMemo(() => selectedUserList.map(({ account }) => account), [selectedUserList]);

  const isAllSelected = useMemo(() => {
    return !userList.some(({ account }) => !selectedUserIds.includes(account));
  }, [userList, selectedUserList]);

  const clearListStatus = () => {
    setTotalSize(null);
    setPagination({ ...DEFAULT_PAGINATION });
    updateUserList([]);
  };

  useEffect(() => {
    clearListStatus();
  }, [rootFilter, searchFilterValue]);

  useEffect(() => {
    const delayTime = 200;
    let abortController: AbortController | null = null;

    const queryUserList = async () => {
      if (!searchFilterValue && isEmpty(rootFilter)) {
        return;
      }

      setIsLoading(true);

      try {
        abortController = new AbortController();

        const apiPagination = pagination ? pagination : { current: 1 };
        const params = {
          queryModel: {
            ...rootFilter,
            userName: searchFilterValue,
          },
          pageSize: PAGE_SIZE,
          ...apiPagination,
        };
        const res = await queryUserListService(params, { signal: abortController.signal });

        if (!isSuccessResponse(res)) {
          throw new Error(res.message);
        }

        const { total, data } = res.data;

        setTotalSize(total);
        updateUserList(data);
      } catch (error) {
        alertErrorMessage(error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      queryUserList();
    }, delayTime);

    return () => {
      abortController?.abort();
      clearTimeout(timer);
    };
  }, [pagination]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setSearchValue(newValue);
  };

  const initPagination = () => {
    setPagination({ current: 1 });
  };

  const handleSearch = (value: string) => {
    setSearchFilterValue(value);
    initPagination();
  };

  const handleSelected = (e: any) => {
    const { checked, value: selectedId } = e.target;
    let newSelectedUserList = [...selectedUserList];

    if (checked) {
      const selectedUser = userList.find(({ account }) => account === selectedId);
      newSelectedUserList.push(selectedUser);
    } else {
      newSelectedUserList = newSelectedUserList.filter(({ account }) => account !== selectedId);
    }

    updateSelectedUserList(newSelectedUserList);
  };

  const handleAllSelected = (e: any) => {
    const { checked } = e.target;
    let newSelectedUserList = [...selectedUserList];

    if (checked) {
      const unselectedUserList = userList.filter(({ account }) => !selectedUserIds.includes(account));

      newSelectedUserList.push(...unselectedUserList);
    } else {
      const userIds = userList.map(({ account }) => account);

      newSelectedUserList = newSelectedUserList.filter(({ account }) => !userIds.includes(account));
    }

    updateSelectedUserList(newSelectedUserList);
  };

  const checkIsSelected = (id: any) => {
    return selectedUserIds.includes(id);
  };

  const handlePaginationChange = (page: number) => {
    setPagination({ current: page });
  };

  return (
    <div className={`${prefixCls}-root`}>
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-search-wrap`}>
          <Input.Search
            placeholder="请输入用户名称"
            maxLength={16}
            onChange={handleSearchChange}
            onSearch={handleSearch}
            value={searchValue}
            allowClear
          />
        </div>
        {hasUsers && (
          <Checkbox onChange={handleAllSelected} checked={isAllSelected}>
            全选
          </Checkbox>
        )}
      </div>
      <div className={`${prefixCls}-content`}>
        <Spin spinning={isLoading}>
          <ul>
            {userList.map((item) => {
              const { userName, mobile, account } = item;

              return (
                <li key={account} className={`${prefixCls}-user-item`}>
                  <Checkbox onChange={handleSelected} value={account} checked={checkIsSelected(account)}></Checkbox>
                  <Avatar size="small" icon={<UserOutlined />} />
                  <span className={`${prefixCls}-name`}>
                    {userName}
                    {mobile ? `（${mobile}）` : null}
                  </span>
                </li>
              );
            })}
          </ul>
        </Spin>
      </div>
      {hasUsers ? (
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
