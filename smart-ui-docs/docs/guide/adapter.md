# 适配器系统

Smart UI 采用了适配器设计模式，支持同时使用 Element Plus 和 Ant Design Vue 两个主流 UI 库。通过适配器系统，您可以在不同的项目中使用相同的 Smart UI 组件，只需切换适配器即可。

## 设计理念

适配器系统的核心设计理念是**封装差异，提供统一接口**。Smart UI 组件内部通过适配器将不同 UI 库的组件行为和样式进行封装，对外提供统一的 API，使开发者可以专注于业务逻辑而不必关心底层 UI 实现。

## 内置适配器

Smart UI 内置了两个适配器：

### 1. Element UI 适配器
- 标识符：`'element'`
- 基于 Element Plus 组件库
- 是 Smart UI 的默认适配器
- 支持 Element Plus 的所有主题和配置

### 2. Ant Design Vue 适配器
- 标识符：`'ant'`
- 基于 Ant Design Vue 组件库
- 支持 Ant Design Vue 的所有主题和配置

## 如何使用适配器

### 1. 全局配置适配器

您可以在项目初始化时全局配置默认适配器：

```typescript
// main.ts
import { createApp } from 'vue'
import SmartUI from 'smart-form-core'
import App from './App.vue'

const app = createApp(App)

// 全局配置默认适配器为 Ant Design Vue
app.use(SmartUI, {
  adapter: 'ant'
})

app.mount('#app')
```

### 2. 组件级别配置适配器

您也可以在每个组件中单独配置适配器，覆盖全局配置：

```vue
<template>
  <!-- 使用 Element UI 适配器 -->
  <smart-form
    :model="formData"
    :fields="fields"
    adapter="element"
  ></smart-form>
  
  <!-- 使用 Ant Design Vue 适配器 -->
  <smart-table
    :data="tableData"
    :columns="columns"
    adapter="ant"
  ></smart-table>
</template>
```

## 适配器 API

### 适配器接口

适配器需要实现以下接口：

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
  
  // 表格组件
  Table: Component;
  TableColumn: Component;
  
  // 布局组件
  Row: Component;
  Col: Component;
  
  // 其他辅助方法
  [key: string]: any;
}
```

### 适配器注册

您可以通过以下方式注册自定义适配器：

```typescript
import { registerAdapter } from 'smart-form-core'
import MyAdapter from './my-adapter'

// 注册自定义适配器
registerAdapter('my-adapter', MyAdapter)
```

## 如何创建自定义适配器

创建自定义适配器需要实现 Smart UI 定义的适配器接口。以下是一个简单的自定义适配器示例：

### 1. 创建适配器文件

```typescript
// my-adapter.ts
import { defineComponent, h } from 'vue'

// 自定义表单组件
const MyForm = defineComponent({
  setup(props, { slots }) {
    return () => h('form', {
      class: 'my-form',
      ...props
    }, slots.default?.())
  }
})

// 自定义输入框组件
const MyInput = defineComponent({
  setup(props, { slots }) {
    return () => h('input', {
      class: 'my-input',
      ...props
    }, slots.default?.())
  }
})

// 其他组件...

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

### 2. 注册自定义适配器

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

### 3. 使用自定义适配器

```vue
<template>
  <smart-form
    :model="formData"
    :fields="fields"
    adapter="my-adapter"
  ></smart-form>
</template>
```

## 适配器切换示例

以下是一个完整的适配器切换示例，展示如何在同一页面中使用不同的适配器：

