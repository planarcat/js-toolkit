[**@planarcat/js-toolkit**](../README.md)

***

[@planarcat/js-toolkit](../README.md) / debounce

# Function: debounce()

> **debounce**\<`T`\>(`fn`, `options`): [`DebouncedFunction`](../interfaces/DebouncedFunction.md)\<`T`\>

Defined in: function/debounce.ts:10

将函数进行防抖处理

## Type Parameters

### T

`T` *extends* (...`args`) => `unknown`

## Parameters

### fn

`T`

需要防抖处理的函数

### options

[`DebounceOptions`](../interfaces/DebounceOptions.md) = `{}`

配置选项

## Returns

[`DebouncedFunction`](../interfaces/DebouncedFunction.md)\<`T`\>

防抖处理后的函数，带有cancel方法
