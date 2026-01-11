import SmartForm from './components/form/SmartForm.vue'
import SmartTable from './components/table/SmartTable.vue'
import { defineCustomElement } from 'vue'
import type { App } from 'vue'
import { getGlobalConfig, setGlobalConfig } from './core/config'
import { registerAdapter } from './core/common/adapter'
import { antAdapter } from './adapters/ant/adapter'

// 导出组件
export { SmartForm, SmartTable }

// 导出配置相关 API
export { getGlobalConfig, setGlobalConfig }

// 插件安装方法 - 固定使用 Ant Design Vue
const SmartUIAntPlugin = {
  install: (app: App) => {
    // 设置全局配置为 Ant Design Vue
    const globalConfig = setGlobalConfig({ adapter: 'ant' })
    
    // 注册内置 Ant 适配器
    registerAdapter(antAdapter)
    
    // 注册组件
    app.component('SmartForm', SmartForm)
    app.component('SmartTable', SmartTable)
    
    // 提供全局配置给组件
    app.provide('smart-ui-config', globalConfig)
  }
}

export default SmartUIAntPlugin

// 自定义元素支持
export const SmartFormElement = defineCustomElement(SmartForm)
export const SmartTableElement = defineCustomElement(SmartTable)

if (typeof window !== 'undefined') {
  customElements.define('smart-form', SmartFormElement)
  customElements.define('smart-table', SmartTableElement)
}