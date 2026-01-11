import { computed } from 'vue'
import type { FieldConfig, FieldOption } from '../types'

/**
 * 字段类型
 */
export type FieldType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'switch'
  | 'slider'

/**
 * 字段渲染器选项
 */
export interface FieldRendererOptions {
  // 组件映射
  componentMap: Record<FieldType, string>
  // 子组件映射（用于 select/radio/checkbox）
  componentChildrenMap?: Partial<Record<FieldType, string>>
  // 获取组件 props 的函数
  getComponentProps?: (field: FieldConfig) => Record<string, any>
  // 获取选项 props 的函数
  getOptionProps?: (option: FieldOption, fieldType: FieldType) => Record<string, any>
}

/**
 * 字段渲染器组合式函数
 */
export function useFieldRenderer(options: FieldRendererOptions) {
  const {
    componentMap,
    componentChildrenMap = {},
    getComponentProps = defaultGetComponentProps,
    getOptionProps = defaultGetOptionProps
  } = options

  /**
   * 判断字段是否需要 options
   */
  const hasOptions = (type: FieldType): boolean => {
    return type === 'select' || type === 'radio' || type === 'checkbox'
  }

  /**
   * 获取字段对应的组件名
   */
  const getComponentName = (fieldType: FieldType): string => {
    return componentMap[fieldType] || componentMap.input
  }

  /**
   * 获取字段对应的子组件名（如果有）
   */
  const getChildComponentName = (fieldType: FieldType): string | undefined => {
    return componentChildrenMap[fieldType]
  }

  /**
   * 获取字段的组件 props
   */
  const getFieldComponentProps = (field: FieldConfig): Record<string, any> => {
    return getComponentProps(field)
  }

  /**
   * 获取选项的 props
   */
  const getFieldOptionProps = (option: FieldOption, fieldType: FieldType): Record<string, any> => {
    return getOptionProps(option, fieldType)
  }

  return {
    hasOptions,
    getComponentName,
    getChildComponentName,
    getFieldComponentProps,
    getFieldOptionProps
  }
}

/**
 * 默认的组件 props 获取函数
 * 移除内部字段属性，只保留传给组件的 props
 */
function defaultGetComponentProps(field: FieldConfig): Record<string, any> {
  const {
    name,
    label,
    rules,
    span,
    options,
    type,
    ...rest
  } = field

  return rest
}

/**
 * 默认的选项 props 获取函数
 */
function defaultGetOptionProps(option: FieldOption, fieldType: FieldType): Record<string, any> {
  return {
    label: option.label,
    value: option.value,
    ...(option as any).props
  }
}