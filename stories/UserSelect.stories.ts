import type { Meta, StoryObj } from "@storybook/react";

import { UserSelect } from "./components";
import {
  areaListApiData,
  marketBrandListApiData,
  marketListApiData,
  roleListApiData,
  storeListApiData,
  userListApiData,
} from "./components/UserSelect/demo/data";

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

export const Primary: Story = {
  args: {
    name: "选择对象",
    queryUserListService: getUserList,
    queryStoreListService: getStoreList,
    queryRoleListService: getRoleList,
    queryAreaListService: getAreaList,
    queryMarketListService: getMarketList,
    queryMarketBrandListService: getMarketBrandList,
  },
};
