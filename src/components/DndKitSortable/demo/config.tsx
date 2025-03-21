export enum WorkBenchSectionEnum {
  餐饮 = '10010101',
  KTV = '10010102',
  女装 = '10010104',
  童装 = '10010108',
  日历 = '10010110',
  服务台 = '10010111',
}

export const GRID_COLUMN_COUNT = 6;

export const DEFAULT_WRAPPER_STYLE = {
  gridRowStart: `span ${GRID_COLUMN_COUNT}`,
  gridColumnStart: `span ${GRID_COLUMN_COUNT}`,
  // height: 300,
};

export const SECTION_CONFIG: any = {
  // [WorkBenchSectionEnum.餐饮]: {
  //   content: <h1>餐饮</h1>,
  //   // wrapperStyle: {
  //   //   gridRowStart: 'span 2',
  //   //   gridColumnStart: 'span 2',
  //   // },
  // },
};

export const DEFAULT_LAYOUT_ORDER = [
  WorkBenchSectionEnum.餐饮,
  WorkBenchSectionEnum.KTV,
  WorkBenchSectionEnum.女装,
  WorkBenchSectionEnum.童装,
  WorkBenchSectionEnum.日历,
  WorkBenchSectionEnum.服务台,
];
