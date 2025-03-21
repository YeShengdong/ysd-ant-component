import React from 'react';
import { WorkableConfig } from './interface';
import { DEFAULT_WRAPPER_STYLE, SECTION_CONFIG, WorkBenchSectionEnum } from './config';

export const getItemByConfig = (sectionConfig: any) => {
  const { functionCode, functionName, wrapperStyle } = sectionConfig || {};

  return {
    content: <h2 className="dndPlaceholderName">{functionName}</h2>,
    wrapperStyle,
    ...SECTION_CONFIG[functionCode as WorkBenchSectionEnum],
    id: functionCode,
    name: functionName,
  };
};

export const getItemsByConfig = (sectionList: any[]) => {
  if (!sectionList?.length) {
    return [];
  }

  return sectionList.map((section) => {
    return getItemByConfig(section);
  });
};

export const getWrapperStyle = (sectionKey: WorkBenchSectionEnum) => {
  return SECTION_CONFIG[sectionKey]?.wrapperStyle || DEFAULT_WRAPPER_STYLE;
};

export const generateNewWorkableConfigs = (workableConfigs: WorkableConfig[], items: any[]) => {
  const configMap: any = new Map(
    workableConfigs.map((config) => [config.functionCode, { ...config, isShow: false, orderNo: 0 }])
  );

  items.forEach(({ id }, index) => {
    if (configMap.has(id)) {
      const config = configMap.get(id);

      config.isShow = true;
      config.orderNo = index + 1;
    }
  });

  return Array.from(configMap.values());
  // const newWorkableConfigs = workableConfigs.map((item: any) => ({ ...item, isShow: false, orderNo: 0 }));

  // for (let i = 0; i < items.length; i++) {
  //   const { id } = items[i];

  //   for (const config of newWorkableConfigs) {
  //     if (config.functionCode === id) {
  //       config.isShow = true;
  //       config.orderNo = i + 1;

  //       break;
  //     }
  //   }
  // }

  // return newWorkableConfigs;
};
