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
console.log(formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'));
// 输出: "2023-12-25 14:30:45"

// 自定义格式
console.log(formatDate('2023-12-25', 'YYYY年MM月DD日'));
// 输出: "2023年12月25日"

// 显示周几
console.log(formatDate(new Date(), 'HH:mm', { showWeekday: true }));
// 输出: "周一 14:30"

// 英文环境
console.log(formatDate(new Date(), 'dd', { locale: 'en-US' }));
// 输出: "Mon"
```

## API 文档

### formatDate

格式化日期对象为指定格式的字符串。

#### 语法

```typescript
formatDate(input: DateInput, formatStr?: string, options?: Partial<DateFormatOptions>): string
```

#### 参数

- `input` (DateInput): 要格式化的日期输入，可以是：
  - Date 对象
  - 时间戳（数字）
  - 日期字符串（ISO 8601 或其他常见格式）

- `formatStr` (string, 可选): 格式化字符串，默认为 `'YYYY-MM-DD HH:mm:ss'`

- `options` (Partial<DateFormatOptions>, 可选): 格式化选项

#### 格式化标记

| 标记 | 描述 | 示例 |
|------|------|------|
| `YYYY` | 四位年份 | 2023 |
| `YY` | 两位年份 | 23 |
| `MM` | 两位月份 | 12 |
| `M` | 月份（不补零） | 12 |
| `DD` | 两位日期 | 25 |
| `D` | 日期（不补零） | 25 |
| `HH` | 24小时制小时 | 14 |
| `H` | 小时（不补零） | 14 |
| `hh` | 12小时制小时 | 02 |
| `h` | 12小时制小时（不补零） | 2 |
| `mm` | 分钟 | 30 |
| `m` | 分钟（不补零） | 30 |
| `ss` | 秒 | 45 |
| `s` | 秒（不补零） | 45 |
| `SSS` | 毫秒 | 123 |
| `A` | 上午/下午（大写） | PM |
| `a` | 上午/下午（小写） | pm |
| `d` | 星期几（数字 0-6） | 1 |
| `dd` | 本地化星期几 | 一 |
| `WW` | 两位周数 | 52 |
| `W` | 周数（不补零） | 52 |
| `Q` | 季度 | 4 |
| `timestamp` | 时间戳 | 1703485845123 |

#### 选项

```typescript
interface DateFormatOptions {
  timeZone?: 'local' | 'utc';          // 时区设置，默认 'local'
  locale?: string;                     // 语言环境，默认 'zh-CN'
  showWeekday?: boolean;               // 是否显示周几，默认 false
  weekdayFormat?: string;              // 周几显示格式，默认 '周'
  customFormatters?: Record<string, (date: Date) => string>; // 自定义格式化器
}
```

#### 示例

```typescript
// 基本格式化
formatDate(new Date(), 'YYYY-MM-DD');

// 显示周几
formatDate(new Date(), 'HH:mm', { showWeekday: true });

// 自定义周几格式
formatDate(new Date(), 'HH:mm', { 
  showWeekday: true, 
  weekdayFormat: '星期' 
});

// 英文环境
formatDate(new Date(), 'YYYY-MM-DD dd', { locale: 'en-US' });

// 自定义格式化器
formatDate(new Date(), '第Q季度', {
  customFormatters: {
    '第Q季度': (date) => `第${Math.floor((date.getMonth() + 3) / 3)}季度`
  }
});
```

## 开发

### 项目结构

```
src/
├── date/
│   └── formatDate.ts      # 日期格式化函数
├── types/
│   ├── date.ts            # 日期相关类型定义
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

### v1.0.0

- ✨ 初始版本发布
- ✨ 实现日期格式化功能 `formatDate`
- ✨ 完整的 TypeScript 类型支持
- ✨ 单元测试覆盖
- ✨ 构建和发布配置