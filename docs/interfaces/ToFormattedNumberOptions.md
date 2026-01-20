[**@planarcat/js-toolkit**](../README.md)

***

[@planarcat/js-toolkit](../README.md) / ToFormattedNumberOptions

# Interface: ToFormattedNumberOptions

Defined in: [types/object.ts:16](https://github.com/planarcat/js-toolkit/blob/462ba20b6e7baf674acf66e0fbc7a4a2409c9994/src/types/object.ts#L16)

toFormattedNumber 函数的选项接口

## Extends

- `CommonFormatOptions`

## Properties

### decimalPlaces?

> `optional` **decimalPlaces**: `number` \| `true`

Defined in: [types/object.ts:10](https://github.com/planarcat/js-toolkit/blob/462ba20b6e7baf674acf66e0fbc7a4a2409c9994/src/types/object.ts#L10)

保留多少位小数，
默认true（保留所有小数位，不额外处理），
可选值：number(保留指定小数位) | true(保留所有小数位，不额外处理)。

#### Inherited from

`CommonFormatOptions.decimalPlaces`

***

### nanValue?

> `optional` **nanValue**: `number`

Defined in: [types/object.ts:21](https://github.com/planarcat/js-toolkit/blob/462ba20b6e7baf674acf66e0fbc7a4a2409c9994/src/types/object.ts#L21)

当值为NaN时的显示，
默认NaN。
