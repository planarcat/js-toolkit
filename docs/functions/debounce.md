[**@planarcat/js-toolkit**](../README.md)

***

[@planarcat/js-toolkit](../README.md) / debounce

# Function: debounce()

> **debounce**\<`T`\>(`fn`, `delay`, `_options`): [`DebouncedFunction`](../interfaces/DebouncedFunction.md)\<`T`\>

Defined in: [function/debounce.ts:10](https://github.com/planarcat/js-toolkit/blob/b539a54bf46075072dfc39d0760bedb8cac956dd/src/function/debounce.ts#L10)

将函数进行防抖处理

## Type Parameters

### T

`T` *extends* `unknown`[]

## Parameters

### fn

(...`args`) => `void`

需要防抖处理的函数

### delay

`number` = `100`

防抖延迟时间，默认100ms

### \_options

[`DebounceOptions`](../interfaces/DebounceOptions.md) = `{}`

配置选项（当前未使用）

## Returns

[`DebouncedFunction`](../interfaces/DebouncedFunction.md)\<`T`\>

防抖处理后的函数，带有cancel方法
