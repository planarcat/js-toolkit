[**@planarcat/js-toolkit**](../README.md)

***

[@planarcat/js-toolkit](../README.md) / ToFormattedNumberOptions

# Interface: ToFormattedNumberOptions

Defined in: [types/object.ts:16](https://github.com/planarcat/js-toolkit/blob/b921c63a69209e442fc5f987074856c4c0031c79/src/types/object.ts#L16)

toFormattedNumber 函数的选项接口

## Extends

- `CommonFormatOptions`

## Properties

### decimalPlaces?

> `optional` **decimalPlaces**: `number` \| `true`

Defined in: [types/object.ts:10](https://github.com/planarcat/js-toolkit/blob/b921c63a69209e442fc5f987074856c4c0031c79/src/types/object.ts#L10)

保留多少位小数，
默认true（保留所有小数位，不额外处理），
可选值：number(保留指定小数位) | true(保留所有小数位，不额外处理)。

#### Inherited from

`CommonFormatOptions.decimalPlaces`

***

### nanDisplay?

> `optional` **nanDisplay**: `number`

Defined in: [types/object.ts:21](https://github.com/planarcat/js-toolkit/blob/b921c63a69209e442fc5f987074856c4c0031c79/src/types/object.ts#L21)

当值为NaN时的显示，
默认NaN。
