import debounce from '@/function/debounce';

describe('debounce', () => {
  // 控制 setTimeout 的时间
  jest.useFakeTimers();

  afterEach(() => {
    // 清除所有定时器
    jest.clearAllTimers();
  });

  it('应在延迟后执行函数', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();

    // 立即检查，函数不应被调用
    expect(mockFn).not.toHaveBeenCalled();

    // 推进时间到延迟结束
    jest.advanceTimersByTime(100);

    // 检查函数是否被调用
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('应在多次调用时只执行最后一次', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    // 快速连续调用3次
    debouncedFn();
    debouncedFn();
    debouncedFn();

    // 推进时间到延迟结束
    jest.advanceTimersByTime(100);

    // 检查函数是否只被调用一次
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('应能正确传递参数', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    // 带参数调用
    debouncedFn('param1', 123, { key: 'value' });

    // 推进时间
    jest.advanceTimersByTime(100);

    // 检查参数是否正确传递
    expect(mockFn).toHaveBeenCalledWith('param1', 123, { key: 'value' });
  });

  it('应能正确绑定 this 上下文', () => {
    interface Context {
      value: number;
    }

    const context: Context = { value: 42 };
    const mockFn = jest.fn(function (this: Context) {
      expect(this.value).toBe(42);
    });

    const debouncedFn = debounce(mockFn, 100);

    // 使用 call 绑定上下文
    debouncedFn.call(context);

    // 推进时间
    jest.advanceTimersByTime(100);

    // 检查函数是否被调用
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('应支持取消功能', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();

    // 取消调用
    debouncedFn.cancel();

    // 推进时间
    jest.advanceTimersByTime(100);

    // 检查函数是否未被调用
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('应使用默认延迟时间（100ms）', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn); // 未指定延迟

    debouncedFn();

    // 推进99ms，函数不应被调用
    jest.advanceTimersByTime(99);
    expect(mockFn).not.toHaveBeenCalled();

    // 再推进1ms，达到100ms
    jest.advanceTimersByTime(1);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('应在取消后重新调用时正常执行', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    // 第一次调用后取消
    debouncedFn();
    debouncedFn.cancel();

    // 重新调用
    debouncedFn();

    // 推进时间
    jest.advanceTimersByTime(100);

    // 检查函数是否只被调用一次
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
