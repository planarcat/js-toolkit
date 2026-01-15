/*
 * 防抖选项接口
 */
export interface DebounceOptions {
  /**
   * 防抖延迟时间，默认500ms
   */
  delay?: number;
}

/**
 * 防抖处理后的函数接口
 * @template T - 函数类型
 */
export interface DebouncedFunction<T extends unknown[]> {
  (...args: T): void;
  /**
   * 取消当前正在执行的函数调用
   */
  cancel(): void;
}
