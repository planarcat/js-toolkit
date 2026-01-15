[**@planarcat/js-toolkit**](../README.md)

***

[@planarcat/js-toolkit](../README.md) / toFormattedNumber

# Function: toFormattedNumber()

## Call Signature

> **toFormattedNumber**(`object`, `options?`): `number`[]

Defined in: [object/toFormattedNumber.ts:99](https://github.com/planarcat/js-toolkit/blob/a3ca9884cc4edfd17a2419cab850ef9fc80e9b52/src/object/toFormattedNumber.ts#L99)

将任意对象转化为数字，然后根据格式化参数对转化后的数字进行格式化

该函数支持多种输入类型，包括数字、字符串、布尔值、null、undefined、数组等
对于字符串，会提取其中的数字部分进行转换
支持深层数组递归处理

### Parameters

#### object

`unknown`[]

要格式化的对象，可以是任何类型

#### options?

[`ToFormattedNumberOptions`](../interfaces/ToFormattedNumberOptions.md)

格式化选项

### Returns

`number`[]

格式化后的数字或数字数组
         - 如果输入是单个值，返回格式化后的数字
         - 如果输入是数组，返回格式化后的数字数组
         - 支持深层数组递归处理

### Example

```typescript
// 单个数字值
toFormattedNumber(123.456); // 123.456

// 字符串中的数字提取
toFormattedNumber('123.456abc'); // 123.456
toFormattedNumber('abc123.456def'); // 123.456
toFormattedNumber('1.23e3'); // 1230

// 布尔值转换
toFormattedNumber(true); // 1
toFormattedNumber(false); // 0

// 特殊类型处理
toFormattedNumber(null); // NaN
toFormattedNumber(undefined); // NaN
toFormattedNumber(Symbol('test')); // NaN
toFormattedNumber(() => {}); // NaN

// 一维数组
toFormattedNumber([123.456, '456.789def']); // [123.456, 456.789]

// 深层数组
toFormattedNumber([[1, '1', null], 'xxx', ['123a', ['123', '456ff']]]);
// 返回: [[1, 1, NaN], NaN, [123, [123, 456]]]

// 保留指定小数位
toFormattedNumber(123.456, { decimalPlaces: 2 }); // 123.46
toFormattedNumber(123.456, { decimalPlaces: 0 }); // 123

// 自定义NaN显示
toFormattedNumber(null, { nanDisplay: 0 }); // 0
toFormattedNumber('abc', { nanDisplay: -1 }); // -1
```

## Call Signature

> **toFormattedNumber**(`object`, `options?`): `number` \| `number`[]

Defined in: [object/toFormattedNumber.ts:104](https://github.com/planarcat/js-toolkit/blob/a3ca9884cc4edfd17a2419cab850ef9fc80e9b52/src/object/toFormattedNumber.ts#L104)

将任意对象转化为数字，然后根据格式化参数对转化后的数字进行格式化

该函数支持多种输入类型，包括数字、字符串、布尔值、null、undefined、数组等
对于字符串，会提取其中的数字部分进行转换
支持深层数组递归处理

### Parameters

#### object

`unknown`

要格式化的对象，可以是任何类型

#### options?

[`ToFormattedNumberOptions`](../interfaces/ToFormattedNumberOptions.md)

格式化选项

### Returns

`number` \| `number`[]

格式化后的数字或数字数组
         - 如果输入是单个值，返回格式化后的数字
         - 如果输入是数组，返回格式化后的数字数组
         - 支持深层数组递归处理

### Example

```typescript
// 单个数字值
toFormattedNumber(123.456); // 123.456

// 字符串中的数字提取
toFormattedNumber('123.456abc'); // 123.456
toFormattedNumber('abc123.456def'); // 123.456
toFormattedNumber('1.23e3'); // 1230

// 布尔值转换
toFormattedNumber(true); // 1
toFormattedNumber(false); // 0

// 特殊类型处理
toFormattedNumber(null); // NaN
toFormattedNumber(undefined); // NaN
toFormattedNumber(Symbol('test')); // NaN
toFormattedNumber(() => {}); // NaN

// 一维数组
toFormattedNumber([123.456, '456.789def']); // [123.456, 456.789]

// 深层数组
toFormattedNumber([[1, '1', null], 'xxx', ['123a', ['123', '456ff']]]);
// 返回: [[1, 1, NaN], NaN, [123, [123, 456]]]

// 保留指定小数位
toFormattedNumber(123.456, { decimalPlaces: 2 }); // 123.46
toFormattedNumber(123.456, { decimalPlaces: 0 }); // 123

// 自定义NaN显示
toFormattedNumber(null, { nanDisplay: 0 }); // 0
toFormattedNumber('abc', { nanDisplay: -1 }); // -1
```
