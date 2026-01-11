# SmartForm 组件

SmartForm 是 Smart UI 的核心组件之一，它可以通过简单的 JS 配置自动生成复杂的表单。

## 基本用法

```vue
<template>
  <smart-form
    :model="formData"
    :fields="fields"
    :rules="rules"
  >
    <!-- 表单内容 -->
  </smart-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 表单数据
const formData = ref({
  username: '',
  email: '',
  password: ''
})

// 验证规则
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 个字符', trigger: 'blur' }
  ]
})

// 表单字段配置
const fields = [
  {
    name: 'username',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名'
  },
  {
    name: 'email',
    label: '邮箱',
    type: 'input',
    placeholder: '请输入邮箱'
  },
  {
    name: 'password',
    label: '密码',
    type: 'input',
    placeholder: '请输入密码',
    inputType: 'password'
  }
]
</script>
```

## 可交互演示

以下是 Smart UI 的综合演示，您可以体验表单生成、表格生成和适配器切换等功能：

<FullScreenDemo />

## 配置选项

### SmartForm Props

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| model | `Record<string, any>` | 表单数据模型 | `{}` |
| fields | `FieldConfig[]` | 表单字段配置 | `[]` |
| rules | `Record<string, any[]>` | 表单验证规则 | `{}` |
| adapter | `'element'  'ant'` | UI 适配器 | `'element'` |
| labelWidth | `string  number` | 标签宽度 | - |
| labelPosition | `'left'  'right'  'top'` | 标签位置 | `'left'` |
| inline | `boolean` | 是否内联表单 | `false` |
| size | `'small'  'medium'  'large'` | 表单大小 | `'medium'` |
| disabled | `boolean` | 是否禁用表单 | `false` |
| itemSpan | `number` | 通用的字段 span 值 | - |

### FieldConfig

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| name | `string` | 字段名 | - |
| label | `string` | 字段标签 | - |
| type | `'input'  'select'  'radio'  'checkbox'  'date'  'textarea'  'switch'  'slider'` | 字段类型 | - |
| placeholder | `string` | 占位符 | - |
| options | `Array<{ label: string, value: any }>` | 选项列表 | `[]` |
| rules | `any[]` | 验证规则 | `[]` |
| disabled | `boolean` | 是否禁用 | `false` |
| readonly | `boolean` | 是否只读 | `false` |
| defaultValue | `any` | 默认值 | - |
| span | `number` | 字段宽度 | - |
| [key: string] | `any` | 其他自定义属性 | - |

## 插槽使用

SmartForm 支持为每个字段自定义插槽，您可以通过插槽完全控制字段的渲染。

### 基本插槽用法

```vue
<template>
  <smart-form
    :model="formData"
    :fields="fields"
  >
    <!-- 自定义用户名字段 -->
    <template #username="{ field, model }">
      <div class="custom-field">
        <el-input
          v-model="model[field.name]"
          :placeholder="field.placeholder"
          prefix-icon="el-icon-user"
          clearable
        ></el-input>
        <div class="field-hint">请输入3-20个字符的用户名</div>
      </div>
    </template>
  </smart-form>
</template>
```

### 插槽作用域

| 属性名 | 类型 | 说明 |
|-------|------|------|
| field | `FieldConfig` | 字段配置对象 |
| model | `Record<string, any>` | 表单数据模型 |

## 布局系统

SmartForm 支持通过 `itemSpan` 属性和 `span` 属性控制表单字段的布局。

### 设置通用字段宽度

```vue
<smart-form
  :model="formData"
  :fields="fields"
  :itemSpan="12" <!-- 设置所有字段默认宽度为 12 -->
>
  <!-- 表单内容 -->
</smart-form>
```

### 设置单个字段宽度

```vue
const fields = [
  {
    name: 'username',
    label: '用户名',
    type: 'input',
    span: 8 <!-- 覆盖通用设置，宽度为 8 -->
  },
  {
    name: 'email',
    label: '邮箱',
    type: 'input',
    span: 16 <!-- 覆盖通用设置，宽度为 16 -->
  }
]
```

## 表单验证

SmartForm 支持两种验证规则设置方式：

### 1. 通过 `rules` 属性设置

```vue
<smart-form
  :model="formData"
  :fields="fields"
  :rules="{
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
  }"
>
  <!-- 表单内容 -->
</smart-form>
```

### 2. 通过 `field.rules` 设置

```vue
const fields = [
  {
    name: 'username',
    label: '用户名',
    type: 'input',
    rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
  }
]
```

## 支持的字段类型

SmartForm 支持以下字段类型：

- `input`：输入框
- `textarea`：文本域
- `select`：选择器
- `radio`：单选框组
- `checkbox`：复选框组
- `date`：日期选择器
- `switch`：开关
- `slider`：滑块

## 示例

### 完整表单示例

```vue
<template>
  <smart-form
    :model="formData"
    :rules="rules"
    :fields="formFields"
    label-width="100px"
  >
    <!-- 自定义用户名字段 -->
    <template #username="{ field, model }">
      <div class="custom-field">
        <el-input
          v-model="model[field.name]"
          :placeholder="field.placeholder"
          prefix-icon="el-icon-user"
          clearable
        ></el-input>
        <div class="field-hint">请输入3-20个字符的用户名</div>
      </div>
    </template>
    
    <div class="form-actions">
      <button @click="handleSubmit">提交表单</button>
      <button @click="handleReset">重置表单</button>
    </div>
  </smart-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  username: '',
  email: '',
  password: '',
  gender: '',
  hobbies: [],
  birthday: null,
  bio: '',
  active: false,
  score: 50
})

const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 个字符', trigger: 'blur' }
  ]
})

const formFields = ref([
  {
    name: 'username',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名',
    rules: rules.value.username
  },
  {
    name: 'email',
    label: '邮箱',
    type: 'input',
    placeholder: '请输入邮箱',
    rules: rules.value.email
  },
  {
    name: 'password',
    label: '密码',
    type: 'input',
    placeholder: '请输入密码',
    rules: rules.value.password,
    inputType: 'password'
  },
  {
    name: 'gender',
    label: '性别',
    type: 'radio',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' }
    ]
  },
  {
    name: 'hobbies',
    label: '爱好',
    type: 'checkbox',
    options: [
      { label: '阅读', value: 'reading' },
      { label: '运动', value: 'sports' },
      { label: '音乐', value: 'music' },
      { label: '旅行', value: 'travel' }
    ]
  },
  {
    name: 'birthday',
    label: '生日',
    type: 'date',
    placeholder: '选择生日'
  },
  {
    name: 'bio',
    label: '简介',
    type: 'textarea',
    placeholder: '请输入个人简介',
    rows: 3
  },
  {
    name: 'active',
    label: '状态',
    type: 'switch'
  },
  {
    name: 'score',
    label: '评分',
    type: 'slider',
    min: 0,
    max: 100,
    step: 1
  }
])

const handleSubmit = () => {
  console.log('表单提交:', formData.value)
  alert('表单提交成功！')
}

const handleReset = () => {
  formData.value = {
    username: '',
    email: '',
    password: '',
    gender: '',
    hobbies: [],
    birthday: null,
    bio: '',
    active: false,
    score: 50
  }
}
</script>
```
