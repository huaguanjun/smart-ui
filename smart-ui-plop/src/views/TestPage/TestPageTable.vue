<!-- TestPage 表格组件 -->
<template>
  <el-table :data="data" :loading="loading" style="width: 100%">
    
    <el-table-column prop="id" label="ID" width="180">
      <template #default="scope">
        {{ scope.row.id }}
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Name" width="180">
      <template #default="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column prop="status" label="Status" width="180">
      <template #default="scope">
        {{ scope.row.status }}
      </template>
    </el-table-column>
    
    <!-- 操作列 -->
    <el-table-column label="操作" width="180" fixed="right">
      <template #default="scope">
        <el-button type="primary" link @click="$emit('edit', scope.row)">
          <el-icon><Edit /></el-icon>
          编辑
        </el-button>
        <el-button type="danger" link @click="$emit('delete', scope.row)">
          <el-icon><Delete /></el-icon>
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';

// Props
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

// Emits
const emit = defineEmits(['edit', 'delete']);
</script>

<style scoped>
/* 表格样式 */
</style>