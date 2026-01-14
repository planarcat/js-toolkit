/**
 * 默认格式化选项
 */
export const DEFAULT_DATE_FORMAT_OPTIONS = {
  timeZone: "local" as const,
  locale: "zh-CN",
};

/**
 * 周几中英文映射
 */
export const WEEKDAY_MAP: Record<string, string[]> = {
  zh: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  en: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};
