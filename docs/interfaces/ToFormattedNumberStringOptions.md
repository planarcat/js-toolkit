[**@planarcat/js-toolkit**](../README.md)

***

[@planarcat/js-toolkit](../README.md) / ToFormattedNumberStringOptions

# Interface: ToFormattedNumberStringOptions

Defined in: [types/object.ts:27](https://github.com/planarcat/js-toolkit/blob/dda8049c3011f2a86b8b804085db359b3ecde026/src/types/object.ts#L27)

toFormattedNumberString 函数的选项接口

## Extends

- `CommonFormatOptions`

## Properties

### decimalPlaces?

> `optional` **decimalPlaces**: `number` \| `true`

Defined in: [types/object.ts:10](https://github.com/planarcat/js-toolkit/blob/dda8049c3011f2a86b8b804085db359b3ecde026/src/types/object.ts#L10)

保留多少位小数，
默认true（保留所有小数位，不额外处理），
可选值：number(保留指定小数位) | true(保留所有小数位，不额外处理)。

#### Inherited from

`CommonFormatOptions.decimalPlaces`

***

### nanValue?

> `optional` **nanValue**: `string`

Defined in: [types/object.ts:32](https://github.com/planarcat/js-toolkit/blob/dda8049c3011f2a86b8b804085db359b3ecde026/src/types/object.ts#L32)

当值为NaN时的显示，
默认'NaN'。

***

### zeroValue?

> `optional` **zeroValue**: `string`

Defined in: [types/object.ts:37](https://github.com/planarcat/js-toolkit/blob/dda8049c3011f2a86b8b804085db359b3ecde026/src/types/object.ts#L37)

当值为0时的显示，
默认'0'。

***

### localized?

> `optional` **localized**: `boolean`

Defined in: [types/object.ts:42](https://github.com/planarcat/js-toolkit/blob/dda8049c3011f2a86b8b804085db359b3ecde026/src/types/object.ts#L42)

是否使用本地化格式，
默认false。

***

### preProcessor()?

> `optional` **preProcessor**: (`num`, `original`) => `number`

Defined in: [types/object.ts:47](https://github.com/planarcat/js-toolkit/blob/dda8049c3011f2a86b8b804085db359b3ecde026/src/types/object.ts#L47)

预处理函数，在对象被处理为数字后调用，
默认无。

#### Parameters

##### num

`number`

##### original

`unknown`

#### Returns

`number`

***

### prefix?

> `optional` **prefix**: `string` \| (`value`, `original`) => `string`

Defined in: [types/object.ts:52](https://github.com/planarcat/js-toolkit/blob/dda8049c3011f2a86b8b804085db359b3ecde026/src/types/object.ts#L52)

前缀，可以是字符串或函数，
默认''。

***

### suffix?

> `optional` **suffix**: `string` \| (`formatted`, `value`, `original`) => `string`

Defined in: [types/object.ts:57](https://github.com/planarcat/js-toolkit/blob/dda8049c3011f2a86b8b804085db359b3ecde026/src/types/object.ts#L57)

后缀，可以是字符串或函数，
默认''。
