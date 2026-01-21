#!/usr/bin/env node

/**
 * 项目文件清理工具
 * 用于整理项目结构，将临时文件移动到合适位置
 */

const fs = require('fs');
const path = require('path');

// 定义目录结构
const rootDir = process.cwd();

// 1. 创建必要的目录
const directories = ['docs/dev-guides', 'scripts/debug'];

directories.forEach(dir => {
  const fullPath = path.join(rootDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ 创建目录: ${dir}`);
  }
});

// 2. 移动文档文件到 docs/dev-guides
const docFiles = [
  'correct-push-publish-guide.md',
  'github-release-permission-guide.md',
  'manual-trigger-guide.md',
  'npm-publish-setup-guide.md',
  'optimal-workflow-design.md',
  'optimized-workflow-guide.md',
];

docFiles.forEach(file => {
  const source = path.join(rootDir, file);
  const target = path.join(rootDir, 'docs/dev-guides', file);
  if (fs.existsSync(source)) {
    fs.renameSync(source, target);
    console.log(`✅ 移动文档: ${file} → docs/dev-guides/`);
  }
});

// 3. 移动调试脚本到 scripts/debug
const debugScripts = [
  'check-status.sh',
  'check-trigger-logic.sh',
  'check-workflow-status.sh',
  'debug-workflow.sh',
  'push-tags.sh',
  'test-workflow.sh',
  'trigger-workflow.sh',
];

debugScripts.forEach(file => {
  const source = path.join(rootDir, file);
  const target = path.join(rootDir, 'scripts/debug', file);
  if (fs.existsSync(source)) {
    fs.renameSync(source, target);
    console.log(`✅ 移动调试脚本: ${file} → scripts/debug/`);
  }
});

// 4. 确保 bump-version.js 在 scripts 目录
const bumpVersionSource = path.join(rootDir, 'bump-version.js');
const bumpVersionTarget = path.join(rootDir, 'scripts', 'bump-version.js');
if (fs.existsSync(bumpVersionSource)) {
  if (bumpVersionSource !== bumpVersionTarget) {
    fs.renameSync(bumpVersionSource, bumpVersionTarget);
    console.log('✅ 确保 bump-version.js 在 scripts/ 目录');
  }
}

// 5. 清理根目录下的旧脚本文件
const oldCleanupScripts = [
  'cleanup-project.js',
  'scripts/utils/cleanup-files.js',
];

oldCleanupScripts.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    // 不删除当前运行的脚本
    if (filePath !== __filename) {
      fs.unlinkSync(filePath);
      console.log(`✅ 删除旧脚本: ${file}`);
    }
  }
});

console.log('\n🎉 项目文件整理完成！');
console.log('\n📁 新的文件结构:');
console.log('- scripts/             - 核心自动化脚本');
console.log('- scripts/debug/       - 调试脚本');
console.log('- docs/dev-guides/     - 开发指南文档');
console.log('\n💡 提示: 请将调试脚本添加到 .gitignore 文件中');
