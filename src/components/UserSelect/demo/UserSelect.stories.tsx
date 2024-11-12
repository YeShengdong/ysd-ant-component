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
  const [value, setValue] = useState(null);
  const [isPrimary, setIsPrimary] = useState(false);
 
  const getUserList = () => {
    return Promise.resolve(userListApiData);
  };
  
  const getStoreList = () => {
    return Promise.resolve(storeListApiData);
  };
  
  const getRoleList = () => {
    return Promise.resolve(roleListApiData);
  };
  
  const getAreaList = () => {
    return Promise.resolve(areaListApiData);
  };
  
  const getMarketList = () => {
    return Promise.resolve(marketListApiData);
  };
  
  const getMarketBrandList = () => {
    return Promise.resolve(marketBrandListApiData);
  };

  const handleChange = (newValue) => {
    if (!isPrimary) {
      setIsPrimary(true);
      setValue(newValue);
    }
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
    value
  }

  return <UserSelect {...userSelectProps} />;
};


export const Demo: Story = {
  render: () => <UserSelectWithHooks />,
};
