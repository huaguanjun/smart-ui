<div align="center">
  <h1>Smart UI</h1>
  <p>A smart UI component library for Vue 3, generating complex forms and tables through simple configuration, supporting multiple UI library adapters.</p>
  <p>一款基于 Vue 3 的智能 UI 组件库，通过简单的配置生成复杂表单和表格，支持多种 UI 库适配器。</p>
</div>

## 📖 语言切换 / Language Switch

<details>
<summary>中文 / Chinese</summary>

## 🌟 核心功能

### Smart Form
- ✅ 通过配置生成复杂表单
- ✅ 支持多种字段类型（输入框、选择器、单选框、复选框、日期选择器等）
- ✅ 内置表单验证规则
- ✅ 支持自定义字段渲染
- ✅ 支持动态增减字段
- ✅ 支持表单布局配置

### Smart Table
- ✅ 通过配置生成复杂表格
- ✅ 支持排序、筛选、分页
- ✅ 支持自定义列渲染
- ✅ 支持固定列
- ✅ 支持斑马纹和边框
- ✅ 支持行选择和行操作

## 🛠️ 支持的 UI 库

- **Element Plus**：企业级 UI 组件库
- **Ant Design Vue**：阿里开源的企业级 UI 组件库

## 📦 安装

### 安装核心库

```bash
# 使用 npm
npm install @smart-ui/core

# 使用 yarn
yarn add @smart-ui/core
```

### 安装特定 UI 库的适配器

```bash
# Element Plus 适配器
npm install @smart-ui/element

# Ant Design Vue 适配器
npm install @smart-ui/ant
```

## 🚀 快速开始

### Smart Form 使用示例

```vue
<template>
  <smart-form
    :model="formData"
    :fields="formFields"
    :rules="formRules"
    label-width="120px"
  >
    <div class="form-actions">
      <button @click="handleSubmit">提交</button>
      <button @click="handleReset">重置</button>
    </div>
  </smart-form>
</template>

<script setup>
import { ref } from 'vue'
import { SmartForm } from '@smart-ui/element'

const formData = ref({
  username: '',
  email: '',
  password: ''
})

const formFields = ref([
  { name: 'username', label: '用户名', type: 'input', placeholder: '请输入用户名' },
  { name: 'email', label: '邮箱', type: 'input', placeholder: '请输入邮箱', inputType: 'email' },
  { name: 'password', label: '密码', type: 'input', placeholder: '请输入密码', inputType: 'password' }
])

const formRules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }]
})

const handleSubmit = () => {
  console.log('表单提交:', formData.value)
}

const handleReset = () => {
  formData.value = {
    username: '',
    email: '',
    password: ''
  }
}
</script>
```

### Smart Table 使用示例

```vue
<template>
  <smart-table
    :data="tableData"
    :columns="tableColumns"
    :pagination="true"
  />
</template>

<script setup>
import { ref } from 'vue'
import { SmartTable } from '@smart-ui/element'

const tableData = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
  { id: 3, name: '王五', age: 35, email: 'wangwu@example.com' }
])

const tableColumns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80, align: 'center' },
  { prop: 'email', label: '邮箱' },
  { 
    prop: 'action', 
    label: '操作', 
    width: 150, 
    align: 'center',
    formatter: (row) => {
      return (
        <div>
          <button @click="handleEdit(row)">编辑</button>
          <button @click="handleDelete(row)">删除</button>
        </div>
      )
    }
  }
])

const handleEdit = (row) => {
  console.log('编辑:', row)
}

const handleDelete = (row) => {
  console.log('删除:', row)
}
</script>
```

## 📁 项目结构

```
.
├── smart-ui/                 # 核心组件库
│   ├── src/                 # 源代码
│   │   ├── adapters/        # UI 库适配器
│   │   │   ├── ant/         # Ant Design Vue 适配器
│   │   │   └── element/     # Element Plus 适配器
│   │   ├── components/      # 核心组件
│   │   │   ├── form/        # SmartForm 组件
│   │   │   └── table/       # SmartTable 组件
│   │   ├── core/            # 核心逻辑
│   │   ├── ant.ts           # Ant Design Vue 入口
│   │   ├── element.ts       # Element Plus 入口
│   │   └── index.ts         # 主入口
│   ├── dist/                # 构建产物
│   ├── package.json         # 包配置
│   └── vite.config.ts       # Vite 配置
├── smart-ui-docs/           # 文档项目
│   ├── docs/                # 文档内容
│   ├── package.json         # 文档包配置
│   └── vuepress.config.ts   # VuePress 配置
└── README.md                # 项目说明文档
```

## 🛠️ 开发指南

### 安装依赖

```bash
# 安装核心库依赖
cd smart-ui
npm install

# 安装文档依赖
cd ../smart-ui-docs
npm install
```

### 构建核心库

```bash
cd smart-ui
npm run build
```

### 启动文档开发服务器

```bash
cd smart-ui-docs
npm run docs:dev
```

### 构建文档

```bash
cd smart-ui-docs
npm run docs:build
```

## 📚 文档

