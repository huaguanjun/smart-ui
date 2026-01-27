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
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-top: 24px;
}

.result-section:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

/* 结果头部 */
.result-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
}

.result-header::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #ffffff, rgba(255, 255, 255, 0.5));
  border-radius: 2px;
}

.result-header .header-icon {
  font-size: 20px;
  margin-right: 12px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.2);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}

.result-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 结果内容 */
.result-content {
  width: 100%;
}

/* 警告框样式 */
.result-content .el-alert {
  border-radius: 8px;
  margin-bottom: 16px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
}

.result-content .el-alert__title {
  font-size: 15px;
  font-weight: 600;
  color: #67c23a;
}

/* 表格样式 */
.result-content .el-table {
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.result-content .el-table::before {
  display: none;
}

.result-content .el-table__header-wrapper th {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-weight: 600;
  color: #303133;
  border-bottom: 2px solid #409eff;
  padding: 16px;
  font-size: 14px;
}

.result-content .el-table__body-wrapper {
  border-radius: 0 0 10px 10px;
  overflow: hidden;
}

.result-content .el-table__row {
  transition: all 0.3s ease;
}

.result-content .el-table__row:hover {
  background: linear-gradient(135deg, #ecf5ff, #e6f0ff) !important;
  transform: translateY(-1px);
}

.result-content .el-table__row td {
  padding: 14px 16px;
  border-bottom: 1px solid rgba(64, 158, 255, 0.1);
  font-size: 14px;
  color: #606266;
}

.result-content .el-table__row:last-child td {
  border-bottom: none;
}

/* 表格列样式 */
.result-content .el-table__column--name {
  font-weight: 600;
}

.result-content .el-table__column--path {
  font-family: 'Courier New', monospace;
  font-size: 13px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .result-section {
    padding: 28px;
    margin-top: 24px;
  }
  
  .result-header {
    margin-bottom: 24px;
  }
  
  .result-header h2 {
    font-size: 20px;
  }
  
  .result-content .el-table__header-wrapper th,
  .result-content .el-table__row td {
    padding: 12px 14px;
  }
}

@media (max-width: 480px) {
  .result-section {
    padding: 20px;
  }
  
  .result-header h2 {
    font-size: 18px;
  }
  
  .result-header .header-icon {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  
  .result-content .el-table__header-wrapper th,
  .result-content .el-table__row td {
    padding: 10px 12px;
    font-size: 13px;
  }
}
</style>