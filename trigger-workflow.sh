#!/bin/bash

echo "🚀 GitHub Actions 手动触发脚本"
echo "================================"
echo ""

# 检查当前状态
echo "📊 当前工作流状态:"
echo "- 最新标签: $(git describe --tags --abbrev=0 2>/dev/null || echo '无标签')"
echo "- 所有 v1.7.* 标签: $(git tag -l 'v1.7.*' | tr '\n' ' ')"
echo ""

# 检查工作流配置
echo "🔧 工作流配置检查:"
if grep -q "workflow_dispatch" .github/workflows/ci-cd.yml; then
    echo "✅ 手动触发已启用 (workflow_dispatch)"
else
    echo "❌ 手动触发未配置"
fi

echo ""
echo "📋 触发条件:"
echo "- push 到 main 分支"
echo "- 推送 v* 标签"
echo "- 手动触发 (workflow_dispatch)"
echo ""

echo "🎯 下一步操作:"
echo "1. 手动触发 GitHub Actions:"
echo "   访问: https://github.com/planarcat/js-toolkit/actions"
echo "   点击 'CI/CD Pipeline' → 'Run workflow'"
echo ""
echo "2. 或者推送新标签:"
echo "   git tag v1.7.7"
echo "   git push --tags"
echo ""

echo "📈 监控链接:"
echo "- Actions: https://github.com/planarcat/js-toolkit/actions"
echo "- npm 包: https://www.npmjs.com/package/@planarcat/js-toolkit"
echo "- Releases: https://github.com/planarcat/js-toolkit/releases"
echo ""

echo "💡 提示: 如果手动触发成功，说明配置正确，后续标签推送应该能自动触发！"