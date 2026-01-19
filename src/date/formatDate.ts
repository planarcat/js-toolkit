import { DateFormatOptions, DateInput } from "../types/date";
import { DEFAULT_DATE_FORMAT_OPTIONS, WEEKDAY_MAP } from "../utils/constants";

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

  if (typeof input === "string" || typeof input === "number") {
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
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
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
  options: DateFormatOptions,
): string {
  const lang = options.locale?.split("-")[0] || "zh";
  return (
    WEEKDAY_MAP[lang as keyof typeof WEEKDAY_MAP]?.[weekday] ||
    WEEKDAY_MAP.zh[weekday]
  );
}

/**
 * 格式化日期对象
 *
 * @param input - 要格式化的日期输入，可以是 Date 对象、时间戳、日期字符串
 * @param formatStr - 格式化字符串，支持 YYYY-MM-DD HH:mm:ss 等标记，默认为 'YYYY-MM-DD HH:mm:ss'
 * @param options - 格式化选项，具体参数说明见类型声明
 * @returns 格式化后的日期字符串
 *
 * @example
 * ```typescript
 * import { formatDate } from '@planarcat/js-toolkit';
 *
 * // 基本使用（默认格式 'YYYY-MM-DD HH:mm:ss'）
 * formatDate(new Date());
 * // 返回: "2023-12-25 14:30:45"
 *
 * // 自定义格式
 * formatDate('2023-12-25', 'YYYY年MM月DD日');
 * // 返回: "2023年12月25日"
 * ```
 *
 * @remarks
 * ## 支持的格式化标记
 *
 * ### 年份
 * - `YYYY`: 4位年份 (2024)
 * - `YY`: 2位年份 (24)
 *
 * ### 月份
 * - `MMMM`: 完整月份名称 (January / 一月)
 * - `MMM`: 月份缩写 (Jan / 1月)
 * - `MM`: 2位月份 (01-12)
 * - `M`: 1-2位月份 (1-12)
 *
 * ### 日期
 * - `DDD`: 一年中的第几天 (001-366)
 * - `DD`: 2位日期 (01-31)
 * - `D`: 1-2位日期 (1-31)
 * - `Do`: 带序数词的日期 (1st, 2nd, 3rd, 4th / 1日, 2日, 3日)
 *
 * ### 星期
 * - `dddd`: 完整星期名称 (Monday / 星期一)
 * - `ddd`: 星期缩写 (Mon / 周一)
 * - `d`: 星期数字 (0-6, 0=周日)
 *
 * ### 时间
 * - `HH`: 24小时制，2位 (00-23)
 * - `H`: 24小时制，1-2位 (0-23)
 * - `hh`: 12小时制，2位 (01-12)
 * - `h`: 12小时制，1-2位 (1-12)
 * - `mm`: 2位分钟 (00-59)
 * - `m`: 1-2位分钟 (0-59)
 * - `ss`: 2位秒 (00-59)
 * - `s`: 1-2位秒 (0-59)
 * - `SSS`: 3位毫秒 (000-999)
 * - `S`: 毫秒 (0-999)
 *
 * ### 其他
 * - `A`: 大写AM/PM
 * - `a`: 小写am/pm
 * - `Q`: 季度 (1-4)
 * - `WW`: 2位周数 (01-53)
 * - `W`: 1-2位周数 (1-53)
 * - `X`: Unix时间戳 (秒)
 * - `x`: Unix时间戳 (毫秒)
 * - `timestamp`: Unix时间戳 (毫秒，与x相同)
 */
