# 指南

欢迎使用 Smart UI！本指南将帮助您快速上手并充分利用 Smart UI 组件库。

## 什么是 Smart UI？

Smart UI 是一个基于 Vue 3 的智能 UI 组件库，它支持同时使用 Element Plus 和 Ant Design Vue 两个 UI 库。通过简单的配置，您可以轻松创建表单、表格等复杂 UI 组件。

## 为什么选择 Smart UI？

### 双 UI 库支持

Smart UI 支持 Element Plus 和 Ant Design Vue 两个主流 UI 库，您可以根据项目需求选择适合的 UI 库，或者在同一项目中混用两个 UI 库。

### 表单自动生成

通过简单的 JS 配置，Smart UI 可以自动生成复杂的表单，包括各种表单控件、验证规则等。

### 表格自动生成

同样，Smart UI 也可以通过 JS 配置自动生成表格，支持排序、过滤、分页等功能。

### 灵活的适配器

Smart UI 采用适配器设计模式，支持自定义适配器，轻松扩展到其他 UI 库。

## 快速开始

### 安装

```bash
npm install smart-form-core
```

### 引入组件

在 main.ts 中引入 Smart UI：

```typescript
import { createApp } from 'vue'
import SmartUI from 'smart-form-core'
import App from './App.vue'

const app = createApp(App)
app.use(SmartUI)
app.mount('#app')
```

### 基本用法

```vue
<template>
  <smart-form
    :model="formData"
    :fields="fields"
  >
    <!-- 表单内容 -->
  </smart-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  username: '',
  email: ''
})

const fields = [
  {
    name: 'username',
    label: '用户名',
    type: 'input'
  },
  {
    name: 'email',
    label: '邮箱',
    type: 'input'
  }
]
</script>
```

## 可交互演示

以下是 Smart UI 的综合演示，您可以通过切换适配器来查看不同 UI 库的效果，并体验表单生成、表格生成等核心功能：

<ClientOnly>
  <FullScreenDemo />
</ClientOnly>
