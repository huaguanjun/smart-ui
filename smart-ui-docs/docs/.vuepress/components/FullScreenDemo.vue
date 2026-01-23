<template>
  <div class="fullscreen-demo">
    <button @click="handleOpenModal" class="fullscreen-demo-btn">全屏演示</button>
    
    <!-- 使用通用全屏弹窗组件 -->
    <FullScreenModal
      :visible="showModal"
      title="Smart UI"
      :click-x="clickX"
      :click-y="clickY"
      :menu-items="menuItems"
      :active-menu="menuKey"
      @close="showModal = false"
      @menu-click="handleMenuClick"
    >
      <!-- 适配器切换 -->
      <div class="fullscreen-demo-adapter">
        <label class="fullscreen-demo-label">选择 UI 适配器：</label>
        <select v-model="adapter" class="fullscreen-demo-select">
          <option value="element">Element Plus</option>
          <option value="ant">Ant Design Vue</option>
        </select>
      </div>
      
      <!-- 演示内容区 - 根据menuKey动态显示不同demo -->
      <div class="fullscreen-demo-content">
        <!-- 智能表单生成 -->
        <FormDemo v-if="menuKey === 'form'" :adapter="adapter" />
        <!-- 异步智能表单生成 -->
        <AsyncFormDemo v-else-if="menuKey === 'async-form'" :adapter="adapter" />
        <!-- 智能表格生成 -->
        <TableDemo v-else-if="menuKey === 'table'" :adapter="adapter" />
      </div>
    </FullScreenModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FullScreenModal from './FullScreenModal.vue'
import FormDemo from './FormDemo.vue'
import AsyncFormDemo from './SmartFormAsyncExample.vue'
import TableDemo from './TableDemo.vue'

// 菜单数据
const menuItems = [
  {
    key: 'form',
    label: '基础表单',
    icon: '📝',
    description: '通过简单配置生成复杂表单，支持多种字段类型和验证规则'
  },
  {
    key:'async-form',
    label: '异步表单',
    icon: '📝',
    description: '支持异步加载字段配置、选项数据和初始值的智能表单'
  },
  {
    key: 'table',
    label: '智能表格',
    icon: '📊',
    description: '通过配置生成功能完整的表格，支持分页、选择、排序等高级功能'
  },
  
]

// 响应式数据
const showModal = ref(false)
const adapter = ref('element')
const clickX = ref(typeof window !== 'undefined' ? window.innerWidth / 2 : 500)
const clickY = ref(typeof window !== 'undefined' ? window.innerHeight / 2 : 300)
const menuKey = ref('form')

// 处理弹窗打开，记录点击位置
const handleOpenModal = (event: MouseEvent) => {
  clickX.value = event.clientX
  clickY.value = event.clientY
  showModal.value = true
}

// 处理菜单点击事件
const handleMenuClick = (key: string) => {
  menuKey.value = key
}
</script>

<style scoped>
/* 全屏演示按钮 */
.fullscreen-demo-btn {
  padding: 12px 28px;
  background: linear-gradient(135deg, #42b883, #359b70);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(66, 184, 131, 0.3), 0 2px 8px rgba(0, 0, 0, 0.15);
}

.fullscreen-demo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(66, 184, 131, 0.4), 0 3px 12px rgba(0, 0, 0, 0.2);
}

/* 适配器切换 */
.fullscreen-demo-adapter {
  display: flex;
  align-items: center;
  margin-bottom: 28px;
  padding: 20px 24px;
  background: linear-gradient(135deg, #f5f7fa, rgba(255, 255, 255, 0.8));
  border-radius: 12px;
  flex-wrap: wrap;
  gap: 20px;
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* 适配器标签 */
.fullscreen-demo-label {
  margin-right: 12px;
  font-weight: 600;
  color: #303133;
  font-size: 14px;
  letter-spacing: 0.5px;
}

/* 适配器选择框 */
.fullscreen-demo-select {
  padding: 10px 16px;
  border: 2px solid #dcdfe6;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  background-color: white;
  color: #606266;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  min-width: 180px;
}

.fullscreen-demo-select:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
}

/* 演示内容区 */
.fullscreen-demo-content {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
</style>