<template>
  <div class="config-section">
    <!-- 配置头部 -->
    <div class="config-header">
      <div class="header-icon">
        <el-icon><Tools /></el-icon>
      </div>
      <h2>生成配置</h2>
    </div>
    
    <div class="config-content">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="80px"
        class="config-form"
        size="mini"
      >
        <!-- 页面名称 -->
        <el-form-item label="页面路径" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入页面名称（PascalCase）"
            maxlength="50"
            show-word-limit
            prefix-icon="User"
          />
          <el-alert
            :title="'示例：UserList'"
            type="info"
            :closable="false"
            show-icon
            style="margin-top: 12px"
          />
        </el-form-item>
        
        <!-- 功能选择 -->
        <el-form-item label="功能选择">
          <el-checkbox-group v-model="form.features" class="feature-group">
            <el-checkbox label="hasSearchForm" border>
              <el-icon><Search /></el-icon>
              <span>表格搜索</span>
            </el-checkbox>
            <el-checkbox label="hasTable" border>
              <el-icon><DataTable /></el-icon>
              <span>表格主体</span>
            </el-checkbox>
            <el-checkbox label="hasForm" border>
              <el-icon><Edit /></el-icon>
              <span>新增表单</span>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        
        <!-- API配置 -->
        <div v-if="form.features.length > 0" class="api-config-section">
          <div class="api-config-header">API配置</div>
          <div v-for="feature in form.features" :key="feature" class="api-config-item">
            <div class="api-config-label">
              <el-icon><Setting /></el-icon>
              <span>{{ getFeatureLabel(feature) }}</span>
            </div>
            <div class="api-config-inputs">
              <el-select v-model="form.featureApis[feature].method" class="api-method-select" placeholder="方法">
                <el-option label="GET" value="GET" />
                <el-option label="POST" value="POST" />
              </el-select>
              <el-input
                v-model="form.featureApis[feature].url"
                :placeholder="`请输入${getFeatureLabel(feature)}的API地址`"
                prefix-icon="Link"
              />
            </div>
          </div>
        </div>
        
        <!-- 字段配置 -->
        <el-form-item label="字段配置">
          <el-button type="primary" @click="handleOpenFieldConfig">
            <el-icon><Document /></el-icon>
            配置字段
          </el-button>
          <el-alert
            :title="'点击上方按钮配置字段，支持自动生成搜索表单、表格列和表单项'"
            type="info"
            :closable="false"
            show-icon
            style="margin-top: 12px"
          />
        </el-form-item>
        
        <!-- 操作按钮 -->
        <el-form-item>
          <div class="form-actions">
            <el-button type="primary" @click="handleGenerate" :loading="loading" class="generate-btn">
              <el-icon><Check /></el-icon>
              生成页面
            </el-button>
            <el-button @click="handleReset">
              <el-icon><Refresh /></el-icon>
              重置
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits } from 'vue';
import {
  Tools,
  User,
  Link,
  Search,
  Grid as DataTable,
  Edit,
  Check,
  Refresh,
  Document,
  Setting
} from '@element-plus/icons-vue';

// Props
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
});

// Emits
const emit = defineEmits([
  'generate',
  'reset',
  'openFieldConfig'
]);

// 表单引用
const formRef = ref(null);

// 表单数据
const form = reactive({
  name: '',
  features: ['hasSearchForm', 'hasTable', 'hasForm'],
  fields: [],
  featureApis: {
    hasSearchForm: { method: 'GET', url: '' },
    hasTable: { method: 'GET', url: '' },
    hasForm: { method: 'POST', url: '' }
  }
});

// 表单规则
const rules = {
  name: [
    { required: true, message: '请输入页面名称', trigger: 'blur' },
    { pattern: /^[A-Z][a-zA-Z0-9]*$/, message: '请使用PascalCase命名法', trigger: 'blur' }
  ],
  apiUrl: [
    { required: true, message: '请输入API地址', trigger: 'blur' }
  ]
};

// 方法
const handleGenerate = async () => {
  if (!formRef.value) return;
  
  try {
    await formRef.value.validate();
    emit('generate', form);
  } catch (error) {
    console.error('表单验证失败:', error);
  }
};

const handleReset = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
  form.features = ['hasSearchForm', 'hasTable', 'hasForm'];
  form.fields = [];
  form.featureApis = {
    hasSearchForm: { method: 'GET', url: '' },
    hasTable: { method: 'GET', url: '' },
    hasForm: { method: 'POST', url: '' }
  };
  emit('reset');
};

const handleOpenFieldConfig = () => {
  emit('openFieldConfig');
};

const getFeatureLabel = (feature) => {
  const labels = {
    hasSearchForm: '搜索表单',
    hasTable: '表格主体',
    hasForm: '新增表单' 
  };
  return labels[feature] || feature;
};

// 暴露方法给父组件
defineExpose({
  form,
  formRef,
  reset: handleReset
});
</script>

<style scoped>
/* 配置区块样式 */
.config-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.config-section:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

/* 配置头部 */
.config-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(64, 158, 255, 0.2);
  position: relative;
}

.config-header::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  border-radius: 2px;
}

