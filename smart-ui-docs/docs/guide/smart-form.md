# SmartForm 组件

SmartForm 是 Smart UI 的核心组件之一，它可以通过简单的 JS 配置自动生成复杂的表单。

## 基本用法
<SmartFormAsyncExample />
```vue
<template>
  <div>
    <smart-form
    ref="smartFormRef"
    :model="formData"
    :fields="fields"
    :rules="rules"
    @onFinish="handleSubmit"
    @onFinishFailed="handleSubmitFailed"
    @onValuesChange="handleValuesChange"
    @onReset="handleReset">
      <template #default>
        <div class="form-actions">
          <button type="button" @click="submitForm">提交</button>
          <button type="button" @click="resetForm">重置</button>
        </div>
      </template>
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
const handleSubmit = (values) => {
  console.log('表单提交:', values)
  alert('提交成功！姓名：' + values.name + '，城市：' + values.city)
}

// 表单提交失败处理
const handleSubmitFailed = (errorInfo) => {
  console.log('表单提交失败:', errorInfo)
}

// 表单值变化处理
const handleValuesChange = (changedValues, allValues) => {
  console.log('表单值变化:', changedValues, allValues)
}

// 表单重置处理
const handleReset = () => {
  console.log('表单重置')
  // 重置表单数据
  formData.value = {
    name: '',
    city: 'beijing'
  }
}

// 提交表单函数
const smartFormRef = ref(null)
const submitForm = async () => {
  const isValid = await smartFormRef.value.validateForm()
  if (isValid) {
    // 执行提交逻辑
    handleSubmit(formData.value)
  }
}

// 重置表单函数
const resetForm = () => {
  smartFormRef.value.resetForm()
}
</script>
```
## 配置选项

### SmartForm Props

SmartForm 使用简洁的接口设计，支持传递 Element Plus 和 Ant Design Vue 的所有官方属性。

#### 核心属性

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| model | `Record<string, any>` | 表单数据模型 | `{}` |
| fields | `FieldConfig[]` | 表单字段配置 | `[]` |
| rules | `Record<string, any[]>` | 表单验证规则 | `{}` |
| adapter | `'element' \| 'ant'` | UI 适配器 | `'element'` |
| itemSpan | `number` | 通用的字段 span 值 | - |

#### 传递官方属性

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

#### 完整属性支持

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

SmartForm 使用简洁的接口设计，将属性分为核心属性和扩展属性：

#### SmartFormCoreProps（核心属性）

定义表单必须的核心属性，确保表单的基本功能：

```typescript
interface SmartFormCoreProps {
  adapter?: 'element' | 'ant'     // UI 适配器
  model: Record<string, any>       // 表单数据模型
  rules?: Record<string, any[]>    // 验证规则
  fields?: FieldConfig[]           // 字段配置
  itemSpan?: number                // 通用的字段 span 值
}
```

#### SmartFormProps（完整属性接口）

继承核心属性并支持索引签名，允许传递任何官方 UI 库属性：

```typescript
interface SmartFormProps extends SmartFormCoreProps {
  // 支持 Element Plus 和 Ant Design Vue 的所有官方属性
  [key: string]: any
}
```

#### 属性转发机制

SmartForm 通过以下方式实现属性转发：

1. **props 接收**：定义核心属性
2. **attrs 接收**：通过 `useAttrs()` 接收所有未声明的属性
3. **Object.assign 合并**：使用 `Object.assign({}, props, attrs)` 合并所有属性
4. **filterUndefinedProps 过滤**：过滤掉 `undefined` 属性，只传递有值的属性

这种设计确保：
- ✅ 类型安全：核心属性有明确的类型定义
- ✅ 灵活扩展：支持传递任何官方 UI 库属性
- ✅ 性能优化：只传递有值的属性，减少不必要的属性传递
- ✅ 跨库兼容：自动处理不同 UI 库的属性映射

