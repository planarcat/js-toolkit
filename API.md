# API 文档

## 概述

`@planarcat/js-toolkit` 是一个现代化的 JavaScript/TypeScript 工具库，提供类型安全、高性能的常用函数。

## 模块导入

```typescript
// 导入所有功能
import { formatDate, VERSION, LIBRARY_NAME } from '@planarcat/js-toolkit';

// 或按需导入
import { formatDate } from '@planarcat/js-toolkit/date';
import type { DateFormatOptions, DateInput } from '@planarcat/js-toolkit/types';
```

## 函数文档

### formatDate

格式化日期对象为指定格式的字符串。

#### 函数签名

```typescript
function formatDate(
  input: DateInput,
  formatStr?: string,
  options?: Partial<DateFormatOptions>
): string
```

#### 参数说明

**input** (`DateInput`)
- **类型**: `Date | number | string`
- **描述**: 要格式化的日期输入
- **支持的类型**:
  - `Date` 对象
  - 时间戳（毫秒数）
  - 日期字符串（ISO 8601、YYYY-MM-DD、YYYY/MM/DD 等格式）

**formatStr** (`string`, 可选)
- **类型**: `string`
- **默认值**: `'YYYY-MM-DD HH:mm:ss'`
- **描述**: 格式化字符串，支持多种格式化标记

**options** (`Partial<DateFormatOptions>`, 可选)
- **类型**: `DateFormatOptions`
- **默认值**: `{}`
- **描述**: 格式化选项配置

#### 返回值

- **类型**: `string`
- **描述**: 格式化后的日期字符串

#### 格式化标记

| 标记 | 描述 | 示例 | 说明 |
|------|------|------|------|
| `YYYY` | 四位年份 | 2023 | 补零到四位 |
| `YY` | 两位年份 | 23 | 取年份的后两位 |
| `MM` | 两位月份 | 12 | 补零到两位 |
| `M` | 月份（不补零） | 12 | 原样输出 |
| `DD` | 两位日期 | 25 | 补零到两位 |
| `D` | 日期（不补零） | 25 | 原样输出 |
| `HH` | 24小时制小时 | 14 | 补零到两位 |
| `H` | 小时（不补零） | 14 | 原样输出 |
| `hh` | 12小时制小时 | 02 | 补零到两位 |
| `h` | 12小时制小时（不补零） | 2 | 原样输出 |
| `mm` | 分钟 | 30 | 补零到两位 |
| `m` | 分钟（不补零） | 30 | 原样输出 |
| `ss` | 秒 | 45 | 补零到两位 |
| `s` | 秒（不补零） | 45 | 原样输出 |
| `SSS` | 毫秒 | 123 | 补零到三位 |
| `A` | 上午/下午（大写） | PM | 大写字母 |
| `a` | 上午/下午（小写） | pm | 小写字母 |
| `d` | 星期几（数字 0-6） | 1 | 0=周日, 1=周一 |
| `dd` | 本地化星期几 | 一 | 根据语言环境 |
| `WW` | 两位周数 | 52 | 补零到两位 |
| `W` | 周数（不补零） | 52 | 原样输出 |
| `Q` | 季度 | 4 | 1-4季度 |
| `timestamp` | 时间戳 | 1703485845123 | 毫秒时间戳 |

#### 选项配置

```typescript
interface DateFormatOptions {
  /**
   * 时区设置
   * @default 'local'
   */
  timeZone?: 'local' | 'utc';
  
  /**
   * 语言环境
   * @default 'zh-CN'
   */
  locale?: string;
  
  /**
   * 是否显示周几前缀
   * @default false
   */
  showWeekday?: boolean;
  
  /**
   * 周几显示格式
   * @default '周'
   */
  weekdayFormat?: string;
  
  /**
   * 自定义格式化器
   */
  customFormatters?: Record<string, (date: Date) => string>;
}
```

#### 使用示例

**基本使用**
```typescript
import { formatDate } from '@planarcat/js-toolkit';

// 默认格式
formatDate(new Date()); // "2023-12-25 14:30:45"

// 自定义格式
formatDate(new Date(), 'YYYY/MM/DD'); // "2023/12/25"
formatDate(new Date(), 'HH:mm:ss'); // "14:30:45"

// 混合标记
formatDate(new Date(), 'YY-M-D H:m:s'); // "23-12-25 14:30:45"
```

