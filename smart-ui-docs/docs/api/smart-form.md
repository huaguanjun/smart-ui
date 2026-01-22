# SmartForm API 参考

## 组件概述

SmartForm 是 Smart UI 的核心表单组件，通过配置化的方式快速生成复杂表单。

## Props

SmartForm 使用简洁的接口设计，支持传递 Element Plus 和 Ant Design Vue 的所有官方属性。

### 属性合并与过滤机制

SmartForm 采用了一套完整的属性处理机制：

1. **核心属性定义**：通过 `SmartFormCoreProps` 定义表单必须的核心属性
2. **扩展属性接收**：通过 `useAttrs()` 接收所有未声明为 props 的属性
3. **属性合并**：使用 `Object.assign({}, props, attrs)` 合并核心属性和扩展属性
4. **过滤 undefined 属性**：通过 `filterUndefinedProps` 函数过滤掉值为 `undefined` 的属性，只传递有实际值的属性
5. **UI 适配器处理**：根据当前使用的 UI 库，对属性进行必要的转换和兼容处理

### 核心属性

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| model | `Record<string, any>` | 表单数据对象 | `{}` |
| fields | `FieldConfig[]` | 表单字段配置数组 | `[]` |
| rules | `Record<string, any[]>` | 表单验证规则 | `{}` |
| adapter | `'element' \| 'ant'` | UI 适配器 | `'element'` |
| itemSpan | `number` | 通用的字段 span 值 | - |

### 传递官方属性

SmartForm 支持传递 Element Plus 和 Ant Design Vue 的所有官方属性，无需额外配置：

```vue
<smart-form
  :model="formData"
  :fields="fields"
  :rules="rules"
  
  <!-- Element Plus / Ant Design Vue 官方属性 -->
  layout="horizontal"
  :labelCol="{ span: 8 }"
  :wrapperCol="{ span: 16 }"
  :validateTrigger="['blur', 'change']"
  :scrollToFirstError="true"
  size="medium"
  disabled={false}
  
  @onFinish="handleFinish"
>
  <!-- 表单内容 -->
</smart-form>
```

### 完整属性支持

由于 SmartForm 使用索引签名（`[key: string]: any`），您可以传递任何官方属性：

- **布局属性**：inline、layout、labelWidth、labelPosition、labelCol、wrapperCol
- **标签属性**：labelAlign、labelWrap、wrapperWrap、colon、labelSuffix
- **验证属性**：validateTrigger、validateFirst、validateOnRuleChange、showMessage、inlineMessage、statusIcon
- **必填标记**：hideRequiredAsterisk、requireAsteriskPosition、requiredMark
- **交互属性**：autoFocusFirstField、scrollToError、scrollToFirstError、scrollIntoViewOptions
- **尺寸属性**：size
- **禁用状态**：disabled
- **其他属性**：name、initialValues、messageCol、preserve

### 接口设计

SmartForm 采用了分层的接口设计，将属性分为核心属性和扩展属性，兼顾了类型安全和灵活性：

#### 核心接口设计

```typescript
// 核心属性接口
interface SmartFormCoreProps {
  adapter?: 'element' | 'ant'     // UI 适配器，决定使用哪个 UI 库
  model: Record<string, any>       // 表单数据模型，双向绑定
  rules?: Record<string, any[]>    // 表单验证规则
  fields?: FieldConfig[]           // 字段配置，定义表单的结构
  itemSpan?: number                // 通用的字段 span 值，用于布局
}

// 完整属性接口，支持索引签名
interface SmartFormProps extends SmartFormCoreProps {
  // 支持 Element Plus 和 Ant Design Vue 的所有官方属性
  [key: string]: any
}
```

#### 接口设计优势

1. **类型安全**：核心属性有明确的类型定义，提供良好的开发体验和类型检查
2. **灵活扩展**：支持传递任何官方 UI 库属性，无需修改组件代码
3. **跨库兼容**：同一套接口可以用于不同的 UI 库
4. **清晰的 API 边界**：核心属性和扩展属性分离，便于理解和使用
5. **向后兼容**：新增属性不会破坏现有代码

#### 属性转发机制实现

SmartForm 的属性转发机制确保了所有属性能够正确传递到底层 UI 组件：

