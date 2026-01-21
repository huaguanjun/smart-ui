/**
 * Element Plus 表单工具函数
 * 抽离组件映射逻辑，提高代码复用性和可维护性
 */
import type { FieldConfig } from '../../core/types'
import { elementComponentsMap } from './components'

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
  input: elementComponentsMap.input.component,
  textarea: elementComponentsMap.textarea.component,
  select: elementComponentsMap.select.component,
  'select-v2': elementComponentsMap['select-v2'].component,
  radio: elementComponentsMap.radio.component,
  checkbox: elementComponentsMap.checkbox.component,
  date: elementComponentsMap.date.component,
  time: elementComponentsMap.time.component,
  switch: elementComponentsMap.switch.component,
  slider: elementComponentsMap.slider.component,
  mention: elementComponentsMap.mention.component,
  'input-number': elementComponentsMap['input-number'].component,
  cascader: elementComponentsMap.cascader.component,
  'tree-select': elementComponentsMap['tree-select'].component,
  upload: elementComponentsMap.upload.component,
  rate: elementComponentsMap.rate.component,
  'color-picker': elementComponentsMap['color-picker'].component,
  transfer: elementComponentsMap.transfer.component,
  autocomplete: elementComponentsMap.autocomplete.component,
}

/**
 * 子组件映射：字段类型 -> 子组件名称
 */
export const componentChildrenMap: Partial<Record<FieldType, string>> = {
  select: elementComponentsMap.select.optionsComponent,
  'select-v2': elementComponentsMap['select-v2'].optionsComponent,
  radio: elementComponentsMap.radio.optionsComponent,
  checkbox: elementComponentsMap.checkbox.optionsComponent,
}

/**
 * 判断字段类型是否需要options子节点
 * @param type 字段类型
 * @returns 是否需要options
 */
export function hasOptions(type: FieldType): boolean {
  return (
    type === 'select' ||
    type === 'select-v2' ||
    type === 'radio' ||
    type === 'checkbox'
  )
}

/**
 * 提取真正传给Element Plus组件的props
 * @param field 字段配置
 * @returns 组件props
 */
export function getComponentProps(field: FieldConfig) {
  const config = elementComponentsMap[field.type as keyof typeof elementComponentsMap]
  if (config && typeof (config as any).props === 'function') {
    return typeof (config as any).props === 'function' ? (config as any).props(field) : {}
  }

  // 回退逻辑
  const { name, label, rules, span, options, type, ...rest } = field

  return {
    ...rest,
    ...(type === 'textarea' ? { type: 'textarea' } : {}),
  }
}
