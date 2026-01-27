<template>
  <el-header class="app-header">
    <div class="header-content">
      <div class="header-logo">
        <el-icon class="logo-icon"><Grid /></el-icon>
        <h1>SmartUI 生成器</h1>
      </div>
      <p class="header-desc">用最低心智成本，快速、规范、可维护地生成后台管理系统页面</p>
    </div>
  </el-header>
</template>

<script setup>
import { Grid } from '@element-plus/icons-vue';
</script>

<style scoped>
/* 头部样式 */
.app-header {
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  color: white;
  text-align: center;
  padding: 50px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.header-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.logo-icon {
  font-size: 28px;
  margin-right: 12px;
  animation: pulse 2s infinite;
}

.app-header h1 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-desc {
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.5;
}

/* 动画效果 */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-header {
    padding: 40px 15px;
  }
  
  .app-header h1 {
    font-size: 20px;
  }
  
  .header-desc {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .app-header {
    padding: 30px 15px;
  }
  
  .app-header h1 {
    font-size: 24px;
  }
}
</style>