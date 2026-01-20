#!/bin/bash

echo "🔍 检查标签推送触发逻辑"
echo "========================"
echo ""

# 检查当前标签状态
echo "🏷️  当前标签状态:"
git tag -l | grep v1.7
echo ""

# 检查工作流配置
echo "📋 CI/CD Pipeline 触发配置:"
if grep -q "tags:" .github/workflows/ci-cd.yml; then
    echo "❌ CI/CD Pipeline 仍然监听 tags 触发"
    grep -A2 -B2 "tags:" .github/workflows/ci-cd.yml
else
    echo "✅ CI/CD Pipeline 已移除 tags 触发"
fi
echo ""

echo "📋 Publish Only 触发配置:"
if grep -q "tags:" .github/workflows/publish-only.yml; then
    echo "✅ Publish Only 监听 tags 触发"
    grep -A2 -B2 "tags:" .github/workflows/publish-only.yml
else
    echo "❌ Publish Only 未配置 tags 触发"
fi
echo ""

echo "💡 问题分析:"
echo "git push --tags 会同时推送代码变更和标签"
echo "GitHub Actions 可能将标签推送视为代码推送"
echo ""

echo "🚀 解决方案:"
echo "1. 确保只推送标签，不推送代码变更"
echo "2. 或者使用条件判断来避免重复触发"
echo ""

echo "📝 正确的操作顺序:"
echo "1. git push          # 推送代码变更"
echo "2. git push --tags   # 只推送标签（不推送代码）"
echo ""
echo "🔧 或者使用条件判断:"
echo "在 CI/CD Pipeline 中添加条件: if: github.event_name != 'push' || !startsWith(github.ref, 'refs/tags/')"