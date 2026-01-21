/**
 * Ant Design Vue 表单工具函数
 * 抽离组件映射逻辑，提高代码复用性和可维护性
 */
import type { FieldConfig } from '../../core/types'
import { antComponentsMap } from './components'

/**
 * 表单字段类型
 */
export type FieldType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'select-v2'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'time'
  | 'switch'
  | 'slider'
  | 'mention'
  | 'input-number'
  | 'cascader'
  | 'tree-select'
  | 'upload'
  | 'rate'
  | 'color-picker'
  | 'transfer'
  | 'autocomplete'

/**
 * 组件映射：字段类型 -> 组件名称
 */
export const componentMap: Record<FieldType, string> = {
  input: antComponentsMap.input.component,
  textarea: antComponentsMap.textarea.component,
  select: antComponentsMap.select.component,
  'select-v2': antComponentsMap['select-v2'].component,
  radio: antComponentsMap.radio.component,
  checkbox: antComponentsMap.checkbox.component,
  date: antComponentsMap.date.component,
  time: antComponentsMap.time.component,
  switch: antComponentsMap.switch.component,
  slider: antComponentsMap.slider.component,
  mention: antComponentsMap.mention.component,
  'input-number': antComponentsMap['input-number'].component,
  cascader: antComponentsMap.cascader.component,
  'tree-select': antComponentsMap['tree-select'].component,
  upload: antComponentsMap.upload.component,
  rate: antComponentsMap.rate.component,
  'color-picker': antComponentsMap['color-picker'].component,
  transfer: antComponentsMap.transfer.component,
  autocomplete: antComponentsMap.autocomplete.component,
}

/**
 * 子组件映射：字段类型 -> 子组件名称
 */
export const componentChildrenMap: Partial<Record<FieldType, string>> = {
  select: antComponentsMap.select.optionsComponent,
  'select-v2': antComponentsMap['select-v2'].optionsComponent,
  radio: antComponentsMap.radio.optionsComponent,
  checkbox: antComponentsMap.checkbox.optionsComponent,
}

/**
 * 判断字段类型是否需要options子节点
 * @param type 字段类型
 * @returns 是否需要options
 */
export function hasOptions(type: FieldType): boolean {
  return type === 'select' || type === 'select-v2' || type === 'radio' || type === 'checkbox'
}

/**
 * 提取真正传给AntD组件的props
 * @param field 字段配置
 * @returns 组件props
 */
export function getComponentProps(field: FieldConfig) {
  const config = antComponentsMap[field.type as keyof typeof antComponentsMap]
  if (config && typeof (config as any).props === 'function') {
    return typeof (config as any).props === 'function' ? (config as any).props(field) : {}
  }
  
  // 回退逻辑
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
