import { DecimalPlacesOptions } from '../utils/constants';

/**
 * 从字符串中提取数字部分
 * @param str - 输入字符串
 * @returns 提取的数字字符串
 */
function extractNumberFromString(str: string): string {
  // 匹配数字体系：0~9，小数点，正负号，科学计数法
  const match = str.match(/[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/);
  return match ? match[0] : '';
}

/**
 * 将单个值转换为数字
 * @param value - 输入值
 * @returns 转换后的数字
 */
function convertToNumber(value: unknown): number {
  switch (typeof value) {
    case 'number':
      return value;
    case 'string': {
      const numStr = extractNumberFromString(value);
      return numStr ? Number(numStr) : 0;
    }
    case 'boolean':
      return value ? 1 : 0;
    case 'function':
    case 'symbol':
      return NaN;
    case 'object':
      if (value === null) {
        return NaN;
      }
      // 其他对象类型返回NaN
      return NaN;
    case 'undefined':
      return NaN;
    default:
      return NaN;
  }
}

/**
 * 将任意对象转化为数字，然后根据格式化参数对转化后的数字进行格式化
 *
 * 该函数支持多种输入类型，包括数字、字符串、布尔值、null、undefined、数组等
 * 对于字符串，会提取其中的数字部分进行转换
 * 支持深层数组递归处理
 *
 * @param object - 要格式化的目标
 * @param options - 格式化选项，具体参数说明见类型声明
 *
 * @returns 格式化后的数字或数字数组
 *          - 当传入的 object 为非数组时，返回 number
 *          - 当传入的 object 为数组时，返回 number[]
 *          - 支持深层数组递归处理
 *
 * @example
 * ```typescript
 * // 单个数字值
 * toFormattedNumber(123.456); // 123.456
 *
 * // 字符串中的数字提取
 * toFormattedNumber('123.456abc'); // 123.456
 * toFormattedNumber('abc123.456def'); // 123.456
 * toFormattedNumber('1.23e3'); // 1230
 *
 * // 布尔值转换
 * toFormattedNumber(true); // 1
 * toFormattedNumber(false); // 0
 *
 * // 特殊类型处理
 * toFormattedNumber(null); // NaN
 * toFormattedNumber(undefined); // NaN
 * toFormattedNumber(Symbol('test')); // NaN
 * toFormattedNumber(() => {}); // NaN
 * toFormattedNumber('abc'); // 0
 * toFormattedNumber(''); // 0
 *
 * // 一维数组
 * toFormattedNumber([123.456, '456.789def']); // [123.456, 456.789]
 *
 * // 深层数组
 * toFormattedNumber([[1, '1', null], 'xxx', ['123a', ['123', '456ff']]]);
 * // 返回: [[1, 1, NaN], 0, [123, [123, 456]]]
 *
 * // 保留指定小数位
 * toFormattedNumber(123.456, { decimalPlaces: 2 }); // 123.46
 * toFormattedNumber(123.456, { decimalPlaces: 0 }); // 123
 *
 * // 自定义NaN显示
 * toFormattedNumber(null, { nanValue: 0 }); // 0
 * toFormattedNumber('abc', { nanValue: -1 }); // -1
 * ```
 */
// 函数重载定义 - 数组输入
function toFormattedNumber(
  object: unknown[],
  options?: import('../types/object').ToFormattedNumberOptions,
): number[];
// 函数重载定义 - 单个值输入
function toFormattedNumber(
  object: unknown,
  options?: import('../types/object').ToFormattedNumberOptions,
): number;
// 主函数实现
function toFormattedNumber(
  object: unknown,
  options?: import('../types/object').ToFormattedNumberOptions,
): number | number[] {
  // 解构并设置默认值
  const { decimalPlaces = DecimalPlacesOptions.RETAIN_ALL, nanValue = NaN } =
    options || {};

  /**
   * 格式化单个数字
   * @param num - 要格式化的数字
   * @returns 格式化后的数字
   */
  const formatSingleNumber = (num: number): number => {
    // 处理NaN情况
    if (isNaN(num)) {
      return nanValue;
    }

    // 根据decimalPlaces选项处理小数位
    if (typeof decimalPlaces === 'number') {
      // 保留指定小数位，四舍五入
      return Number(num.toFixed(decimalPlaces));
    } else {
      // 保留所有小数位，不额外处理
      return num;
    }
  };

  /**
   * 转换单个值为数字，支持深层数组递归处理
   * @param value - 要转换的值
   * @returns 转换后的数字或数字数组
   */
  const processValue = (value: unknown): number | number[] => {
    if (Array.isArray(value)) {
      // 递归处理深层数组
      return value.map(processValue) as number[];
    } else {
      // 转换为数字
      const num = convertToNumber(value);
      // 格式化数字
      return formatSingleNumber(num);
    }
  };

  // 处理输入值
  return processValue(object);
}

export default toFormattedNumber;
