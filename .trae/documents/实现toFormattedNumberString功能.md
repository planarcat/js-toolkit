# 实现toFormattedNumberString功能

## 实现步骤

### 1. 更新类型定义

- 在`src/types/object.ts`中添加`ToFormattedNumberStringOptions`接口，包含以下字段：
    - `decimalPlaces?: number | true`（继承自CommonFormatOptions）
    - `nanValue?: string`（当值为NaN时的显示，默认'NaN'）
    - `zeroValue?: string`（当值为0时的显示，默认'0'）
    - `useLocalizedFormat?: boolean`（是否显示本地化，默认false）
    - `preProcessor?: (num: number) => number`（预处理函数，默认无）
    - `prefix?: string`（前缀，默认''）
    - `suffix?: string`（后缀，默认''）

### 2. 实现toFormattedNumberString函数

- 在`src/object/toFormattedNumber.ts`中实现`toFormattedNumberString`函数：
    - 添加函数重载定义（数组输入和单个值输入）
    - 主函数实现：
        - 调用`toFormattedNumber`将输入转换为数字或数字数组
        - 应用预处理函数（如果有）
        - 进行字符串格式化：
            - 处理NaN情况，使用指定的nanValue
            - 处理0情况，使用指定的zeroValue
            - 根据decimalPlaces处理小数位，不够时补0
            - 应用本地化格式（如果启用）
            - 添加前缀和后缀
        - 支持深层数组递归处理

### 3. 更新导出

- 在`src/index.ts`中导出新的`toFormattedNumberString`函数和对应的类型定义

### 4. 更新文档

- 在`README.md`中添加`toFormattedNumberString`的使用示例
- 更新API文档链接

## 实现细节

### 函数实现逻辑

1. **输入处理**：接收任意类型的输入对象和格式化选项
2. **数字转换**：使用现有的`toFormattedNumber`函数将输入转换为数字或数字数组
3. **预处理**：如果提供了preProcessor函数，对转换后的数字进行预处理
4. **字符串格式化**：
    - 处理特殊值（NaN和0）
    - 根据decimalPlaces处理小数位，不够时补0
    - 应用本地化格式（如果启用）
    - 添加前缀和后缀
5. **数组处理**：支持数组和深层数组的递归处理

### 类型安全性

- 使用TypeScript函数重载确保返回类型正确
- 单个值输入返回string
- 数组输入返回string[]

### 代码复用

- 复用现有的`toFormattedNumber`函数进行数字转换和格式化
- 复用现有的数组处理逻辑

## 预期结果

实现后的`toFormattedNumberString`函数将能够：

- 处理任意输入类型（数字、字符串、布尔值、null、undefined、数组等）
- 支持深层数组递归处理
- 根据选项格式化数字字符串
- 支持本地化格式
- 支持预处理函数
- 支持前缀和后缀
- 处理特殊值（NaN和0）

该功能将为用户提供更灵活的数字字符串格式化选项，满足不同场景的需求。
