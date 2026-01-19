# @planarcat/js-toolkit

一个现代化的 JavaScript/TypeScript 实用工具库，提供类型安全、高性能的常用函数。

## 特性

- 🚀 **类型安全**: 完整的 TypeScript 支持，提供完整的类型定义
- 📦 **轻量级**: 零依赖，体积小巧
- 🎯 **高性能**: 优化的算法实现
- 🔧 **现代化**: 使用最新的 JavaScript/TypeScript 特性
- 📚 **学习性质**: 代码清晰，适合学习和参考

## 安装

```bash
# 使用 npm
npm install @planarcat/js-toolkit

# 使用 yarn
yarn add @planarcat/js-toolkit

# 使用 pnpm
pnpm add @planarcat/js-toolkit
```

## 快速开始

### 日期格式化

```typescript
import { formatDate } from '@planarcat/js-toolkit';

// 基本使用
console.log(formatDate(new Date()));
// 输出: "2023-12-25 14:30:45"

// 自定义格式
console.log(formatDate('2023-12-25', 'YYYY年MM月DD日'));
// 输出: "2023年12月25日"

// 使用 dd 标记显示周几
console.log(formatDate(new Date(), 'dd HH:mm'));
// 输出: "周一 14:30"

// 英文环境
console.log(formatDate(new Date(), 'dd HH:mm', { locale: 'en-US' }));
// 输出: "Monday 14:30"
```

### 函数防抖

```typescript
import { debounce } from '@planarcat/js-toolkit';

// 创建防抖函数
const debouncedFn = debounce(
    () => {
        console.log('函数执行了！');
    },
    { delay: 500 },
);

// 多次调用，只会执行最后一次
debouncedFn();
debouncedFn();
debouncedFn();
// 500ms 后执行一次
```

### 数字格式化

```typescript
import { toFormattedNumber, toFormattedNumberString } from '@planarcat/js-toolkit';

// 基本使用
console.log(toFormattedNumber(1234.5678));
// 输出: 1234.5678

// 保留两位小数
console.log(toFormattedNumber(1234.5678, { decimalPlaces: 2 }));
// 输出: 1234.57

// 处理字符串
console.log(toFormattedNumber('123.45abc'));
// 输出: 123.45

// 处理数组
console.log(toFormattedNumber([123.456, '456.789']));
// 输出: [123.456, 456.789]

// 处理深层数组
console.log(
    toFormattedNumber([
        [1, '1.23'],
        ['45.67', [89.01, 'abc']],
    ]),
);
// 输出: [[1, 1.23], [45.67, [89.01, NaN]]]

// 数字转格式化字符串
console.log(toFormattedNumberString(1234.5678, { decimalPlaces: 2 }));
// 输出: "1234.57"

// 保留两位小数，不够时补0
console.log(toFormattedNumberString(123.4, { decimalPlaces: 2 }));
// 输出: "123.40"

// 带前缀后缀
console.log(toFormattedNumberString(1234.5678, { prefix: '$', suffix: ' USD' }));
// 输出: "$1234.5678 USD"

// 本地化格式
console.log(toFormattedNumberString(1234567.89, { localized: true }));
// 输出: "1,234,567.89"

// 自定义NaN和0显示
console.log(toFormattedNumberString(null, { nanValue: 'N/A' }));
// 输出: "N/A"
console.log(toFormattedNumberString(0, { zeroValue: '-' }));
// 输出: "-"

// 预处理函数
console.log(
    toFormattedNumberString(0.1234, {
        preProcessor: (original, num) => num * 100,
        suffix: '%',
    }),
);
// 输出: "12.34%"

// 函数类型前缀
console.log(
    toFormattedNumberString(123.456, {
        prefix: (original, num, formatted) => `$${Math.floor(num)}`,
    }),
);
// 输出: "$123123.456"

// 函数类型后缀
console.log(
    toFormattedNumberString(123.456, {
        suffix: (original, num, formatted) => `/${num.toFixed(0)}`,
    }),
);
// 输出: "123.456/123"

// 处理数组
console.log(toFormattedNumberString([123.456, '789.012'], { decimalPlaces: 2 }));
// 输出: ["123.46", "789.01"]
```

## API 文档

详细的 API 文档请查看 [docs/](docs/) 目录下的模块文档：

- [日期格式化](docs/functions/formatDate.md)
- [函数防抖](docs/functions/debounce.md)
- [数字格式化](docs/functions/toFormattedNumber.md)
- [类型定义](docs/interfaces/)

### 生成文档

```bash
# 生成 API 文档
npm run docs

# 监听模式生成文档
npm run docs:watch
```

## 开发

### 项目结构

