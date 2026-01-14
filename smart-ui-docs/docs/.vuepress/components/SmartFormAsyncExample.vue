<template>
  <div class="smart-form-async-example">
    <h3 class="form-demo-title">示例</h3>
    
    <!-- Adapter 切换 -->
    <div class="adapter-switcher">
      <label>UI 库：</label>
      <div class="switcher-buttons">
        <button 
          :class="['switch-btn', { active: adapter === 'element' }]" 
          @click="adapter = 'element'"
        >
          Element Plus
        </button>
        <button 
          :class="['switch-btn', { active: adapter === 'ant' }]" 
          @click="adapter = 'ant'"
        >
          Ant Design Vue
        </button>
      </div>
    </div>
    
    <div>
      <smart-form
        ref="smartFormRef"
        :adapter="adapter"
        :model="formData"
        :fields="fields"
        :rules="rules"
        :submit-button="{ title: '提交', type: 'primary'}"
        :cancel-button="{ title: '重置' }"
        @submit="handleSubmit"
        @cancel="handleCancel"
        label-position="right"
        label-width="80px"
        :inline="false"
        :disabled="false"
        :item-span="12"
      >
        <!-- 表单内容 -->
      </smart-form>
      
      <!-- 外部方法调用演示 -->
      <div class="external-methods-demo">
        <h4>外部方法调用演示</h4>
        <div class="demo-buttons">
          <button 
            class="demo-btn" 
            @click="handleValidateForm"
          >
            外部验证表单
          </button>
          <button 
            class="demo-btn" 
            @click="handleValidateUsername"
          >
            单独验证用户名
          </button>
        </div>
      </div>
    </div>
    
    <!-- 表单提交结果 -->
    <div v-if="submitResult" class="submit-result">
      <h4>表单提交结果</h4>
      <pre>{{ submitResult }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SmartForm } from '@smart-ui/core'

// UI 适配器切换
const adapter = ref<'element' | 'ant'>('element')

// SmartForm 组件引用，用于调用其暴露的方法
const smartFormRef = ref<any>(null)

// 表单数据
const formData = ref({
  username: '', // input 类型
  bio: '', // textarea 类型
  department: null, // select 类型（异步加载）
  gender: 'male', // radio 类型
  hobbies: ['reading', 'coding'], // checkbox 类型
  birthdate: null, // date 类型
  birthtime: null, // time 类型
  age: 18, // input-number 类型
  salary: 10000, // slider 类型
  active: false, // switch 类型
  rating: 3, // rate 类型
  manager: '' // mention 类型
})

// 验证规则
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  bio: [
    { required: true, message: '请输入个人简介', trigger: 'blur' },
    { min: 10, message: '简介长度不能少于 10 个字符', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  birthdate: [
    { required: true, message: '请选择出生日期', trigger: 'change' }
  ],
  department: [
    { required: true, message: '请选择部门', trigger: 'change' }
  ]
})

// 响应式字段配置，支持异步更新
const fields = ref([
  {
    name: 'username',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名',
    defaultValue: '',
    readonly: false,
    span: 12,
    typeProps: {
      onChange: (value: string) => console.log('用户名变化:', value),
      onBlur: (value: string) => console.log('用户名失焦:', value),
      clearable: true
    }
  },
  {
    name: 'bio',
    label: '个人简介',
    type: 'textarea',
    placeholder: '请输入个人简介',
    disabled: false,
    span: 24,
    typeProps: {
      rows: 3,
      onChange: (value: string) => console.log('简介变化:', value)
    }
  },
  {
    name: 'department',
    label: '部门',
    type: 'select',
    placeholder: '请选择部门',
    span: 12,
    typeProps: {
      allowClear: true,
      onChange: (value: string) => console.log('部门选择变化:', value)
    },
    rules: rules.value.department,
    options: [] // 初始为空，后续异步加载
  },
  {
    name: 'gender',
    label: '性别',
    type: 'radio',
    defaultValue: 'male',
    span: 12,
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
      { label: '其他', value: 'other' }
    ],
    typeProps: {
      onChange: (value: string) => console.log('性别变化:', value)
    }
  },
  {
    name: 'hobbies',
    label: '兴趣爱好',
    type: 'checkbox',
    defaultValue: ['reading', 'coding'],
    span: 24,
    options: [
      { label: '阅读', value: 'reading' },
      { label: '运动', value: 'sports' },
      { label: '音乐', value: 'music' },
      { label: '旅行', value: 'travel' },
      { label: '编程', value: 'coding' }
    ],
    typeProps: {
      onChange: (value: string[]) => console.log('兴趣爱好变化:', value)
    }
  },
  {
    name: 'birthdate',
    label: '出生日期',
    type: 'date',
    span: 12,
    typeProps: {
      placeholder: '请选择出生日期',
      onChange: (value: Date) => console.log('出生日期变化:', value)
    }
  },
  {
    name: 'birthtime',
    label: '出生时间',
    type: 'time',
    span: 12,
    typeProps: {
      placeholder: '请选择出生时间',
      onChange: (value: any) => console.log('出生时间变化:', value)
    }
  },
  {
    name: 'age',
    label: '年龄',
    type: 'input-number',
    defaultValue: 18,
    span: 12,
    typeProps: {
      min: 18,
      max: 100,
      onChange: (value: number) => console.log('年龄变化:', value)
    }
  },
  {
    name: 'salary',
    label: '薪资范围',
    type: 'slider',
    defaultValue: 10000,
    span: 24,
    typeProps: {
      min: 3000,
      max: 50000,
      step: 1000,
      marks: {
        3000: '3k',
        10000: '10k',
        20000: '20k',
        50000: '50k'
      },
      onChange: (value: number) => console.log('薪资范围变化:', value)
    }
  },
  {
    name: 'active',
    label: '是否激活',
    type: 'switch',
    defaultValue: false,
    span: 12,
    typeProps: {
      onChange: (value: boolean) => console.log('激活状态变化:', value)
    }
  },
  {
    name: 'rating',
    label: '评分',
    type: 'rate',
    defaultValue: 3,
    span: 12,
    typeProps: {
      onChange: (value: number) => console.log('评分变化:', value)
    }
  },
  {
    name: 'manager',
    label: '直属领导',
    type: 'mention',
    placeholder: '请输入领导姓名',
    span: 12,
    typeProps: {
      onChange: (value: string) => console.log('领导选择变化:', value),
      options: [
        { value: '张三', label: '张三' },
        { value: '李四', label: '李四' },
        { value: '王五', label: '王五' }
      ]
    }
  }
])

