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
      >
        <!-- 表单内容 -->
      </smart-form>
      

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

// 表单数据
const formData = ref({
  username: '',
  email: '',
  password: '',
  role: null,
  department: null // 新增：异步获取选项的部门字段
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
  },
  {
    name: 'role',
    label: '角色',
    type: 'select',
    typeProps: {
      allowClear: true,
      placeholder: '请选择角色',
    },
    options: [
      { label: '管理员', value: 'admin' },
      { label: '编辑', value: 'editor' },
      { label: '作者', value: 'author' },
      { label: '读者', value: 'reader' }
    ]
  },
  {
    name: 'department',
    label: '部门',
    type: 'select',
    typeProps: {
      allowClear: true,
      placeholder: '请选择部门',
    },
    rules: rules.value.department,
    options: [] // 初始为空，后续异步加载
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
    email: '',
    password: '',
    role: null,
    department: null // 保留默认部门值
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
</style>