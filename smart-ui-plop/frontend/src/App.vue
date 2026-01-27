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
      apiUrl: formData.apiUrl,
      hasSearchForm: formData.features.includes('hasSearchForm'),
      hasTable: formData.features.includes('hasTable'),
      hasForm: formData.features.includes('hasForm'),
      fields: JSON.stringify(formData.fields)
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
  background: white;
  height: 100vh;
  overflow: hidden;

}


/* 主内容区域 */
.app-main {
  padding: 0px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
  overflow-y: auto;
}
</style>
