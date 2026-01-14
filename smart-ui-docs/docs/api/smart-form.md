# SmartForm API 参考

## 组件概述

SmartForm 是 Smart UI 的核心表单组件，通过配置化的方式快速生成复杂表单。

## Props

### 基本属性

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| model | `any` | 表单数据对象 | `{}` |
| fields | `FieldConfig[]` | 表单字段配置数组 | `[]` |
| adapter | `'element' \| 'ant'` | UI 适配器 | `'element'` |
| labelWidth | `string \| number` | 表单标签宽度 | - |
| size | `'small' \| 'medium' \| 'large'` | 表单尺寸 | `'medium'` |
| disabled | `boolean` | 是否禁用整个表单 | `false` |
| readonly | `boolean` | 是否只读整个表单 | `false` |
| submitButton | `ButtonConfig` | 提交按钮配置 | - |
| cancelButton | `ButtonConfig` | 取消按钮配置 | - |

### 验证相关

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| rules | `Record<string, RuleConfig[]>` | 表单验证规则 | - |
| validateOnRuleChange | `boolean` | 规则变化时是否重新验证 | `true` |
| validateOnChange | `boolean` | 字段值变化时是否验证 | `true` |
| validateOnBlur | `boolean` | 字段失焦时是否验证 | `true` |

### 布局相关

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| inline | `boolean` | 是否为行内表单 | `false` |
| layout | `'horizontal' \| 'vertical' \| 'inline'` | 表单布局 | `'horizontal'` |
| gutter | `number` | 表单字段间距 | `0` |
| span | `number` | 全局字段跨度（1-24） | `24` |
| itemSpan | `number` | 全局表单项跨度 | - |

### 其他属性

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| [key: string] | `any` | 传递给底层表单组件的其他属性 | - |

## FieldConfig 类型

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| name | `string` | 字段名称，对应 model 中的属性 | - |
| label | `string` | 字段标签 | - |
| type | `FieldType` | 字段类型 | `'input'` |
| value | `any` | 字段默认值 | - |
| disabled | `boolean` | 是否禁用该字段 | - |
| readonly | `boolean` | 是否只读该字段 | - |
| placeholder | `string` | 占位符文本 | - |
| rules | `RuleConfig[]` | 字段验证规则 | - |
| typeProps | `Record<string, any>` | 组件原生属性配置，具有最高优先级，会覆盖其他配置 | - |
| span | `number` | 字段跨度（1-24） | - |
| itemSpan | `number` | 表单项跨度 | - |
| labelWidth | `string \| number` | 字段标签宽度 | - |
| size | `'small' \| 'medium' \| 'large'` | 字段尺寸 | - |
| slot | `string` | 自定义插槽名称 | - |

### 属性优先级

SmartForm 组件的属性遵循以下优先级顺序（从高到低）：

1. **typeProps**：组件原生属性配置，具有最高优先级，会覆盖所有其他配置
2. **适配器兼容处理**：基于用户配置进行跨 UI 库属性兼容处理
3. **内置属性**：组件内置的基础属性处理

### typeProps 说明

`typeProps` 用于配置组件的原生属性，它具有最高优先级，可以覆盖任何其他配置。这使得您可以直接使用 UI 库组件的原生属性，同时享受 SmartForm 提供的便捷配置和跨 UI 库兼容性。

```vue
const fields = [
  {
    name: 'username',
    label: '用户名',
    type: 'input',
    // 内置属性
    placeholder: '请输入用户名',
    // typeProps 会覆盖内置属性
    typeProps: {
      placeholder: '请输入3-20个字符',
      clearable: true,
      size: 'large',
      // 可以使用 UI 库组件的任何原生属性
      prefixIcon: 'user'
    }
  }
]
```

## ButtonConfig 类型

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| visible | `boolean` | 是否显示按钮 | `true` |
| text | `string` | 按钮文本 | - |
| type | `'primary' \| 'default' \| 'success' \| 'warning' \| 'danger'` | 按钮类型 | - |
| size | `'small' \| 'medium' \| 'large'` | 按钮尺寸 | - |
| style | `Record<string, any>` | 按钮样式 | - |
| class | `string \| string[]` | 按钮类名 | - |
| [key: string] | `any` | 其他按钮属性 | - |

### FieldType 枚举

```typescript
type FieldType = 
  | 'input' 
  | 'textarea' 
  | 'select' 
  | 'select-v2' 
  | 'radio' 
  | 'checkbox' 
  | 'date' 
  | 'time' 
  | 'switch' 
  | 'slider' 
  | 'mention' 
  | 'input-number' 
  | 'cascader' 
  | 'tree-select' 
  | 'upload' 
  | 'rate' 
  | 'color-picker' 
  | 'transfer' 
  | 'autocomplete';
```