### FieldConfig

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| name | `string` | 字段名 | - |
| label | `string` | 字段标签 | - |
| type | `'input'  'textarea'  'select'  'select-v2'  'radio'  'checkbox'  'date'  'time'  'switch'  'slider'  'mention'  'input-number'  'cascader'  'tree-select'  'upload'  'rate'  'color-picker'  'transfer'  'autocomplete'` | 字段类型 | - |
| placeholder | `string` | 占位符 | - |
| options | `Array<{ label: string, value: any }>` | 选项列表 | `[]` |
| rules | `any[]` | 验证规则 | `[]` |
| disabled | `boolean` | 是否禁用 | `false` |
| readonly | `boolean` | 是否只读 | `false` |
| defaultValue | `any` | 默认值 | - |
| typeProps | `Record<string, any>` | 组件原生属性配置，具有最高优先级 | - |
| span | `number` | 字段宽度 | - |
| [key: string] | `any` | 其他自定义属性 | - |

### 属性优先级

SmartForm 组件的属性遵循以下优先级顺序（从高到低）：

1. **typeProps**：组件原生属性配置，具有最高优先级，会覆盖所有其他配置
2. **适配器兼容处理**：基于用户配置进行跨 UI 库属性兼容处理
3. **内置属性**：组件内置的基础属性处理

### typeProps 示例

```vue
<script setup lang="ts">
import { ref } from 'vue'

// 表单字段配置
const fields = ref([
  {
    name: 'username',
    label: '用户名',
    type: 'input',
    // 内置属性
    placeholder: '请输入用户名',
    // typeProps 配置，具有最高优先级
    typeProps: {
      placeholder: '请输入3-20个字符', // 会覆盖上面的 placeholder
      clearable: true, // 配置组件原生属性
      size: 'large', // 配置组件尺寸
      // 事件配置也通过 typeProps 实现
      onChange: (value) => console.log('用户名变化:', value),
      onBlur: (value) => console.log('用户名失焦:', value)
    }
  }
])

// 跨 UI 库属性兼容示例
const selectField = ref([
  {
    name: 'city',
    label: '城市',
    type: 'select',
    // 同时支持 antd 的 allowClear 和 element 的 clearable
    typeProps: {
      allowClear: true, // antd 属性名
      clearable: true,  // element 属性名
      placeholder: '请选择城市',
      onChange: (value) => console.log('城市选择变化:', value),
      // 适配器会自动处理兼容性
    }
  }
])

// 其他组件类型示例
const otherFields = ref([
  {
    name: 'age',
    label: '年龄',
    type: 'input-number',
    typeProps: {
      min: 18,
      max: 100,
      onChange: (value) => console.log('年龄变化:', value)
    }
  },
  {
    name: 'rating',
    label: '评分',
    type: 'rate',
    typeProps: {
      max: 5,
      onChange: (value) => console.log('评分变化:', value)
    }
  }
])
```
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
````

### 插槽作用域

| 属性名 | 类型                  | 说明         |
| ------ | --------------------- | ------------ |
| field  | `FieldConfig`         | 字段配置对象 |
| model  | `Record<string, any>` | 表单数据模型 |

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
<script setup lang="ts">
import { ref } from 'vue'

// 表单字段配置
const fields = ref([
<!-- 覆盖通用设置，宽度为 8 -->
{ name: 'username', label: '用户名', type: 'input', span: 8},
<!-- 覆盖通用设置，宽度为 16 -->
{ name: 'email', label: '邮箱', type: 'input', span: 16}])
</script>
```

## 表单验证

SmartForm 支持两种验证规则设置方式：

### 1. 通过 `rules` 属性设置

```vue
<smart-form
  :model="formData"
  :fields="fields"
  :rules="{
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  }"
>
  <!-- 表单内容 -->
