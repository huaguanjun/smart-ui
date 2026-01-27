/**
 * Store生成器
 * 生成Pinia store（可扩展）
 */
export default {
  description: '生成Pinia Store',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Store名称（camelCase）:',
      validate: (value) => value ? true : 'Store名称不能为空'
    },
    {
      type: 'input',
      name: 'apiUrl',
      message: 'API地址:',
      validate: (value) => value ? true : 'API地址不能为空'
    }
  ],
  actions: [
    {
      type: 'add',
      path: '../src/stores/{{name}}.js',
      templateFile: 'templates/store.hbs'
    }
  ]
};
