export interface RestResponse {
  code: string | number;
  data: any;
  message: string;
}

/**
 * 接口返回CODE
 */
export const restCode = {
  /**
   * 成功返回值
   */
  success: '000000',
  /**
   * 成功返回值2
   */
  success2: 0,
  /**
   * 失败
   */
  failure: '111111',
  /**
   * 其他返回
   */
  other: '000500',
};
