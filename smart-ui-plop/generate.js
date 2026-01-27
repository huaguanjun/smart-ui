#!/usr/bin/env node

/**
 * 实际生成文件脚本
 * 用于绕过服务器端 Node.js 版本兼容性问题
 * 在命令行中执行实际的 plop 生成操作
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import plop from 'plop';

// 获取当前文件路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 生成页面
 * @param {Object} options 生成选项
 * @param {string} options.name 页面名称
 * @param {string} options.apiUrl API地址
 * @param {boolean} options.hasSearchForm 是否需要搜索表单
 * @param {boolean} options.hasTable 是否需要表格
 * @param {boolean} options.hasForm 是否需要表单
 * @param {Array} options.fields 字段配置
 */
async function generatePage(options) {
  try {
    console.log('开始生成页面...');
    console.log('生成选项:', options);
    
    // 创建 plop 实例
    const plopInstance = await plop.default({
      cwd: __dirname,
      configPath: join(__dirname, 'plopfile.js'),
      dest: join(__dirname, 'src/views')
    });
    
    // 执行生成器
    const result = await plopInstance.executeGenerator('page', {
      ...options,
      fields: JSON.stringify(options.fields || [])
    });
    
    console.log('\n生成结果:');
    console.log('成功生成:', result.changes?.length || 0, '个文件');
    console.log('失败:', result.failures?.length || 0, '个文件');
    
    if (result.changes) {
      console.log('\n生成的文件:');
      result.changes.forEach(change => {
        console.log(`- ${change.type}: ${change.path}`);
      });
    }
    
    if (result.failures) {
      console.log('\n失败的操作:');
      result.failures.forEach(failure => {
        console.log(`- ${failure.path}: ${failure.error}`);
      });
    }
    
    console.log('\n页面生成完成！');
    return result;
  } catch (error) {
    console.error('生成失败:', error);
    throw error;
  }
}

// 如果直接运行脚本，使用默认参数生成测试页面
if (import.meta.url === `file://${process.argv[1]}`) {
  generatePage({
    name: 'TestPage',
    apiUrl: '/api/test/list',
    hasSearchForm: true,
    hasTable: true,
    hasForm: true,
    fields: [
      {
        label: 'ID',
        field: 'id',
        type: 'input',
        search: true,
        table: true,
        form: false
      },
      {
        label: 'Name',
        field: 'name',
        type: 'input',
        search: true,
        table: true,
        form: true
      },
      {
        label: 'Status',
        field: 'status',
        type: 'select',
        search: true,
        table: true,
        form: true,
        options: [
          { label: '启用', value: 'enabled' },
          { label: '禁用', value: 'disabled' }
        ]
      }
    ]
  }).catch(console.error);
}

export { generatePage };
export default generatePage;