// 提交结果
const submitResult = ref('')

// 模拟从服务端异步获取部门选项
async function loadDepartmentOptions() {
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 从服务端获取部门数据
    const departmentOptions = [
      { label: '技术部', value: 'tech' },
      { label: '产品部', value: 'product' },
      { label: '设计部', value: 'design' },
      { label: '市场部', value: 'marketing' },
      { label: '人事部', value: 'hr' },
      { label: '财务部', value: 'finance' }
    ]
    
    // 更新字段配置中的options
    const departmentField = fields.value.find(field => field.name === 'department')
    if (departmentField) {
      departmentField.options = departmentOptions
    }
  } catch (error) {
    console.error('加载部门选项失败:', error)
  }
}

// 组件挂载时加载部门选项
onMounted(() => {
  loadDepartmentOptions()
})

// 表单提交处理
const handleSubmit = (isValid: boolean, model: Record<string, any>) => {
  if (isValid) {
    submitResult.value = JSON.stringify(model, null, 2)
    console.log('表单提交:', model)
  } else {
    submitResult.value = '表单验证失败，请检查必填项！'
  }
}

// 表单取消处理
const handleCancel = () => {
  submitResult.value = ''
  console.log('表单取消')
  // 重置表单数据
  formData.value = {
    username: '',
    bio: '',
    department: null,
    gender: 'male',
    hobbies: ['reading', 'coding'],
    birthdate: null,
    birthtime: null,
    age: 18,
    salary: 10000,
    active: false,
    rating: 3,
    manager: ''
  }
}

// 外部调用表单验证方法
const handleValidateForm = async () => {
  if (smartFormRef.value) {
    try {
      const isValid = await smartFormRef.value.validateForm()
      submitResult.value = isValid ? '表单验证通过！' : '表单验证失败，请检查必填项！'
      console.log('外部调用表单验证结果:', isValid)
    } catch (error) {
      submitResult.value = '验证过程中发生错误'
      console.error('外部调用表单验证失败:', error)
    }
  }
}

// 外部调用单独验证用户名
const handleValidateUsername = async () => {
  if (smartFormRef.value) {
    try {
      const isValid = await smartFormRef.value.validateField('username')
      submitResult.value = isValid ? '用户名验证通过！' : '用户名验证失败，请检查输入格式！'
      console.log('外部调用用户名验证结果:', isValid)
    } catch (error) {
      submitResult.value = '用户名验证过程中发生错误'
      console.error('外部调用用户名验证失败:', error)
    }
  }
}
</script>

<style scoped>
.smart-form-async-example {
  padding: 20px;
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

.form-demo-title {
  margin-top: 0;
  margin-bottom: 16px;
  padding-bottom: 12px;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid #f0f2f5;
  color: #303133;
}

/* Adapter 切换器样式 */
.adapter-switcher {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.adapter-switcher label {
  font-weight: 500;
  color: #303133;
  font-size: 14px;
}

.switcher-buttons {
  display: flex;
  gap: 8px;
}

.switch-btn {
  padding: 6px 16px;
  border: 1px solid #dcdfe6;
  background: #fff;
  color: #606266;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  outline: none;
}

.switch-btn:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.switch-btn.active {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

.switch-btn.active:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.submit-result {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
}

.submit-result h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #303133;
  font-size: 14px;
  font-weight: 600;
}

.submit-result pre {
  margin: 0;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.5;
  color: #606266;
}

/* 外部方法调用演示区域样式 */
.external-methods-demo {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f9eb;
  border-radius: 4px;
  border: 1px solid #d1fae5;
}

.external-methods-demo h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #065f46;
  font-size: 14px;
  font-weight: 600;
}

.demo-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.demo-btn {
  padding: 8px 16px;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  outline: none;
}

.demo-btn:hover {
  background-color: #059669;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.demo-btn:active {
  transform: translateY(0);
}
</style>