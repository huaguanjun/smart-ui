<template>
  <el-drawer
    v-model="drawerVisible"
    title="字段配置"
    size="80%"
    :destroy-on-close="true"
    :with-header="false"
  >
    <div class="field-config-drawer">
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
          @save-field="handleSaveField"
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
      
      <div class="drawer-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </div>
  </el-drawer>
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
const drawerVisible = computed({
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
  drawerVisible.value = false;
};

const handleCancel = () => {
  drawerVisible.value = false;
};

const handleClose = () => {
  drawerVisible.value = false;
};

const handleSaveField = ({ index, data }) => {
  if (index >= 0 && index < localFields.value.length) {
    // 更新本地字段数据
    localFields.value[index] = {
      ...localFields.value[index],
      ...data
    };
    console.log('字段保存成功:', localFields.value[index]);
  }
};
</script>

<style scoped>
/* 字段配置抽屉 */
.field-config-drawer {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px;
  background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
  border-radius: 16px;
  margin: 20px;
}

/* 字段配置内容 */
.field-config {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

/* 底部按钮 */
.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
  margin-top: auto;
}

.drawer-footer .el-button {
  transition: all 0.3s ease;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
}

.drawer-footer .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(64, 158, 255, 0.2);
}

.drawer-footer .el-button[type="primary"] {
  background: linear-gradient(135deg, #409eff, #69c0ff);
  border: none;
  font-weight: 600;
}

.drawer-footer .el-button[type="primary"]:hover {
  background: linear-gradient(135deg, #69c0ff, #409eff);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.3);
}

.drawer-footer .el-button {
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid #dcdfe6;
}

.drawer-footer .el-button:hover {
  border-color: #409eff;
  color: #409eff;
  background: rgba(64, 158, 255, 0.05);
}

/* 滚动条样式 */
.field-config::-webkit-scrollbar {
  width: 8px;
}

.field-config::-webkit-scrollbar-track {
  background: rgba(64, 158, 255, 0.1);
  border-radius: 4px;
}

.field-config::-webkit-scrollbar-thumb {
  background: rgba(64, 158, 255, 0.5);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.field-config::-webkit-scrollbar-thumb:hover {
  background: rgba(64, 158, 255, 0.7);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .field-config-drawer {
    padding: 24px;
    margin: 16px;
  }
  
  .field-config {
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .field-config-drawer {
    padding: 16px;
    margin: 8px;
  }
  
  .field-config {
    padding: 16px;
  }
  
  .drawer-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 16px;
  }
  
  .drawer-footer .el-button {
    font-size: 14px;
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  .field-config-drawer {
    padding: 12px;
    margin: 4px;
  }
  
  .field-config {
    padding: 12px;
  }
}
</style>
