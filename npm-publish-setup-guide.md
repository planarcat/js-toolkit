# npm 发布配置指南

## 🔍 问题描述

GitHub Actions 发布失败，错误信息：

```
npm error code ENEEDAUTH
npm error need auth This command requires you to be logged in
```

## 🛠️ 解决方案

### 步骤1: 获取 npm token

#### 方法1: 通过命令行

```bash
# 1. 登录 npm（如果尚未登录）
npm login

# 2. 创建新的 token
npm token create

# 3. 复制生成的 token
```

#### 方法2: 通过 npm 网站

1. 访问：https://www.npmjs.com/settings/planarcat/tokens
2. 点击 "Generate New Token"
3. 选择 "Automation" 类型
4. 设置适当的权限
5. 复制生成的 token

### 步骤2: 配置 GitHub Secrets

1. **访问 GitHub 仓库设置**：
   - 打开：https://github.com/planarcat/js-toolkit/settings/secrets/actions

2. **添加新的 secret**：
   - 点击 "New repository secret"
   - **Name**: `NPM_TOKEN`
   - **Value**: 粘贴你的 npm token
   - 点击 "Add secret"

### 步骤3: 验证配置

#### 检查工作流配置

当前工作流配置已经正确：

```yaml
env:
  NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

#### 测试发布

1. 推送新的标签：

   ```bash
   git tag v1.7.10
   git push --tags
   ```

2. 监控 GitHub Actions：
   - 访问：https://github.com/planarcat/js-toolkit/actions

## 💡 重要提示

### Token 类型

- **Automation token**: 适合 CI/CD 场景，不能用于登录
- **Publish token**: 专门用于发布包

### 权限设置

确保 token 有足够的权限：

- 读取和发布包的权限
- 如果使用组织，需要组织权限

### 安全注意事项

- **不要将 token 提交到代码库**
- 使用 GitHub Secrets 安全存储
- 定期轮换 token

## 🔧 故障排除

### 如果仍然失败

1. **检查 token 权限**：确保有发布权限
2. **验证包名可用性**：确保 `@planarcat/js-toolkit` 可用
3. **检查组织权限**：如果使用组织，需要相应权限

### 手动测试发布

```bash
# 本地测试发布（使用你的 token）
npm publish --access public
```

## 📊 验证发布成功

发布成功后，检查：

1. **npm 包页面**：https://www.npmjs.com/package/@planarcat/js-toolkit
2. **GitHub Releases**：https://github.com/planarcat/js-toolkit/releases
3. **GitHub Actions 日志**：查看发布作业的详细日志

## 🚀 自动化流程

配置完成后，你的自动化发布流程：

1. 更新代码 → `git push` → 质量检查
2. 创建标签 → `git push --tags` → 自动发布到 npm

现在请按照上述步骤配置 npm token，然后重新触发发布流程！
