<template>
  <div class="app">
    <el-container>
      <el-main class="app-main">
        <!-- 生成配置表单 -->
        <ConfigForm
          :loading="loading"
          @generate="handleGenerate"
          @reset="handleReset"
          @openFieldConfig="showFieldConfigDialog = true"
        />
        
        <!-- 生成结果 -->
        <ResultCard :result="result" />
      </el-main>
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
import { ElMessage } from 'element-plus';

import ConfigForm from './components/generation/ConfigForm.vue';
import ResultCard from './components/generation/ResultCard.vue';
import FieldConfigDialog from './components/field-config/FieldConfigDialog.vue';

// 响应式数据
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

// 方法
const handleGenerate = async (formData) => {
  try {
    loading.value = true;
    
    // 构建请求数据
    const requestData = {
      name: formData.name,
      hasSearchForm: formData.features.includes('hasSearchForm'),
      hasTable: formData.features.includes('hasTable'),
      hasForm: formData.features.includes('hasForm'),
      fields: JSON.stringify(formData.fields),
      featureApis: formData.featureApis || {}
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
  form.features = ['hasSearchForm', 'hasTable', 'hasForm'];
  form.fields = [];
  result.value = null;
};

const handleSaveFields = (fields) => {
  form.fields = fields;
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* 主内容区域 */
.app-main {
  padding: 0;
  max-width: 900px;
  width: 100%;
  flex: 1;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(10px);
  margin: 0 auto;
}

/* 滚动条样式 */
.app-main::-webkit-scrollbar {
  width: 8px;
}

.app-main::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.app-main::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.app-main::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app {
    padding: 10px;
  }
  
  .app-main {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .app-main {
    padding: 16px;
  }
}
</style>
