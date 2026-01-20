#!/bin/bash

echo "=== 检查本地标签 ==="
git tag -l

echo ""
echo "=== 检查远程标签 ==="
git ls-remote --tags origin

echo ""
echo "=== 检查 GitHub Actions 状态 ==="
echo "请访问: https://github.com/planarcat/js-toolkit/actions"

echo ""
echo "=== 检查 npm 包版本 ==="
echo "请访问: https://www.npmjs.com/package/@planarcat/js-toolkit"