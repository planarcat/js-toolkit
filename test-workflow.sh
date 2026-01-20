#!/bin/bash

echo "=== 测试 GitHub Actions 工作流触发 ==="
echo ""

# 检查当前标签
echo "1. 检查当前标签:"
git tag -l | grep v1.7
echo ""

# 检查工作流文件
echo "2. 检查工作流配置:"
cat .github/workflows/ci-cd.yml | grep -A5 -B5 "tags:"
echo ""

echo "3. 手动触发工作流的方法:"
echo "   a) 访问 https://github.com/planarcat/js-toolkit/actions"
echo "   b) 点击 'CI/CD Pipeline' 工作流"
echo "   c) 点击 'Run workflow' 按钮"
echo "   d) 选择分支并运行"
echo ""

echo "4. 或者推送一个新标签:"
echo "   git tag v1.7.7"
echo "   git push --tags"
echo ""

echo "5. 检查 GitHub Actions 状态:"
echo "   访问: https://github.com/planarcat/js-toolkit/actions"