**特殊标记处理**
```typescript
// 12小时制
formatDate(new Date('2023-12-25T14:30:45'), 'hh:mm:ss A'); // "02:30:45 PM"
formatDate(new Date('2023-12-25T08:30:45'), 'hh:mm:ss a'); // "08:30:45 am"

// 毫秒显示
formatDate(new Date('2023-12-25T14:30:45.123'), 'HH:mm:ss.SSS'); // "14:30:45.123"

// 周几显示
formatDate(new Date('2023-12-25T14:30:45'), 'dd'); // "一"
formatDate(new Date('2023-12-25T14:30:45'), 'YYYY-MM-DD dd'); // "2023-12-25 一"

// 季度和周数
formatDate(new Date('2023-12-25T14:30:45'), 'Q季度 WW周'); // "4季度 52周"

// 时间戳
formatDate(new Date('2023-12-25T14:30:45.123'), 'timestamp'); // "1703485845123"
```

**输入类型处理**
```typescript
// 字符串输入
formatDate('2023-12-25', 'YYYY-MM-DD'); // "2023-12-25"
formatDate('2023/12/25', 'YYYY/MM/DD'); // "2023/12/25"

// 数字时间戳
const timestamp = new Date('2023-12-25').getTime();
formatDate(timestamp, 'YYYY-MM-DD'); // "2023-12-25"

// 无效输入处理（会发出警告并使用当前时间）
formatDate('invalid', 'YYYY-MM-DD'); // 当前日期的格式化字符串
```

**选项配置**
```typescript
// 显示周几前缀
formatDate(new Date('2023-12-25T14:30:45'), 'HH:mm', { 
  showWeekday: true 
}); // "周一 14:30"

// 自定义周几格式
formatDate(new Date('2023-12-25T14:30:45'), 'HH:mm', { 
  showWeekday: true, 
  weekdayFormat: '星期' 
}); // "星期一 14:30"

// 英文环境
formatDate(new Date('2023-12-25T14:30:45'), 'YYYY-MM-DD dd', { 
  locale: 'en-US' 
}); // "2023-12-25 Mon"

// 自定义格式化器
formatDate(new Date('2023-12-25T14:30:45'), '第Q季度', {
  customFormatters: {
    '第Q季度': (date) => `第${Math.floor((date.getMonth() + 3) / 3)}季度`
  }
}); // "第4季度"
```

## 类型定义

### DateInput

```typescript
type DateInput = Date | number | string;
```

支持多种日期输入类型。

### DateFormatOptions

完整的格式化选项接口定义。

### DateFormatToken

```typescript
type DateFormatToken = 
  | 'YYYY' | 'YY'        // 年
  | 'MM' | 'M'           // 月
  | 'DD' | 'D'           // 日
  | 'HH' | 'H'           // 时 (24小时制)
  | 'hh' | 'h'           // 时 (12小时制)
  | 'mm' | 'm'           // 分
  | 'ss' | 's'           // 秒
  | 'SSS'                // 毫秒
  | 'A' | 'a'            // 上午/下午
  | 'd'                  // 星期几 (0-6)
  | 'dd'                 // 本地化星期几
  | 'WW' | 'W'           // 周
  | 'Q'                  // 季度
  | 'timestamp';         // 时间戳
```

## 常量

### VERSION

- **类型**: `string`
- **描述**: 库的版本号，构建时自动替换

### LIBRARY_NAME

- **类型**: `string`
- **值**: `'@planarcat/js-toolkit'`
- **描述**: 库的名称

## 错误处理

### 无效日期输入

当传入无效的日期输入时：
- 函数会发出 `console.warn` 警告
- 返回当前时间的格式化字符串
- 不会抛出异常，确保程序稳定性

```typescript
// 无效输入示例
formatDate('invalid-date'); // 警告并返回当前时间
formatDate(null); // 警告并返回当前时间
formatDate(undefined); // 警告并返回当前时间
```

## 性能说明

- 函数经过优化，支持高性能的日期格式化
- 使用缓存机制避免重复计算
- 支持大容量数据处理的场景

## 浏览器兼容性

- 支持所有现代浏览器（Chrome、Firefox、Safari、Edge）
- 支持 Node.js 环境
- 需要 ES6+ 环境支持