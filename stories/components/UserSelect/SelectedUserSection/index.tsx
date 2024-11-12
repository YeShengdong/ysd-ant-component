import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import React from 'react';
import { getPrefixCls } from '../../../utils';
import { useStoreContext } from '../StoreContextProvider';
import './index.less';

const COMPONENT_CLASS = 'user-select-value';

export const SelectedUserSection = () => {
  const { selectedUserList, updateSelectedUserList } = useStoreContext();

  const prefixCls = getPrefixCls(COMPONENT_CLASS);
  const userNumber = selectedUserList.length;

  const onClearAllClick = () => {
    updateSelectedUserList([]);
  };

  const handleDeleteClick = (id: string) => {
    const newSelectedUserList = selectedUserList.filter(
      ({ account }) => account !== id,
    );

    updateSelectedUserList(newSelectedUserList);
  };

  return (
    <div className={`${prefixCls}-root`}>
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-header-wrap`}>
          <div>已选：{userNumber}个成员</div>
          <Button type="link" onClick={onClearAllClick}>
            全部清除
          </Button>
        </div>
      </div>
      <div className={`${prefixCls}-content`}>
        <ul>
          {selectedUserList.map((item) => {
            const { account, userName, mobile } = item;

            return (
              <li key={account} className={`${prefixCls}-user-item`}>
                <Avatar size="small" icon={<UserOutlined />} />
                <span className={`${prefixCls}-name`}>
                  {userName}
                  {mobile ? `（${mobile}）` : null}
                </span>
                <span
                  className={`${prefixCls}-delete`}
                  onClick={() => handleDeleteClick(account)}
                >
                  <DeleteOutlined />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
