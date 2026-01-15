[**@planarcat/js-toolkit**](../README.md)

***

[@planarcat/js-toolkit](../README.md) / formatDate

# Function: formatDate()

> **formatDate**(`input`, `formatStr`, `options`): `string`

Defined in: [date/formatDate.ts:101](https://github.com/planarcat/js-toolkit/blob/81fd1105ef677c73b93b4ee2f6c7b089ac7edae9/src/date/formatDate.ts#L101)

格式化日期对象

## Parameters

### input

[`DateInput`](../type-aliases/DateInput.md)

要格式化的日期输入，可以是 Date 对象、时间戳、日期字符串

### formatStr

`string` = `"YYYY-MM-DD HH:mm:ss"`

格式化字符串，支持 YYYY-MM-DD HH:mm:ss 等标记，默认为 'YYYY-MM-DD HH:mm:ss'

### options

`Partial`\<[`DateFormatOptions`](../interfaces/DateFormatOptions.md)\> = `{}`

格式化选项

## Returns

`string`

格式化后的日期字符串

## Example

```typescript
import { formatDate } from '@planarcat/js-toolkit';

// 基本使用（默认格式 'YYYY-MM-DD HH:mm:ss'）
formatDate(new Date());
// 返回: "2023-12-25 14:30:45"

// 自定义格式
formatDate('2023-12-25', 'YYYY年MM月DD日');
// 返回: "2023年12月25日"

// 使用 dd 标记显示周几
formatDate(new Date(), 'dd HH:mm');
// 返回: "周一 14:30"

// 英文环境显示周几
formatDate(new Date(), 'dd HH:mm', { locale: 'en-US' });
// 返回: "Monday 14:30"

// 自定义格式化器
formatDate(new Date(), '第Q季度', {
  customFormatters: {
    '第Q季度': (date) => `第${Math.floor((date.getMonth() + 3) / 3)}季度`
  }
});
// 返回: "第4季度"
```
