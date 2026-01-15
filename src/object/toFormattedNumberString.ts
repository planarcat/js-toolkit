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
 * @param options.useLocalizedFormat - 是否使用本地化格式，默认false
 * @param options.preProcessor - 预处理函数，在数字转换后、字符串格式化前应用
 * @param options.prefix - 前缀，可以是字符串或函数，默认''
 *                          如果是函数，会接收格式化前的数字作为参数，返回字符串作为前缀
 * @param options.suffix - 后缀，可以是字符串或函数，默认''
 *                          如果是函数，会接收格式化前的数字作为参数，返回字符串作为后缀
 *
 * @returns 格式化后的数字字符串或字符串数组
 *          - 如果输入是单个值，返回格式化后的字符串
 *          - 如果输入是数组，返回格式化后的字符串数组
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
 * toFormattedNumberString(1234567.89, { useLocalizedFormat: true }); // "1,234,567.89"
 *
 * // 自定义NaN和0显示
 * toFormattedNumberString(null, { nanValue: 'N/A' }); // "N/A"
 * toFormattedNumberString(0, { zeroValue: '-' }); // "-"
 *
 * // 预处理函数
 * toFormattedNumberString(0.1234, {
 *   preProcessor: (num) => num * 100,
 *   suffix: '%'
 * }); // "12.34%"
 *
 * // 函数类型前缀
 * toFormattedNumberString(123.456, {
 *   prefix: (num) => `$${Math.floor(num)}`
 * }); // "$123123.456"
 *
 * // 函数类型后缀
 * toFormattedNumberString(123.456, {
 *   suffix: (num) => `/${num.toFixed(0)}`
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
): string | string[];
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
    useLocalizedFormat = false,
    preProcessor,
    prefix = "",
    suffix = "",
  } = options || {};

  /**
   * 处理前缀或后缀，可以是字符串或函数
   * @param prefixOrSuffix - 前缀或后缀，可以是字符串或函数
   * @param num - 要传递给函数的数字
   * @returns 处理后的前缀或后缀字符串
   */
  const processPrefixSuffix = (
    prefixOrSuffix: string | ((value: number) => string),
    num: number,
  ): string => {
    if (typeof prefixOrSuffix === "function") {
      return prefixOrSuffix(num);
    }
    return prefixOrSuffix;
  };

  /**
   * 添加前缀和后缀
   * @param str - 要添加前缀后缀的字符串
   * @param num - 要传递给前缀后缀函数的数字
   * @returns 添加了前缀后缀的字符串
   */
  const addPrefixSuffix = (str: string, num: number): string => {
    const processedPrefix = processPrefixSuffix(prefix, num);
    const processedSuffix = processPrefixSuffix(suffix, num);
    return `${processedPrefix}${str}${processedSuffix}`;
  };

  /**
   * 将单个数字转换为格式化字符串
   * @param num - 要转换的数字
   * @returns 格式化后的字符串
   */
  const convertNumberToString = (num: number): string => {
    // 处理0情况
    if (num === 0) {
      return addPrefixSuffix(zeroValue, num);
    }

    // 应用预处理函数
    const processedNum = preProcessor ? preProcessor(num) : num;

    // 格式化数字为字符串
    let strNum: string;
    if (useLocalizedFormat) {
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
    return addPrefixSuffix(strNum, processedNum);
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
   * @returns 格式化后的字符串或字符串数组
   */
  const processValue = (value: unknown): string | string[] => {
    if (Array.isArray(value)) {
      // 递归处理数组
      return value.map(processValue) as string[];
    } else {
      // 检查是否为无数字的字符串
      if (typeof value === "string" && !hasNumbers(value)) {
        // 无数字的字符串返回0
        return addPrefixSuffix(zeroValue, 0);
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
        return addPrefixSuffix(nanValue, num);
      }

      // 正常数字转换
      return convertNumberToString(num);
    }
  };

  // 处理输入值
  return processValue(object);
}

export default toFormattedNumberString;
