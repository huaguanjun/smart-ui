<template>
  <div class="field-actions">
    <el-button type="primary" @click="handleAddField" class="add-field-btn">
      <el-icon><Plus /></el-icon>
      添加字段
    </el-button>
    <el-button @click="handleImportFields">
      <el-icon><Upload /></el-icon>
      导入JSON
    </el-button>
    <el-button @click="handleExportFields">
      <el-icon><Download /></el-icon>
      导出JSON
    </el-button>
    <el-button @click="handleClearFields">
      <el-icon><Delete /></el-icon>
      清空字段
    </el-button>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import { Plus, Upload, Download, Delete } from '@element-plus/icons-vue';

// Emits
const emit = defineEmits([
  'addField',
  'importFields',
  'exportFields',
  'clearFields'
]);

// 方法
const handleAddField = () => {
  emit('addField');
};

const handleImportFields = () => {
  emit('importFields');
};

const handleExportFields = () => {
  emit('exportFields');
};

const handleClearFields = () => {
  emit('clearFields');
};
</script>

<style scoped>
/* 操作按钮 */
.field-actions {
  margin: 20px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.add-field-btn {
  flex: 1;
  min-width: 160px;
}

.field-actions .el-button {
  transition: all 0.3s ease;
  font-size: 14px;
}

.field-actions .el-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.field-actions .el-button {
  animation: fadeIn 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .field-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .add-field-btn {
    width: 100%;
  }
}
</style>