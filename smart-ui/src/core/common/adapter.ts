import type { UIAdapter, TableColumnConfig, Adapter } from '../types'

// 适配器映射表
const adapters = new Map<UIAdapter, Adapter>()

/**
 * 注册 UI 适配器
 * @param adapter 适配器配置
 * @throws 当适配器名称无效或适配器配置不完整时抛出错误
 */
export function registerAdapter(adapter: Adapter): void {
  if (!adapter || typeof adapter !== 'object') {
    throw new Error('Adapter must be a valid object')
  }
  
  if (!adapter.name || !['element', 'ant'].includes(adapter.name)) {
    throw new Error(`Invalid adapter name: ${adapter.name}. Valid adapters are: element, ant`)
  }
  
  if (!adapter.components || typeof adapter.components !== 'object') {
    throw new Error('Adapter must have a valid components object')
  }
  
  adapters.set(adapter.name, adapter)
  
  // 只在开发环境输出日志
  try {
    // @ts-ignore - 兼容不同环境
    if ((typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') ||
        (typeof import.meta !== 'undefined' && import.meta.env?.DEV)) {
      console.log(`Adapter '${adapter.name}' registered successfully`)
    }
  } catch {
    // 忽略环境检查错误
  }
}

/**
 * 获取指定名称的适配器
 * @param name 适配器名称
 * @returns 适配器配置
 * @throws 当适配器不存在时抛出错误
 */
export function getAdapter(name: UIAdapter): Adapter {
  const adapter = adapters.get(name)
  if (!adapter) {
    throw new Error(`Adapter '${name}' is not registered. Available adapters: ${Array.from(adapters.keys()).join(', ')}`)
  }
  return adapter
}

/**
 * 获取所有已注册的适配器
 * @returns 适配器名称数组
 */
export function getAvailableAdapters(): UIAdapter[] {
  return Array.from(adapters.keys())
}

/**
 * 处理表格列配置，适配不同 UI 库的差异
 * @param columns 原始列配置
 * @returns 处理后的列配置
 * @throws 当列配置无效时抛出错误
 */
export function processColumns(columns: TableColumnConfig[]): TableColumnConfig[] {
  let isDev = false
  try {
    // @ts-ignore - 兼容不同环境
    isDev = (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') ||
            (typeof import.meta !== 'undefined' && import.meta.env?.DEV)
  } catch {
    // 忽略环境检查错误
  }
  
  if (!Array.isArray(columns)) {
    if (isDev) {
      console.warn('Invalid columns configuration, expected an array')
    }
    return []
  }
  
  return columns.map((column, index) => {
    if (!column || typeof column !== 'object') {
      if (isDev) {
        console.warn(`Invalid column configuration at index ${index}, expected an object`)
      }
      return { label: 'Invalid Column', prop: `invalid_${index}` } as TableColumnConfig
    }
    
    if (!column.label) {
      if (isDev) {
        console.warn(`Column at index ${index} is missing label, using default label`)
      }
      column.label = `Column ${index + 1}`
    }
    
    const processedColumn: TableColumnConfig = { ...column }

    // 统一处理 Element UI 和 Ant Design Vue 的列属性差异
    if (!processedColumn.dataIndex && processedColumn.prop) {
      processedColumn.dataIndex = processedColumn.prop
    }
    if (!processedColumn.prop && processedColumn.dataIndex) {
      processedColumn.prop = processedColumn.dataIndex
    }
    
    // 确保列有唯一标识
    if (!processedColumn.prop && !processedColumn.dataIndex) {
      processedColumn.prop = `column_${index}`
      processedColumn.dataIndex = `column_${index}`
    }

    return processedColumn
  })
}

/**
 * 根据 UI 库获取对应属性名
 * @param adapter UI 库适配器
 * @param props 属性映射对象，键为统一属性名，值为各 UI 库的属性名
 * @returns 对应 UI 库的属性名
 * @throws 当属性映射对象无效时抛出错误
 */
export function getAdapterProp(adapter: UIAdapter, props: Record<string, Record<UIAdapter, string>>): Record<string, string> {
  if (!props || typeof props !== 'object') {
    throw new Error('Props mapping must be a valid object')
  }
  
  const result: Record<string, string> = {}
  
  for (const [key, value] of Object.entries(props)) {
    if (value && typeof value === 'object') {
      result[key] = value[adapter] || key
    } else {
      result[key] = key
    }
  }
  
  return result
}

/**
 * 检查是否为 Element UI
 * @param adapter UI 库适配器
 * @returns 是否为 Element UI
 */
export function isElementUI(adapter: UIAdapter): boolean {
  return adapter === 'element'
}

/**
 * 检查是否为 Ant Design Vue
 * @param adapter UI 库适配器
 * @returns 是否为 Ant Design Vue
 */
export function isAntDesignVue(adapter: UIAdapter): boolean {
  return adapter === 'ant'
}