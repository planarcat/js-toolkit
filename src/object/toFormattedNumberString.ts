/**
 * 将任意对象转化为格式化的数字字符串
 *
 * 该函数先使用toFormattedNumber将对象转化为数字，再对数字进行字符串格式化
 * 支持多种输入类型，包括数字、字符串、布尔值、null、undefined、数组等
 * 支持深层数组递归处理
 *
 * @param object - 要格式化的对象，可以是任何类型
 * @param options - 格式化选项
 * @param options.decimalPlaces - 保留多少位小数，默认true（保留所有小数位）
 *                               true: 保留所有小数位，不额外处理
 *                               number: 保留指定小数位，不够时补0
 * @param options.nanValue - 当值为NaN时的显示，默认'NaN'
 * @param options.zeroValue - 当值为0时的显示，默认'0'
 * @param options.localized - 是否使用本地化格式，默认false
 * @param options.preProcessor - 预处理函数，在数字转换后、字符串格式化前应用
 *                               接收两个参数：原始对象和转化后的数字
 * @param options.prefix - 前缀，字符串或函数
 *                          如果是函数，会接收三个参数：原始对象、转化后的数字、格式化后的字符串，返回字符串作为前缀
 * @param options.suffix - 后缀，字符串或函数
 *                          如果是函数，会接收三个参数：原始对象、转化后的数字、格式化后的字符串，返回字符串作为后缀
 *
 * @returns 格式化后的数字字符串或字符串数组
 *          - 当传入的 object 为非数组时，返回 string
 *          - 当传入的 object 为数组时，返回 string[]
 *          - 支持深层数组递归处理
 *
 * @example
 * ```typescript
 * // 单个数字值
 * toFormattedNumberString(123.456); // "123.456"
 *
 * // 保留两位小数，不够时补0
 * toFormattedNumberString(123.4, { decimalPlaces: 2 }); // "123.40"
 *
 * // 带前缀后缀
 * toFormattedNumberString(123.456, { prefix: '$', suffix: ' USD' }); // "$123.456 USD"
 *
 * // 本地化格式
 * toFormattedNumberString(1234567.89, { localized: true }); // "1,234,567.89"
 * // 兼容旧的useLocalizedFormat参数
 * toFormattedNumberString(1234567.89, { useLocalizedFormat: true }); // "1,234,567.89"
 *
 * // 自定义NaN和0显示
 * toFormattedNumberString(null, { nanValue: 'N/A' }); // "N/A"
 * toFormattedNumberString(0, { zeroValue: '-' }); // "-"
 *
 * // 预处理函数
 * toFormattedNumberString(0.1234, {
 *   preProcessor: (original, num) => num * 100,
 *   suffix: '%'
 * }); // "12.34%"
 *
 * // 函数类型前缀
 * toFormattedNumberString(123.456, {
 *   prefix: (original, num, formatted) => `$${Math.floor(num)}`
 * }); // "$123123.456"
 *
 * // 函数类型后缀
 * toFormattedNumberString(123.456, {
 *   suffix: (original, num, formatted) => `/${num.toFixed(0)}`
 * }); // "123.456/123"
 *
 * // 处理数组
 * toFormattedNumberString([123.456, '789.012'], { decimalPlaces: 2 }); // ["123.46", "789.01"]
 *
 * // 处理深层数组
 * toFormattedNumberString([[1, '1.23'], ['45.67', [89.01, 'abc']]], { decimalPlaces: 2 });
 * // 返回: [["1.00", "1.23"], ["45.67", ["89.01", "NaN"]]]
 * ```
 */
import toFormattedNumber from "./toFormattedNumber";

