<template>
  <div class="field-config-container" v-if="visible">
    <!-- 字段配置头部 -->
    <FieldConfigHeader />
    
    <div class="field-config">
      <!-- 字段列表表格 -->
      <FieldTable
        :fields="localFields"
        @type-change="handleTypeChange"
        @options-change="handleOptionsChange"
        @move-up="handleMoveUp"
        @move-down="handleMoveDown"
        @delete-field="handleDeleteField"
      />
      
      <!-- 操作按钮 -->
      <FieldActions
        @add-field="handleAddField"
        @import-fields="handleImportFields"
        @export-fields="handleExportFields"
        @clear-fields="handleClearFields"
      />
      
      <!-- 字段统计 -->
      <FieldStats :field-count="localFields.length" />
      
      <!-- JSON编辑器对话框 -->
      <JsonEditorDialog
        v-model="jsonDialogVisible"
        :json-content="jsonContent"
        @save="handleSaveJson"
      />
    </div>
    
    <div class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, defineProps, defineEmits } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// 导入拆分后的组件
import FieldConfigHeader from './FieldConfigHeader.vue';
import FieldTable from './FieldTable.vue';
import FieldActions from './FieldActions.vue';
import FieldStats from './FieldStats.vue';
import JsonEditorDialog from './JsonEditorDialog.vue';

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  fields: {
    type: Array,
    default: () => []
  }
});

// Emits
const emit = defineEmits(['update:modelValue', 'save']);

// 响应式数据
const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const localFields = ref([]);
const jsonDialogVisible = ref(false);
const jsonContent = ref('');

// 监听fields变化
watch(() => props.fields, (newFields) => {
  localFields.value = newFields.map(field => ({
    ...field,
    scenes: [
      field.search ? 'search' : '',
      field.table ? 'table' : '',
      field.form ? 'form' : ''
    ].filter(Boolean),
    optionsJson: field.options ? JSON.stringify(field.options, null, 2) : '[]'
  }));
}, { deep: true, immediate: true });

// 方法
const handleAddField = () => {
  localFields.value.push({
    label: '',
    field: '',
    type: 'input',
    scenes: ['search', 'table', 'form'],
    options: [],
    optionsJson: '[]'
  });
  // 滚动到新添加的字段
  setTimeout(() => {
    const table = document.querySelector('.fields-table');
    if (table) {
      table.scrollTop = table.scrollHeight;
    }
  }, 100);
};

const handleDeleteField = (index) => {
  ElMessageBox.confirm('确定要删除这个字段吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    localFields.value.splice(index, 1);
    ElMessage.success('删除成功');
  }).catch(() => {
    // 取消删除
  });
};

const handleOptionsChange = (row) => {
  try {
    row.options = JSON.parse(row.optionsJson);
    ElMessage.success('选项配置更新成功');
  } catch (error) {
    console.error('选项配置JSON格式错误:', error);
    ElMessage.error('JSON格式错误，请检查');
  }
};

const handleTypeChange = (row) => {
  // 当字段类型改变时，重置选项配置
  if (row.type !== 'select') {
    row.options = [];
    row.optionsJson = '[]';
  }
};

const handleMoveUp = (index) => {
  if (index > 0) {
    const temp = localFields.value[index];
    localFields.value[index] = localFields.value[index - 1];
    localFields.value[index - 1] = temp;
    ElMessage.success('字段已上移');
  }
};

const handleMoveDown = (index) => {
  if (index < localFields.value.length - 1) {
    const temp = localFields.value[index];
    localFields.value[index] = localFields.value[index + 1];
    localFields.value[index + 1] = temp;
    ElMessage.success('字段已下移');
  }
};

const handleClearFields = () => {
  ElMessageBox.confirm('确定要清空所有字段吗？此操作不可恢复', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'danger'
  }).then(() => {
    localFields.value = [];
    ElMessage.success('字段已清空');
  }).catch(() => {
    // 取消清空
  });
};

const handleImportFields = () => {
  jsonContent.value = JSON.stringify(localFields.value, null, 2);
  jsonDialogVisible.value = true;
};

const handleExportFields = () => {
  const fields = formatFields(localFields.value);
  const json = JSON.stringify(fields, null, 2);
  
  // 创建下载链接
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'fields-config.json';
  a.click();
  URL.revokeObjectURL(url);
};

const handleSaveJson = () => {
  try {
    const fields = JSON.parse(jsonContent.value);
    localFields.value = fields.map(field => ({
      ...field,
      scenes: field.scenes || [],
      optionsJson: field.options ? JSON.stringify(field.options, null, 2) : '[]'
    }));
    jsonDialogVisible.value = false;
  } catch (error) {
    console.error('JSON格式错误:', error);
    ElMessage.error('JSON格式错误');
  }
};

const formatFields = (fields) => {
  return fields.map(field => ({
    label: field.label,
    field: field.field,
    type: field.type,
    search: field.scenes.includes('search'),
    table: field.scenes.includes('table'),
    form: field.scenes.includes('form'),
    options: field.options || []
  }));
};

const handleSave = () => {
  const formattedFields = formatFields(localFields.value);
  emit('save', formattedFields);
  visible.value = false;
};

const handleCancel = () => {
  visible.value = false;
};

const handleClose = () => {
  visible.value = false;
};
</script>

<style scoped>
/* 字段配置容器 */
.field-config-container {
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.field-config-container:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* 字段配置内容 */
.field-config {
  max-height: 60vh;
  overflow-y: auto;
  margin-bottom: 20px;
}

/* 底部按钮 */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
}

.dialog-footer .el-button {
  transition: all 0.3s ease;
  font-size: 14px;
}

.dialog-footer .el-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .field-config-container {
    padding: 16px;
  }
  
  .dialog-footer {
    flex-direction: column;
    align-items: stretch;
  }
}

/* 滚动条样式 */
.field-config::-webkit-scrollbar {
  width: 6px;
}

.field-config::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.field-config::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.field-config::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
