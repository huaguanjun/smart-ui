# Adapter API 参考

## 概述

Smart UI 的适配器系统是连接底层 UI 库与 Smart UI 组件的桥梁，通过适配器可以实现对不同 UI 库的无缝支持。

## 核心接口

### Adapter 接口

```typescript
interface Adapter {
  // 适配器名称
  name: string;
  
  // 表单组件
  Form: Component;
  FormItem: Component;
  Input: Component;
  Select: Component;
  Radio: Component;
  Checkbox: Component;
  DatePicker: Component;
  Textarea: Component;
  Switch: Component;
  Slider: Component;
  Button: Component;
  Upload: Component;
  Rate: Component;
  TreeSelect: Component;
  Cascader: Component;
  TimePicker: Component;
  
  // 表格组件
  Table: Component;
  TableColumn: Component;
  
  // 布局组件
  Row: Component;
  Col: Component;
  
  // 其他辅助组件
  Divider: Component;
  Space: Component;
  
  // 工具方法
  formatDate?: (date: any, format: string) => string;
  parseDate?: (dateString: string, format: string) => Date;
  [key: string]: any;
}
```

### Component 类型

```typescript
type Component = {
  new (...args: any[]): any;
} | ((props: any, context: any) => any) | any;
```

## 全局配置

### 安装配置

```typescript
import { createApp } from 'vue'
import SmartUI from 'smart-form-core'
import App from './App.vue'

const app = createApp(App)

// 全局配置适配器
app.use(SmartUI, {
  adapter: 'ant', // 默认为 'element'
  // 其他全局配置
})

app.mount('#app')
```

## 适配器注册与管理

### 注册自定义适配器

```typescript
import { registerAdapter } from 'smart-form-core'
import MyAdapter from './my-adapter'

// 注册自定义适配器
registerAdapter('my-adapter', MyAdapter)
```

### 获取已注册的适配器

```typescript
import { getAdapter } from 'smart-form-core'

// 获取指定适配器
const elementAdapter = getAdapter('element')
const antAdapter = getAdapter('ant')
const myAdapter = getAdapter('my-adapter')
```

### 检查适配器是否存在

```typescript
import { hasAdapter } from 'smart-form-core'

// 检查适配器是否存在
const hasElementAdapter = hasAdapter('element') // true
const hasCustomAdapter = hasAdapter('custom') // false
```

### 获取所有适配器列表

```typescript
import { getAllAdapters } from 'smart-form-core'

// 获取所有已注册的适配器
const adapters = getAllAdapters()
console.log(adapters) // ['element', 'ant', 'my-adapter']
```

## 内置适配器

### Element UI 适配器

- 标识符：`'element'`
- 基于：Element Plus
- 适用版本：Element Plus 2.x
- 支持所有 Element Plus 表单和表格组件

### Ant Design Vue 适配器

- 标识符：`'ant'`
- 基于：Ant Design Vue
- 适用版本：Ant Design Vue 3.x
- 支持所有 Ant Design Vue 表单和表格组件

## 组件级别适配器配置

### SmartForm 组件

```vue
<template>
  <!-- 使用 Element UI 适配器 -->
  <smart-form
    :model="formData"
    :fields="fields"
    adapter="element"
  ></smart-form>
  
  <!-- 使用 Ant Design Vue 适配器 -->
  <smart-form
    :model="formData"
    :fields="fields"
    adapter="ant"
  ></smart-form>
</template>
```

### SmartTable 组件

```vue
<template>
  <!-- 使用 Element UI 适配器 -->
  <smart-table
    :data="tableData"
    :columns="columns"
    adapter="element"
  ></smart-table>
  
  <!-- 使用 Ant Design Vue 适配器 -->
  <smart-table
    :data="tableData"
    :columns="columns"
    adapter="ant"
  ></smart-table>
</template>
```

## 自定义适配器开发

### 1. 创建基础适配器结构

```typescript
// my-adapter.ts
import { defineComponent, h } from 'vue'

// 基础表单组件
const MyForm = defineComponent({
  setup(props, { slots }) {
    return () => h('form', {
      class: 'my-form',
      ...props
    }, slots.default?.())
  }
})

const MyFormItem = defineComponent({
  setup(props, { slots }) {
    return () => h('div', {
      class: 'my-form-item',
      ...props
    }, [
      h('label', { class: 'my-form-item__label' }, props.label),
      h('div', { class: 'my-form-item__content' }, slots.default?.())
    ])
  }
})

const MyInput = defineComponent({
  setup(props, { slots }) {
    return () => h('input', {
      type: 'text',
      class: 'my-input',
      ...props
    }, slots.default?.())
  }
})

// 导出适配器
const MyAdapter = {
  name: 'my-adapter',
  Form: MyForm,
  FormItem: MyFormItem,
  Input: MyInput,
  // 其他组件...
  Table: MyTable,
  TableColumn: MyTableColumn,
  Row: MyRow,
  Col: MyCol
}

export default MyAdapter
```

### 2. 注册并使用自定义适配器