</smart-form>
```

### 2. 通过 `field.rules` 设置

```vue
const fields = [ { name: 'username', label: '用户名', type: 'input', rules: [{
required: true, message: '请输入用户名', trigger: 'blur' }] } ]
```

## 支持的字段类型

SmartForm 支持以下字段类型：

- `input`：输入框
- `textarea`：文本域
- `select`：选择器
- `select-v2`：增强版选择器
- `radio`：单选框组
- `checkbox`：复选框组
- `date`：日期选择器
- `time`：时间选择器
- `switch`：开关
- `slider`：滑块
- `mention`：提及组件
- `input-number`：数字输入框
- `cascader`：级联选择器
- `tree-select`：树形选择器
- `upload`：上传组件
- `rate`：评分组件
- `color-picker`：颜色选择器
- `transfer`：穿梭框
- `autocomplete`：自动完成

## 事件处理

SmartForm 支持 Element Plus 和 Ant Design Vue 的官方事件，这些事件会根据当前使用的适配器自动适配。

### 支持的事件

| 事件名         | 类型                                                                           | 说明               |
| -------------- | ------------------------------------------------------------------------------ | ------------------ |
| onFinish       | `(values: Record<string, any>) => void`                                        | 表单验证成功后触发 |
| onFinishFailed | `(errorInfo: any) => void`                                                     | 表单验证失败后触发 |
| onValuesChange | `(changedValues: Record<string, any>, allValues: Record<string, any>) => void` | 表单值变化时触发   |
| onReset        | `() => void`                                                                   | 表单重置时触发     |
| onFieldsChange | `(changedFields: any[], allFields: any[]) => void`                             | 字段状态变化时触发 |

### 事件使用示例

```vue
<template>
  <smart-form
    :model="formData"
    :fields="fields"
    :rules="rules"
    @onFinish="handleFinish"
    @onValuesChange="handleValuesChange"
  >
    <!-- 表单内容 -->
  </smart-form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const formData = ref({ name: "", email: "" });
const fields = ref([
  { name: "name", label: "姓名", type: "input" },
  { name: "email", label: "邮箱", type: "input" },
]);
const rules = ref({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
});

const handleFinish = (values) => {
  console.log("表单提交:", values);
};

const handleValuesChange = (changedValues, allValues) => {
  console.log("值变化:", changedValues, allValues);
};
</script>
```

## 跨 UI 兼容性

SmartForm 通过适配器模式处理不同 UI 库的属性映射，确保您可以使用统一的 API 构建跨 UI 兼容的表单。

### 属性转发机制

SmartForm 使用以下方式实现跨 UI 兼容性：

1. **核心属性处理**：通过 `SmartFormCoreProps` 定义核心属性
2. **扩展属性接收**：通过 `useAttrs()` 接收所有未声明的属性
3. **属性合并**：使用 `Object.assign({}, props, attrs)` 合并所有属性
4. **过滤 undefined**：通过 `filterUndefinedProps` 过滤掉 `undefined` 属性
5. **UI 适配器处理**：
   - **Element Plus**：直接透传所有属性
   - **Ant Design Vue**：通过 `convertToAntFormProps` 转换属性

### 属性映射

SmartForm 会自动将通用属性转换为当前 UI 库的特定属性：

| 通用属性      | Element Plus 属性 | Ant Design Vue 属性  |
| ------------- | ----------------- | -------------------- |
| labelPosition | label-position    | labelAlign           |
| labelWidth    | label-width       | labelCol.style.width |
| inline        | inline            | layout="inline"      |
| disabled      | disabled          | disabled             |

### 直接使用官方属性

由于 SmartForm 使用索引签名支持扩展属性，您可以直接使用 Element Plus 或 Ant Design Vue 的官方属性，无需额外配置：

```vue
<template>
  <smart-form
    :model="formData"
    :fields="fields"
    :rules="rules"

    <!-- 直接使用 Element Plus / Ant Design Vue 官方属性 -->
    :layout="'horizontal'"
    :labelCol="{ span: 8 }"
    :wrapperCol="{ span: 16 }"
    :validateTrigger="['blur', 'change']"
    :scrollToFirstError="true"

    @onFinish="handleFinish"
  >
    <!-- 表单内容 -->
  </smart-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({ name: '', email: '' })
const fields = ref([
  { name: 'name', label: '姓名', type: 'input' },
  { name: 'email', label: '邮箱', type: 'input' }
])
const rules = ref({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
})

