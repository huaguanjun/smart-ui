# SmartForm 组件

SmartForm 是 Smart UI 的核心组件之一，它可以通过简单的 JS 配置自动生成复杂的表单。

## 基本用法
<SmartFormAsyncExample />
```vue
<template>
  <div>
    <smart-form
      :model="formData"
      :fields="fields"
      :rules="rules"
      :submit-button="{ text: '提交', type: 'primary' }"
      :cancel-button="{ text: '取消' }"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
      <!-- 表单内容 -->
    </smart-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 表单数据
const formData = ref({
  name: '', // 简单输入框
  city: ''  // 异步加载选项的下拉框
})

// 验证规则
const rules = ref({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  city: [
    { required: true, message: '请选择城市', trigger: 'change' }
  ]
})

// 响应式字段配置
const fields = ref([
  {
    name: 'name',
    label: '姓名',
    type: 'input',
    placeholder: '请输入姓名',
    rules: rules.value.name
  },
  {
    name: 'city',
    label: '城市',
    type: 'select',
    placeholder: '请选择城市',
    rules: rules.value.city,
    options: [] // 初始为空，后续异步加载
  }
])

// 模拟从服务端异步获取城市选项
async function loadCityOptions() {
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 从服务端获取城市数据
    const cityOptions = [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '广州', value: 'guangzhou' },
      { label: '深圳', value: 'shenzhen' }
    ]
    
    // 更新字段配置中的options
    const cityField = fields.value.find(field => field.name === 'city')
    if (cityField) {
      cityField.options = cityOptions
    }
    
    // 设置默认值
    formData.value.city = 'beijing'
  } catch (error) {
    console.error('加载城市选项失败:', error)
  } finally {
    
  }
}

// 组件挂载时加载城市选项
onMounted(() => {
  loadCityOptions()
})

// 表单提交处理
const handleSubmit = (isValid, model) => {
  if (isValid) {
    console.log('表单提交:', model)
    alert('提交成功！姓名：' + model.name + '，城市：' + model.city)
  }
}

// 表单取消处理
const handleCancel = () => {
  console.log('表单取消')
  // 重置表单数据
  formData.value = {
    name: '',
    city: 'beijing'
  }
}
</script>
```
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
| submitButton | `ButtonConfig` | 提交按钮配置 | - |
| cancelButton | `ButtonConfig` | 取消按钮配置 | - |

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
  <div>
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>正在加载表单配置...</p>
    </div>
    
    <!-- 表单渲染 -->
    <smart-form
      v-else
      :model="formData"
      :fields="formFields"
      :rules="formRules"
      :submit-button="{ text: '提交', type: 'primary' }"
      :cancel-button="{ text: '取消' }"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const formData = ref({})
const formFields = ref([])
const formRules = ref({})
const loading = ref(true)

// 模拟从服务端获取完整表单配置
async function loadFormConfig() {
  loading.value = true
  
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 1. 从服务端获取字段配置
    const response = await fetch('/api/form-config')
    const config = await response.json()
    
    // 2. 从服务端获取表单初始数据
    const dataResponse = await fetch('/api/form-data')
    const initialData = await dataResponse.json()
    
    // 3. 从服务端获取选项数据
    const optionsResponse = await fetch('/api/form-options')
    const optionsData = await optionsResponse.json()
    
    // 4. 整合配置和数据
    const fieldsWithOptions = config.fields.map(field => {
      // 为需要选项的字段添加从服务端获取的options
      if (['select', 'radio', 'checkbox'].includes(field.type) && optionsData[field.name]) {
        return {
          ...field,
          options: optionsData[field.name]
        }
      }
      return field
    })
    
    // 更新响应式数据
    formFields.value = fieldsWithOptions
    formData.value = initialData
    formRules.value = config.rules
  } catch (error) {
    console.error('加载表单配置失败:', error)
    alert('表单加载失败，请刷新页面重试')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadFormConfig()
})

const handleSubmit = (isValid, model) => {
  if (isValid) {
    console.log('表单提交:', model)
    // 执行实际的提交逻辑
  }
}

const handleCancel = () => {
  console.log('表单取消')
  // 执行取消逻辑
}
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
```
```
