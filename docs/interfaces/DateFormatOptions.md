[**@planarcat/js-toolkit**](../README.md)

***

[@planarcat/js-toolkit](../README.md) / DateFormatOptions

# Interface: DateFormatOptions

Defined in: [types/date.ts:9](https://github.com/planarcat/js-toolkit/blob/87c3119e75b61c86ad32714b3e0420f7648f8e57/src/types/date.ts#L9)

日期格式化选项接口

## Properties

### timeZone?

> `optional` **timeZone**: `"local"` \| `"utc"`

Defined in: [types/date.ts:14](https://github.com/planarcat/js-toolkit/blob/87c3119e75b61c86ad32714b3e0420f7648f8e57/src/types/date.ts#L14)

时区设置

#### Default

```ts
'local'
```

***

### locale?

> `optional` **locale**: `string`

Defined in: [types/date.ts:20](https://github.com/planarcat/js-toolkit/blob/87c3119e75b61c86ad32714b3e0420f7648f8e57/src/types/date.ts#L20)

语言环境

#### Default

```ts
'zh-CN'
```

***

### mode?

> `optional` **mode**: [`DateFormatMode`](../type-aliases/DateFormatMode.md)

Defined in: [types/date.ts:26](https://github.com/planarcat/js-toolkit/blob/87c3119e75b61c86ad32714b3e0420f7648f8e57/src/types/date.ts#L26)

格式化模式

#### Default

```ts
'auto'
```

***

### customFormatters?

> `optional` **customFormatters**: `Record`\<`string`, (`date`) => `string`\>

Defined in: [types/date.ts:31](https://github.com/planarcat/js-toolkit/blob/87c3119e75b61c86ad32714b3e0420f7648f8e57/src/types/date.ts#L31)

自定义格式化处理器

***

### weekdayNames?

> `optional` **weekdayNames**: [`WeekdayNames`](../type-aliases/WeekdayNames.md)

Defined in: [types/date.ts:36](https://github.com/planarcat/js-toolkit/blob/87c3119e75b61c86ad32714b3e0420f7648f8e57/src/types/date.ts#L36)

周名称映射，可以是完整映射或仅当前语言的映射
