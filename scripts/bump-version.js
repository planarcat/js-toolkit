#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 获取命令行参数
const args = process.argv.slice(2);
const versionType = args[0] || 'patch'; // patch, minor, major, prerelease
const prereleaseId = args[1] || 'beta'; // beta, alpha, rc

// 读取 package.json
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// 获取当前版本
const currentVersion = packageJson.version;
console.log(`当前版本: ${currentVersion}`);

// 版本更新函数
function bumpVersion(version, type, prereleaseId) {
  const parts = version.split('.');
  let major = parseInt(parts[0]);
  let minor = parseInt(parts[1]);
  let patch = parseInt(parts[2].split('-')[0]);
  let prerelease = parts[2].split('-')[1] || null;

  switch (type) {
    case 'major':
      major++;
      minor = 0;
      patch = 0;
      prerelease = null;
      break;
    case 'minor':
      minor++;
      patch = 0;
      prerelease = null;
      break;
    case 'patch':
      patch++;
      prerelease = null;
      break;
    case 'prerelease':
      if (prerelease) {
        const prereleaseParts = prerelease.split('.');
        if (prereleaseParts[0] === prereleaseId) {
          const prereleaseNumber = parseInt(prereleaseParts[1] || '0') + 1;
          prerelease = `${prereleaseId}.${prereleaseNumber}`;
        } else {
          prerelease = `${prereleaseId}.0`;
        }
      } else {
        prerelease = `${prereleaseId}.0`;
      }
      break;
    default:
      throw new Error(`不支持的版本类型: ${type}`);
  }

  let newVersion = `${major}.${minor}.${patch}`;
  if (prerelease) {
    newVersion += `-${prerelease}`;
  }

  return newVersion;
}

// 主流程
async function main() {
  try {
    // 生成新版本号
    const newVersion = bumpVersion(currentVersion, versionType, prereleaseId);
    console.log(`新版本: ${newVersion}`);

    // 更新 package.json
    packageJson.version = newVersion;
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + '\n',
    );
    console.log('package.json 版本号已更新');

    // 生成 API 文档
    console.log('生成 API 文档...');
    try {
      execSync('pnpm run docs', { stdio: 'inherit' });
      console.log('API 文档生成成功');
    } catch (error) {
      console.error('\n⚠️  API 文档生成失败，将跳过文档提交');
      console.error('错误信息:', error.message);
      // 继续执行版本更新，不中断流程
    }

    // 提交版本更新和文档变更
    console.log('提交版本更新和文档变更...');
    try {
      execSync('git add package.json', { stdio: 'inherit' });
      // 仅当 docs 目录存在且有变更时才添加
      const docsExists = fs.existsSync(path.join(__dirname, '../docs'));
      if (docsExists) {
        execSync('git add docs/', { stdio: 'inherit' });
      }
      execSync(`git commit -m "chore: bump version to ${newVersion}"`, {
        stdio: 'inherit',
      });
      console.log('代码提交成功');
    } catch (error) {
      console.error('\n⚠️  代码提交失败');
      console.error('错误信息:', error.message);
      throw error;
    }

    // 创建 git 标签
    const tagName = `v${newVersion}`;
    console.log(`创建标签: ${tagName}`);
    try {
      execSync(`git tag ${tagName}`, { stdio: 'inherit' });
      console.log('git 标签创建成功');
    } catch (error) {
      console.error('\n⚠️  git 标签创建失败');
      console.error('错误信息:', error.message);
      throw error;
    }

    console.log('\n版本更新完成！');
    console.log(`使用以下命令推送更新和标签:`);
    console.log(`  git push`);
    console.log(`  git push --tags`);
    console.log('\n推送后，GitHub Actions 将自动发布到 npm！');
    console.log('\nAPI 文档已自动生成并提交（如果生成成功）！');
  } catch (error) {
    console.error('\n❌ 版本更新失败');
    console.error('错误信息:', error.message);
    console.error('\n请检查以上错误并手动修复，然后重试版本更新。');
    process.exit(1);
  }
}

// 执行主流程
main();