```vue
<template>
  <div class="adapter-demo">
    <h2>Smart UI 适配器切换演示</h2>
    
    <div class="demo-section">
      <h3>1. 使用 Element UI 适配器</h3>
      <smart-form
        :model="formData"
        :fields="formFields"
        adapter="element"
        label-width="120px"
      >
        <div class="form-actions">
          <button @click="handleSubmit">提交表单</button>
          <button @click="handleReset">重置表单</button>
        </div>
      </smart-form>
    </div>
    
    <div class="demo-section">
      <h3>2. 使用 Ant Design Vue 适配器</h3>
      <smart-form
        :model="formData"
        :fields="formFields"
        adapter="ant"
        label-width="120px"
      >
        <div class="form-actions">
          <button @click="handleSubmit">提交表单</button>
          <button @click="handleReset">重置表单</button>
        </div>
      </smart-form>
    </div>
    
    <div class="demo-section">
      <h3>3. Element UI 表格</h3>
      <smart-table
        :data="tableData"
        :columns="tableColumns"
        adapter="element"
        border
        stripe
        highlight-current-row
      ></smart-table>
    </div>
    
    <div class="demo-section">
      <h3>4. Ant Design Vue 表格</h3>
      <smart-table
        :data="tableData"
        :columns="tableColumns"
        adapter="ant"
        :bordered="true"
        :pagination="{ pageSize: 5 }"
      ></smart-table>
    </div>
    
    <div class="demo-result">
      <h3>表单数据</h3>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 表单数据
const formData = ref({
  username: '',
  email: '',
  password: '',
  gender: '',
  active: false
})

// 表单字段配置
const formFields = ref([
  {
    name: 'username',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名',
    rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
  },
  {
    name: 'email',
    label: '邮箱',
    type: 'input',
    placeholder: '请输入邮箱',
    rules: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }]
  },
  {
    name: 'password',
    label: '密码',
    type: 'input',
    placeholder: '请输入密码',
    inputType: 'password',
    rules: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, message: '密码长度不能少于 6 个字符', trigger: 'blur' }]
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
    name: 'active',
    label: '状态',
    type: 'switch'
  }
])

// 表格数据
const tableData = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', gender: 'male', status: 'active' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com', gender: 'male', status: 'active' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com', gender: 'female', status: 'inactive' },
  { id: 4, name: '赵六', age: 35, email: 'zhaoliu@example.com', gender: 'male', status: 'active' },
  { id: 5, name: '孙七', age: 22, email: 'sunqi@example.com', gender: 'female', status: 'active' }
])

// 表格列配置
const tableColumns = ref([
  { prop: 'id', dataIndex: 'id', label: 'ID', width: 80, align: 'center' },
  { prop: 'name', dataIndex: 'name', label: '姓名', width: 120 },
  { prop: 'age', dataIndex: 'age', label: '年龄', width: 80, align: 'center' },
  { prop: 'email', dataIndex: 'email', label: '邮箱', minWidth: 200 },
  { prop: 'gender', dataIndex: 'gender', label: '性别', width: 80, align: 'center', formatter: (row: any) => row.gender === 'male' ? '男' : '女' },
  { prop: 'status', dataIndex: 'status', label: '状态', width: 100, align: 'center', formatter: (row: any) => row.status === 'active' ? '活跃' : '禁用' }
])

// 提交表单
const handleSubmit = () => {
  console.log('表单提交:', formData.value)
  alert('表单提交成功！')
}

// 重置表单
const handleReset = () => {
  formData.value = {
    username: '',
    email: '',
    password: '',
    gender: '',
    active: false
  }
  alert('表单已重置！')
}
</script>

<style scoped>
.adapter-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.demo-section h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  border-left: 4px solid #409eff;
  padding-left: 12px;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.form-actions button {
  padding: 8px 16px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.form-actions button:hover {
  background-color: #66b1ff;
}

.form-actions button:last-child {
  background-color: #606266;
}

.form-actions button:last-child:hover {
  background-color: #868686;
}

.demo-result {
  margin-top: 40px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.demo-result h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  border-left: 4px solid #409eff;
  padding-left: 12px;
}

.demo-result pre {
  background-color: #fff;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.5;
}
</style>
```

## 可交互演示

### SmartForm 适配器切换

以下是 SmartForm 组件的适配器切换演示：

<SmartFormDemo />

### SmartTable 适配器切换

以下是 SmartTable 组件的适配器切换演示：

<SmartTableDemo />

## 适配器最佳实践

### 1. 选择合适的适配器

- 如果您的项目已经使用了 Element Plus 或 Ant Design Vue，建议选择对应的适配器
- 如果您是新项目，可以根据团队熟悉程度选择合适的 UI 库
- 如果需要在同一项目中混用不同 UI 库，可以在组件级别指定适配器

### 2. 自定义适配器

- 当需要支持其他 UI 库时，可以创建自定义适配器
- 自定义适配器应该实现所有必要的组件接口
- 可以参考内置适配器的实现方式

### 3. 适配器兼容性

- 确保适配器版本与 UI 库版本兼容
- 定期更新适配器以支持 UI 库的新功能
- 测试不同适配器在各种场景下的表现

## 未来规划

Smart UI 团队计划在未来支持更多 UI 库，包括：
- Vue Material
- Bootstrap Vue
- Quasar

同时，我们也欢迎社区贡献更多的适配器，共同丰富 Smart UI 的生态系统。

## 总结

Smart UI 的适配器系统提供了一种灵活的方式来支持不同的 UI 库，使开发者可以在不同项目中复用相同的组件代码。通过了解适配器的工作原理和使用方法，您可以更好地利用 Smart UI 的优势，提高开发效率。

如果您有任何关于适配器的问题或建议，欢迎通过 GitHub Issues 反馈给我们。