# 文件放置规范

## 📁 项目目录结构

```
├── src/                # 源代码目录
├── __tests__/          # 测试文件
├── scripts/            # 脚本目录
├── docs/               # 文档目录
├── .github/            # GitHub配置
└── FILE_PLACEMENT_GUIDE.md  # 本规范文档
```

## 📝 文件放置规则

### 1. 源代码文件 (`src/`)

**规则**: 所有源代码必须放在 `src/` 目录下，并按功能模块组织

**子目录结构**:
- `src/date/` - 日期相关功能
- `src/function/` - 函数相关功能
- `src/object/` - 对象相关功能
- `src/types/` - 类型定义
- `src/utils/` - 工具函数

**示例**:
- `src/date/formatDate.ts` - 日期格式化函数
- `src/function/debounce.ts` - 防抖函数
- `src/types/index.ts` - 类型导出

### 2. 测试文件 (`__tests__/`)

**规则**: 测试文件必须放在 `__tests__/` 目录下，与源代码结构保持一致

**子目录结构**:
- `__tests__/unit/` - 单元测试
  - `__tests__/unit/date/` - 日期相关测试
  - `__tests__/unit/function/` - 函数相关测试
  - `__tests__/unit/object/` - 对象相关测试

**示例**:
- `__tests__/unit/date/formatDate.test.ts` - formatDate 函数的单元测试

### 3. 脚本文件 (`scripts/`)

**规则**: 所有脚本文件必须放在 `scripts/` 目录下，按用途分类

**子目录结构**:

#### 3.1 核心自动化脚本 (`scripts/`)
- **用途**: 项目核心自动化任务
- **示例**: `scripts/bump-version.js` - 自动版本更新脚本
- **要求**: 必须是项目正常运行所必需的

#### 3.2 工具脚本 (`scripts/utils/`)
- **用途**: 辅助开发的工具脚本
- **示例**: `scripts/utils/cleanup-project.js` - 项目清理工具
- **要求**: 用于辅助开发，非核心功能

#### 3.3 调试脚本 (`scripts/debug/`)
- **用途**: 调试和测试用的临时脚本
- **示例**: `scripts/debug/test-workflow.sh` - 测试工作流脚本
- **要求**: 已添加到 `.gitignore`，不提交到代码库

### 4. 文档文件 (`docs/`)

**规则**: 所有文档必须放在 `docs/` 目录下，按类型分类

**子目录结构**:

#### 4.1 API 文档 (`docs/functions/`, `docs/interfaces/`, etc.)
- **用途**: 自动生成的 API 文档
- **示例**: `docs/functions/formatDate.md` - formatDate 函数的 API 文档
- **要求**: 由 typedoc 自动生成，不手动编辑

#### 4.2 开发指南 (`docs/dev-guides/`)
- **用途**: 手动编写的开发指南和流程文档
- **示例**: `docs/dev-guides/ci-cd-workflow.md` - CI/CD 工作流指南
- **要求**: 详细说明开发流程、最佳实践等

### 5. 配置文件 (根目录)

**规则**: 只允许必要的配置文件放在根目录

**允许的根目录配置文件**:
- `.eslintrc.js` - ESLint 配置
- `.prettierrc` - Prettier 配置
- `jest.config.js` - Jest 配置
- `package.json` - 项目配置
- `tsconfig.json` - TypeScript 配置
- `.gitignore` - Git 忽略规则
- `.github/` - GitHub 配置目录

**禁止的根目录文件**:
- 临时调试脚本
- 个人配置文件
- 非必要的文档文件

### 6. GitHub 配置 (`github/`)

**规则**: 所有 GitHub 相关配置必须放在 `.github/` 目录下

**子目录结构**:
- `.github/workflows/` - GitHub Actions 工作流
- `.github/ISSUE_TEMPLATE/` - Issue 模板
- `.github/PULL_REQUEST_TEMPLATE/` - PR 模板

**示例**:
- `.github/workflows/ci-cd.yml` - CI/CD 工作流

## 🎯 最佳实践

1. **单一职责原则**: 每个文件只包含一个主要功能或组件
2. **一致的命名**: 使用一致的命名约定
3. **按功能组织**: 按功能模块组织文件，便于维护
4. **避免重复**: 不要在多个地方放置相同的功能
5. **及时清理**: 及时清理不再使用的文件
6. **更新文档**: 当文件位置或结构改变时，更新本规范

## 🚫 禁止事项

1. **禁止**在根目录放置临时脚本文件
2. **禁止**在源代码目录放置测试文件
3. **禁止**在测试目录放置源代码文件
4. **禁止**在文档目录放置脚本文件
5. **禁止**提交调试脚本到代码库

## 📋 变更记录

| 日期       | 变更内容                     | 作者       |
|------------|------------------------------|------------|
| 2026-01-20 | 初始创建文件放置规范         | PlanarCat  |
| 2026-01-20 | 明确脚本目录结构             | PlanarCat  |
| 2026-01-20 | 添加调试脚本目录到 `.gitignore` | PlanarCat  |

## 💡 为什么需要这个规范？

1. **保持项目结构清晰**
2. **提高开发效率** - 便于查找和管理文件
3. **降低维护成本** - 新开发者容易上手
4. **避免文件混乱** - 防止临时文件污染项目根目录
5. **遵循最佳实践** - 符合现代项目管理规范

---

**本规范适用于所有项目成员，违反规范的文件将被要求移动到正确位置。**
