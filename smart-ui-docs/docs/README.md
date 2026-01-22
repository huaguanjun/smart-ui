# Smart UI

一个基于 Vue 3 的智能 UI 组件库，通过配置化方式快速构建表单和表格，同时支持 Element Plus 和 Ant Design Vue 双 UI 库，为开发者提供高效、灵活的 UI 开发解决方案。

## 🎯 核心功能

### 智能表单生成
- 通过简单的 JavaScript 配置自动生成复杂表单
- 支持多种表单控件类型（输入框、选择器、日期选择器等）
- 内置表单验证和错误提示
- 支持自定义插槽和扩展

### 智能表格生成
- 基于配置自动生成功能丰富的表格
- 支持分页、排序、筛选、选择等高级功能
- 支持自定义列渲染和操作
- 内置数据格式化和转换

### 双 UI 库适配
- 同时支持 Element Plus 和 Ant Design Vue
- 一键切换 UI 库，无需修改业务代码
- 统一的 API 设计，降低学习成本
- 支持自定义适配器扩展

## 🚀 对开发者的帮助

### 提升开发效率
- 减少重复代码，专注业务逻辑
- 快速搭建原型和生产环境
- 降低维护成本，统一组件风格

### 增强代码质量
- 类型安全的配置选项
- 统一的组件 API
- 内置最佳实践
- 易于测试和调试

### 提高系统灵活性
- 支持多 UI 库切换
- 模块化设计，易于扩展
- 响应式设计，适配各种设备
- 支持主题定制

## 💡 框架优势

### 配置化开发
- 声明式配置，直观易懂
- 易于维护和扩展
- 支持动态配置和运行时调整

### 双 UI 库支持
- 一套代码适配多个 UI 库
- 降低项目迁移成本
- 满足不同团队技术栈需求
- 丰富的生态系统支持

### 高性能设计
- 按需渲染，减少 DOM 节点
- 虚拟滚动支持
- 优化的组件渲染机制
- 低内存占用

### 易用性优先
- 简单的 API，快速上手
- 详细的文档和示例
- 丰富的社区支持
- 定期更新和维护

## 🔧 快速开始

### 安装

```bash
# 安装核心库
npm install @smart-ui/core

# 安装 Element Plus 适配器
npm install @smart-ui/element

# 安装 Ant Design Vue 适配器
npm install @smart-ui/ant
```

### 基础用法

```vue
<template>
  <!-- 智能表单 -->
  <smart-form
    :model="formData"
    :fields="formFields"
    @submit="handleSubmit"
  />
  
  <!-- 智能表格 -->
  <smart-table
    :data="tableData"
    :columns="tableColumns"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SmartForm, SmartTable } from '@smart-ui/core'

// 表单数据和配置
const formData = ref({ username: '', email: '' })
const formFields = [
  { 
    name: 'username', 
    label: '用户名', 
    type: 'input',
    // typeProps 用于配置组件原生属性，具有最高优先级
    typeProps: {
      placeholder: '请输入用户名',
      clearable: true
    }
  },
  { 
    name: 'email', 
    label: '邮箱', 
    type: 'input',
    // 内置属性优先级低于 typeProps
    placeholder: '请输入邮箱'
  }
]

// 表格数据和配置
const tableData = ref([
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 }
])
const tableColumns = [
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' }
]

const handleSubmit = (isValid, data) => {
  if (isValid) {
    console.log('表单提交:', data)
  }
}
</script>
```

## 📚 文档导航

### 指南
- [快速入门](./guide/README.md) - 了解 Smart UI 的基础概念和使用方法
- [SmartForm 组件](./guide/smart-form.md) - 智能表单组件的详细使用说明
- [SmartTable 组件](./guide/smart-table.md) - 智能表格组件的详细使用说明
- [适配器系统](./guide/adapter.md) - 了解双 UI 库适配机制

### API 参考
- [SmartForm API](./api/smart-form.md) - SmartForm 组件的完整 API 文档
- [SmartTable API](./api/smart-table.md) - SmartTable 组件的完整 API 文档
- [适配器 API](./api/adapter.md) - 适配器系统的 API 文档
- [类型定义](./api/types.md) - 所有类型定义的详细说明

## 🌟 适用场景

- 企业级后台管理系统
- 数据可视化平台
- 快速原型开发
- 多 UI 库兼容需求
- 表单密集型应用
- 表格密集型应用

## 🤝 贡献指南

欢迎参与 Smart UI 的开发和维护！如果您有任何想法、建议或问题，欢迎通过以下方式参与：

- 提交 Issue 报告问题或建议
- 提交 Pull Request 贡献代码
- 参与讨论和社区建设
- 分享使用经验和最佳实践

## 📄 许可证

Smart UI 采用 MIT 许可证，您可以自由使用、修改和分发。

## 📞 联系方式

- GitHub: [https://github.com/huaguanjun/smart-ui](https://github.com/huaguanjun/smart-ui)
- 文档: [https://example.com/smart-ui-docs](https://example.com/smart-ui-docs)
- 社区: [https://example.com/smart-ui-community](https://example.com/smart-ui-community)
