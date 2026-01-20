/**
 * 日期格式化编译函数
 * 将格式化字符串编译为高效的处理函数
 */

import { DateFormatOptions } from '../types/date';
import { LRUCache } from '../utils/cache';

/**
 * 编译后的日期格式化函数类型
 */
export type CompiledFormatter = (
  date: Date,
  options?: Partial<DateFormatOptions>,
) => string;

/**
 * 编译后的日期格式化函数缓存
 * 用于存储编译后的格式化函数，避免重复编译
 */
const compiledFormatCache = new LRUCache<string, CompiledFormatter>(100);

/**
 * 将格式化字符串编译为可直接执行的函数
 * @param formatStr 格式化字符串
 * @returns 编译后的格式化函数
 */
export function compileDateFormatter(formatStr: string): CompiledFormatter {
  // 检查缓存中是否已有编译后的函数
  const cachedFormatter = compiledFormatCache.get(formatStr);
  if (cachedFormatter) {
    return cachedFormatter;
  }
  // 生成函数代码
  const code = `
    // 默认格式化选项
    const DEFAULT_DATE_FORMAT_OPTIONS = { timeZone: "local", locale: "zh-CN" };
    // 周几中英文映射
    const WEEKDAY_MAP = { zh: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] };
    
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
    const dayOfYear = Math.ceil((date.getTime() - firstDayOfYear.getTime()) / (1000 * 60 * 60 * 24));
    
    // Unix 时间戳
    const timestampSeconds = Math.floor(date.getTime() / 1000);
    const timestampMilliseconds = date.getTime();
    
    // 12小时制
    const hours12 = hours % 12 || 12;
    const ampm = hours < 12 ? "AM" : "PM";
    const ampmLower = ampm.toLowerCase();
    
    // 获取本地化的星期几
    const getLocalizedWeekday = function(weekday, options) {
      const lang = options.locale?.split("-")[0] || "zh";
      
      // 处理自定义周名称映射
      if (options.weekdayNames) {
        if (Array.isArray(options.weekdayNames)) {
          // 如果是数组，只替换当前语言的周名称
          return options.weekdayNames[weekday] || WEEKDAY_MAP[lang]?.[weekday] || WEEKDAY_MAP.zh[weekday] || "日";
        } else {
          // 如果是Record，检查是否有当前语言的映射，否则使用默认
          if (options.weekdayNames[lang]) {
            return options.weekdayNames[lang][weekday] || WEEKDAY_MAP[lang]?.[weekday] || WEEKDAY_MAP.zh[weekday] || "日";
          }
        }
      }
      
      // 使用默认周名称映射
      return WEEKDAY_MAP[lang]?.[weekday] || WEEKDAY_MAP.zh[weekday] || "日";
    };
    
    // 月份名称和缩写
    const getMonthName = function(date, locale, full) {
      if (full === undefined) full = false;
      return date.toLocaleString(locale, { month: full ? "long" : "short" });
    };
    
    // 周数计算
    const getWeekNumber = function(date) {
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    };
    
    const weekNumber = getWeekNumber(date);
    
    // 处理自定义格式化器
    let finalFormat = "${formatStr}";
    if (mergedOptions.customFormatters) {
      // 直接替换原始格式字符串中的自定义标记
      // 不使用复杂的正则表达式，避免模板字符串语法冲突
      Object.entries(mergedOptions.customFormatters).forEach(function([token, formatter]) {
        // 简单的字符串替换，确保只替换完整标记
        let index = finalFormat.indexOf(token);
        while (index !== -1) {
          // 检查前后是否为字母数字字符
          const prevChar = index > 0 ? finalFormat[index - 1] : '';
          const nextChar = index + token.length < finalFormat.length ? finalFormat[index + token.length] : '';
          const isPrevAlphaNum = /[a-zA-Z0-9]/.test(prevChar);
          const isNextAlphaNum = /[a-zA-Z0-9]/.test(nextChar);
          
          if (!isPrevAlphaNum && !isNextAlphaNum) {
            // 替换完整标记
            const before = finalFormat.slice(0, index);
            const after = finalFormat.slice(index + token.length);
            finalFormat = before + formatter(date) + after;
            index = before.length + formatter(date).length;
          } else {
            // 跳过部分匹配
            index = finalFormat.indexOf(token, index + 1);
          }
        }
      });
    }
    
    // 初始化结果
    let result = "";
    let i = 0;
    const length = finalFormat.length;
    
    // 解析格式化字符串
    while (i < length) {
      let found = false;
      
      // 1. 4字符标记
      if (i + 4 <= length) {
        const token4 = finalFormat.slice(i, i + 4);
        switch (token4) {
          case 'YYYY':
            result += year.toString().padStart(4, "0");
            i += 4;
            found = true;
            break;
          case 'MMMM':
            result += getMonthName(date, mergedOptions.locale || DEFAULT_DATE_FORMAT_OPTIONS.locale, true);
            i += 4;
            found = true;
            break;
        }
      }
      // 3. 3字符标记
      if (!found && i + 3 <= length) {
        const token3 = finalFormat.slice(i, i + 3);
        switch (token3) {
          case 'YYY':
            result += year.toString();
            i += 3;
            found = true;
            break;
          case 'MMM':
            result += getMonthName(date, mergedOptions.locale || DEFAULT_DATE_FORMAT_OPTIONS.locale, false);
            i += 3;
            found = true;
            break;
          case 'DDD':
            result += dayOfYear.toString().padStart(3, "0");
            i += 3;
            found = true;
            break;
          case 'HHH':
            result += hours.toString().padStart(3, "0");
            i += 3;
            found = true;
            break;
          case 'hhh':
            result += hours12.toString().padStart(3, "0");
            i += 3;
            found = true;
            break;
          case 'mmm':
            result += minutes.toString().padStart(3, "0");
            i += 3;
            found = true;
            break;
          case 'sss':
            result += seconds.toString().padStart(3, "0");
            i += 3;
            found = true;
            break;
          case 'SSS':
            result += milliseconds.toString().padStart(3, "0");
            i += 3;
            found = true;
            break;
        }
      }
      // 4. 2字符标记
      if (!found && i + 2 <= length) {
        const token2 = finalFormat.slice(i, i + 2);
        switch (token2) {
          case 'YY':
            result += year.toString().slice(-2);
            i += 2;
            found = true;
            break;
          case 'MM':
            result += month.toString().padStart(2, "0");
            i += 2;
            found = true;
            break;
          case 'DD':
            result += day.toString().padStart(2, "0");
            i += 2;
            found = true;
            break;
          case 'HH':
            result += hours.toString().padStart(2, "0");
            i += 2;
            found = true;
            break;
          case 'hh':
            result += hours12.toString().padStart(2, "0");
            i += 2;
            found = true;
            break;
          case 'mm':
            result += minutes.toString().padStart(2, "0");
            i += 2;
            found = true;
            break;
          case 'ss':
            result += seconds.toString().padStart(2, "0");
            i += 2;
            found = true;
            break;
          case 'WW':
            result += weekNumber.toString().padStart(2, "0");
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
        const token = finalFormat[i];
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
            result += timestampSeconds;
            break;
          case 'x':
            result += timestampMilliseconds;
            break;
          default:
            result += token;
            break;
        }
        i++;
      }
    }
    
    return result;
  `;

  // 使用 new Function() 生成函数
  const formatter = new Function('date', 'options', code) as CompiledFormatter;

  // 缓存编译后的函数
  compiledFormatCache.set(formatStr, formatter);

  return formatter;
}
