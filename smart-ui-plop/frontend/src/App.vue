<template>
  <div class="app">
    <el-container>
      <el-header>
        <h1>企业级后台管理系统生成器</h1>
        <p>用最低心智成本，快速、规范、可维护地生成后台管理系统页面</p>
      </el-header>
      
      <el-main>
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>生成配置</span>
            </div>
          </template>
          
          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            label-width="120px"
          >
            <!-- 页面名称 -->
            <el-form-item label="页面名称" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入页面名称（PascalCase）"
                maxlength="50"
                show-word-limit
              />
              <el-alert
                :title="'示例：UserList'"
                type="info"
                :closable="false"
                show-icon
                style="margin-top: 10px"
              />
            </el-form-item>
            
            <!-- API地址 -->
            <el-form-item label="API地址" prop="apiUrl">
              <el-input
                v-model="form.apiUrl"
                placeholder="请输入API地址"
                maxlength="200"
                show-word-limit
              />
              <el-alert
                :title="'示例：/api/user/list'"
                type="info"
                :closable="false"
                show-icon
                style="margin-top: 10px"
              />
            </el-form-item>
            
            <!-- 功能选择 -->
            <el-form-item label="功能选择">
              <el-checkbox-group v-model="form.features">
                <el-checkbox label="hasSearchForm">搜索表单</el-checkbox>
                <el-checkbox label="hasTable">表格</el-checkbox>
                <el-checkbox label="hasForm">表单</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            
            <!-- 字段配置 -->
            <el-form-item label="字段配置">
              <el-button type="primary" @click="showFieldConfigDialog = true">
                配置字段
              </el-button>
              <el-alert
                :title="'点击上方按钮配置字段，支持自动生成搜索表单、表格列和表单项'"
                type="info"
                :closable="false"
                show-icon
                style="margin-top: 10px"
              />
            </el-form-item>
            
            <!-- 操作按钮 -->
            <el-form-item>
              <el-button type="primary" @click="handleGenerate" :loading="loading">
                生成页面
              </el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        
        <!-- 生成结果 -->
        <el-card v-if="result" shadow="hover" style="margin-top: 20px">
          <template #header>
            <div class="card-header">
              <span>生成结果</span>
            </div>
          </template>
          
          <el-alert
            :title="result.message"
            type="success"
            :closable="false"
            show-icon
          />
          
          <el-table :data="result.result?.changes || []" style="margin-top: 20px">
            <el-table-column prop="type" label="操作类型" width="100" />
            <el-table-column prop="path" label="生成路径" />
          </el-table>
        </el-card>
      </el-main>
      
      <el-footer>
        <p>© 2026 企业级后台管理系统生成器</p>
      </el-footer>
    </el-container>
    
    <!-- 字段配置对话框 -->
    <FieldConfigDialog
      v-model="showFieldConfigDialog"
      :fields="form.fields"
      @save="handleSaveFields"
    />
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits } from 'vue';
import FieldConfigDialog from './components/FieldConfigDialog.vue';

// 响应式数据
const formRef = ref(null);
const loading = ref(false);
const result = ref(null);
const showFieldConfigDialog = ref(false);

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
    
    loading.value = true;
    
    // 构建请求数据
    const requestData = {
      name: form.name,
      apiUrl: form.apiUrl,
      hasSearchForm: form.features.includes('hasSearchForm'),
      hasTable: form.features.includes('hasTable'),
      hasForm: form.features.includes('hasForm'),
      fields: JSON.stringify(form.fields)
    };
    
    // 调用API
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      result.value = data;
      // 显示成功消息
      ElMessage.success(data.message);
    } else {
      // 显示错误消息
      ElMessage.error(data.error || data.message);
    }
  } catch (error) {
    console.error('生成失败:', error);
    ElMessage.error('生成失败，请检查网络连接');
  } finally {
    loading.value = false;
  }
};

const handleReset = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
  form.features = ['hasSearchForm', 'hasTable', 'hasForm'];
  form.fields = [];
  result.value = null;
};

const handleSaveFields = (fields) => {
  form.fields = fields;
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f7fa;
  color: #303133;
}

.app {
  min-height: 100vh;
}

.el-header {
  background-color: #409eff;
  color: white;
  text-align: center;
  padding: 40px 20px;
}

.el-header h1 {
  font-size: 28px;
  margin-bottom: 10px;
}

.el-header p {
  font-size: 16px;
  opacity: 0.9;
}

.el-main {
  padding: 40px;
}

.el-footer {
  background-color: #f0f2f5;
  color: #909399;
  text-align: center;
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .el-main {
    padding: 20px;
  }
  
  .el-header {
    padding: 30px 15px;
  }
  
  .el-header h1 {
    font-size: 24px;
  }
}
</style>
