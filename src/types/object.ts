/**
 * 公共格式化选项接口
 */
export interface CommonFormatOptions {
  /**
   * 保留多少位小数，
   * 默认true（保留所有小数位，不额外处理），
   * 可选值：number(保留指定小数位) | true(保留所有小数位，不额外处理)。
   */
  decimalPlaces?: number | true;
}

/**
 * toFormattedNumber 函数的选项接口
 */
export interface ToFormattedNumberOptions extends CommonFormatOptions {
  /**
   * 当值为NaN时的显示，
   * 默认NaN。
   */
  nanValue?: number;
}

/**
 * toFormattedNumberString 函数的选项接口
 */
export interface ToFormattedNumberStringOptions extends CommonFormatOptions {
  /**
   * 当值为NaN时的显示，
   * 默认'NaN'。
   */
  nanValue?: string;
  /**
   * 当值为0时的显示，
   * 默认'0'。
   */
  zeroValue?: string;
  /**
   * 是否显示本地化，
   * 默认false。
   */
  useLocalizedFormat?: boolean;
  /**
   * 预处理函数，在对象被处理为数字后调用，
   * 默认无。
   */
  preProcessor?: (num: number) => number;
  /**
   * 前缀，
   * 默认''。
   */
  prefix?: string;
  /**
   * 后缀，
   * 默认''。
   */
  suffix?: string;
}
