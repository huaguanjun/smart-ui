<template>
  <el-dialog
    v-model="visible"
    title="字段配置"
    width="800px"
    @close="handleClose"
  >
    <div class="field-config">
      <!-- 字段列表 -->
      <el-table
        ref="tableRef"
        :data="localFields"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column prop="label" label="字段标签" width="120">
          <template #default="scope">
            <el-input
              v-model="scope.row.label"
              placeholder="请输入字段标签"
              size="small"
            />
          </template>
        </el-table-column>
        
        <el-table-column prop="field" label="字段名" width="120">
          <template #default="scope">
            <el-input
              v-model="scope.row.field"
              placeholder="请输入字段名"
              size="small"
            />
          </template>
        </el-table-column>
        
        <el-table-column prop="type" label="字段类型" width="120">
          <template #default="scope">
            <el-select
              v-model="scope.row.type"
              placeholder="请选择字段类型"
              size="small"
              style="width: 100%"
            >
              <el-option label="输入框" value="input" />
              <el-option label="下拉选择" value="select" />
              <el-option label="日期选择" value="date" />
              <el-option label="开关" value="switch" />
            </el-select>
          </template>
        </el-table-column>
        
        <el-table-column prop="options" label="选项配置" width="200">
          <template #default="scope">
            <el-input
              v-if="scope.row.type === 'select'"
              v-model="scope.row.optionsJson"
              placeholder='[{"label":"选项1","value":1}]'
              size="small"
              type="textarea"
              rows="2"
              @change="handleOptionsChange(scope.row)"
            />
            <span v-else>-</span>
          </template>
        </el-table-column>
        
        <el-table-column label="使用场景">
          <template #default="scope">
            <el-checkbox-group v-model="scope.row.scenes" size="small">
              <el-checkbox label="search" border>搜索</el-checkbox>
              <el-checkbox label="table" border>表格</el-checkbox>
              <el-checkbox label="form" border>表单</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="scope">
            <el-button
              type="danger"
              size="small"
              @click="handleDeleteField(scope.$index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 操作按钮 -->
      <div class="field-actions">
        <el-button type="primary" @click="handleAddField">
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
      </div>
      
      <!-- JSON编辑器 -->
      <el-dialog
        v-model="jsonDialogVisible"
        title="JSON编辑"
        width="600px"
      >
        <el-input
          v-model="jsonContent"
          type="textarea"
          rows="10"
          placeholder="请输入字段配置JSON"
        />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="jsonDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleSaveJson">保存</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, watch, defineProps, defineEmits } from 'vue';
import { Plus, Upload, Download } from '@element-plus/icons-vue';

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
};

const handleDeleteField = (index) => {
  localFields.value.splice(index, 1);
};

const handleOptionsChange = (row) => {
  try {
    row.options = JSON.parse(row.optionsJson);
  } catch (error) {
    console.error('选项配置JSON格式错误:', error);
  }
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
.field-config {
  padding: 10px 0;
}

.field-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