1. **在 SmartForm.vue 中**：
   - 通过 `defineProps<SmartFormProps>()` 接收核心属性
   - 通过 `useAttrs()` 接收所有未声明的扩展属性
   - 使用 `Object.assign({}, props, attrs)` 合并所有属性
   - 将合并后的属性传递给 `useFormEngine` 进行处理

2. **在 useFormEngine.ts 中**：
   - 接收合并后的属性
   - 过滤掉值为 `undefined` 的属性
   - 根据当前使用的 UI 库，对属性进行必要的转换
   - 返回处理后的属性，供 SmartForm 组件使用

3. **在适配器组件中**（如 ElementForm.vue、AntForm.vue）：
   - 再次使用 `useAttrs()` 接收从 SmartForm 传递过来的所有属性
   - 使用 `Object.assign({}, attrs, props)` 合并属性
   - 将最终属性传递给底层 UI 组件（如 `el-form` 或 `a-form`）

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

SmartForm 支持 Element Plus 和 Ant Design Vue 的官方事件，这些事件会根据当前使用的适配器自动适配。

| 事件名         | 说明               | 回调参数                                                                 | 支持的UI库         |
| -------------- | ------------------ | ------------------------------------------------------------------------ | ------------------ |
| onFinish       | 表单验证成功后触发 | `(values: Record<string, any>)`                                          | Element Plus, Ant Design Vue |
| onFinishFailed | 表单验证失败后触发 | `(errorInfo: any)`                                                       | Element Plus, Ant Design Vue |
| onValuesChange | 表单值变化时触发   | `(changedValues: Record<string, any>, allValues: Record<string, any>)` | Element Plus, Ant Design Vue |
| onReset        | 表单重置时触发     | -                                                                        | Element Plus, Ant Design Vue |
| onFieldsChange | 字段状态变化时触发 | `(changedFields: any[], allFields: any[])`                               | Element Plus, Ant Design Vue |
| onValidate     | 字段验证状态变化时触发 | `(prop: string, isValid: boolean, message: string)`                     | Element Plus |

## Methods

SmartForm 会根据当前使用的 UI 库，动态暴露相应的方法：

### 通用方法（所有UI库支持）

| 方法名        | 说明                       | 参数                                 | 返回值             |
| ------------- | -------------------------- | ------------------------------------ | ------------------ |
| validate      | 验证整个表单               | -                                    | `Promise<boolean>` |
| validateField | 验证单个字段               | `(name: string) => Promise<boolean>` | `Promise<boolean>` |
| resetFields   | 重置表单数据               | -                                    | `void`             |
| scrollToField | 滚动到指定字段             | `(fieldName: string) => void`        | `void`             |
| clearValidate | 清除指定字段的验证状态     | `(fieldName?: string) => void`       | `void`             |

### Element Plus特有方法

| 方法名           | 说明                       | 参数                                 | 返回值             |
| ---------------- | -------------------------- | ------------------------------------ | ------------------ |
| fields           | 获取所有字段实例           | -                                    | `FormItemInstance[]` |
| getField         | 获取指定字段实例           | `(name: string) => FormItemInstance` | `FormItemInstance` |
| setInitialValues | 设置表单初始值             | `(values: Record<string, any>) => void` | `void`             |

### Ant Design Vue特有方法

| 方法名        | 说明                       | 参数                                 | 返回值             |
| ------------- | -------------------------- | ------------------------------------ | ------------------ |
| validateFields | 验证指定字段，返回字段值   | `(names?: string[]) => Promise<any>` | `Promise<any>`     |
| getFieldsValue | 获取指定字段的值           | `(names?: string[]) => any`          | `any`              |
| setFieldsValue | 设置表单字段值             | `(values: Record<string, any>) => void` | `void`             |

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
    @onFinish="handleFinish"
  >
    <template #default>
      <div class="form-actions">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </div>
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
  { name: 'email', label: '邮箱', type: 'input', rules: [{ type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }] }
])

const handleFinish = (values) => {
  console.log('表单提交:', values)
}

const submitForm = async () => {
  const isValid = await formRef.value.validate()
  if (isValid) {
    handleFinish(formData.value)
  }
}

const resetForm = () => {
  formRef.value.resetFields()
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