// 函数重载定义 - 数组输入
function toFormattedNumberString(
  object: unknown[],
  options?: import("../types/object").ToFormattedNumberStringOptions,
): string[];
// 函数重载定义 - 单个值输入
function toFormattedNumberString(
  object: unknown,
  options?: import("../types/object").ToFormattedNumberStringOptions,
): string;
// 主函数实现
function toFormattedNumberString(
  object: unknown,
  options?: import("../types/object").ToFormattedNumberStringOptions,
): string | string[] {
  // 解构并设置默认值
  const {
    decimalPlaces = true,
    nanValue = "NaN",
    zeroValue = "0",
    localized,
    preProcessor,
    prefix = "",
    suffix = "",
  } = options || {};

  /**
   * 添加前缀和后缀
   * @param prefix - 前缀
   * @param suffix - 后缀
   * @param formatted - 格式化后的字符串
   * @param converted - 转化后的数字
   * @param original - 原始对象
   * @returns 添加了前缀后缀的字符串
   */
  const addPrefixSuffix = (
    prefix:
      | string
      | ((original: unknown, converted: number, formatted: string) => string),
    suffix:
      | string
      | ((original: unknown, converted: number, formatted: string) => string),
    formatted: string,
    converted: number,
    original: unknown,
  ): string => {
    let processedPrefix: string;
    if (typeof prefix === "function") {
      processedPrefix = prefix(original, converted, formatted);
    } else {
      processedPrefix = prefix;
    }
    let processedSuffix: string;
    if (typeof suffix === "function") {
      processedSuffix = suffix(original, converted, formatted);
    } else {
      processedSuffix = suffix;
    }
    return `${processedPrefix}${formatted}${processedSuffix}`;
  };

  /**
   * 将单个数字转换为格式化字符串
   * @param converted - 转化后的数字
   * @param original - 原始对象
   * @returns 格式化后的字符串
   */
  const convertNumberToString = (
    converted: number,
    original: unknown,
  ): string => {
    // 处理0情况
    if (converted === 0) {
      return addPrefixSuffix(prefix, suffix, zeroValue, converted, original);
    }

    // 应用预处理函数
    const processedNum = preProcessor
      ? preProcessor(original, converted)
      : converted;

    // 格式化数字为字符串
    let strNum: string;
    if (localized) {
      // 使用本地化格式
      if (decimalPlaces === true) {
        // 保留所有小数位
        strNum = processedNum.toLocaleString();
      } else {
        // 保留指定小数位，不够时补0
        strNum = processedNum.toLocaleString(undefined, {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        });
      }
    } else {
      // 使用非本地化格式
      if (decimalPlaces === true) {
        // 保留所有小数位
        strNum = processedNum.toString();
      } else {
        // 保留指定小数位，不够时补0
        strNum = processedNum.toFixed(decimalPlaces);
      }
    }

    // 添加前缀和后缀
    return addPrefixSuffix(prefix, suffix, strNum, processedNum, original);
  };

  /**
   * 检查字符串是否包含数字
   * @param str - 要检查的字符串
   * @returns 是否包含数字
   */
  const hasNumbers = (str: string): boolean => {
    return /\d/.test(str);
  };

  /**
   * 递归处理值，转换为格式化字符串
   * @param value - 要处理的值
   * @param original - 原始对象或数组元素
   * @returns 格式化后的字符串或字符串数组
   */
  const processValue = (
    value: unknown,
    original: unknown = object,
  ): string | string[] => {
    if (Array.isArray(value)) {
      // 递归处理数组
      return value.map((item, _index) => processValue(item, item)) as string[];
    } else {
      // 检查是否为无数字的字符串
      if (typeof value === "string" && !hasNumbers(value)) {
        // 无数字的字符串返回0
        return addPrefixSuffix(prefix, suffix, zeroValue, 0, original);
      }

      // 对于其他类型，首先将输入转换为数字
      // 注意：toFormattedNumber对于单个值会返回number类型
      const num = toFormattedNumber(value, {
        decimalPlaces,
        nanValue: NaN,
      }) as number;

      // 检查是否为NaN
      if (isNaN(num)) {
        // 其他NaN情况，使用nanValue
        return addPrefixSuffix(prefix, suffix, nanValue, num, original);
      }

      // 正常数字转换
      return convertNumberToString(num, original);
    }
  };

  // 处理输入值
  return processValue(object);
}

export default toFormattedNumberString;
