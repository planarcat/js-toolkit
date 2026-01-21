import { DecimalPlacesOptions } from '../utils/constants';

/**
 * 公共格式化选项接口
 */
export interface CommonFormatOptions {
  /**
   * 保留多少位小数，
   * 默认DecimalPlacesOptions.RETAIN_ALL（保留所有小数位，不额外处理），
   * 可选值：number(保留指定小数位) | DecimalPlacesOptions.RETAIN_ALL(保留所有小数位，不额外处理)。
   */
  decimalPlaces?: DecimalPlacesOptions;
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
   * 是否使用本地化格式，
   * 默认false。
   */
  localized?: boolean;
  /**
   * 预处理函数，在对象被处理为数字后调用，
   * 默认无。
   * 接收参数：原始对象、转化后的数字，返回处理后的数字
   */
  preProcessor?: (original: unknown, converted: number) => number;
  /**
   * 前缀，字符串或函数，
   * 函数接收参数：原始对象、转化后数字、格式化后的字符串，返回字符串。
   */
  prefix?:
    | string
    | ((original: unknown, converted: number, formatted: string) => string);
  /**
   * 后缀，字符串或函数，
   * 函数接收参数：原始对象、转化后数字、格式化后的字符串，返回字符串。
   */
  suffix?:
    | string
    | ((original: unknown, converted: number, formatted: string) => string);
}
