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
        label-width="120px"
        class="config-form"
        size="mini"
      >
        <!-- 页面名称 -->
        <el-form-item label="页面名称" prop="name">
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
        
        <!-- API地址 -->
        <el-form-item label="API地址" prop="apiUrl">
          <el-input
            v-model="form.apiUrl"
            placeholder="请输入API地址"
            maxlength="200"
            show-word-limit
            prefix-icon="Link"
          />
          <el-alert
            :title="'示例：/api/user/list'"
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
              <span>搜索表单</span>
            </el-checkbox>
            <el-checkbox label="hasTable" border>
              <el-icon><DataTable /></el-icon>
              <span>表格</span>
            </el-checkbox>
            <el-checkbox label="hasForm" border>
              <el-icon><Edit /></el-icon>
              <span>表单</span>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        
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
  Document
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
  apiUrl: '',
  features: ['hasSearchForm', 'hasTable', 'hasForm'],
  fields: []
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
  emit('reset');
};

const handleOpenFieldConfig = () => {
  emit('openFieldConfig');
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
  background-color: white;
}

/* 配置头部 */
.config-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebeef5;
}

.config-header .header-icon {
  font-size: 20px;
  margin-right: 12px;
  color: #409eff;
}

.config-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

/* 配置内容 */
.config-content {
  width: 100%;
}

/* 表单样式 */
.config-form {
  width: 100%;
}

.feature-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.feature-group .el-checkbox {
  flex: 1;
  min-width: 140px;
  padding: 10px;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 14px;
}

.feature-group .el-checkbox:hover {
  border-color: #409eff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.15);
  transform: translateY(-1px);
}

.feature-group .el-checkbox__inner {
  width: 18px;
  height: 18px;
}

.feature-group .el-checkbox__label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

.generate-btn {
  flex: 1;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 14px;
  padding: 10px 20px;
}

.generate-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
}

.form-actions .el-button {
  transition: all 0.3s ease;
  font-size: 14px;
  padding: 10px 20px;
}

.form-actions .el-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .config-section {
    padding: 24px;
  }
  
  .feature-group {
    flex-direction: column;
  }
  
  .feature-group .el-checkbox {
    min-width: auto;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .generate-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .config-section {
    padding: 16px;
  }
  
  .config-header h2 {
    font-size: 16px;
  }
}
</style>