### RuleConfig 类型

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| required | `boolean` | 是否必填 | - |
| message | `string` | 验证失败提示信息 | - |
| trigger | `'blur' \| 'change' \| ('blur' \| 'change')[]` | 触发验证的事件 | - |
| type | `string` | 验证类型（如 'email', 'number' 等） | - |
| min | `number` | 最小值（适用于数字和字符串） | - |
| max | `number` | 最大值（适用于数字和字符串） | - |
| len | `number` | 固定长度（适用于字符串和数组） | - |
| enum | `any[]` | 枚举值列表 | - |
| pattern | `RegExp` | 正则表达式验证 | - |
| validator | `(rule: any, value: any, callback: (error?: string) => void) => void` | 自定义验证函数 | - |

## Events

| 事件名 | 说明 | 回调参数 |
|-------|------|--------|
| validate | 验证结果变化时触发 | `{ field: string, valid: boolean, message: string }` |
| submit | 表单提交时触发 | `(isValid: boolean, model: Record<string, any>)` |
| cancel | 表单取消时触发 | - |
| reset | 表单重置时触发 | - |
| change | 字段值变化时触发 | `{ field: string, value: any, oldValue: any }` |
| blur | 字段失焦时触发 | `{ field: string, event: Event }` |
| focus | 字段聚焦时触发 | `{ field: string, event: Event }` |

## Methods

| 方法名 | 说明 | 参数 | 返回值 |
|-------|------|------|-------|
| validate | 验证整个表单或指定字段 | `(field?: string \| string[]) => Promise<boolean>` | `Promise<boolean>` |
| validateField | 验证指定字段 | `(field: string \| string[]) => Promise<boolean>` | `Promise<boolean>` |
| resetFields | 重置表单字段 | `(fields?: string[]) => void` | `void` |
| clearValidate | 清除表单验证状态 | `(fields?: string[]) => void` | `void` |
| getFieldValue | 获取字段值 | `(field: string) => any` | 字段值 |
| setFieldValue | 设置字段值 | `(field: string, value: any) => void` | `void` |
| getFieldProps | 获取字段属性 | `(field: string) => FieldConfig` | 字段配置 |

## Slots

### 内置插槽

| 插槽名 | 说明 | 作用域参数 |
|-------|------|--------|
| default | 表单内容插槽 | - |
| footer | 表单底部插槽 | - |

### 自定义字段插槽

通过 `fields` 配置中的 `slot` 属性，可以为特定字段自定义渲染内容：

```vue
<smart-form :model="formData" :fields="fields">
  <!-- 自定义头像上传字段 -->
  <template #avatar="{ field, value, onChange }">
    <div class="custom-avatar-upload">
      <img v-if="value" :src="value" alt="Avatar" class="avatar-img">
      <input 
        type="file" 
        @change="(e) => handleAvatarUpload(e, onChange)" 
        class="avatar-input"
      >
    </div>
  </template>
</smart-form>
```

## 示例

### 基本用法

```vue
<template>
  <smart-form
    ref="formRef"
    :model="formData"
    :fields="fields"
    @submit="handleSubmit"
  >
    <template #footer>
      <el-button type="primary" @click="formRef.validate()">提交</el-button>
      <el-button @click="formRef.resetFields()">重置</el-button>
    </template>
  </smart-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const formData = ref({
  username: '',
  email: ''
})

const fields = ref([
  { name: 'username', label: '用户名', type: 'input', required: true },
  { name: 'email', label: '邮箱', type: 'input', rules: [{ type: 'email', message: '请输入有效的邮箱地址' }] }
])

const handleSubmit = (isValid, model) => {
  if (isValid) {
    console.log('表单提交:', model)
  }
}
</script>
```

### 动态表单

```vue
<template>
  <smart-form
    :model="formData"
    :fields="dynamicFields"
  >
    <template #footer>
      <el-button @click="addField">添加字段</el-button>
      <el-button @click="removeField">移除字段</el-button>
    </template>
  </smart-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const formData = ref({})
const fieldCount = ref(1)

const dynamicFields = computed(() => {
  const fields = []
  for (let i = 1; i <= fieldCount.value; i++) {
    fields.push({
      name: `field_${i}`,
      label: `字段 ${i}`,
      type: 'input',
      placeholder: `请输入字段 ${i}`
    })
  }
  return fields
})

const addField = () => {
  fieldCount.value++
}

const removeField = () => {
  if (fieldCount.value > 1) {
    fieldCount.value--
  }
}
</script>
```
