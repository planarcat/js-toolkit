/**
 * 默认格式化选项
 */
export const DEFAULT_DATE_FORMAT_OPTIONS = {
  timeZone: 'local' as const,
  locale: 'zh-CN',
  showWeekday: false,
  weekdayFormat: '周',
};

/**
 * 周几中英文映射
 */
export const WEEKDAY_MAP: Record<string, string[]> = {
  zh: ['日', '一', '二', '三', '四', '五', '六'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};