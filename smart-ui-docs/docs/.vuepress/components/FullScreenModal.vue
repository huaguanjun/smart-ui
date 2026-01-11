<template>
  <transition name="fullscreen-modal">
    <div v-if="visible" class="fullscreen-modal-wrapper">
      <!-- 全屏遮罩 -->
      <div class="fullscreen-modal-overlay"></div>
      
      <!-- 弹框内容 -->
      <div 
        class="fullscreen-modal-container"
        :style="{
          '--click-x': `${clickX}px`,
          '--click-y': `${clickY}px`
        }"
      >
        <!-- 顶部渐变条 -->
        <div class="fullscreen-modal-gradient-bar"></div>
        
        <!-- 弹框头部 -->
        <div class="fullscreen-modal-header">
          <slot name="header">
            <div class="fullscreen-modal-title">{{ title }}</div>
          </slot>
          <button @click="handleClose" class="fullscreen-modal-close">×</button>
        </div>
        
        <!-- 弹框主体 - 左右布局 -->
        <div class="fullscreen-modal-body">
          <!-- 左侧导航菜单 -->
          <div class="fullscreen-modal-sidebar">
            <ul class="sidebar-menu">
              <li 
                v-for="item in menuItems" 
                :key="item.key"
                :class="['menu-item', { active: activeMenu === item.key }]"
                @click="handleMenuClick(item.key)"
              >
                <span class="menu-icon">{{ item.icon }}</span>
                <span class="menu-text">{{ item.label }}</span>
              </li>
            </ul>
          </div>
          
          <!-- 右侧内容区域 -->
          <div class="fullscreen-modal-content">
            <!-- 内容主体 -->
            <div class="content-body">
              <slot></slot>
            </div>
          </div>
        </div>
        
        <!-- 弹框底部 -->
        <div class="fullscreen-modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'FullScreenModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '弹窗标题'
    },
    clickX: {
      type: Number,
      default: window.innerWidth / 2
    },
    clickY: {
      type: Number,
      default: window.innerHeight / 2
    },
    // 导航菜单数据 - 从外部传入
    menuItems: {
      type: Array,
      default: () => [
        {
          key: 'form',
          label: '智能表单',
          icon: '📝',
          description: '通过简单配置生成复杂表单，支持多种字段类型和验证规则'
        },
        {
          key: 'table',
          label: '智能表格',
          icon: '📊',
          description: '通过配置生成功能完整的表格，支持分页、选择、排序等高级功能'
        },
        {
          key: 'layout',
          label: '布局组件',
          icon: '🧱',
          description: '灵活的布局组件，适应各种屏幕尺寸和布局需求'
        },
        {
          key: 'slot',
          label: '插槽演示',
          icon: '🔌',
          description: '演示组件插槽的使用，实现灵活的内容定制'
        }
      ]
    },
    // 当前激活的菜单 - 从外部传入
    activeMenu: {
      type: String,
      default: 'form'
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    // 处理菜单点击事件
    handleMenuClick(menuKey) {
      this.$emit('menu-click', menuKey)
    },
    // 获取当前菜单
    getCurrentMenu() {
      return this.menuItems.find(item => item.key === this.activeMenu) || this.menuItems[0]
    }
  }
}
</script>

<style scoped>
/* 过渡动画类 */
.fullscreen-modal-enter-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fullscreen-modal-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fullscreen-modal-enter-from .fullscreen-modal-overlay {
  opacity: 0;
}

.fullscreen-modal-leave-to .fullscreen-modal-overlay {
  opacity: 0;
}

.fullscreen-modal-enter-from .fullscreen-modal-container {
  opacity: 0;
  transform: translate(calc(var(--click-x) - 50vw), calc(var(--click-y) - 50vh)) scale(0.1);
  border-radius: 20px;
}

.fullscreen-modal-leave-to .fullscreen-modal-container {
  opacity: 0;
  transform: translate(calc(var(--click-x) - 50vw), calc(var(--click-y) - 50vh)) scale(0.1);
  border-radius: 20px;
}

/* 弹框包裹层 */
.fullscreen-modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 遮罩层 */
.fullscreen-modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 弹框容器 */
.fullscreen-modal-container {
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  will-change: transform, opacity;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

/* 顶部渐变条 */
.fullscreen-modal-gradient-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #42b883, #359b70, #667eea);
  border-radius: 12px 12px 0 0;
}

/* 弹框头部 */
.fullscreen-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background: #1f2937;
  color: white;
  position: relative;
  overflow: hidden;
}

/* 标题样式 */
.fullscreen-modal-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.5px;
  position: relative;
  z-index: 1;
}

/* 关闭按钮 */
.fullscreen-modal-close {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 24px;
  font-weight: 300;
  cursor: pointer;
  padding: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.fullscreen-modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

/* 弹框主体 - 左右布局 */
.fullscreen-modal-body {
  flex: 1;
  display: flex;
  overflow: hidden;
  background: #f3f4f6;
}

/* 左侧导航栏 */
.fullscreen-modal-sidebar {
  width: 240px;
  background: #111827;
  color: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-right: 1px solid #374151;
}

/* 导航菜单容器 */
.sidebar-menu {
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
}

/* 导航菜单列表 */
.sidebar-menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* 菜单项 */
.menu-item {
  display: flex;
  align-items: center;
  padding: 14px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.menu-item:hover {
  background: rgba(55, 65, 81, 0.5);
}

.menu-item.active {
  background: #1f2937;
  border-left-color: #42b883;
}

/* 菜单图标 */
.menu-icon {
  font-size: 18px;
  margin-right: 12px;
  width: 20px;
  text-align: center;
}

/* 菜单文本 */
.menu-text {
  font-size: 14px;
  font-weight: 500;
}

/* 右侧内容区域 */
.fullscreen-modal-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
}



/* 内容主体 */
.content-body {
  flex: 1;
  padding: 24px 32px;
  overflow-y: auto;
  background: #f9fafb;
}

/* 弹框底部 */
.fullscreen-modal-footer {
  padding: 20px 32px;
  border-top: 1px solid #e5e7eb;
  background: white;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-radius: 0 0 12px 12px;
}

/* 滚动条样式 */
.fullscreen-modal-sidebar::-webkit-scrollbar,
.content-body::-webkit-scrollbar {
  width: 6px;
}

.fullscreen-modal-sidebar::-webkit-scrollbar-track,
.content-body::-webkit-scrollbar-track {
  background: #1f2937;
}

.content-body::-webkit-scrollbar-track {
  background: #f3f4f6;
}

.fullscreen-modal-sidebar::-webkit-scrollbar-thumb,
.content-body::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 3px;
}

.content-body::-webkit-scrollbar-thumb {
  background: #d1d5db;
}

.fullscreen-modal-sidebar::-webkit-scrollbar-thumb:hover,
.content-body::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

.content-body::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>