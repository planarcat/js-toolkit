[**@planarcat/js-toolkit**](../README.md)

***

[@planarcat/js-toolkit](../README.md) / ToFormattedNumberStringOptions

# Interface: ToFormattedNumberStringOptions

Defined in: [types/object.ts:29](https://github.com/planarcat/js-toolkit/blob/9a11811b4012d75a739a49dba8630ee830a814be/src/types/object.ts#L29)

toFormattedNumberString 函数的选项接口

## Extends

- `CommonFormatOptions`

## Properties

### decimalPlaces?

> `optional` **decimalPlaces**: `DecimalPlacesOptions`

Defined in: [types/object.ts:12](https://github.com/planarcat/js-toolkit/blob/9a11811b4012d75a739a49dba8630ee830a814be/src/types/object.ts#L12)

保留多少位小数，
默认DecimalPlacesOptions.RETAIN_ALL（保留所有小数位，不额外处理），
可选值：number(保留指定小数位) | DecimalPlacesOptions.RETAIN_ALL(保留所有小数位，不额外处理)。

#### Inherited from

`CommonFormatOptions.decimalPlaces`

***

### nanValue?

> `optional` **nanValue**: `string`

Defined in: [types/object.ts:34](https://github.com/planarcat/js-toolkit/blob/9a11811b4012d75a739a49dba8630ee830a814be/src/types/object.ts#L34)

当值为NaN时的显示，
默认'NaN'。

***

### zeroValue?

> `optional` **zeroValue**: `string`

Defined in: [types/object.ts:39](https://github.com/planarcat/js-toolkit/blob/9a11811b4012d75a739a49dba8630ee830a814be/src/types/object.ts#L39)

当值为0时的显示，
默认'0'。

***

### localized?

> `optional` **localized**: `boolean`

Defined in: [types/object.ts:44](https://github.com/planarcat/js-toolkit/blob/9a11811b4012d75a739a49dba8630ee830a814be/src/types/object.ts#L44)

是否使用本地化格式，
默认false。

***

### preProcessor()?

> `optional` **preProcessor**: (`original`, `converted`) => `number`

Defined in: [types/object.ts:50](https://github.com/planarcat/js-toolkit/blob/9a11811b4012d75a739a49dba8630ee830a814be/src/types/object.ts#L50)

预处理函数，在对象被处理为数字后调用，
默认无。
接收参数：原始对象、转化后的数字，返回处理后的数字

#### Parameters

##### original

`unknown`

##### converted

`number`

#### Returns

`number`

***

### prefix?

> `optional` **prefix**: `string` \| (`original`, `converted`, `formatted`) => `string`

Defined in: [types/object.ts:55](https://github.com/planarcat/js-toolkit/blob/9a11811b4012d75a739a49dba8630ee830a814be/src/types/object.ts#L55)

前缀，字符串或函数，
函数接收参数：原始对象、转化后数字、格式化后的字符串，返回字符串。

***

### suffix?

> `optional` **suffix**: `string` \| (`original`, `converted`, `formatted`) => `string`

Defined in: [types/object.ts:62](https://github.com/planarcat/js-toolkit/blob/9a11811b4012d75a739a49dba8630ee830a814be/src/types/object.ts#L62)

后缀，字符串或函数，
函数接收参数：原始对象、转化后数字、格式化后的字符串，返回字符串。