.config-header .header-icon {
  font-size: 20px;
  margin-right: 12px;
  color: #409eff;
  background: rgba(64, 158, 255, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
}

.config-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0;
  background: linear-gradient(90deg, #303133, #606266);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 配置内容 */
.config-content {
  width: 100%;
}

/* 表单样式 */
.config-form {
  width: 100%;
}

/* 表单项样式 */
.config-form .el-form-item {
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.config-form .el-form-item:hover {
  transform: translateX(4px);
}

.config-form .el-form-item__label {
  font-size: 14px;
  font-weight: 600;
  color: #606266;
  padding: 0 0 8px 0;
}

.config-form .el-input {
  border-radius: 0;
  overflow: hidden;
  transition: all 0.3s ease;
}

.config-form .el-input:hover {
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.config-form .el-input__wrapper {
  border-radius: 0;
}

.config-form .el-input__inner {
  font-size: 14px;
  padding: 12px 16px;
}

/* 功能选择组 */
.feature-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 0;
}

.feature-group .el-checkbox {
  flex: 1;
  min-width: 150px;
  padding: 16px;
  border-radius: 10px;
  transition: all 0.3s ease;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(64, 158, 255, 0.1);
}

.feature-group .el-checkbox:hover {
  border-color: #409eff;
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.2);
  transform: translateY(-2px);
  background: rgba(64, 158, 255, 0.05);
}

.feature-group .el-checkbox.is-checked {
  background: rgba(64, 158, 255, 0.1);
  border-color: #409eff;
}

.feature-group .el-checkbox__inner {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid #dcdfe6;
  transition: all 0.3s ease;
}

.feature-group .el-checkbox__inner:hover {
  border-color: #409eff;
}

.feature-group .el-checkbox.is-checked .el-checkbox__inner {
  background: #409eff;
  border-color: #409eff;
  transform: scale(1.1);
}

.feature-group .el-checkbox__label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #606266;
  margin-left: 8px;
  line-height: 1;
  height: 100%;
}

.feature-group .el-checkbox__label i {
  font-size: 16px;
  color: #409eff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.feature-group .el-checkbox__label i svg {
  display: block;
  width: 100%;
  height: 100%;
}

.feature-group .el-checkbox__label span {
  line-height: 1;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}

/* API配置区域 */
.api-config-section {
  margin-top: 20px;
  margin-left: 80px;
  margin-bottom: 24px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
  border-radius: 12px;
  border: 1px solid rgba(64, 158, 255, 0.2);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.api-config-section:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-color: rgba(64, 158, 255, 0.3);
}

.api-config-header {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 2px solid rgba(64, 158, 255, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
}

.api-config-header::before {
  content: '';
  width: 4px;
  height: 18px;
  background: linear-gradient(135deg, #409eff, #66b1ff);
  border-radius: 2px;
}

.api-config-item {
  margin-bottom: 20px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  border: 1px solid rgba(64, 158, 255, 0.1);
  transition: all 0.3s ease;
}

.api-config-item:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(64, 158, 255, 0.2);
  transform: translateX(4px);
}

.api-config-item:last-child {
  margin-bottom: 0;
}

.api-config-label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #606266;
}

.api-config-label i {
  color: #409eff;
  font-size: 18px;
  background: rgba(64, 158, 255, 0.1);
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.api-config-inputs {
  display: flex;
  gap: 12px;
  align-items: center;
}

.api-method-select {
  width: 110px;
  flex-shrink: 0;
}

.api-method-select .el-input__wrapper {
  border-radius: 0;
  background: rgba(255, 255, 255, 0.9);
}

.api-config-inputs .el-input {
  flex: 1;
}

.api-config-inputs .el-input__wrapper {
  background: rgba(255, 255, 255, 0.9);
}

/* 操作按钮区域 */
.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 2px solid rgba(64, 158, 255, 0.2);
  justify-content: center;
}

.generate-btn {
  flex: 1;
  font-weight: 700;
  transition: all 0.3s ease;
  font-size: 15px;
  padding: 12px 28px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #dcdfe6;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  color: #303133;
  text-shadow: none;
  letter-spacing: 0.5px;
}

.generate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  border-color: #409eff;
  color: #409eff;
  background: rgba(255, 255, 255, 1);
}

.generate-btn:hover span {
  color: #409eff !important;
}

.generate-btn:hover i {
  color: #409eff !important;
}

.generate-btn:active {
  transform: translateY(0);
}

.generate-btn span {
  color: #303133 !important;
  font-weight: 700;
}

.generate-btn i {
  color: #303133 !important;
}

.form-actions .el-button {
  transition: all 0.3s ease;
  font-size: 15px;
  padding: 12px 28px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #dcdfe6;
  color: #303133;
}

.form-actions .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #409eff;
  color: #409eff;
  background: rgba(255, 255, 255, 1);
}

/* 字段配置按钮 */
.config-form .el-button[type="primary"] {
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 8px;
  background: linear-gradient(135deg, #67c23a, #85ce61);
  border: none;
  box-shadow: 0 4px 12px rgba(103, 194, 58, 0.3);
  transition: all 0.3s ease;
}

.config-form .el-button[type="primary"]:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(103, 194, 58, 0.4);
  background: linear-gradient(135deg, #85ce61, #67c23a);
}

/* 警告框样式 */
.config-form .el-alert {
  border-radius: 8px;
  margin-top: 12px;
  border-left: 4px solid #409eff;
  background: rgba(64, 158, 255, 0.05);
  padding: 12px 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .config-section {
    padding: 28px;
  }
  
  .config-header {
    margin-bottom: 24px;
  }
  
  .config-header h2 {
    font-size: 20px;
  }
  
  .feature-group {
    flex-direction: column;
  }
  
  .feature-group .el-checkbox {
    min-width: auto;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 12px;
  }
  
  .generate-btn,
  .form-actions .el-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .config-section {
    padding: 20px;
  }
  
  .config-header h2 {
    font-size: 18px;
  }
  
  .config-header .header-icon {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  
  .feature-group {
    gap: 12px;
  }
  
  .feature-group .el-checkbox {
    padding: 12px;
  }
}
</style>