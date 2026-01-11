# 类型定义参考

## 概述

本文档包含 Smart UI 库中使用的所有类型定义，帮助开发者理解和使用库的各种配置选项。

## 表单相关类型

### FieldConfig

表单字段配置类型，用于定义表单中每个字段的属性。

```typescript
interface FieldConfig {
  // 字段名称，对应 model 中的属性
  name: string;
  
  // 字段标签
  label: string;
  
  // 字段类型
  type: FieldType;
  
  // 字段默认值
  value?: any;
  
  // 是否禁用该字段
  disabled?: boolean;
  
  // 是否只读该字段
  readonly?: boolean;
  
  // 占位符文本
  placeholder?: string;
  
  // 字段验证规则
  rules?: RuleConfig[];
  
  // 字段跨度（1-24）
  span?: number;
  
  // 表单项跨度
  itemSpan?: number;
  
  // 字段标签宽度
  labelWidth?: string | number;
  
  // 字段尺寸
  size?: 'small' | 'medium' | 'large';
  
  // 自定义插槽名称
  slot?: string;
  
  // 选择器选项
  options?: OptionConfig[];
  
  // 上传组件配置
  uploadConfig?: UploadConfig;
  
  // 其他自定义属性
  [key: string]: any;
}
```

### FieldType

表单字段类型枚举。

```typescript
type FieldType = 
  | 'input' 
  | 'select' 
  | 'radio' 
  | 'checkbox' 
  | 'date-picker' 
  | 'textarea' 
  | 'switch' 
  | 'slider' 
  | 'rate' 
  | 'upload' 
  | 'tree-select' 
  | 'cascader' 
  | 'time-picker' 
  | 'divider';
```

### RuleConfig

表单验证规则类型。

```typescript
interface RuleConfig {
  // 是否必填
  required?: boolean;
  
  // 验证失败提示信息
  message?: string;
  
  // 触发验证的事件
  trigger?: 'blur' | 'change' | ('blur' | 'change')[];
  
  // 验证类型（如 'email', 'number' 等）
  type?: string;
  
  // 最小值（适用于数字和字符串）
  min?: number;
  
  // 最大值（适用于数字和字符串）
  max?: number;
  
  // 固定长度（适用于字符串和数组）
  len?: number;
  
  // 枚举值列表
  enum?: any[];
  
  // 正则表达式验证
  pattern?: RegExp;
  
  // 自定义验证函数
  validator?: (rule: any, value: any, callback: (error?: string) => void) => void;
  
  // 其他自定义属性
  [key: string]: any;
}
```

### OptionConfig

选择器选项类型，用于 select、radio、checkbox 等组件。

```typescript
interface OptionConfig {
  // 选项标签
  label: string;
  
  // 选项值
  value: any;
  
  // 是否禁用该选项
  disabled?: boolean;
  
  // 选项图标
  icon?: string | Component;
  
  // 子选项（用于级联选择）
  children?: OptionConfig[];
  
  // 其他自定义属性
  [key: string]: any;
}
```

### UploadConfig

上传组件配置类型。

```typescript
interface UploadConfig {
  // 上传地址
  action?: string;
  
  // 上传方法
  method?: 'post' | 'put' | 'patch';
  
  // 上传文件字段名
  name?: string;
  
  // 上传额外参数
  data?: Record<string, any>;
  
  // 上传头信息
  headers?: Record<string, string>;
  
  // 是否支持多选
  multiple?: boolean;
  
  // 最大上传文件数量
  limit?: number;
  
  // 允许的文件类型
  accept?: string;
  
  // 文件大小限制（字节）
  fileSize?: number;
  
  // 上传成功回调
  onSuccess?: (response: any, file: any) => void;
  
  // 上传失败回调
  onError?: (error: any, file: any) => void;
  
  // 上传前回调
  onBeforeUpload?: (file: any) => boolean | Promise<boolean>;
  
  // 文件列表变化回调
  onChange?: (fileList: any[]) => void;
  
  // 其他自定义属性
  [key: string]: any;
}
```

## 表格相关类型

### ColumnConfig

表格列配置类型，用于定义表格中每列的属性。

```typescript
interface ColumnConfig {
  // 字段名
  prop?: string;
  
  // 数据索引
  dataIndex?: string;
  
  // 列标题
  label: string;
  
  // 列宽度
  width?: number | string;
  
  // 列最小宽度
  minWidth?: number | string;
  
  // 列对齐方式
  align?: 'left' | 'center' | 'right';
  
  // 单元格格式化函数
  formatter?: (row: any, column: any, cellValue: any, index: number) => any;
  
  // 是否可排序
  sortable?: boolean;
  
  // 是否固定列
  fixed?: 'left' | 'right';
  
  // 自定义插槽名称
  slot?: string;
  
  // 是否显示列
  show?: boolean;
  
  // 列是否可编辑
  editable?: boolean;
  
  // 其他自定义属性
  [key: string]: any;
}
```

### PaginationConfig

