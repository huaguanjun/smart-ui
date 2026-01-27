<template>
  <el-card v-if="result" class="result-card" shadow="hover" style="margin-top: 24px" :body-style="{ padding: '24px' }">
    <template #header>
      <div class="card-header">
        <el-icon class="header-icon"><CircleCheck /></el-icon>
        <span>生成结果</span>
      </div>
    </template>
    
    <el-alert
      :title="result.message"
      type="success"
      :closable="false"
      show-icon
      style="margin-bottom: 20px"
    />
    
    <el-table :data="result.result?.changes || []" style="margin-top: 20px" stripe border>
      <el-table-column prop="type" label="操作类型" width="120" />
      <el-table-column prop="path" label="生成路径" />
    </el-table>
  </el-card>
</template>

<script setup>
import { defineProps } from 'vue';
import { CircleCheck } from '@element-plus/icons-vue';

// Props
const props = defineProps({
  result: {
    type: Object,
    default: null
  }
});
</script>

<style scoped>
/* 卡片样式 */
.result-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.header-icon {
  margin-right: 8px;
  color: #409eff;
}

/* 表格样式 */
.result-card .el-table {
  border-radius: 8px;
  overflow: hidden;
}

.result-card .el-table__header-wrapper th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #303133;
}

.result-card .el-table__row {
  transition: all 0.3s ease;
}

.result-card .el-table__row:hover {
  background-color: #ecf5ff !important;
}
</style>