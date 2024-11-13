import type { Meta, StoryObj } from "@storybook/react";
import { UserSelect } from "../";
import {
  areaListApiData,
  marketBrandListApiData,
  marketListApiData,
  roleListApiData,
  storeListApiData,
  userListApiData,
} from "./data";
import React, { useState } from "react";
import { User } from "../interface";

const meta: Meta<typeof UserSelect> = {
  title: "Example/UserSelect",
  component: UserSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UserSelect>;

const UserSelectWithHooks = () => {
  const [value, setValue] = useState<User[]>([]);

  const getUserList = (): any => {
    return Promise.resolve(userListApiData);
  };

  const getStoreList = (): any => {
    return Promise.resolve(storeListApiData);
  };

  const getRoleList = (): any => {
    return Promise.resolve(roleListApiData);
  };

  const getAreaList = (): any => {
    return Promise.resolve(areaListApiData);
  };

  const getMarketList = (): any => {
    return Promise.resolve(marketListApiData);
  };

  const getMarketBrandList = (): any => {
    return Promise.resolve(marketBrandListApiData);
  };

  const handleChange = (newValue: User[]) => {
    setValue(newValue);
  };

  const userSelectProps = {
    name: "选择对象",
    queryUserListService: getUserList,
    queryStoreListService: getStoreList,
    queryRoleListService: getRoleList,
    queryAreaListService: getAreaList,
    queryMarketListService: getMarketList,
    queryMarketBrandListService: getMarketBrandList,
    onChange: handleChange,
    value,
  };

  return (
    <div style={{ width: 300 }}>
      <UserSelect {...userSelectProps} />
    </div>
  );
};

export const Demo: Story = {
  render: () => <UserSelectWithHooks />,
};
