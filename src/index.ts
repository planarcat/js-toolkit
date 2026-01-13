/**
 * @planarcat/js-toolkit - 现代化的 JavaScript/TypeScript 工具库
 * 
 * @module @planarcat/js-toolkit
 */

// 日期相关工具
export { default as formatDate } from './date/formatDate';
export type { DateFormatOptions, DateInput } from './types/date';

// 工具库元数据
export const VERSION = '__VERSION__'; // 构建时替换
export const LIBRARY_NAME = '@planarcat/js-toolkit';

// 工具函数（后续添加）
// export { default as toNumber } from './number/toNumber';
// export { default as debounce } from './function/debounce';