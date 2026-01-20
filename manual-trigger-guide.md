# GitHub Actions 手动触发指南

## 步骤1: 访问 GitHub Actions 页面
打开浏览器，访问：https://github.com/planarcat/js-toolkit/actions

## 步骤2: 选择工作流
在左侧菜单中找到并点击 "CI/CD Pipeline" 工作流

## 步骤3: 手动触发
1. 点击页面右侧的 "Run workflow" 按钮
2. 在弹出的对话框中，确保选择 "main" 分支
3. 点击绿色的 "Run workflow" 按钮

## 步骤4: 监控进度
工作流开始运行后，你可以：
- 查看实时日志输出
- 监控每个作业的状态（quality-check 和 publish）
- 检查是否有错误或警告

## 预期结果
如果工作流正常运行，你应该看到：
1. ✅ quality-check 作业通过（测试、构建、代码检查）
2. ✅ publish 作业通过（发布到 npm）
3. ✅ GitHub Release 自动创建

## 故障排除
如果工作流失败：
- 检查日志中的错误信息
- 确保 npm token 已正确配置
- 检查 Git 分支和标签状态

## 验证发布
工作流完成后，验证：
- npm 包版本：https://www.npmjs.com/package/@planarcat/js-toolkit
- GitHub Release：https://github.com/planarcat/js-toolkit/releases