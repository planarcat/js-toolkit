1. 项目使用的框架版本及依赖
    - TypeScript: ^5.0.0
    - Node.js: ^18.0.0
    - ESLint: ^8.0.0
    - TypeDoc: ^0.25.0

2. 测试框架的详细要求
    - 使用 ts-node 进行类型安全的测试运行
    - 所有功能必须通过 TypeScript 编译检查

3. 禁止使用的 API
    - 无特定禁止 API

4. 文件结构规范
    - 核心功能实现文件：`src/{category}/{functionName}.ts`
    - 每个文件只实现一个核心功能（单一职责原则）
    - 类型定义文件：`src/types/{category}.ts`
    - 常量和工具：`src/utils/constants.ts`
    - 每个功能的类型定义应与实现分离
    - 遵循现有的功能分类：date、function、object、string 等
    - 类型接口和类型定义使用 JSDoc 注释
    - 函数实现使用 JSDoc 注释，包含示例

5. 功能示例结构
    - formatDate：`src/date/formatDate.ts` + `src/types/date.ts`
    - debounce：`src/function/debounce.ts` + `src/types/function.ts`
    - toFormattedNumber：`src/object/toFormattedNumber.ts` + `src/types/object.ts`

6. 导出规范
    - 每个功能使用 default export
    - 类型定义使用 named export

7. 文档更新规范
    - 每次修改后需要及时更新文档，特别是影响用户使用的修改
    - 影响用户使用的修改包括：增加、删除功能，改变原有用法，修改参数结构等
    - 文档更新范围包括：README.md、API文档、类型定义注释等

8. 测试文件更新规范
    - 每次修改后，需要针对修改更新测试文件
    - 新增功能时，需要添加对应的测试用例
    - 修改现有功能时，需要更新相关测试用例确保覆盖修改点
    - 删除功能时，需要移除对应的测试用例
    - 所有测试用例必须通过，确保修改不会破坏现有功能
