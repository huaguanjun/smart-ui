<template>
  <div class="field-config-header">
    <h2>
      <el-icon class="header-icon"><Document /></el-icon>
      字段配置
    </h2>
  </div>
</template>

<script setup>
import { Document } from '@element-plus/icons-vue';
</script>

<style scoped>
.field-config-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ebeef5;
}

.field-config-header h2 {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  display: flex;
  align-items: center;
  gap: 8px;
}

.field-config-header .header-icon {
  color: #409eff;
  font-size: 18px;
}
</style>