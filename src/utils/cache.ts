/**
 * LRU 缓存实现
 * 用于存储编译后的日期格式化函数
 */

/**
 * LRU 缓存类
 */
export class LRUCache<K, V> {
  private cache: Map<K, V>;
  private maxSize: number;

  /**
   * 构造函数
   * @param maxSize 缓存最大容量，默认 100
   */
  constructor(maxSize: number = 100) {
    this.cache = new Map<K, V>();
    this.maxSize = maxSize;
  }

  /**
   * 获取缓存项
   * @param key 缓存键
   * @returns 缓存值，不存在返回 undefined
   */
  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // 移动到末尾表示最近使用
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  /**
   * 设置缓存项
   * @param key 缓存键
   * @param value 缓存值
   */
  set(key: K, value: V): void {
    // 如果已存在，先删除
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // 缓存已满，删除最久未使用的项（Map 的第一个元素）
      const firstKeyResult = this.cache.keys().next();
      if (!firstKeyResult.done) {
        this.cache.delete(firstKeyResult.value);
      }
    }
    // 添加到末尾
    this.cache.set(key, value);
  }

  /**
   * 清空缓存
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * 获取缓存大小
   * @returns 缓存大小
   */
  size(): number {
    return this.cache.size;
  }
}
