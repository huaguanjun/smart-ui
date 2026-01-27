<!-- TestPage 搜索表单组件 -->
<template>
  <el-form
    :model="searchForm"
    :inline="true"
    class="search-form"
  >
    
    <el-form-item label="ID">
      
      <el-input v-model="searchForm.id" placeholder="请输入ID" clearable />
      
    </el-form-item>
    <el-form-item label="Name">
      
      <el-input v-model="searchForm.name" placeholder="请输入Name" clearable />
      
    </el-form-item>
    <el-form-item label="Status">
      
      <el-select v-model="searchForm.status" placeholder="请选择Status" clearable>
        <el-option label="启用" value="enabled" /><el-option label="禁用" value="disabled" />
      </el-select>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="handleSearch">
        <el-icon><Search /></el-icon>
        搜索
      </el-button>
      <el-button @click="handleReset">
        <el-icon><Refresh /></el-icon>
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, defineEmits } from 'vue';
import { Search, Refresh } from '@element-plus/icons-vue';

// Emits
const emit = defineEmits(['search']);

// 响应式数据
const searchForm = reactive({
  
  id: '',
  name: '',
  status: ''
});

// 方法
const handleSearch = () => {
  emit('search', { ...searchForm });
};

const handleReset = () => {
  Object.keys(searchForm).forEach(key => {
    searchForm[key] = '';
  });
  emit('search', { ...searchForm });
};
</script>

<style scoped>
.search-form {
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 8px;
}
</style>