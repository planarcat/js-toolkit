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

// 生成新版本号
const newVersion = bumpVersion(currentVersion, versionType, prereleaseId);
console.log(`新版本: ${newVersion}`);

// 更新 package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// 生成 API 文档
console.log('生成 API 文档...');
execSync('pnpm run docs', { stdio: 'inherit' });

// 提交版本更新和文档变更
console.log('提交版本更新和文档变更...');
execSync('git add package.json docs/', { stdio: 'inherit' });
execSync(`git commit -m "chore: bump version to ${newVersion}"`, {
  stdio: 'inherit',
});

// 创建 git 标签
const tagName = `v${newVersion}`;
console.log(`创建标签: ${tagName}`);
execSync(`git tag ${tagName}`, { stdio: 'inherit' });

console.log('\n版本更新完成！');
console.log(`使用以下命令推送更新和标签:`);
console.log(`  git push`);
console.log(`  git push --tags`);
console.log('\n推送后，GitHub Actions 将自动发布到 npm！');
console.log('\nAPI 文档已自动生成并提交！');
