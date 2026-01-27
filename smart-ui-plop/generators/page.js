/**
 * 页面生成器
 * 生成页面骨架、表格、表单、搜索表单等
 */
export default {
  description: '生成页面（包含表格、表单、搜索表单）',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '页面名称（PascalCase）:',
      validate: (value) => value ? true : '页面名称不能为空'
    },
    {
      type: 'input',
      name: 'apiUrl',
      message: 'API地址:',
      validate: (value) => value ? true : 'API地址不能为空'
    },
    {
      type: 'confirm',
      name: 'hasSearchForm',
      message: '是否需要搜索表单?',
      default: true
    },
    {
      type: 'confirm',
      name: 'hasTable',
      message: '是否需要表格?',
      default: true
    },
    {
      type: 'confirm',
      name: 'hasForm',
      message: '是否需要表单?',
      default: true
    },
    {
      type: 'input',
      name: 'fields',
      message: '字段配置JSON（可选）:',
      default: '[]'
    }
  ],
  actions: (data) => {
    const actions = [];
    const { name, hasSearchForm, hasTable, hasForm } = data;

    // 生成页面主文件
    actions.push({
      type: 'add',
      path: '../src/views/{{name}}/index.vue',
      templateFile: 'templates/page.hbs',
      data: {
        ...data,
        kebabCaseName: name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
      }
    });

    // 生成表格组件
    if (hasTable) {
      actions.push({
        type: 'add',
        path: '../src/views/{{name}}/{{name}}Table.vue',
        templateFile: 'templates/table.hbs',
        data
      });
    }

    // 生成表单组件
    if (hasForm) {
      actions.push({
        type: 'add',
        path: '../src/views/{{name}}/{{name}}Form.vue',
        templateFile: 'templates/form.hbs',
        data
      });
    }

    // 生成搜索表单组件
    if (hasSearchForm) {
      actions.push({
        type: 'add',
        path: '../src/views/{{name}}/{{name}}SearchForm.vue',
        templateFile: 'templates/searchForm.hbs',
        data
      });
    }

    // 自动注册路由
    actions.push({
      type: 'modify',
      path: '../src/router/index.js',
      pattern: /(\/\/ 自动生成路由 - 开始)[\s\S]*(\/\/ 自动生成路由 - 结束)/g,
      template: `$1\n  {
    path: '/{{kebabCaseName}}',
    name: '{{name}}',
    component: () => import('../views/{{name}}/index.vue'),
    meta: {
      title: '{{name}}'
    }
  },\n$2`,
      data: {
        ...data,
        kebabCaseName: name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
      }
    });

    return actions;
  }
};
