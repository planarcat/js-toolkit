[**@planarcat/js-toolkit**](../README.md)

***

[@planarcat/js-toolkit](../README.md) / toFormattedNumber

# Function: toFormattedNumber()

## Call Signature

> **toFormattedNumber**(`object`, `options?`): `number`[]

Defined in: [object/toFormattedNumber.ts:99](https://github.com/planarcat/js-toolkit/blob/9a11811b4012d75a739a49dba8630ee830a814be/src/object/toFormattedNumber.ts#L99)

将任意对象转化为数字，然后根据格式化参数对转化后的数字进行格式化

该函数支持多种输入类型，包括数字、字符串、布尔值、null、undefined、数组等
对于字符串，会提取其中的数字部分进行转换
支持深层数组递归处理

### Parameters

#### object

`unknown`[]

要格式化的目标

#### options?

[`ToFormattedNumberOptions`](../interfaces/ToFormattedNumberOptions.md)

格式化选项，具体参数说明见类型声明

### Returns

`number`[]

格式化后的数字或数字数组
         - 当传入的 object 为非数组时，返回 number
         - 当传入的 object 为数组时，返回 number[]
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
toFormattedNumber('abc'); // 0
toFormattedNumber(''); // 0

// 一维数组
toFormattedNumber([123.456, '456.789def']); // [123.456, 456.789]

// 深层数组
toFormattedNumber([[1, '1', null], 'xxx', ['123a', ['123', '456ff']]]);
// 返回: [[1, 1, NaN], 0, [123, [123, 456]]]

// 保留指定小数位
toFormattedNumber(123.456, { decimalPlaces: 2 }); // 123.46
toFormattedNumber(123.456, { decimalPlaces: 0 }); // 123

// 自定义NaN显示
toFormattedNumber(null, { nanValue: 0 }); // 0
toFormattedNumber('abc', { nanValue: -1 }); // -1
```

## Call Signature

> **toFormattedNumber**(`object`, `options?`): `number`

Defined in: [object/toFormattedNumber.ts:104](https://github.com/planarcat/js-toolkit/blob/9a11811b4012d75a739a49dba8630ee830a814be/src/object/toFormattedNumber.ts#L104)

将任意对象转化为数字，然后根据格式化参数对转化后的数字进行格式化

该函数支持多种输入类型，包括数字、字符串、布尔值、null、undefined、数组等
对于字符串，会提取其中的数字部分进行转换
支持深层数组递归处理

### Parameters

#### object

`unknown`

要格式化的目标

#### options?

[`ToFormattedNumberOptions`](../interfaces/ToFormattedNumberOptions.md)

格式化选项，具体参数说明见类型声明

### Returns

`number`

格式化后的数字或数字数组
         - 当传入的 object 为非数组时，返回 number
         - 当传入的 object 为数组时，返回 number[]
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
toFormattedNumber('abc'); // 0
toFormattedNumber(''); // 0

// 一维数组
toFormattedNumber([123.456, '456.789def']); // [123.456, 456.789]

// 深层数组
toFormattedNumber([[1, '1', null], 'xxx', ['123a', ['123', '456ff']]]);
// 返回: [[1, 1, NaN], 0, [123, [123, 456]]]

// 保留指定小数位
toFormattedNumber(123.456, { decimalPlaces: 2 }); // 123.46
toFormattedNumber(123.456, { decimalPlaces: 0 }); // 123

// 自定义NaN显示
toFormattedNumber(null, { nanValue: 0 }); // 0
toFormattedNumber('abc', { nanValue: -1 }); // -1
```
