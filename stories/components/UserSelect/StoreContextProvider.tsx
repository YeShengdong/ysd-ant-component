import React, { createContext, ReactNode, useContext, useState } from 'react';
import { StoreContextValue } from './interface';

const StoreContext = createContext<StoreContextValue>({
  userList: [],
  updateUserList: () => {},
  selectedUserList: [],
  updateSelectedUserList: () => {},
  rootFilter: {},
  updateRootFilter: () => {},
  clearStatus: () => {},
});

const useStoreValue = () => {
  const [userList, setUserList] = useState<any[]>([]);
  const [selectedUserList, setSelectedUserList] = useState<any[]>([]);
  const [rootFilter, setRootFilter] = useState<any>({});

  const clearStatus = () => {
    setUserList([]);
    setRootFilter({});
  };

  return {
    // isRootLoading,
    // updateIsRootLoading: setIsRootLoading,
    userList,
    updateUserList: setUserList,
    selectedUserList,
    updateSelectedUserList: setSelectedUserList,
    rootFilter,
    updateRootFilter: setRootFilter,
    clearStatus,
  };
};

export const StoreContextProvider = ({ children }: { children: ReactNode }) => {
  const value = useStoreValue();

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
