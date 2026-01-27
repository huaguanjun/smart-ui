/**
 * 组件生成器
 * 生成通用组件
 */
export default {
  description: '生成组件',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '组件名称（PascalCase）:',
      validate: (value) => value ? true : '组件名称不能为空'
    },
    {
      type: 'input',
      name: 'description',
      message: '组件描述:',
      default: ''
    }
  ],
  actions: [
    {
      type: 'add',
      path: '../src/components/{{name}}/index.vue',
      templateFile: 'templates/component.hbs'
    }
  ]
};
