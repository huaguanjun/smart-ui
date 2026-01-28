<template>
  <div class="field-stats">
    <el-tag effect="plain">{{ fieldCount }} 个字段</el-tag>
    <el-tooltip content="字段顺序会影响生成页面的显示顺序" placement="top">
      <el-tag effect="plain" type="info">
        拖拽表格行可调整顺序
      </el-tag>
    </el-tooltip>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { Warning } from '@element-plus/icons-vue';

// Props
const props = defineProps({
  fieldCount: {
    type: Number,
    default: 0
  }
});
</script>

<style scoped>
/* 字段统计 */
.field-stats {
  margin: 16px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.field-stats .el-tag {
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 14px;
  transition: all 0.3s ease;
}

.field-stats .el-tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .field-stats {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>