function formatDate(
  input: DateInput,
  formatStr: string = "YYYY-MM-DD HH:mm:ss",
  options: Partial<DateFormatOptions> = {},
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

  // 一年中的第几天
  const firstDayOfYear = new Date(year, 0, 1);
  const dayOfYear = Math.ceil(
    (date.getTime() - firstDayOfYear.getTime()) / (1000 * 60 * 60 * 24),
  );

  // 序数词后缀
  const getOrdinalSuffix = (num: number): string => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = num % 100;
    return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  };

  // Unix 时间戳
  const timestampSeconds = Math.floor(date.getTime() / 1000);
  const timestampMilliseconds = date.getTime();

  // 月份名称和缩写
  const getMonthName = (
    date: Date,
    locale: string,
    full: boolean = false,
  ): string => {
    return date.toLocaleString(locale, { month: full ? "long" : "short" });
  };

  // 星期名称和缩写
  const getWeekdayName = (
    date: Date,
    locale: string,
    full: boolean = false,
  ): string => {
    return date.toLocaleString(locale, { weekday: full ? "long" : "short" });
  };

  // 12小时制
  const hours12 = hours % 12 || 12;
  const ampm = hours < 12 ? "AM" : "PM";
  const ampmLower = ampm.toLowerCase();

  // 1. 首先处理完整的单词标记（如 timestamp）
  let result = formatStr;

  // 优先替换 timestamp，避免被拆解
  if (result.includes("timestamp")) {
    result = result.replace(/timestamp/g, date.getTime().toString());
  }

  // 2. 应用自定义格式化器（优先级最高）
  if (mergedOptions.customFormatters) {
    Object.entries(mergedOptions.customFormatters).forEach(
      ([token, formatter]) => {
        const escapedToken = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(
          `(?<![a-zA-Z0-9])${escapedToken}(?![a-zA-Z0-9])`,
          "g",
        );
        result = result.replace(regex, formatter(date));
      },
    );
  }

  // 3. 替换多字符标记（2-4个字符）
  // 注意：长标记需要先于短标记处理，避免被部分匹配
  const multiCharReplacements: Record<string, string> = {
    YYYY: year.toString().padStart(4, "0"),
    YY: year.toString().slice(-2),
    MMMM: getMonthName(
      date,
      mergedOptions.locale || DEFAULT_DATE_FORMAT_OPTIONS.locale,
      true,
    ),
    MMM: getMonthName(
      date,
      mergedOptions.locale || DEFAULT_DATE_FORMAT_OPTIONS.locale,
      false,
    ),
    MM: month.toString().padStart(2, "0"),
    DDD: dayOfYear.toString().padStart(3, "0"),
    DD: day.toString().padStart(2, "0"),
    HH: hours.toString().padStart(2, "0"),
    hh: hours12.toString().padStart(2, "0"),
    mm: minutes.toString().padStart(2, "0"),
    ss: seconds.toString().padStart(2, "0"),
    SSS: milliseconds.toString().padStart(3, "0"),
    WW: weekNumber.toString().padStart(2, "0"),
    dddd: getWeekdayName(
      date,
      mergedOptions.locale || DEFAULT_DATE_FORMAT_OPTIONS.locale,
      true,
    ),
    ddd: getWeekdayName(
      date,
      mergedOptions.locale || DEFAULT_DATE_FORMAT_OPTIONS.locale,
      false,
    ),
    dd: getLocalizedWeekday(weekday, mergedOptions),
    Do: `${day}${getOrdinalSuffix(day)}`,
    X: timestampSeconds.toString(),
    x: timestampMilliseconds.toString(),
  };

  Object.entries(multiCharReplacements).forEach(([token, value]) => {
    // 使用单词边界或字符串边界来确保精确匹配
    const regex = new RegExp(`\\b${token}\\b|${token}(?![a-zA-Z0-9])`, "g");
    result = result.replace(regex, value);
  });

  // 4. 替换单字符标记（使用更精确的匹配）
  const singleCharReplacements: Record<string, string> = {
    Y: year.toString(),
    M: month.toString(),
    D: day.toString(),
    H: hours.toString(),
    h: hours12.toString(),
    m: minutes.toString(),
    s: seconds.toString(),
    S: milliseconds.toString(),
    W: weekNumber.toString(),
    d: weekday.toString(),
    Q: quarter.toString(),
    A: ampm,
    a: ampmLower,
  };

  Object.entries(singleCharReplacements).forEach(([token, value]) => {
    // 单字符需要更精确的匹配：前面是边界或特定字符，后面不是相同字符
    const regex = new RegExp(`(?<![a-zA-Z0-9])${token}(?![a-zA-Z0-9])`, "g");
    result = result.replace(regex, value);
  });

  return result;
}

export default formatDate;
