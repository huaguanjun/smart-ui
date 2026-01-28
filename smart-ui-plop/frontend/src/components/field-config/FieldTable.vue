<template>
  <div class="fields-table-container">
    <div class="table-header">
      <h3>表格字段配置</h3>
    </div>
    <el-table
      ref="tableRef"
      :data="fields"
      style="width: 100%"
      border
      stripe
      highlight-current-row
      class="fields-table"
      @expand-change="handleExpandChange"
    >
    <el-table-column type="expand">
      <template #default="scope">
        <div class="field-expand-form">
          <SmartForm 
            :ref="(el) => { if (el) formRefs[scope.$index] = el; }"
            :model="editingFields[scope.$index]"
            adapter="element"
            labelWidth="90px"
            labelPosition="right"
            class="expand-form"
            size="default"
            :rules="formRules"
            :fields="getFormFields(scope.$index)"
            @onValuesChange="handleValuesChange"
          >
            <template #default>
              <div class="form-actions">
                <el-button type="primary" @click="handleSaveField(scope.$index)">
                  确认
                </el-button>
                <el-button @click="handleCancelEdit(scope.$index)">
                  取消
                </el-button>
              </div>
            </template>
          </SmartForm>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="label" label="字段标签">
      <template #default="scope">
        <span class="field-text">{{ scope.row.label || '-' }}</span>
      </template>
    </el-table-column>
    
    <el-table-column prop="field" label="字段名">
      <template #default="scope">
        <span class="field-text">{{ scope.row.field || '-' }}</span>
      </template>
    </el-table-column>
    
    <el-table-column prop="type" label="字段类型">
      <template #default="scope">
        <span class="field-text">{{ getTypeLabel(scope.row.type) }}</span>
      </template>
    </el-table-column>
    
    <el-table-column label="操作" width="200" fixed="right">
      <template #default="scope">
        <div class="field-operations">
          <el-button
            type="primary"
            size="small"
            @click="handleMoveUp(scope.$index)"
            :disabled="scope.$index === 0"
            :icon="Top"
            round
          />
          <el-button
            type="primary"
            size="small"
            @click="handleMoveDown(scope.$index)"
            :disabled="scope.$index === fields.length - 1"
            :icon="Bottom"
            round
          />
          <el-button
            type="danger"
            size="small"
            @click="handleDeleteField(scope.$index)"
            round
            :icon="Delete"
          />
        </div>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { ElMessage } from 'element-plus';
import SmartForm from '../../../../../smart-ui/src/components/form/SmartForm.vue';
import {
  Top,
  Bottom,
  Delete,
  Check,
  Close
} from '@element-plus/icons-vue';

// Props
const props = defineProps({
  fields: {
    type: Array,
    default: () => []
  }
});

// Emits
const emit = defineEmits([
  'moveUp',
  'moveDown',
  'deleteField',
  'saveField',
  'cancelEdit'
]);

// 表格引用
const tableRef = ref(null);
const expandedRows = ref([]);
const editingFields = ref({});
const formRefs = ref({});

