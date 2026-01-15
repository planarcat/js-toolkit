/**
 * @planarcat/js-toolkit - 现代化的 JavaScript/TypeScript 工具库
 *
 * @module @planarcat/js-toolkit
 */

// 日期相关工具
export { default as formatDate } from "./date/formatDate";
export type { DateFormatOptions, DateInput } from "./types/date";

// 函数相关工具
export { default as debounce } from "./function/debounce";
export type { DebounceOptions, DebouncedFunction } from "./types/function";

// 工具库元数据
export const VERSION = "__VERSION__"; // 构建时替换
export const LIBRARY_NAME = "@planarcat/js-toolkit";

// 对象相关工具
export { default as toFormattedNumber } from "./object/toFormattedNumber";
export type { ToFormattedNumberOptions } from "./types/object";

// 工具函数（后续添加）
// export { default as toNumber } from './number/toNumber';
