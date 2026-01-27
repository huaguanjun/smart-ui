<template>
  <div v-if="result" class="result-section" style="margin-top: 24px">
    <!-- 结果头部 -->
    <div class="result-header">
      <div class="header-icon">
        <el-icon><CircleCheck /></el-icon>
      </div>
      <h2>生成结果</h2>
    </div>
    
    <div class="result-content">
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
    </div>
  </div>
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
/* 结果区块样式 */
.result-section {
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.result-section:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

/* 结果头部 */
.result-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebeef5;
}

.result-header .header-icon {
  font-size: 20px;
  margin-right: 12px;
  color: #409eff;
}

.result-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

/* 结果内容 */
.result-content {
  width: 100%;
}

/* 表格样式 */
.result-content .el-table {
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
}

.result-content .el-table__header-wrapper th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #303133;
}

.result-content .el-table__row {
  transition: all 0.3s ease;
}

.result-content .el-table__row:hover {
  background-color: #ecf5ff !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .result-section {
    padding: 24px;
  }
  
  .result-header h2 {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .result-section {
    padding: 16px;
  }
}
</style>