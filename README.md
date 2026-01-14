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
const debouncedFn = debounce(() => {
  console.log('函数执行了！');
}, { delay: 500 });

// 多次调用，只会执行最后一次
debouncedFn();
debouncedFn();
debouncedFn();
// 500ms 后执行一次
```

## API 文档

详细的 API 文档请查看 [docs/](docs/) 目录下的模块文档：

- [日期格式化](docs/functions/formatDate.md)
- [函数防抖](docs/functions/debounce.md)
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
├── types/
│   ├── date.ts            # 日期相关类型定义
│   ├── debounce.ts        # 防抖相关类型定义
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