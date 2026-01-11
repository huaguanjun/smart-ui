import { getGlobalConfig } from '../config'
import type { UIAdapter } from '../types'

/**
 * 解析最终使用的 UI 库适配器名称
 * @param localAdapter 局部配置的适配器
 * @returns 最终使用的适配器名称
 */
export function resolveAdapter(localAdapter?: UIAdapter): UIAdapter {
  return localAdapter || getGlobalConfig().adapter
}

// 重新导出 processColumns 函数，保持向后兼容
export { processColumns } from './adapter'