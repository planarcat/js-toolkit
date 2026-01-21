/**
 * 默认格式化选项
 */
export const DEFAULT_DATE_FORMAT_OPTIONS = {
  timeZone: 'local' as const,
  locale: 'zh-CN',
};

/**
 * 周几中英文映射
 */
export const WEEKDAY_MAP: Record<
  string,
  [string, string, string, string, string, string, string]
> = {
  zh: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  en: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
};

/**
 * 小数位格式化选项
 */

// 可扩展多个标记的写法
// declare const DECIMAL_OPTIONS_BRAND: unique symbol;
// type DecimalOptionBase = {
//   readonly [DECIMAL_OPTIONS_BRAND]: typeof DECIMAL_OPTIONS_BRAND;
// };
// /**
//  * 保留所有小数位的特殊标记类型
//  */
// export type RetainAll = DecimalOptionBase & {
//   readonly type: 'retain-all';
// };
// // 创建工厂函数
// const createDecimalOption = <T extends DecimalOptionBase & { type: string }>(
//   type: T['type']
// ): T => {
//   return {
//     [DECIMAL_OPTIONS_BRAND]: DECIMAL_OPTIONS_BRAND,
//     type
//   } as T;
// };
// // 导出所有特殊值
// export const RETAIN_ALL: RetainAll =
//   createDecimalOption('retain-all');

// 只需要一个标记的更简洁的写法
const RETAIN_ALL_BRAND = Symbol('RETAIN_ALL_BRAND');

interface RETAIN_ALL {
  readonly [RETAIN_ALL_BRAND]: typeof RETAIN_ALL_BRAND;
}

// 联合类型，方便使用
export type DecimalPlacesOptions = number | RETAIN_ALL;

const RETAIN_ALL: RETAIN_ALL = Object.freeze({
  [RETAIN_ALL_BRAND]: RETAIN_ALL_BRAND,
} as RETAIN_ALL);
export const DecimalPlacesOptions = {
  RETAIN_ALL,
};
