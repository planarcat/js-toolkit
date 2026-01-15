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
  nanDisplay?: number;
}
