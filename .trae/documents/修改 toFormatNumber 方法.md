# 修改 toFormatNumber 方法

## 1. 类型定义修改

- 保留现有 `nanValueType` 类型
- 新增 `ReturnTypeOption` 类型：`'string' | 'number'`
- 定义函数重载，根据 `returnType` 和输入是否为数组返回不同类型

## 2. 函数签名修改

```typescript
// 函数重载定义
toFormatNumber<T extends any[]>(object: T, options: ToFormatNumberOptions & { returnType: 'string' }): string[];
toFormatNumber<T extends any[]>(object: T, options: ToFormatNumberOptions & { returnType: 'number' }): number[];
toFormatNumber(object: any, options?: ToFormatNumberOptions & { returnType: 'string' }): string;
toFormatNumber(object: any, options?: ToFormatNumberOptions & { returnType: 'number' }): number;
toFormatNumber(object: any, options?: ToFormatNumberOptions): string;
toFormatNumber(object: any[], options?: ToFormatNumberOptions): string[];
```

## 3. 核心实现修改

### 3.1 参数处理

- 将 `num: number` 改为 `object: any`
- 新增 `returnType` 选项，默认值为 `'string'`

### 3.2 数组检测与处理

- 检测输入是否为数组：`Array.isArray(object)`
- 如果是数组，遍历处理每个元素
- 如果不是数组，转换为单个元素数组处理
- 根据输入类型返回对应类型数组或单个值

### 3.3 类型转换逻辑

- 检查输入类型，处理特殊类型（function、null、undefined、symbol 等）
- 对于可转换为数字的值，进行格式化
- 对于不可转换的值，根据 `nanValue` 处理

### 3.4 返回值处理

- 单个值情况：根据 `returnType` 返回 string 或 number
- 数组情况：根据 `returnType` 返回 string[] 或 number[]
- 确保类型安全，使用 TypeScript 类型断言

## 4. 具体实现步骤

1. 更新类型定义
2. 实现函数重载
3. 修改参数接收，支持任意类型输入
4. 添加数组检测与处理逻辑
5. 实现单个值转换逻辑
6. 根据 `returnType` 转换结果类型
7. 更新错误处理

## 5. 示例使用

```typescript
// 单个值，返回字符串
toFormatNumber('123.456', { decimalPlaces: 2 }); // 返回: '123.46'

// 单个值，返回数字
toFormatNumber('123.456', { decimalPlaces: 2, returnType: 'number' }); // 返回: 123.46

// 数组，返回字符串数组
toFormatNumber([123, '456.789', null], { decimalPlaces: 2 }); // 返回: ['123', '456.79', '']

// 数组，返回数字数组
toFormatNumber([123, '456.789', null], { decimalPlaces: 2, returnType: 'number' }); // 返回: [123, 456.79, NaN]

// 处理特殊类型
toFormatNumber(function () {}, { nanValue: 'N/A' }); // 返回: 'N/A'
```

## 6. 兼容性考虑

- 保持原有功能不变
- 新增功能向下兼容
- 类型安全，确保 TypeScript 编译通过
- 运行时错误处理完善
