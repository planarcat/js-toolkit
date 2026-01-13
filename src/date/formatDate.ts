import { DateInput, DateFormatOptions } from '../types/date';
import { 
  DEFAULT_DATE_FORMAT_OPTIONS, 
  WEEKDAY_MAP 
} from '../utils/constants';

/**
 * 将各种输入类型安全地转换为 Date 对象
 * @param input - 日期输入
 * @returns 转换后的 Date 对象，无效输入返回当前时间
 * @internal
 */
function safeParseDate(input: DateInput): Date {
  if (input instanceof Date && !isNaN(input.getTime())) {
    return input;
  }
  
  if (typeof input === 'string' || typeof input === 'number') {
    const date = new Date(input);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }
  
  // 无效输入返回当前时间
  console.warn(`Invalid date input: ${input}, using current date instead.`);
  return new Date();
}

/**
 * 计算一年中的第几周 (ISO 8601)
 * @param date - 日期对象
 * @returns 周数
 * @internal
 */
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/**
 * 获取本地化的星期几
 * @param weekday - 星期几 (0-6)
 * @param options - 格式化选项
 * @returns 本地化的星期几字符串
 * @internal
 */
function getLocalizedWeekday(
  weekday: number, 
  options: DateFormatOptions
): string {
  const lang = options.locale?.split('-')[0] || 'zh';
  return WEEKDAY_MAP[lang as keyof typeof WEEKDAY_MAP]?.[weekday] 
    || WEEKDAY_MAP.zh[weekday];
}

/**
 * 格式化日期对象
 * 
 * @example
 * ```typescript
 * import { formatDate } from '@planarcat/js-toolkit';
 * 
 * // 基本使用
 * formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
 * // 返回: "2023-12-25 14:30:45"
 * 
 * // 自定义格式
 * formatDate('2023-12-25', 'YYYY年MM月DD日');
 * // 返回: "2023年12月25日"
 * 
 * // 显示周几
 * formatDate(new Date(), 'HH:mm', { showWeekday: true });
 * // 返回: "周一 14:30"
 * 
 * // 英文环境
 * formatDate(new Date(), 'dd', { locale: 'en-US' });
 * // 返回: "Mon"
 * 
 * // 自定义格式化器
 * formatDate(new Date(), '第Q季度', {
 *   customFormatters: {
 *     '第Q季度': (date) => `第${Math.floor((date.getMonth() + 3) / 3)}季度`
 *   }
 * });
 * // 返回: "第4季度"
 * ```
 * 
 * @param input - 要格式化的日期输入，可以是 Date 对象、时间戳、日期字符串
 * @param formatStr - 格式化字符串，支持 YYYY-MM-DD HH:mm:ss 等标记
 * @param options - 格式化选项
 * @returns 格式化后的日期字符串
 */
function formatDate(
  input: DateInput,
  formatStr: string = 'YYYY-MM-DD HH:mm:ss',
  options: Partial<DateFormatOptions> = {}
): string {
  const date = safeParseDate(input);
  const mergedOptions = { ...DEFAULT_DATE_FORMAT_OPTIONS, ...options };
  
  // 获取日期各部分
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  const weekday = date.getDay();
  const quarter = Math.floor((date.getMonth() + 3) / 3);
  const weekNumber = getWeekNumber(date);
  
  // 12小时制
  const hours12 = hours % 12 || 12;
  const ampm = hours < 12 ? 'AM' : 'PM';
  const ampmLower = ampm.toLowerCase();
  
  // 1. 首先处理完整的单词标记（如 timestamp）
  let result = formatStr;
  
  // 优先替换 timestamp，避免被拆解
  if (result.includes('timestamp')) {
    result = result.replace(/timestamp/g, date.getTime().toString());
  }
  
  // 2. 应用自定义格式化器（优先级最高）
  if (mergedOptions.customFormatters) {
    Object.entries(mergedOptions.customFormatters).forEach(([token, formatter]) => {
      const escapedToken = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(?<![a-zA-Z0-9])${escapedToken}(?![a-zA-Z0-9])`, 'g');
      result = result.replace(regex, formatter(date));
    });
  }
  
  // 3. 替换多字符标记（2-4个字符）
  const multiCharReplacements: Record<string, string> = {
    'YYYY': year.toString().padStart(4, '0'),
    'YY': year.toString().slice(-2),
    'MM': month.toString().padStart(2, '0'),
    'DD': day.toString().padStart(2, '0'),
    'HH': hours.toString().padStart(2, '0'),
    'hh': hours12.toString().padStart(2, '0'),
    'mm': minutes.toString().padStart(2, '0'),
    'ss': seconds.toString().padStart(2, '0'),
    'SSS': milliseconds.toString().padStart(3, '0'),
    'WW': weekNumber.toString().padStart(2, '0'),
    'dd': getLocalizedWeekday(weekday, mergedOptions),
  };
  
  Object.entries(multiCharReplacements).forEach(([token, value]) => {
    // 使用单词边界或字符串边界来确保精确匹配
    const regex = new RegExp(`\\b${token}\\b|${token}(?![a-zA-Z0-9])`, 'g');
    result = result.replace(regex, value);
  });
  
  // 4. 替换单字符标记（使用更精确的匹配）
  const singleCharReplacements: Record<string, string> = {
    'Y': year.toString(),
    'M': month.toString(),
    'D': day.toString(),
    'H': hours.toString(),
    'h': hours12.toString(),
    'm': minutes.toString(),
    's': seconds.toString(),
    'W': weekNumber.toString(),
    'd': weekday.toString(),
    'Q': quarter.toString(),
    'A': ampm,
    'a': ampmLower,
  };
  
  Object.entries(singleCharReplacements).forEach(([token, value]) => {
    // 单字符需要更精确的匹配：前面是边界或特定字符，后面不是相同字符
    const regex = new RegExp(`(?<![a-zA-Z0-9])${token}(?![a-zA-Z0-9])`, 'g');
    result = result.replace(regex, value);
  });
  
  // 添加周几前缀
  if (mergedOptions.showWeekday) {
    const weekdayStr = getLocalizedWeekday(weekday, mergedOptions);
    result = `${mergedOptions.weekdayFormat}${weekdayStr} ${result}`;
  }
  
  return result;
}

export default formatDate;