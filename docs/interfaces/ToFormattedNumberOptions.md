[**@planarcat/js-toolkit**](../README.md)

***

[@planarcat/js-toolkit](../README.md) / ToFormattedNumberOptions

# Interface: ToFormattedNumberOptions

Defined in: [types/object.ts:18](https://github.com/planarcat/js-toolkit/blob/00040541a7360fe4eb5a0f7801bb0f0a060a352d/src/types/object.ts#L18)

toFormattedNumber 函数的选项接口

## Extends

- `CommonFormatOptions`

## Properties

### decimalPlaces?

> `optional` **decimalPlaces**: `DecimalPlacesOptions`

Defined in: [types/object.ts:12](https://github.com/planarcat/js-toolkit/blob/00040541a7360fe4eb5a0f7801bb0f0a060a352d/src/types/object.ts#L12)

保留多少位小数，
默认DecimalPlacesOptions.RETAIN_ALL（保留所有小数位，不额外处理），
可选值：number(保留指定小数位) | DecimalPlacesOptions.RETAIN_ALL(保留所有小数位，不额外处理)。

#### Inherited from

`CommonFormatOptions.decimalPlaces`

***

### nanValue?

> `optional` **nanValue**: `number`

Defined in: [types/object.ts:23](https://github.com/planarcat/js-toolkit/blob/00040541a7360fe4eb5a0f7801bb0f0a060a352d/src/types/object.ts#L23)

当值为NaN时的显示，
默认NaN。
