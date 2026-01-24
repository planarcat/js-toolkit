# @planarcat/js-toolkit

一个现代化的 JavaScript/TypeScript 实用工具库，提供类型安全、高性能的常用函数。

[![npm version](https://img.shields.io/npm/v/@planarcat/js-toolkit.svg)](https://www.npmjs.com/package/@planarcat/js-toolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## ✨ 特性

- 🚀 **类型安全**: 完整的 TypeScript 支持，提供完整的类型定义
- 📦 **轻量级**: 零依赖，体积小巧
- 🎯 **高性能**: 优化的算法实现，智能缓存策略
- 🔧 **现代化**: 使用最新的 JavaScript/TypeScript 特性
- 📚 **学习性质**: 代码清晰，适合学习和参考
- 🔍 **智能优化**: 自动性能优化，如编译模式日期格式化

## 📦 安装

```bash
# 使用 npm
npm install @planarcat/js-toolkit

# 使用 yarn
yarn add @planarcat/js-toolkit

# 使用 pnpm
pnpm add @planarcat/js-toolkit
```

## 🚀 快速开始

### 基础使用

```typescript
import { 
  formatDate, 
  debounce, 
  toFormattedNumber, 
  toFormattedNumberString 
} from '@planarcat/js-toolkit';

// 日期格式化
console.log(formatDate(new Date()));
// 输出: "2023-12-25 14:30:45"

// 函数防抖
const debouncedFn = debounce(() => console.log('执行了!'), 500);
debouncedFn();

// 数字格式化
console.log(toFormattedNumber('123.456abc'));
// 输出: 123.456

console.log(toFormattedNumberString(1234.5678, { decimalPlaces: 2 }));
// 输出: "1,234.57"
```

### 在 React 中使用

```tsx
import React, { useState, useCallback } from 'react';
import { formatDate, debounce } from '@planarcat/js-toolkit';

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // 使用防抖优化搜索
  const handleSearch = useCallback(debounce((term: string) => {
    console.log('搜索:', term);
  }, 300), []);

  return (
    <div>
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="输入搜索关键词..."
      />
      <p>当前时间: {formatDate(new Date(), 'YYYY年MM月DD日 HH:mm')}</p>
    </div>
  );
};
```

## 📚 API 文档

### formatDate - 日期格式化

格式化日期对象，支持多种输入格式和自定义格式化字符串。

#### 基本用法

```typescript
import { formatDate } from '@planarcat/js-toolkit';

// 默认格式
formatDate(new Date()); // "2023-12-25 14:30:45"

// 自定义格式
formatDate('2023-12-25', 'YYYY年MM月DD日'); // "2023年12月25日"

// 显示周几
formatDate(new Date(), 'dd HH:mm'); // "周一 14:30"

// 英文环境
formatDate(new Date(), 'dd HH:mm', { locale: 'en-US' }); // "Monday 14:30"
```

#### 支持的格式化标记

| 标记 | 说明 | 示例 |
|------|------|------|
| `YYYY` | 4位年份 | 2024 |
| `YY` | 2位年份 | 24 |
| `MM` | 月份（01-12） | 01 |
| `M` | 月份（1-12） | 1 |
| `DD` | 日期（01-31） | 01 |
| `D` | 日期（1-31） | 1 |
| `HH` | 小时（00-23） | 14 |
| `H` | 小时（0-23） | 14 |
| `mm` | 分钟（00-59） | 05 |
| `m` | 分钟（0-59） | 5 |
| `ss` | 秒（00-59） | 09 |
| `s` | 秒（0-59） | 9 |
| `dd` | 周几（中文） | 周一 |
| `ddd` | 周几（英文缩写） | Mon |
| `dddd` | 周几（英文全称） | Monday |

#### 性能优化模式

```typescript
// 自动模式（默认）- 智能切换性能模式
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');

// 强制编译模式 - 高性能，适合频繁调用
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss', { mode: 'compile' });

// 强制普通模式 - 简单稳定
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss', { mode: 'regular' });
```

### debounce - 函数防抖

创建防抖函数，限制函数执行频率。

```typescript
import { debounce } from '@planarcat/js-toolkit';

// 基本用法
const debouncedFn = debounce(() => {
  console.log('函数执行了！');
}, 500);

// 多次调用，只会执行最后一次
debouncedFn();
debouncedFn();
debouncedFn(); // 500ms 后执行一次

// 取消执行
debouncedFn.cancel();

// 在事件处理中使用
const handleInput = debounce((event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  console.log('输入值:', value);
}, 300);

document.getElementById('search').addEventListener('input', handleInput);
```

### toFormattedNumber - 数字转换

将任意值转换为数字，支持多种输入类型。

```typescript
import { toFormattedNumber, DecimalPlacesOptions } from '@planarcat/js-toolkit';

// 基本使用
toFormattedNumber(1234.5678); // 1234.5678

// 保留两位小数
toFormattedNumber(1234.5678, { decimalPlaces: 2 }); // 1234.57

// 保留所有小数位
toFormattedNumber(1234.5678, {
  decimalPlaces: DecimalPlacesOptions.RETAIN_ALL
}); // 1234.5678

// 处理字符串
toFormattedNumber('123.45abc'); // 123.45

// 处理数组
toFormattedNumber([123.456, '456.789']); // [123.456, 456.789]

// 处理布尔值
toFormattedNumber(true); // 1
toFormattedNumber(false); // 0
```

### toFormattedNumberString - 格式化数字字符串

将数字格式化为带千位分隔符的字符串。

```typescript
import { toFormattedNumberString } from '@planarcat/js-toolkit';

// 基本使用
toFormattedNumberString(1234.5678); // "1,234.5678"

// 保留两位小数
toFormattedNumberString(1234.5678, { decimalPlaces: 2 }); // "1,234.57"

// 处理大数字
toFormattedNumberString(1234567.89); // "1,234,567.89"

// 处理负数
toFormattedNumberString(-1234.5678); // "-1,234.5678"
```

## 🔧 高级用法

### 性能优化建议

#### 日期格式化性能优化

```typescript
// 对于频繁调用的场景，使用编译模式
const fastFormatDate = (date: Date) => 
  formatDate(date, 'YYYY-MM-DD HH:mm:ss', { mode: 'compile' });

// 在循环中使用
for (let i = 0; i < 1000; i++) {
  fastFormatDate(new Date());
}
```

#### 防抖函数的最佳实践

```typescript
import { debounce } from '@planarcat/js-toolkit';

// 搜索框防抖
const searchDebounce = debounce((query: string) => {
  // 执行搜索逻辑
  console.log('搜索:', query);
}, 300);

// 窗口调整防抖
const resizeDebounce = debounce(() => {
  // 处理窗口调整逻辑
  console.log('窗口大小改变');
}, 250);

window.addEventListener('resize', resizeDebounce);
```

### 类型安全

所有函数都提供完整的 TypeScript 类型定义：

```typescript
import { 
  formatDate, 
  DateFormatOptions, 
  DateInput 
} from '@planarcat/js-toolkit';

// 类型安全的参数传递
const options: DateFormatOptions = {
  mode: 'compile',
  locale: 'zh-CN'
};

const dateInput: DateInput = new Date();
formatDate(dateInput, 'YYYY-MM-DD', options);
```

## 📊 性能基准

### 日期格式化性能对比

| 模式 | 首次调用 | 后续调用 | 适用场景 |
|------|----------|----------|----------|
| 自动模式 | 普通模式速度 | 编译模式速度 | 通用场景 |
| 编译模式 | 较慢 | 极快 | 频繁调用 |
| 普通模式 | 快 | 稳定 | 简单场景 |

### 内存使用优化

- 使用 LRU 缓存限制内存使用
- 智能垃圾回收机制
- 零内存泄漏设计

## 🐛 故障排除

### 常见问题

**Q: 日期格式化返回不正确的结果？**
A: 检查输入日期格式是否正确，确保使用有效的 Date 对象或标准日期字符串。

**Q: 防抖函数没有生效？**
A: 确保在组件卸载时调用 `debouncedFn.cancel()` 清理定时器。

**Q: 数字转换返回 NaN？**
A: 检查输入值是否包含有效的数字部分，不支持的对象类型会返回 NaN。

### 调试技巧

```typescript
// 启用详细日志（开发环境）
import { formatDate } from '@planarcat/js-toolkit';

// 检查日期解析
console.log('原始日期:', new Date());
console.log('格式化结果:', formatDate(new Date()));
```

## 🤝 贡献指南

我们欢迎社区贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何参与开发。

### 开发环境设置

```bash
# 克隆项目
git clone https://github.com/planarcat/js-toolkit.git
cd js-toolkit

# 安装依赖
pnpm install

# 运行测试
pnpm test

# 构建项目
pnpm run build
```

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 相关链接

- [GitHub 仓库](https://github.com/planarcat/js-toolkit)
- [npm 包页面](https://www.npmjs.com/package/@planarcat/js-toolkit)
- [更新日志](CHANGELOG.md)
- [使用示例](EXAMPLES.md)

## 🙏 致谢

感谢所有贡献者和用户的支持！

---

**Made with ❤️ by planarcat**