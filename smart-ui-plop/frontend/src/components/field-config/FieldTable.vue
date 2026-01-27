<template>
  <el-table
    ref="tableRef"
    :data="fields"
    style="width: 100%"
    border
    stripe
    highlight-current-row
    class="fields-table"
  >
    <el-table-column prop="label" label="字段标签" width="140">
      <template #default="scope">
        <el-input
          v-model="scope.row.label"
          placeholder="请输入字段标签"
          size="default"
          prefix-icon="Position"
        />
      </template>
    </el-table-column>
    
    <el-table-column prop="field" label="字段名" width="140">
      <template #default="scope">
        <el-input
          v-model="scope.row.field"
          placeholder="请输入字段名"
          size="default"
          prefix-icon="Document"
        />
      </template>
    </el-table-column>
    
    <el-table-column prop="type" label="字段类型" width="140">
      <template #default="scope">
        <el-select
          v-model="scope.row.type"
          placeholder="请选择字段类型"
          size="default"
          style="width: 100%"
          @change="handleTypeChange(scope.row)"
        >
          <el-option label="输入框" value="input" />
          <el-option label="下拉选择" value="select" />
          <el-option label="日期选择" value="date" />
          <el-option label="开关" value="switch" />
        </el-select>
      </template>
    </el-table-column>
    
    <el-table-column prop="options" label="选项配置" width="220">
      <template #default="scope">
        <el-input
          v-if="scope.row.type === 'select'"
          v-model="scope.row.optionsJson"
          placeholder='[{"label":"选项1","value":1}]'
          size="default"
          type="textarea"
          rows="2"
          @change="handleOptionsChange(scope.row)"
          resize="none"
          class="options-input"
        />
        <span v-else class="no-options">-</span>
      </template>
    </el-table-column>
    
    <el-table-column label="使用场景">
      <template #default="scope">
        <el-checkbox-group v-model="scope.row.scenes" class="scenes-group">
          <el-checkbox label="search" border>
            <el-icon><Search /></el-icon>
            <span>搜索</span>
          </el-checkbox>
          <el-checkbox label="table" border>
            <el-icon><Grid /></el-icon>
            <span>表格</span>
          </el-checkbox>
          <el-checkbox label="form" border>
            <el-icon><Edit /></el-icon>
            <span>表单</span>
          </el-checkbox>
        </el-checkbox-group>
      </template>
    </el-table-column>
    
    <el-table-column label="操作" width="120" fixed="right">
      <template #default="scope">
        <div class="field-operations">
          <el-button
            type="primary"
            size="small"
            @click="handleMoveUp(scope.$index)"
            :disabled="scope.$index === 0"
            class="move-btn"
          >
            <el-icon><Top /></el-icon>
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="handleMoveDown(scope.$index)"
            :disabled="scope.$index === fields.length - 1"
            class="move-btn"
          >
            <el-icon><Bottom /></el-icon>
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="handleDeleteField(scope.$index)"
            class="delete-btn"
          >
            <el-icon><Delete /></el-icon>
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import {
  Position,
  Document,
  Search,
  Grid,
  Edit,
  Top,
  Bottom,
  Delete
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
  'typeChange',
  'optionsChange',
  'moveUp',
  'moveDown',
  'deleteField'
]);

// 表格引用
const tableRef = ref(null);

// 方法
const handleTypeChange = (row) => {
  emit('typeChange', row);
};

const handleOptionsChange = (row) => {
  emit('optionsChange', row);
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
/* 表格样式 */
.fields-table {
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.fields-table:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.fields-table .el-table__header-wrapper th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #303133;
  font-size: 14px;
}

.fields-table .el-table__row {
  transition: all 0.3s ease;
}

.fields-table .el-table__row:hover {
  background-color: #ecf5ff !important;
}

.fields-table .el-table__row.current-row {
  background-color: #e6f7ff !important;
}

/* 选项输入框 */
.options-input {
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 14px;
}

.options-input:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.no-options {
  color: #909399;
  font-style: italic;
  font-size: 14px;
}

/* 使用场景 */
.scenes-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.scenes-group .el-checkbox {
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 13px;
}

.scenes-group .el-checkbox:hover {
  border-color: #409eff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.15);
}

.scenes-group .el-checkbox__label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
}

/* 字段操作 */
.field-operations {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
}

.move-btn {
  flex: 1;
  min-width: 28px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.delete-btn {
  min-width: 28px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
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
}
</style>