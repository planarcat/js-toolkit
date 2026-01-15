[**@planarcat/js-toolkit**](../README.md)

***

[@planarcat/js-toolkit](../README.md) / DateFormatOptions

# Interface: DateFormatOptions

Defined in: [types/date.ts:4](https://github.com/planarcat/js-toolkit/blob/b921c63a69209e442fc5f987074856c4c0031c79/src/types/date.ts#L4)

日期格式化选项接口

## Properties

### timeZone?

> `optional` **timeZone**: `"local"` \| `"utc"`

Defined in: [types/date.ts:9](https://github.com/planarcat/js-toolkit/blob/b921c63a69209e442fc5f987074856c4c0031c79/src/types/date.ts#L9)

时区设置

#### Default

```ts
'local'
```

***

### locale?

> `optional` **locale**: `string`

Defined in: [types/date.ts:15](https://github.com/planarcat/js-toolkit/blob/b921c63a69209e442fc5f987074856c4c0031c79/src/types/date.ts#L15)

语言环境

#### Default

```ts
'zh-CN'
```

***

### customFormatters?

> `optional` **customFormatters**: `Record`\<`string`, (`date`) => `string`\>

Defined in: [types/date.ts:20](https://github.com/planarcat/js-toolkit/blob/b921c63a69209e442fc5f987074856c4c0031c79/src/types/date.ts#L20)

自定义格式化处理器
