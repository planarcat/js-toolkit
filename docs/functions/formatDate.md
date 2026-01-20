[**@planarcat/js-toolkit**](../README.md)

***

[@planarcat/js-toolkit](../README.md) / formatDate

# Function: formatDate()

> **formatDate**(`input`, `formatStr`, `options`): `string`

Defined in: [date/formatDate.ts:113](https://github.com/planarcat/js-toolkit/blob/63cf12b9eae2842fef074dfb1b2c55b96d3d41a3/src/date/formatDate.ts#L113)

格式化日期对象

## Parameters

### input

[`DateInput`](../type-aliases/DateInput.md)

要格式化的日期输入，可以是 Date 对象、时间戳、日期字符串

### formatStr

`string` = `'YYYY-MM-DD HH:mm:ss'`

格式化字符串，支持 YYYY-MM-DD HH:mm:ss 等标记，默认为 'YYYY-MM-DD HH:mm:ss'

### options

`Partial`\<[`DateFormatOptions`](../interfaces/DateFormatOptions.md)\> = `{}`

格式化选项，具体参数说明见类型声明

## Returns

`string`

格式化后的日期字符串

## Example

```typescript
import { formatDate } from '@planarcat/js-toolkit';

// 基本使用（默认格式 'YYYY-MM-DD HH:mm:ss'，默认自动模式）
formatDate(new Date());
// 返回: "2023-12-25 14:30:45"

// 自定义格式
formatDate('2023-12-25', 'YYYY年MM月DD日');
// 返回: "2023年12月25日"

// 指定编译模式
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss', { mode: 'compile' });
// 返回: "2023-12-25 14:30:45"

// 指定普通模式
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss', { mode: 'regular' });
// 返回: "2023-12-25 14:30:45"

// 自动模式性能测试
// 首次调用使用普通模式，第二次及以后自动切换到编译模式
for (let i = 0; i < 1000; i++) {
  formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
}
```

## Remarks

## 支持的格式化标记

### 年份
- `YYYY`: 4位年份 (2024)
- `YY`: 2位年份 (24)

### 月份
- `MMMM`: 完整月份名称 (January / 一月)
- `MMM`: 月份缩写 (Jan / 1月)
- `MM`: 2位月份 (01-12)
- `M`: 1-2位月份 (1-12)

### 日期
- `DDD`: 一年中的第几天 (001-366)
- `DD`: 2位日期 (01-31)
- `D`: 1-2位日期 (1-31)

### 星期
- `dd`: 星期名称 (Monday / 周一)
- `d`: 星期数字 (0-6, 0=周日)

### 时间
- `HH`: 24小时制，2位 (00-23)
- `H`: 24小时制，1-2位 (0-23)
- `hh`: 12小时制，2位 (01-12)
- `h`: 12小时制，1-2位 (1-12)
- `mm`: 2位分钟 (00-59)
- `m`: 1-2位分钟 (0-59)
- `ss`: 2位秒 (00-59)
- `s`: 1-2位秒 (0-59)
- `SSS`: 3位毫秒 (000-999)
- `S`: 毫秒 (000-999)

### 其他
- `A`: 大写AM/PM
- `a`: 小写am/pm
- `Q`: 季度 (1-4)
- `WW`: 2位周数 (01-53)
- `W`: 1-2位周数 (1-53)
- `X`: Unix时间戳 (秒)
- `x`: Unix时间戳 (毫秒)

## 格式化模式

- **自动模式 (auto)**：默认模式，根据调用次数自动切换
  - 首次调用：使用普通模式，避免编译开销
  - 重复调用：达到阈值后自动切换到编译模式
  - 智能优化：平衡首次调用性能和重复调用性能

- **普通模式 (regular)**：直接解析格式化字符串，不使用缓存
  - 适合单次或少量调用
  - 无需编译和缓存开销
  - 内存占用较小

- **编译模式 (compile)**：通过缓存编译后的格式化函数，显著提升频繁调用时的性能
  - 首次调用：编译格式化字符串，生成高效的处理函数
  - 后续调用：直接使用缓存的处理函数，跳过解析步骤
  - 缓存策略：使用LRU缓存，最大容量100
  - 性能提升：简单格式提升3-5倍，复杂格式提升10倍以上

## 模式选择建议

- **自动模式**：推荐使用，适合大多数场景，智能平衡性能和开销
- **普通模式**：适用于单次或少量调用不同格式字符串的场景
- **编译模式**：适用于频繁调用相同格式字符串的场景，如循环格式化大量日期