分页配置类型，用于配置表格的分页功能。

```typescript
interface PaginationConfig {
  // 总条数
  total?: number;
  
  // 每页条数
  pageSize?: number;
  
  // 当前页码
  currentPage?: number;
  
  // 每页条数选项
  pageSizes?: number[];
  
  // 分页器布局
  layout?: string;
  
  // 是否显示背景
  background?: boolean;
  
  // 是否使用小型分页器
  small?: boolean;
  
  // 页码变化时的回调
  onChange?: (page: number, pageSize: number) => void;
  
  // 每页条数变化时的回调
  onSizeChange?: (pageSize: number) => void;
  
  // 其他自定义属性
  [key: string]: any;
}
```

### RowSelectionConfig

行选择配置类型，用于配置表格的行选择功能。

```typescript
interface RowSelectionConfig {
  // 选择类型
  type?: 'checkbox' | 'radio';
  
  // 默认选中的行 keys
  selectedRowKeys?: any[];
  
  // 选择变化时的回调
  onChange?: (selection: any[]) => void;
  
  // 选择某一行时的回调
  onSelect?: (row: any, selected: boolean) => void;
  
  // 全选/取消全选时的回调
  onSelectAll?: (selected: boolean, selection: any[]) => void;
  
  // 自定义 checkbox 属性
  getCheckboxProps?: (row: any) => any;
  
  // 其他自定义属性
  [key: string]: any;
}
```

## 适配器相关类型

### Adapter

适配器接口，定义了适配器需要实现的组件和方法。

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
  
  // 其他自定义属性和方法
  [key: string]: any;
}
```

### Component

组件类型定义。

```typescript
type Component = {
  new (...args: any[]): any;
} | ((props: any, context: any) => any) | any;
```

## 全局配置类型

### SmartUIConfig

Smart UI 全局配置类型。

```typescript
interface SmartUIConfig {
  // 默认适配器
  adapter?: 'element' | 'ant' | string;
  
  // 默认表单配置
  form?: {
    labelWidth?: string | number;
    size?: 'small' | 'medium' | 'large';
    layout?: 'horizontal' | 'vertical' | 'inline';
    [key: string]: any;
  };
  
  // 默认表格配置
  table?: {
    size?: 'small' | 'medium' | 'large';
    border?: boolean;
    stripe?: boolean;
    [key: string]: any;
  };
  
  // 其他自定义配置
  [key: string]: any;
}
```

## 事件类型

### FormChangeEvent

表单字段变化事件类型。

```typescript
interface FormChangeEvent {
  // 字段名称
  field: string;
  
  // 新值
  value: any;
  
  // 旧值
  oldValue: any;
}
```

### FormValidateEvent

表单验证事件类型。

```typescript
interface FormValidateEvent {
  // 字段名称
  field: string;
  
  // 是否验证通过
  valid: boolean;
  
  // 验证失败信息
  message: string;
}
```

### TableSortEvent

表格排序事件类型。

```typescript
interface TableSortEvent {
  // 列配置
  column: ColumnConfig;
  
  // 排序字段
  prop: string;
  
  // 排序顺序
  order: 'ascending' | 'descending' | null;
}
```

## 工具类型

### DeepPartial

深度部分类型，用于创建一个类型，其所有属性都是可选的，包括嵌套属性。

```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

### RequiredKeys

获取类型中所有必填属性的键。

```typescript
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
```

### OptionalKeys

获取类型中所有可选属性的键。

```typescript
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];
```

## 示例：使用类型定义

### TypeScript 中使用类型

```typescript
import { defineComponent, ref } from 'vue'
import { SmartForm } from 'smart-form-core'
import type { FieldConfig, FormChangeEvent } from 'smart-form-core'

const App = defineComponent({
  components: {
    SmartForm
  },
  setup() {
    const formData = ref({
      username: '',
      email: ''
    })
    
    // 使用 FieldConfig 类型
    const fields: FieldConfig[] = [
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
        rules: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
        ]
      }
    ]
    
    // 使用 FormChangeEvent 类型
    const handleChange = (event: FormChangeEvent) => {
      console.log('字段变化:', event.field, event.value)
    }
    
    return {
      formData,
      fields,
      handleChange
    }
  }
})

export default App
```

### JavaScript 中使用类型注释

```javascript
import { defineComponent, ref } from 'vue'
import { SmartForm } from 'smart-form-core'

const App = defineComponent({
  components: {
    SmartForm
  },
  setup() {
    const formData = ref({
      username: '',
      email: ''
    })
    
    // JavaScript 中使用 JSDoc 类型注释
    /** @type {import('smart-form-core').FieldConfig[]} */
    const fields = [
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
        rules: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
        ]
      }
    ]
    
    /** 
     * @param {import('smart-form-core').FormChangeEvent} event
     */
    const handleChange = (event) => {
      console.log('字段变化:', event.field, event.value)
    }
    
    return {
      formData,
      fields,
      handleChange
    }
  }
})

export default App
```
