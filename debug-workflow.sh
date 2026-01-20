#!/bin/bash

echo "🔍 GitHub Actions 工作流调试脚本"
echo "================================"
echo ""

# 检查工作流文件
echo "📋 检查工作流配置:"
if [ -f ".github/workflows/ci-cd.yml" ]; then
    echo "✅ ci-cd.yml 存在"
    # 检查是否有分支切换逻辑
    if grep -q "git checkout" .github/workflows/ci-cd.yml; then
        echo "❌ 发现分支切换逻辑"
        grep -n "git checkout" .github/workflows/ci-cd.yml
    else
        echo "✅ 无分支切换逻辑"
    fi
    
    # 检查发布配置
    echo ""
    echo "📦 发布作业配置:"
    grep -A10 "Publish to npm" .github/workflows/ci-cd.yml
else
    echo "❌ ci-cd.yml 不存在"
fi

echo ""

# 检查其他工作流文件
echo "📁 检查其他工作流文件:"
for file in .github/workflows/*.yml; do
    if [ "$file" != ".github/workflows/ci-cd.yml" ]; then
        echo "- $file"
        if grep -q "publish" "$file"; then
            echo "  ⚠️  包含发布相关配置"
        fi
    fi
done

echo ""

# 检查当前标签状态
echo "🏷️  当前标签状态:"
git tag -l | grep v1.7
echo ""

echo "🚀 解决方案:"
echo "1. 删除旧标签: git tag -d v1.7.9"
echo "2. 创建新标签: git tag v1.7.9"
echo "3. 推送标签: git push --tags"
echo ""
echo "💡 如果问题仍然存在，可能是 GitHub Actions 缓存问题"
echo "   尝试手动触发工作流: https://github.com/planarcat/js-toolkit/actions"