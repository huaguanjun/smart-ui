import SmartForm from './components/form/SmartForm.vue'
import SmartTable from './components/table/SmartTable.vue'
import { defineCustomElement } from 'vue'
import type { App } from 'vue'
import type { UIAdapter, Adapter } from './core/types'
import { registerAdapter, getAdapter, getAvailableAdapters } from './core/common/adapter'
import { getGlobalConfig, setGlobalConfig } from './core/config'
import { elementAdapter } from './adapters/element/adapter'
import { antAdapter } from './adapters/ant/adapter'

// 导出组件
export { SmartForm, SmartTable }

// 导出适配器相关 API
export { registerAdapter, getAdapter, getAvailableAdapters }

// 导出配置相关 API
export { getGlobalConfig, setGlobalConfig }

// 注册内置适配器的辅助函数
function registerBuiltinAdapters() {
  // 如果适配器还未注册，则注册对应的内置适配器
  try {
    getAdapter('element')
  } catch {
    registerAdapter(elementAdapter)
  }
  
  try {
    getAdapter('ant')
  } catch {
    registerAdapter(antAdapter)
  }
}

// 插件安装方法
const SmartUIPlugin = {
  install: (app: App, options?: { 
    adapter?: UIAdapter,
    adapters?: Adapter[]
  }) => {
    // 合并全局配置
    let config = getGlobalConfig()
    if (options) {
      // 注册自定义适配器
      if (options.adapters && options.adapters.length > 0) {
        options.adapters.forEach(adapter => registerAdapter(adapter))
      }
      
      // 设置默认适配器
      if (options.adapter) {
        config = setGlobalConfig({ adapter: options.adapter })
      }
    }
    
    // 注册内置适配器（如果尚未注册）
    registerBuiltinAdapters()
    
    // 注册组件
    app.component('SmartForm', SmartForm)
    app.component('SmartTable', SmartTable)
    
    // 提供全局配置给组件
    app.provide('smart-ui-config', config)
  }
}

export default SmartUIPlugin

// 自定义元素支持
export const SmartFormElement = defineCustomElement(SmartForm)
export const SmartTableElement = defineCustomElement(SmartTable)

if (typeof window !== 'undefined') {
  customElements.define('smart-form', SmartFormElement)
  customElements.define('smart-table', SmartTableElement)
}