// 表单验证规则
const formRules = {
  label: [
    { required: true, message: '请输入字段标签', trigger: 'blur' }
  ],
  field: [
    { required: true, message: '请输入字段名', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择字段类型', trigger: 'change' }
  ]
};

// 方法
const getTypeLabel = (type) => {
  const typeMap = {
    'input': '输入框',
    'select': '下拉选择',
    'date': '日期选择',
    'switch': '开关'
  };
  return typeMap[type] || '-';
};

// 获取表单字段配置
const getFormFields = (index) => {
  return [
    {
      name: 'label',
      label: '字段标签',
      type: 'input',
      placeholder: '请输入字段标签',
      rules: formRules.label
    },
    {
      name: 'field',
      label: '字段名',
      type: 'input',
      placeholder: '请输入字段名',
      rules: formRules.field
    },
    {
      name: 'type',
      label: '字段类型',
      type: 'select',
      placeholder: '请选择字段类型',
      rules: formRules.type,
      options: [
        { label: '输入框', value: 'input' },
        { label: '下拉选择', value: 'select' },
        { label: '日期选择', value: 'date' },
        { label: '开关', value: 'switch' }
      ]
    },
    {
      name: 'defaultValue',
      label: '默认值',
      type: 'input',
      placeholder: '请输入默认值'
    },
    {
      name: 'required',
      label: '是否必填',
      type: 'switch'
    },
    {
      name: 'disabled',
      label: '是否禁用',
      type: 'switch'
    }
  ];
};

// 处理表单值变化
const handleValuesChange = (changedValues, allValues) => {
  console.log('表单值变化:', changedValues, allValues);
};

const handleExpandChange = (row, expanded) => {
  expandedRows.value = expanded;
  
  // 当展开时，初始化编辑数据
  if (expanded.includes(row)) {
    const index = props.fields.findIndex(field => field === row);
    if (index !== -1) {
      editingFields.value[index] = { ...row };
    }
  }
};

const handleSaveField = (index) => {
  const formRef = formRefs.value[index];
  if (!formRef) return;
  
  // 验证表单
  formRef.validate((valid) => {
    if (valid) {
      emit('saveField', { index, data: editingFields.value[index] });
      ElMessage.success('保存成功');
    } else {
      ElMessage.warning('请填写必填字段');
    }
  });
};

const handleCancelEdit = (index) => {
  // 恢复原始数据
  const originalField = props.fields[index];
  editingFields.value[index] = { ...originalField };
  
  // 折叠展开行
  if (tableRef.value) {
    tableRef.value.toggleRowExpansion(originalField, false);
  }
  
  emit('cancelEdit', { index, data: editingFields.value[index] });
};

const handleMoveUp = (index) => {
  emit('moveUp', index);
};

const handleMoveDown = (index) => {
  emit('moveDown', index);
};

const handleDeleteField = (index) => {
  emit('deleteField', index);
};
</script>

<style scoped>
.form-actions {
  text-align: center;
}
/* 容器样式 */
.fields-table-container {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.3s ease;
}

.fields-table-container:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

/* 表格头部 */
.table-header {
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.table-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

/* 表格样式 */
.fields-table {
  overflow: hidden;
  transition: all 0.3s ease;
}

.fields-table .el-table__header-wrapper th {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-weight: 600;
  color: #303133;
  font-size: 14px;
  padding: 12px 8px;
  border-bottom: 2px solid #409eff;
}

.fields-table .el-table__body-wrapper {
  border-radius: 0 0 8px 8px;
}

.fields-table .el-table__row {
  transition: all 0.3s ease;
  height: 50px;
}

.fields-table .el-table__row:hover {
  background-color: #ecf5ff !important;
}

.fields-table .el-table__row.current-row {
  background-color: #e6f7ff !important;
}

/* 字段文本样式 */
.field-text {
  font-size: 14px;
  color: #303133;
  line-height: 1.4;
  display: block;
  padding: 4px 0;
}

/* 展开表单 */
.field-expand-form {
  padding: 20px;
  border-radius: 8px;
  margin: 10px 0;
  transition: all 0.3s ease;
  animation: expandForm 0.3s ease-out;
}

/* 展开表单动画 */
@keyframes expandForm {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 表格展开/折叠动画 */
.fields-table .el-table__expand-icon {
  transition: all 0.3s ease;
}

.fields-table .el-table__expand-icon:hover {
  color: #409eff;
  transform: scale(1.1);
}

.fields-table .el-table__expand-icon.is-expanded {
  color: #409eff;
}

/* 字段操作 */
.field-operations {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 4px 0;
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

.fields-table .el-table__row {
  animation: fadeIn 0.3s ease;
  transition: all 0.3s ease;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .fields-table-container {
    padding: 16px;
  }
  
  .table-header h3 {
    font-size: 16px;
  }
  
  .fields-table .el-table__header-wrapper th {
    padding: 10px 6px;
    font-size: 13px;
  }
  
  .fields-table .el-table__row {
    height: 48px;
  }
  
  .field-operations {
    gap: 4px;
  }
  
  .el-table-column[label="操作"] {
    width: 140px !important;
  }
}
</style>