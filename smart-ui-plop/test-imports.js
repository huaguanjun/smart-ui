#!/usr/bin/env node

/**
 * 测试模块导入
 */

console.log('Node.js 版本:', process.version);

// 测试 url 模块
import { fileURLToPath } from 'url';
console.log('✓ url 模块导入成功');

// 测试 path 模块
import { dirname, join } from 'path';
console.log('✓ path 模块导入成功');

// 测试 fs 模块
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
console.log('✓ fs 模块导入成功');

console.log('所有模块导入成功！');

// 测试基本功能
const testPath = join(__dirname, 'test.txt');
try {
  writeFileSync(testPath, '测试文件', 'utf8');
  console.log('✓ 文件写入成功');
  
  if (existsSync(testPath)) {
    console.log('✓ 文件存在检查成功');
    
    const content = readFileSync(testPath, 'utf8');
    console.log('✓ 文件读取成功，内容:', content);
  }
} catch (error) {
  console.error('✗ 测试失败:', error.message);
}
