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
  | "MMMM" // 完整月份名称
  | "MMM" // 月份缩写
  | "MM"
  | "M" // 月
  | "DDD" // 一年中的第几天
  | "DD"
  | "D"
  | "Do" // 带序数词的日期
  | "HH"
  | "H" // 时 (24小时制)
  | "hh"
  | "h" // 时 (12小时制)
  | "mm"
  | "m" // 分
  | "ss"
  | "s" // 秒
  | "SSS" // 3位毫秒
  | "S" // 毫秒
  | "A"
  | "a" // 上午/下午
  | "dddd" // 完整星期名称
  | "ddd" // 星期缩写
  | "d" // 星期数字 (0-6, 0=周日)
  | "WW"
  | "W" // 周
  | "Q" // 季度
  | "X" // Unix时间戳 (秒)
  | "x" // Unix时间戳 (毫秒)
  | "timestamp"; // 时间戳

/**
 * 可接受的日期输入类型
 */
export type DateInput = Date | string | number | null | undefined;
