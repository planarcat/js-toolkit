#!/usr/bin/env node

/**
 * 测试文档生成脚本
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 测试文档生成功能...');

try {
  // 检查 typedoc 版本
  console.log('1. 检查 typedoc 版本...');
  execSync('npx typedoc --version', { stdio: 'inherit' });

  // 检查 src 目录是否存在
  console.log('2. 检查 src 目录...');
  const srcPath = path.join(__dirname, '..', 'src');
  if (!fs.existsSync(srcPath)) {
    throw new Error('src 目录不存在');
  }
  console.log('✅ src 目录存在');

  // 检查是否有 TypeScript 文件
  const tsFiles = fs.readdirSync(srcPath).filter(file => file.endsWith('.ts'));
  if (tsFiles.length === 0) {
    throw new Error('src 目录中没有 TypeScript 文件');
  }
  console.log(`✅ 找到 ${tsFiles.length} 个 TypeScript 文件`);

  // 生成文档
  console.log('3. 生成文档...');
  execSync('pnpm run docs', { stdio: 'inherit' });

  // 检查生成的文档
  const docsPath = path.join(__dirname, '..', 'docs');
  if (fs.existsSync(docsPath)) {
    console.log('✅ 文档生成成功！');

    // 列出文档文件
    const files = fs.readdirSync(docsPath);
    console.log('📁 生成的文档文件:');
    files.forEach(file => {
      const filePath = path.join(docsPath, file);
      const stat = fs.statSync(filePath);
      console.log(`   ${stat.isDirectory() ? '📂' : '📄'} ${file}`);
    });

    // 检查是否有 index.html
    const indexPath = path.join(docsPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      console.log('\n🌐 index.html 已生成，可以部署到 Github Pages');

      // 检查文件大小
      const stats = fs.statSync(indexPath);
      console.log(
        `📊 index.html 文件大小: ${(stats.size / 1024).toFixed(2)} KB`,
      );

      // 检查文件内容
      const content = fs.readFileSync(indexPath, 'utf8');
      if (content.includes('<!DOCTYPE html>')) {
        console.log('✅ HTML 文档格式正确');
      } else {
        console.log('⚠️  HTML 文档格式可能有问题');
      }
    } else {
      console.log('\n⚠️  警告：未找到 index.html 文件');
    }
  } else {
    console.log('❌ 文档生成失败：docs 目录未创建');
  }
} catch (error) {
  console.error('❌ 测试失败:', error.message);
  process.exit(1);
}
