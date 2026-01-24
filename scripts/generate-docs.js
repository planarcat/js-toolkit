#!/usr/bin/env node

/**
 * 生成 API 文档脚本
 * 用于手动生成和测试文档生成功能
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始生成 API 文档...');

try {
  // 检查 typedoc 是否可用
  console.log('📋 检查 typedoc 安装状态...');
  execSync('npx typedoc --version', { stdio: 'inherit' });

  // 生成文档
  console.log('📚 生成 API 文档...');
  execSync('pnpm run docs', { stdio: 'inherit' });

  // 检查生成的文档
  const docsPath = path.join(__dirname, '..', 'docs');
  if (fs.existsSync(docsPath)) {
    console.log('✅ 文档生成成功！');
    console.log('📁 生成的文档目录结构:');

    const listFiles = (dir, indent = '') => {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          console.log(`${indent}📂 ${item}/`);
          listFiles(fullPath, indent + '  ');
        } else {
          console.log(`${indent}📄 ${item}`);
        }
      });
    };

    listFiles(docsPath);

    // 检查是否有 index.html 文件
    const indexPath = path.join(docsPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      console.log('\n🌐 文档首页已生成，可以部署到 Github Pages');
    } else {
      console.log(
        '\n⚠️  警告：未找到 index.html 文件，可能需要检查 typedoc 配置',
      );
    }
  } else {
    console.log('❌ 文档生成失败：docs 目录未创建');
  }
} catch (error) {
  console.error('❌ 文档生成失败:', error.message);
  console.log('\n🔧 建议检查：');
  console.log('1. 确保 typedoc 和 typedoc-plugin-markdown 已正确安装');
  console.log('2. 检查 typedoc.json 配置文件是否正确');
  console.log('3. 检查 src 目录下是否有有效的 TypeScript 文件');
  process.exit(1);
}
