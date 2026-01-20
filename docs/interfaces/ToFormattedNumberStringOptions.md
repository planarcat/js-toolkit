[**@planarcat/js-toolkit**](../README.md)

***

[@planarcat/js-toolkit](../README.md) / ToFormattedNumberStringOptions

# Interface: ToFormattedNumberStringOptions

Defined in: [types/object.ts:27](https://github.com/planarcat/js-toolkit/blob/e5778bc02982027f29b7bef46421e1bd999af6fd/src/types/object.ts#L27)

toFormattedNumberString 函数的选项接口

## Extends

- `CommonFormatOptions`

## Properties

### decimalPlaces?

> `optional` **decimalPlaces**: `number` \| `true`

Defined in: [types/object.ts:10](https://github.com/planarcat/js-toolkit/blob/e5778bc02982027f29b7bef46421e1bd999af6fd/src/types/object.ts#L10)

保留多少位小数，
默认true（保留所有小数位，不额外处理），
可选值：number(保留指定小数位) | true(保留所有小数位，不额外处理)。

#### Inherited from

`CommonFormatOptions.decimalPlaces`

***

### nanValue?

> `optional` **nanValue**: `string`

Defined in: [types/object.ts:32](https://github.com/planarcat/js-toolkit/blob/e5778bc02982027f29b7bef46421e1bd999af6fd/src/types/object.ts#L32)

当值为NaN时的显示，
默认'NaN'。

***

### zeroValue?

> `optional` **zeroValue**: `string`

Defined in: [types/object.ts:37](https://github.com/planarcat/js-toolkit/blob/e5778bc02982027f29b7bef46421e1bd999af6fd/src/types/object.ts#L37)

当值为0时的显示，
默认'0'。

***

### localized?

> `optional` **localized**: `boolean`

Defined in: [types/object.ts:42](https://github.com/planarcat/js-toolkit/blob/e5778bc02982027f29b7bef46421e1bd999af6fd/src/types/object.ts#L42)

是否使用本地化格式，
默认false。

***

### preProcessor()?

> `optional` **preProcessor**: (`original`, `converted`) => `number`

Defined in: [types/object.ts:48](https://github.com/planarcat/js-toolkit/blob/e5778bc02982027f29b7bef46421e1bd999af6fd/src/types/object.ts#L48)

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

Defined in: [types/object.ts:53](https://github.com/planarcat/js-toolkit/blob/e5778bc02982027f29b7bef46421e1bd999af6fd/src/types/object.ts#L53)

前缀，字符串或函数，
函数接收参数：原始对象、转化后数字、格式化后的字符串，返回字符串。

***

### suffix?

> `optional` **suffix**: `string` \| (`original`, `converted`, `formatted`) => `string`

Defined in: [types/object.ts:60](https://github.com/planarcat/js-toolkit/blob/e5778bc02982027f29b7bef46421e1bd999af6fd/src/types/object.ts#L60)

后缀，字符串或函数，
函数接收参数：原始对象、转化后数字、格式化后的字符串，返回字符串。
