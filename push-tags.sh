#!/bin/bash

echo "推送标签到 GitHub..."
git push --tags

echo "标签推送完成！"
echo "GitHub Actions 将自动触发发布流程。"
echo "请访问 https://github.com/planarcat/js-toolkit/actions 查看进度。"