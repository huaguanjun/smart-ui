import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// 暂时注释掉 plop 导入，避免 Node 14 不兼容的语法
// import plop from 'plop';

// 获取当前文件路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 创建Express应用
const app = express();
const port = 3001;

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static(join(__dirname, '../dist')));

/**
 * 生成页面API
 * POST /api/generate
 * body: {
 *   name: string, // 页面名称
 *   apiUrl: string, // API地址
 *   hasSearchForm: boolean, // 是否需要搜索表单
 *   hasTable: boolean, // 是否需要表格
 *   hasForm: boolean, // 是否需要表单
 *   fields: string, // 字段配置JSON
 *   featureApis: object, // 各功能的API配置 { hasSearchForm: { method, url }, hasTable: { method, url }, hasForm: { method, url } }
 * }
 */
app.post('/api/generate', async (req, res) => {
  try {
    const { name, hasSearchForm, hasTable, hasForm, fields, featureApis } = req.body;
    
    // 验证参数
    if (!name) {
      return res.status(400).json({ error: '页面名称不能为空' });
    }
    
    // 解析字段配置
    let fieldsObj = [];
    try {
      fieldsObj = JSON.parse(fields || '[]');
    } catch (error) {
      return res.status(400).json({ error: '字段配置JSON格式错误' });
    }
    
    // 解析功能API配置
    const apis = featureApis || {};
    
    // 模拟生成结果（由于 Node 14 不兼容 plop 4.0.5）
    const mockResult = {
      changes: [
        {
          type: 'add',
          path: `../src/views/${name}/index.vue`,
          api: { method: 'GET', url: '' }
        },
        ...(hasTable ? [{ 
          type: 'add', 
          path: `../src/views/${name}/${name}Table.vue`,
          api: apis.hasTable || { method: 'GET', url: '' }
        }] : []),
        ...(hasForm ? [{ 
          type: 'add', 
          path: `../src/views/${name}/${name}Form.vue`,
          api: apis.hasForm || { method: 'POST', url: '' }
        }] : []),
        ...(hasSearchForm ? [{ 
          type: 'add', 
          path: `../src/views/${name}/${name}SearchForm.vue`,
          api: apis.hasSearchForm || { method: 'GET', url: '' }
        }] : []),
        {
          type: 'modify',
          path: '../src/router/index.js'
        }
      ],
      failures: []
    };
    
    res.json({
      success: true,
      message: '页面生成成功（模拟）',
      result: mockResult
    });
  } catch (error) {
    console.error('生成失败:', error);
    res.status(500).json({ 
      error: '生成失败',
      message: error.message 
    });
  }
});

/**
 * 健康检查API
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
  console.log(`GUI界面: http://localhost:${port}`);
  console.log(`API地址: http://localhost:${port}/api`);
});
