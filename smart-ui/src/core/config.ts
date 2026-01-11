import type { UIAdapter } from './types'

// 全局配置
let globalConfig = {
  adapter: 'element' as UIAdapter
}

/**
 * 获取全局配置
 */
export function getGlobalConfig() {
  return globalConfig
}

/**
 * 设置全局配置
 */
export function setGlobalConfig(config: Partial<typeof globalConfig>) {
  globalConfig = { ...globalConfig, ...config }
  return globalConfig
}