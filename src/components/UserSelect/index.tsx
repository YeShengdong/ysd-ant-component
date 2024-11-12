import { Button, Modal, Typography } from 'antd';
import React, { Children, cloneElement, useMemo, useState } from 'react';
import './index.less';
import { getPrefixCls } from '../../utils';
import { UserSelectProps } from './interface';
import { SelectedUserSection } from './SelectedUserSection';
import { StoreContextProvider, useStoreContext } from './StoreContextProvider';
import { FilterSection } from './FilterSection';
import { UserListSection } from './UserListSection';

const { Text } = Typography;

const COMPONENT_CLASS = 'user-select';

const UserSelectContainer = ({
  name = '选择用户',
  children,
  value,
  onChange,
  disabled = false,
  isShowSelectedInfo = true,
  queryUserListService,
  ...filterSectionService
}: UserSelectProps) => {
  const { selectedUserList, updateSelectedUserList, clearStatus } = useStoreContext();
  const [open, setOpen] = useState(false);

  const prefixCls = getPrefixCls(COMPONENT_CLASS);

  const initSelectedUserList = (newValue?: any[]) => {
    updateSelectedUserList([...(newValue || [])]);
  };

  const hideModal = () => {
    setOpen(false);
    clearStatus();
  };

  const handleButtonClick = () => {
    initSelectedUserList(value);
    setOpen(true);
  };

  const handleConfirmed = () => {
    onChange?.(selectedUserList);
    hideModal();
  };

  const handleCanceled = () => {
    hideModal();
  };

  const renderButton = () => {
    if (!children) {
      return (
        <Button type="primary" disabled={disabled} onClick={handleButtonClick}>
          {name}
        </Button>
      );
    }

    try {
      Children.only(children);

      return Children.map(children, (child: any) => {
        return cloneElement(child, {
          onClick: () => {
            child.props.onClick?.();
            handleButtonClick();
          },
        });
      });
    } catch (error) {
      console.error(error);
    }

    return null;
  };

  const selectedUserInfo = useMemo(() => {
    if (!value?.length || !isShowSelectedInfo) {
      return null;
    }

    const usersString = value.map(({ userName }) => userName).join('，');

    return (
      <div className={`${prefixCls}-value-info-container`}>
        <Text ellipsis={{ tooltip: usersString }}>已选对象：{usersString}</Text>
      </div>
    );
  }, [value]);

  return (
    <>
      {renderButton()}
      {selectedUserInfo}
      <Modal
        title="选择用户"
        open={open}
        onOk={handleConfirmed}
        onCancel={handleCanceled}
        width={850}
        destroyOnClose={true}
        okText="确认"
        cancelText="取消"
      >
        <div className={`${prefixCls}-root`}>
          <section className={`${prefixCls}-filter-section`}>
            <FilterSection {...filterSectionService} />
          </section>
          <section className={`${prefixCls}-user-list-section`}>
            <UserListSection queryUserListService={queryUserListService} />
          </section>
          <section className={`${prefixCls}-selected-user-section`}>
            <SelectedUserSection />
          </section>
        </div>
      </Modal>
    </>
  );
};

export const UserSelect = (props: UserSelectProps) => {
  return (
    <StoreContextProvider>
      <UserSelectContainer {...props} />
    </StoreContextProvider>
  );
};
