[**@planarcat/js-toolkit**](../README.md)

***

[@planarcat/js-toolkit](../README.md) / DateFormatOptions

# Interface: DateFormatOptions

Defined in: [types/date.ts:11](https://github.com/planarcat/js-toolkit/blob/293aaaeea05d115ce12a0c25f1662417d1c4578d/src/types/date.ts#L11)

日期格式化选项接口

## Properties

### timeZone?

> `optional` **timeZone**: `"local"` \| `"utc"`

Defined in: [types/date.ts:16](https://github.com/planarcat/js-toolkit/blob/293aaaeea05d115ce12a0c25f1662417d1c4578d/src/types/date.ts#L16)

时区设置

#### Default

```ts
'local'
```

***

### locale?

> `optional` **locale**: `string`

Defined in: [types/date.ts:22](https://github.com/planarcat/js-toolkit/blob/293aaaeea05d115ce12a0c25f1662417d1c4578d/src/types/date.ts#L22)

语言环境

#### Default

```ts
'zh-CN'
```

***

### mode?

> `optional` **mode**: [`DateFormatMode`](../type-aliases/DateFormatMode.md)

Defined in: [types/date.ts:28](https://github.com/planarcat/js-toolkit/blob/293aaaeea05d115ce12a0c25f1662417d1c4578d/src/types/date.ts#L28)

格式化模式

#### Default

```ts
'auto'
```

***

### customFormatters?

> `optional` **customFormatters**: `Record`\<`string`, (`date`) => `string`\>

Defined in: [types/date.ts:33](https://github.com/planarcat/js-toolkit/blob/293aaaeea05d115ce12a0c25f1662417d1c4578d/src/types/date.ts#L33)

自定义格式化处理器

***

### weekdayNames?

> `optional` **weekdayNames**: [`WeekdayNames`](../type-aliases/WeekdayNames.md)

Defined in: [types/date.ts:38](https://github.com/planarcat/js-toolkit/blob/293aaaeea05d115ce12a0c25f1662417d1c4578d/src/types/date.ts#L38)

周名称映射，可以是完整映射或仅当前语言的映射
