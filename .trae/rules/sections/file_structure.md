# 文件结构规则

## 1. 文件结构规范
- 核心功能实现文件：`src/{category}/{functionName}.ts`
- 每个文件只实现一个核心功能（单一职责原则）
- 类型定义文件：`src/types/{category}.ts`
- 常量和工具：`src/utils/constants.ts`
- 每个功能的类型定义应与实现分离
- 遵循现有的功能分类：date、function、object、string 等

## 2. 功能示例结构
- formatDate：`src/date/formatDate.ts` + `src/types/date.ts`
- debounce：`src/function/debounce.ts` + `src/types/function.ts`
- toFormattedNumber：`src/object/toFormattedNumber.ts` + `src/types/object.ts`

## 3. 导出规范
- 每个功能使用 default export
- 类型定义使用 named export