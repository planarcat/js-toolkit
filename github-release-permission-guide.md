# GitHub Release 权限配置指南

## 🔍 问题描述
GitHub Actions 发布失败，错误信息：
```
GitHub release failed with status: 403
Resource not accessible by integration
```

## 🛠️ 解决方案

### 方法1: 配置 GitHub 仓库权限（推荐）

1. **访问 GitHub 仓库设置**：
   - 打开：https://github.com/planarcat/js-toolkit/settings/actions

2. **配置 Workflow permissions**：
   - 找到 "Workflow permissions" 部分
   - 选择 "Read and write permissions"
   - 或者选择 "Allow GitHub Actions to create and approve pull requests"
   - 点击 "Save"

### 方法2: 在 workflow 中配置权限（已配置）

我已经在 `publish-only.yml` 中添加了权限配置：
```yaml
permissions:
  contents: write  # 允许创建 Release
  packages: write  # 允许发布包
```

### 方法3: 使用 Personal Access Token（如果需要）

如果上述方法仍然失败，可以配置 Personal Access Token：

1. **创建 Personal Access Token**：
   - 访问：https://github.com/settings/tokens
   - 点击 "Generate new token"
   - 选择 "Fine-grained tokens"
   - 设置权限：
     - Repository permissions: Contents (Read and write)
     - Repository permissions: Metadata (Read-only)

2. **配置 GitHub Secrets**：
   - 访问：https://github.com/planarcat/js-toolkit/settings/secrets/actions
   - 添加新的 secret：
     - **Name**: `PERSONAL_ACCESS_TOKEN`
     - **Value**: 你的 Personal Access Token

3. **更新 workflow 配置**：
   ```yaml
   env:
     GITHUB_TOKEN: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
   ```

## 💡 权限说明

### 需要的权限
- **contents: write** - 创建 GitHub Release
- **packages: write** - 发布 npm 包（如果需要）

### 默认的 GITHUB_TOKEN 权限
GitHub Actions 默认的 `GITHUB_TOKEN` 只有读取权限，需要显式配置写入权限。

## 🔧 故障排除

### 如果仍然失败
1. **检查仓库设置**：确保 Workflow permissions 已配置为 "Read and write"
2. **验证权限配置**：检查 workflow 文件中的 permissions 部分
3. **查看 Actions 日志**：检查详细的错误信息

### 验证配置
推送新标签测试：
```bash
git tag v1.7.12
git push --tags
```

## 📊 验证发布成功

发布成功后，检查：
1. **GitHub Releases**：https://github.com/planarcat/js-toolkit/releases
2. **npm 包**：https://www.npmjs.com/package/@planarcat/js-toolkit
3. **GitHub Actions 日志**：查看发布作业的详细日志

## 🚀 完整的自动化流程

配置完成后，你的自动化发布流程：
1. 更新代码 → `git push` → 质量检查
2. 创建标签 → `git push --tags` → 自动发布到 npm + 创建 GitHub Release

现在请按照上述步骤配置 GitHub Release 权限，然后重新触发发布流程！