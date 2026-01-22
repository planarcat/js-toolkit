# 重新设置Trusted Publishing自动发布流程

## 1. 删除现有自动发布相关文件

### 删除GitHub Actions工作流文件
- 删除 `.github/workflows/ci-cd.yml` 中的发布相关配置
- 删除 `.github/workflows/publish-only.yml` 文件

### 删除调试脚本
- 删除 `scripts/debug/` 目录下的所有脚本文件

### 简化版本更新脚本
- 保留 `scripts/bump-version.js` 但简化其功能，移除自动推送和标签管理

### 更新配置文件
- 更新 `.gitignore`，移除不再需要的发布相关规则
- 更新 `package.json`，简化发布相关脚本

## 2. 创建全新的自动发布流程

### 创建新的GitHub Actions工作流
- 创建一个简化的CI/CD工作流，只包含质量检查和发布功能
- 配置正确的OIDC权限，支持Trusted Publishing
- 只在标签推送时触发发布

### 配置Trusted Publishing
- 确保工作流具有正确的`id-token: write`权限
- 移除所有`NODE_AUTH_TOKEN`相关配置
- 使用`pnpm publish --access public`命令发布

### 保留必要的版本管理功能
- 简化`bump-version.js`脚本，只负责版本号更新和本地标签创建
- 提供清晰的手动发布步骤文档

## 3. 测试和验证

### 测试质量检查流程
- 确保代码提交能触发质量检查

### 测试发布流程
- 创建测试标签，验证发布流程能正确触发
- 检查npm发布结果

## 4. 文档更新

### 更新README.md
- 添加新的发布流程说明
- 提供清晰的发布步骤指导

### 更新项目配置
- 确保所有配置文件都符合新的发布流程

## 执行顺序

1. 删除现有自动发布相关文件
2. 创建新的GitHub Actions工作流
3. 简化版本更新脚本
4. 更新配置文件
5. 测试发布流程
6. 更新文档

通过以上步骤，我们将建立一个全新的、基于Trusted Publishing的自动发布流程，确保安全、可靠地发布npm包。