- [在线文档](http://localhost:8080/) - 本地启动文档服务后访问

## 🤝 贡献指南

1. Fork 仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

如有问题或建议，欢迎提交 [Issue](https://github.com/huaguanjun/smart-ui/issues) 或 [Pull Request](https://github.com/huaguanjun/smart-ui/pulls)

</details>

<details>
<summary>English / 英文</summary>

## 🌟 Core Features

### Smart Form
- ✅ Generate complex forms through configuration
- ✅ Support multiple field types (input, select, radio, checkbox, date picker, etc.)
- ✅ Built-in form validation rules
- ✅ Support custom field rendering
- ✅ Support dynamic field addition/removal
- ✅ Support form layout configuration

### Smart Table
- ✅ Generate complex tables through configuration
- ✅ Support sorting, filtering, and pagination
- ✅ Support custom column rendering
- ✅ Support fixed columns
- ✅ Support zebra stripes and borders
- ✅ Support row selection and row operations

## 🛠️ Supported UI Libraries

- **Element Plus**: Enterprise-level UI component library
- **Ant Design Vue**: Enterprise-level UI component library open-sourced by Alibaba

## 📦 Installation

### Install Core Library

```bash
# Using npm
npm install @smart-ui/core

# Using yarn
yarn add @smart-ui/core
```

### Install UI Library Adapters

```bash
# Element Plus adapter
npm install @smart-ui/element

# Ant Design Vue adapter
npm install @smart-ui/ant
```

## 🚀 Quick Start

### Smart Form Usage Example

```vue
<template>
  <smart-form
    :model="formData"
    :fields="formFields"
    :rules="formRules"
    label-width="120px"
  >
    <div class="form-actions">
      <button @click="handleSubmit">Submit</button>
      <button @click="handleReset">Reset</button>
    </div>
  </smart-form>
</template>

<script setup>
import { ref } from 'vue'
import { SmartForm } from '@smart-ui/element'

const formData = ref({
  username: '',
  email: '',
  password: ''
})

const formFields = ref([
  { name: 'username', label: 'Username', type: 'input', placeholder: 'Please enter username' },
  { name: 'email', label: 'Email', type: 'input', placeholder: 'Please enter email', inputType: 'email' },
  { name: 'password', label: 'Password', type: 'input', placeholder: 'Please enter password', inputType: 'password' }
])

const formRules = ref({
  username: [{ required: true, message: 'Please enter username', trigger: 'blur' }],
  email: [{ required: true, message: 'Please enter email', trigger: 'blur' }, { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }],
  password: [{ required: true, message: 'Please enter password', trigger: 'blur' }, { min: 6, max: 20, message: 'Password length should be between 6 and 20 characters', trigger: 'blur' }]
})

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
}

const handleReset = () => {
  formData.value = {
    username: '',
    email: '',
    password: ''
  }
}
</script>
```

### Smart Table Usage Example

```vue
<template>
  <smart-table
    :data="tableData"
    :columns="tableColumns"
    :pagination="true"
  />
</template>

<script setup>
import { ref } from 'vue'
import { SmartTable } from '@smart-ui/element'

const tableData = ref([
  { id: 1, name: 'Zhang San', age: 25, email: 'zhangsan@example.com' },
  { id: 2, name: 'Li Si', age: 30, email: 'lisi@example.com' },
  { id: 3, name: 'Wang Wu', age: 35, email: 'wangwu@example.com' }
])

const tableColumns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 80, align: 'center' },
  { prop: 'email', label: 'Email' },
  { 
    prop: 'action', 
    label: 'Actions', 
    width: 150, 
    align: 'center',
    formatter: (row) => {
      return (
        <div>
          <button @click="handleEdit(row)">Edit</button>
          <button @click="handleDelete(row)">Delete</button>
        </div>
      )
    }
  }
])

const handleEdit = (row) => {
  console.log('Edit:', row)
}

const handleDelete = (row) => {
  console.log('Delete:', row)
}
</script>
```

## 📁 Project Structure

```
.
├── smart-ui/                 # Core component library
│   ├── src/                 # Source code
│   │   ├── adapters/        # UI library adapters
│   │   │   ├── ant/         # Ant Design Vue adapter
│   │   │   └── element/     # Element Plus adapter
│   │   ├── components/      # Core components
│   │   │   ├── form/        # SmartForm component
│   │   │   └── table/       # SmartTable component
│   │   ├── core/            # Core logic
│   │   ├── ant.ts           # Ant Design Vue entry
│   │   ├── element.ts       # Element Plus entry
│   │   └── index.ts         # Main entry
│   ├── dist/                # Build output
│   ├── package.json         # Package configuration
│   └── vite.config.ts       # Vite configuration
├── smart-ui-docs/           # Documentation project
│   ├── docs/                # Documentation content
│   ├── package.json         # Documentation package configuration
│   └── vuepress.config.ts   # VuePress configuration
└── README.md                # Project README
```

## 🛠️ Development Guide

### Install Dependencies

```bash
# Install core library dependencies
cd smart-ui
npm install

# Install documentation dependencies
cd ../smart-ui-docs
npm install
```

### Build Core Library

```bash
cd smart-ui
npm run build
```

### Start Documentation Development Server

```bash
cd smart-ui-docs
npm run docs:dev
```

### Build Documentation

```bash
cd smart-ui-docs
npm run docs:build
```

## 📚 Documentation

- [Online Documentation](http://localhost:8080/) - Access after starting the local documentation server

## 🤝 Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 📞 Contact

If you have any questions or suggestions, please submit an [Issue](https://github.com/huaguanjun/smart-ui/issues) or [Pull Request](https://github.com/huaguanjun/smart-ui/pulls)

</details>

---

**Smart UI** - Making UI development simpler and more efficient! 🚀