const handleFinish = (values) => {
  console.log('表单提交:', values)
}
</script>
```

### 适配器特定属性

如果您需要使用特定 UI 库的独有属性，可以通过 `typeProps` 配置：

```vue
const fields = ref([ { name: 'username', label: '用户名', type: 'input',
typeProps: { // Element Plus 属性 clearable: true, // Ant Design Vue 属性
allowClear: true, // 适配器会自动处理兼容性 } } ])
```

## 外部方法调用

SmartForm 组件通过 `defineExpose` 暴露了一些方法，允许您通过 ref 直接调用表单的验证和重置功能。

### 暴露的方法

| 方法名        | 类型                                 | 说明                       |
| ------------- | ------------------------------------ | -------------------------- |
| validateForm  | `() => Promise<boolean>`             | 验证整个表单，返回验证结果 |
| validateField | `(name: string) => Promise<boolean>` | 验证单个字段，返回验证结果 |
| resetForm     | `() => void`                         | 重置表单数据               |

### 使用示例

```vue
<template>
  <div>
    <smart-form
      ref="smartFormRef"
      :model="formData"
      :fields="fields"
      :rules="rules"
    >
      <!-- 表单内容 -->
    </smart-form>

    <!-- 外部调用按钮 -->
    <div style="margin-top: 20px;">
      <button @click="validateForm">外部验证表单</button>
      <button @click="validateUsername">验证用户名</button>
      <button @click="resetForm">重置表单</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// SmartForm 组件引用
const smartFormRef = ref(null);

// 表单数据
const formData = ref({
  username: "",
  email: "",
});

// 验证规则
const rules = ref({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入有效的邮箱地址", trigger: "blur" },
  ],
});

// 字段配置
const fields = ref([
  {
    name: "username",
    label: "用户名",
    type: "input",
    placeholder: "请输入用户名",
  },
  {
    name: "email",
    label: "邮箱",
    type: "input",
    placeholder: "请输入邮箱",
  },
]);

// 外部调用表单验证
const validateForm = async () => {
  const isValid = await smartFormRef.value.validateForm();
  if (isValid) {
    console.log("表单验证通过！");
  } else {
    console.log("表单验证失败，请检查必填项！");
  }
};

// 外部调用单个字段验证
const validateUsername = async () => {
  const isValid = await smartFormRef.value.validateField("username");
  if (isValid) {
    console.log("用户名验证通过！");
  } else {
    console.log("用户名验证失败，请检查输入格式！");
  }
};

// 外部调用表单重置
const resetForm = () => {
  smartFormRef.value.resetForm();
  console.log("表单已重置！");
};
</script>
```

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
      ref="smartFormRef"
      :model="formData"
      :fields="formFields"
      :rules="formRules"
      @onFinish="handleSubmit"
      @onReset="handleCancel"
    >
      <!-- 自定义提交按钮 -->
      <template #default>
        <div class="form-actions">
          <button type="button" @click="submitForm">提交</button>
          <button type="button" @click="resetForm">重置</button>
        </div>
      </template>
    </smart-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const formData = ref({});
const formFields = ref([]);
const formRules = ref({});
const loading = ref(true);
const smartFormRef = ref(null);

// 模拟从服务端获取完整表单配置
async function loadFormConfig() {
  loading.value = true;

  try {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 1. 从服务端获取字段配置
    const response = await fetch("/api/form-config");
    const config = await response.json();

    // 2. 从服务端获取表单初始数据
    const dataResponse = await fetch("/api/form-data");
    const initialData = await dataResponse.json();

    // 3. 从服务端获取选项数据
    const optionsResponse = await fetch("/api/form-options");
    const optionsData = await optionsResponse.json();

    // 4. 整合配置和数据
    const fieldsWithOptions = config.fields.map((field) => {
      // 为需要选项的字段添加从服务端获取的options
      if (
        ["select", "select-v2", "radio", "checkbox"].includes(field.type) &&
        optionsData[field.name]
      ) {
        return {
          ...field,
          options: optionsData[field.name],
        };
      }
      return field;
    });

    // 更新响应式数据
    formFields.value = fieldsWithOptions;
    formData.value = initialData;
    formRules.value = config.rules;
  } catch (error) {
    console.error("加载表单配置失败:", error);
    alert("表单加载失败，请刷新页面重试");
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadFormConfig();
});

// 提交表单函数
const submitForm = async () => {
  const isValid = await smartFormRef.value.validateForm();
  if (isValid) {
    // 执行提交逻辑
    handleSubmit(formData.value);
  }
};

// 重置表单函数
const resetForm = () => {
  smartFormRef.value.resetForm();
  handleCancel();
};

const handleSubmit = (values) => {
  console.log("表单提交:", values);
  // 执行实际的提交逻辑
};

const handleCancel = () => {
  console.log("表单重置");
  // 执行重置逻辑
};
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
```