```typescript
// main.ts
import { createApp } from 'vue'
import SmartUI from 'smart-form-core'
import MyAdapter from './my-adapter'
import App from './App.vue'

const app = createApp(App)

// 注册自定义适配器
SmartUI.registerAdapter('my-adapter', MyAdapter)

// 配置默认使用自定义适配器
app.use(SmartUI, {
  adapter: 'my-adapter'
})

app.mount('#app')
```

### 3. 组件中使用自定义适配器

```vue
<template>
  <smart-form
    :model="formData"
    :fields="fields"
    adapter="my-adapter"
  ></smart-form>
</template>
```

## 适配器最佳实践

### 1. 适配器命名规范

- 使用简洁明了的名称
- 避免使用与内置适配器冲突的名称
- 建议使用小写字母和连字符

### 2. 组件实现原则

- 保持组件 API 与内置适配器一致
- 确保组件行为符合预期
- 处理好事件传递和数据绑定
- 考虑性能优化

### 3. 版本兼容性

- 明确适配器支持的 UI 库版本
- 定期更新适配器以支持新功能
- 提供迁移指南

## 常见问题

### 1. 适配器未找到

**错误信息**：`Adapter not found: xxx`

**解决方案**：
- 检查适配器名称是否正确
- 确保适配器已正确注册
- 检查适配器文件是否被正确导入

### 2. 组件渲染错误

**错误信息**：`Component xxx is not defined in adapter`

**解决方案**：
- 检查适配器中是否实现了所有必需的组件
- 确保组件名称大小写正确
- 检查组件是否正确导出

### 3. 样式不一致

**解决方案**：
- 确保适配器组件实现了正确的样式
- 考虑使用 CSS 变量统一主题
- 提供主题定制方案

## 示例：完整自定义适配器

```typescript
// complete-adapter.ts
import { defineComponent, h } from 'vue'

// 表单组件
const MyForm = defineComponent({
  setup(props, { slots }) {
    return () => h('form', {
      class: 'my-form',
      onSubmit: (e) => {
        e.preventDefault()
        props.onSubmit?.()
      },
      ...props
    }, slots.default?.())
  }
})

const MyFormItem = defineComponent({
  setup(props, { slots }) {
    return () => h('div', {
      class: ['my-form-item', {
        'my-form-item--error': props.error
      }],
      ...props
    }, [
      h('label', { 
        class: 'my-form-item__label',
        style: { width: props.labelWidth || '120px' }
      }, props.label),
      h('div', { class: 'my-form-item__content' }, [
        slots.default?.(),
        props.error ? h('div', { class: 'my-form-item__error' }, props.error) : null
      ])
    ])
  }
})

const MyInput = defineComponent({
  setup(props, { slots }) {
    return () => h('input', {
      type: props.type || 'text',
      class: ['my-input', {
        'my-input--disabled': props.disabled,
        'my-input--readonly': props.readonly
      }],
      value: props.modelValue,
      onInput: (e) => {
        props['onUpdate:modelValue']?.(e.target.value)
        props.onChange?.(e.target.value)
      },
      ...props
    }, slots.default?.())
  }
})

// 表格组件
const MyTable = defineComponent({
  setup(props, { slots }) {
    return () => h('table', {
      class: ['my-table', {
        'my-table--bordered': props.border,
        'my-table--striped': props.stripe
      }],
      ...props
    }, [
      slots.header?.(),
      slots.default?.(),
      slots.footer?.()
    ])
  }
})

const MyTableColumn = defineComponent({
  setup(props, { slots }) {
    return () => h('th', {
      class: 'my-table-column',
      style: {
        width: props.width,
        textAlign: props.align || 'left'
      },
      ...props
    }, slots.default?.())
  }
})

// 布局组件
const MyRow = defineComponent({
  setup(props, { slots }) {
    return () => h('div', {
      class: 'my-row',
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: `0 -${props.gutter || 0}px`
      },
      ...props
    }, slots.default?.())
  }
})

const MyCol = defineComponent({
  setup(props, { slots }) {
    const span = props.span || 24
    return () => h('div', {
      class: 'my-col',
      style: {
        flex: `0 0 ${(span / 24) * 100}%`,
        maxWidth: `${(span / 24) * 100}%`,
        padding: `0 ${props.gutter || 0}px`
      },
      ...props
    }, slots.default?.())
  }
})

// 导出完整适配器
const CompleteAdapter = {
  name: 'complete-adapter',
  Form: MyForm,
  FormItem: MyFormItem,
  Input: MyInput,
  Select: MySelect,
  Radio: MyRadio,
  Checkbox: MyCheckbox,
  DatePicker: MyDatePicker,
  Textarea: MyTextarea,
  Switch: MySwitch,
  Slider: MySlider,
  Button: MyButton,
  Table: MyTable,
  TableColumn: MyTableColumn,
  Row: MyRow,
  Col: MyCol,
  Divider: MyDivider,
  Space: MySpace,
  
  // 工具方法
  formatDate(date, format) {
    // 实现日期格式化
    return new Date(date).toLocaleDateString()
  },
  parseDate(dateString, format) {
    // 实现日期解析
    return new Date(dateString)
  }
}

export default CompleteAdapter
```
