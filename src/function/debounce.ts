import { DebounceOptions, DebouncedFunction } from "@/types/debounce";

/**
 * 将函数进行防抖处理
 * @param fn - 需要防抖处理的函数
 * @param options - 配置选项
 * @param options.delay - 防抖延迟时间，默认500ms
 * @returns 防抖处理后的函数，带有cancel方法
 */
function debounce<T extends unknown[]>(
  fn: (...args: T) => void,
  options: DebounceOptions = {},
): DebouncedFunction<T> {
  const { delay = 500 } = options;

  let timer: NodeJS.Timeout | null = null;

  const debounced = function (this: ThisParameterType<T>, ...args: T) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    const self = this;
    timer = setTimeout(() => {
      fn.apply(self, args);
    }, delay);
  } as DebouncedFunction<T>;

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced;
}

export default debounce;
