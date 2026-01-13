<template>
  <div class="form-demo-container">
    <div class="form-demo-gradient-bar"></div>
    <h3 class="form-demo-title">智能表单生成</h3>
    <smart-form
      :model="formData"
      :fields="formFields"
      :rules="formRules"
      :adapter="adapter"
      label-width="120px"
      :submit-button="{ text: '提交表单', type: 'primary', size: 'medium' }"
      :cancel-button="{ text: '重置表单', size: 'medium' }"
      @submit="handleFormSubmit"
      @cancel="handleFormReset"
    >
    </smart-form>
    
  </div>
</template>

<script>
import SmartForm from '../../../../smart-ui/src/components/form/SmartForm.vue'

export default {
  components: {
    SmartForm
  },
  props: {
    adapter: {
      type: String,
      default: 'element'
    }
  },
  data() {
    return {
      // 表单数据
      formData: {
        username: '',
        email: '',
        password: '',
        gender: '',
        hobbies: []
      },
      
      // 表单字段配置
      formFields: [
        { name: 'username', label: '用户名', type: 'input', placeholder: '请输入用户名' },
        { name: 'email', label: '邮箱', type: 'input', placeholder: '请输入邮箱' },
        { name: 'password', label: '密码', type: 'input', placeholder: '请输入密码', inputType: 'password' },
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
        }
      ],
      
      // 表单验证规则
      formRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 表单提交
    handleFormSubmit(isValid, model) {
      if (isValid) {
        alert('表单提交成功！提交的数据：' + JSON.stringify(model, null, 2))
      } else {
        alert('表单验证失败，请检查必填项！')
      }
    },
    
    // 表单重置
    handleFormReset() {
      this.formData = {
        username: '',
        email: '',
        password: '',
        gender: '',
        hobbies: []
      }
    }
  }
}
</script>

<style scoped>
/* 容器样式 */
.form-demo-container {
  padding: 28px;
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* 顶部渐变条 */
.form-demo-gradient-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  width: 0;
  background: linear-gradient(90deg, #42b883, #359b70);
  transition: width 0.3s ease;
}

/* 标题样式 */
.form-demo-title {
  margin-top: 0;
  margin-bottom: 16px;
  border-bottom: 2px solid #f0f2f5;
  padding-bottom: 12px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #42b883, #359b70);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 描述文本样式 */
.form-demo-description {
  color: #909399;
  font-size: 14px;
  line-height: 1.6;
}


</style>