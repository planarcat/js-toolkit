/**
 * 普通模式日期格式化函数
 * 直接解析格式化字符串，不使用编译缓存
 */

import { DateFormatOptions, DateInput } from '../types/date';
import { DEFAULT_DATE_FORMAT_OPTIONS, WEEKDAY_MAP } from '../utils/constants';

/**
 * 将各种输入类型安全地转换为 Date 对象
 * @param input - 日期输入
 * @returns 转换后的 Date 对象，无效输入返回当前时间
 */
export function safeParseDate(input: DateInput): Date {
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
 * 获取本地化的星期几
 * @param weekday - 星期几 (0-6)
 * @param options - 格式化选项
 * @returns 本地化的星期几字符串
 */
export function getLocalizedWeekday(
  weekday: number,
  options: DateFormatOptions,
): string {
  const lang = options.locale?.split('-')[0] || 'zh';

  // 处理自定义周名称映射
  if (options.weekdayNames) {
    if (Array.isArray(options.weekdayNames)) {
      // 如果是数组，只替换当前语言的周名称
      return options.weekdayNames[weekday];
    } else {
      // 如果是Record，检查是否有当前语言的映射，否则使用默认
      if (options.weekdayNames[lang]) {
        return options.weekdayNames[lang][weekday];
      }
    }
  }

  // 使用默认周名称映射
  return (
    WEEKDAY_MAP[lang as keyof typeof WEEKDAY_MAP]?.[weekday] ||
    WEEKDAY_MAP.zh[weekday]
  );
}

/**
 * 计算一年中的第几周 (ISO 8601)
 * @param date - 日期对象
 * @returns 周数
 */
export function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/**
 * 普通模式日期格式化函数
 * @param date - 日期对象
 * @param formatStr - 格式化字符串
 * @param options - 格式化选项
 * @returns 格式化后的日期字符串
 */
export function regularDateFormatter(
  date: Date,
  formatStr: string = 'YYYY-MM-DD HH:mm:ss',
  options: Partial<DateFormatOptions> = {},
): string {
  // 获取合并后的选项
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

  // 一年中的第几天
  const firstDayOfYear = new Date(year, 0, 1);
  const dayOfYear = Math.ceil(
    (date.getTime() - firstDayOfYear.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Unix 时间戳（基于 UTC 时间，使用 getUTC* 方法确保一致性）
  const timestampSeconds = Math.floor(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ) / 1000,
  );
  const timestampMilliseconds = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );

  // 12小时制
  const hours12 = hours % 12 || 12;
  const ampm = hours < 12 ? 'AM' : 'PM';
  const ampmLower = ampm.toLowerCase();

  // 周数
  const weekNumber = getWeekNumber(date);

  // 初始化结果
  let result = '';
  let i = 0;
  const length = formatStr.length;

  // 获取所有自定义格式化器，按长度降序排序，确保长标记优先匹配
  const customFormatters = mergedOptions.customFormatters
    ? Object.entries(mergedOptions.customFormatters).sort(
        ([a], [b]) => b.length - a.length,
      )
    : [];

  // 解析格式化字符串
  while (i < length) {
    let found = false;

    // 1. 检查自定义格式化器
    if (customFormatters.length > 0) {
      for (const [token, formatter] of customFormatters) {
        if (
          i + token.length <= length &&
          formatStr.slice(i, i + token.length) === token
        ) {
          // 检查前后是否为字母数字字符
          const prevChar = i > 0 ? formatStr[i - 1] : '';
          const nextChar =
            i + token.length < length ? formatStr[i + token.length] : '';
          const isPrevAlphaNum = /[a-zA-Z0-9]/.test(prevChar);
          const isNextAlphaNum = /[a-zA-Z0-9]/.test(nextChar);

          if (!isPrevAlphaNum && !isNextAlphaNum) {
            // 应用自定义格式化器
            result += formatter(date);
            i += token.length;
            found = true;
            break;
          }
        }
      }
    }

    if (found) continue;

    // 2. 4字符标记
    if (i + 4 <= length) {
      const token4 = formatStr.slice(i, i + 4);
      switch (token4) {
        case 'YYYY':
          result += year.toString().padStart(4, '0');
          i += 4;
          found = true;
          break;
        case 'MMMM':
          result += date.toLocaleString(
            mergedOptions.locale || DEFAULT_DATE_FORMAT_OPTIONS.locale,
            { month: 'long' },
          );
          i += 4;
          found = true;
          break;
      }
    }
    // 3. 3字符标记
    if (!found && i + 3 <= length) {
      const token3 = formatStr.slice(i, i + 3);
      switch (token3) {
        case 'YYY':
          result += year.toString();
          i += 3;
          found = true;
          break;
        case 'MMM':
          result += date.toLocaleString(
            mergedOptions.locale || DEFAULT_DATE_FORMAT_OPTIONS.locale,
            { month: 'short' },
          );
          i += 3;
          found = true;
          break;
        case 'DDD':
          result += dayOfYear.toString().padStart(3, '0');
          i += 3;
          found = true;
          break;
        case 'HHH':
          result += hours.toString().padStart(3, '0');
          i += 3;
          found = true;
          break;
        case 'hhh':
          result += hours12.toString().padStart(3, '0');
          i += 3;
          found = true;
          break;
        case 'mmm':
          result += minutes.toString().padStart(3, '0');
          i += 3;
          found = true;
          break;
        case 'sss':
          result += seconds.toString().padStart(3, '0');
          i += 3;
          found = true;
          break;
        case 'SSS':
          result += milliseconds.toString().padStart(3, '0');
          i += 3;
          found = true;
          break;
      }
    }
    // 4. 2字符标记
    if (!found && i + 2 <= length) {
      const token2 = formatStr.slice(i, i + 2);
      switch (token2) {
        case 'YY':
          result += year.toString().slice(-2);
          i += 2;
          found = true;
          break;
        case 'MM':
          result += month.toString().padStart(2, '0');
          i += 2;
          found = true;
          break;
        case 'DD':
          result += day.toString().padStart(2, '0');
          i += 2;
          found = true;
          break;
        case 'HH':
          result += hours.toString().padStart(2, '0');
          i += 2;
          found = true;
          break;
        case 'hh':
          result += hours12.toString().padStart(2, '0');
          i += 2;
          found = true;
          break;
        case 'mm':
          result += minutes.toString().padStart(2, '0');
          i += 2;
          found = true;
          break;
        case 'ss':
          result += seconds.toString().padStart(2, '0');
          i += 2;
          found = true;
          break;
        case 'WW':
          result += weekNumber.toString().padStart(2, '0');
          i += 2;
          found = true;
          break;
        case 'dd':
          result += getLocalizedWeekday(weekday, mergedOptions);
          i += 2;
          found = true;
          break;
      }
    }
    // 5. 单字符标记
    if (!found) {
      const token = formatStr[i];
      switch (token) {
        case 'Y':
          result += year.toString();
          break;
        case 'M':
          result += month.toString();
          break;
        case 'D':
          result += day.toString();
          break;
        case 'H':
          result += hours.toString();
          break;
        case 'h':
          result += hours12.toString();
          break;
        case 'm':
          result += minutes.toString();
          break;
        case 's':
          result += seconds.toString();
          break;
        case 'S':
          result += milliseconds.toString();
          break;
        case 'W':
          result += weekNumber.toString();
          break;
        case 'd':
          result += weekday.toString();
          break;
        case 'Q':
          result += quarter.toString();
          break;
        case 'A':
          result += ampm;
          break;
        case 'a':
          result += ampmLower;
          break;
        case 'X':
          result += timestampSeconds.toString();
          break;
        case 'x':
          result += timestampMilliseconds.toString();
          break;
        default:
          // 普通字符，直接添加
          result += token;
          break;
      }
      i++;
    }
  }

  return result;
}
