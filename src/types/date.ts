/**
 * 日期格式化选项接口
 */
export interface DateFormatOptions {
  /**
   * 时区设置
   * @default 'local'
   */
  timeZone?: "local" | "utc";

  /**
   * 语言环境
   * @default 'zh-CN'
   */
  locale?: string;

  /**
   * 自定义格式化处理器
   */
  customFormatters?: Record<string, (date: Date) => string>;
}

/**
 * 支持的格式化标记
 */
export type DateFormatToken =
  | "YYYY"
  | "YY" // 年
  | "MM"
  | "M" // 月
  | "DD"
  | "D" // 日
  | "HH"
  | "H" // 时 (24小时制)
  | "hh"
  | "h" // 时 (12小时制)
  | "mm"
  | "m" // 分
  | "ss"
  | "s" // 秒
  | "SSS" // 毫秒
  | "A"
  | "a" // 上午/下午
  | "d" // 星期几 (0-6)
  | "dd" // 本地化星期几
  | "WW"
  | "W" // 周
  | "Q" // 季度
  | "timestamp"; // 时间戳

/**
 * 可接受的日期输入类型
 */
export type DateInput = Date | string | number | null | undefined;
