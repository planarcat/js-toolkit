#!/bin/bash

echo "=== GitHub Actions 工作流状态检查 ==="
echo ""

# 检查当前标签
echo "📌 当前标签状态:"
git tag -l | grep v1.7
echo ""

# 检查工作流配置
echo "🔧 工作流触发配置:"
echo "触发条件: push 到 main 分支 或 推送 v* 标签"
echo "手动触发: 已启用 (workflow_dispatch)"
echo ""

echo "🚀 下一步操作:"
echo "1. 访问 https://github.com/planarcat/js-toolkit/actions"
echo "2. 手动触发 CI/CD Pipeline 工作流"
echo "3. 或推送新标签: git tag v1.7.7 && git push --tags"
echo ""

echo "📊 检查发布状态:"
echo "- npm 包: https://www.npmjs.com/package/@planarcat/js-toolkit"
echo "- GitHub Releases: https://github.com/planarcat/js-toolkit/releases"
echo "- Actions 日志: https://github.com/planarcat/js-toolkit/actions"