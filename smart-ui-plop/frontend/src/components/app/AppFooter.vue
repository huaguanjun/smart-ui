<template>
  <el-footer class="app-footer">
    <p>© 2026 SmartUI 生成器 | 企业级后台管理系统快速构建工具</p>
  </el-footer>
</template>

<script setup>
// AppFooter 组件
</script>

<style scoped>
/* 页脚样式 */
.app-footer {
  background-color: #f0f2f5;
  color: #909399;
  text-align: center;
  padding: 24px;
  margin-top: 40px;
  border-top: 1px solid #ebeef5;
}

.app-footer p {
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-footer {
    padding: 20px 15px;
  }
  
  .app-footer p {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .app-footer {
    padding: 16px 15px;
  }
  
  .app-footer p {
    font-size: 12px;
  }
}
</style>