```
src/
├── date/
│   └── formatDate.ts      # 日期格式化函数
├── function/
│   └── debounce.ts        # 函数防抖功能
├── object/
│   ├── toFormattedNumber.ts  # 数字格式化函数
│   └── toFormattedNumberString.ts  # 格式化数字字符串函数
├── types/
│   ├── date.ts            # 日期相关类型定义
│   ├── function.ts        # 防抖相关类型定义
│   ├── object.ts          # 数字格式化相关类型定义
│   └── index.ts           # 类型导出
├── utils/
│   └── constants.ts       # 常量定义
└── index.ts               # 主入口文件
```

### 开发命令

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 运行测试
npm test

# 运行测试（监听模式）
npm run test:watch

# 代码检查
npm run lint

# 代码格式化
npm run format

# 清理构建文件
npm run clean
```

### 测试

项目使用 Jest 进行单元测试，测试文件位于 `__tests__/` 目录。

```bash
# 运行所有测试
npm test

# 生成测试覆盖率报告
npm run test:coverage
```

## 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 作者

- **planarcat** - [GitHub](https://github.com/planarcat)

## 更新日志

### v1.6.0

- ✨ 增强了日期格式化功能，支持更多格式化标记
- ✨ 新增月份相关标记：`MMMM`（完整月份名称）、`MMM`（月份缩写）
- ✨ 新增日期相关标记：`DDD`（一年中的第几天）、˜`Do`（带序数词的日期）
- ✨ 新增时间相关标记：`S`（单个毫秒）
- ✨ 新增星期相关标记：`dddd`（完整星期名称）、`ddd`（星期缩写）
- ✨ 新增时间戳相关标记：`X`（Unix时间戳秒）、`x`（Unix时间戳毫秒）
- ✨ 优化了文档结构，添加了完整的格式化标记参考
- ✨ 完善了测试用例，覆盖所有新功能

### v1.5.6

- ✨ 优化了 `toFormattedNumberString` 函数的内部实现，将内部函数提取到外部
- ✨ 统一了变量命名规范，根据转化进度命名：converted、preProcessed、formatted
- ✨ 新增测试用例，验证预处理函数和后缀函数的组合使用
- ✨ 提高了代码的可读性和可维护性

### v1.5.5

- ✨ 修复了测试文件中的未使用变量警告
- ✨ 优化了代码注释，删除了重复的不必要说明
- ✨ 提高了代码的简洁性和可维护性

### v1.5.3

- ✨ 增强了 `toFormattedNumberString` 函数，为 `preProcessor`、`prefix` 和 `suffix` 函数更新了参数顺序
- ✨ `preProcessor` 现在接收两个参数：原始对象和转化后的 number
- ✨ `prefix` 如果是函数，现在接收三个参数：原始对象、转化后的 number、格式化后的字符串
- ✨ `suffix` 如果是函数，现在接收三个参数：原始对象、转化后的 number、格式化后的字符串
- ✨ 增强了测试用例，验证新功能
- ✨ 更新了文档，明确说明每个函数参数的用途

### v1.5.2

- ✨ 更新了函数返回值类型说明，明确区分数组和非数组输入的返回值
- ✨ 生成了最新的 API 文档

### v1.5.1

- ✨ 更新了 README 文档，修复了参数名称
- ✨ 生成了最新的 API 文档

### v1.5.0

- ✨ 为 `toFormattedNumberString` 函数的前缀后缀添加函数类型支持
- ✨ 修复 0 值、NaN 值和无数字字符串的前缀后缀处理问题
- ✨ 完善文档和测试用例，确保覆盖所有功能
- ✨ 优化项目规则文件结构，采用分层管理

### v1.4.0

- ✨ 优化数字格式化功能，无数字字符串返回 `0` 而不是 `NaN`
- ✨ 改进 `toFormattedNumberString` 函数，无数字字符串直接返回 `zeroValue`
- ✨ 完善文档和测试用例
- ✨ 优化深层数组处理逻辑

### v1.3.0

- ✨ 添加数字格式化功能 `toFormattedNumber`
- ✨ 支持处理任意输入类型（number、string、array、deep array）
- ✨ 支持自定义小数位数和 NaN 显示
- ✨ 支持深层数组递归处理
- ✨ 完善的类型定义和 JSDoc 注释
- ✨ 新增 object 分类目录结构

### v1.2.0

- ✨ 优化日期格式化功能，支持使用 `dd` 标记直接显示周几
- ✨ 改进文档系统，使用 TypeDoc 自动生成模块化文档
- ✨ 优化代码结构和类型定义

### v1.1.0

- ✨ 添加函数防抖功能 `debounce`
- ✨ 支持防抖取消功能 `cancel`
- ✨ 完善类型定义
- ✨ 添加防抖函数测试用例

### v1.0.0

- ✨ 初始版本发布
- ✨ 实现日期格式化功能 `formatDate`
- ✨ 完整的 TypeScript 类型支持
- ✨ 单元测试覆盖
- ✨ 构建和发布配置
