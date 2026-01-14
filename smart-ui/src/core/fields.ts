import type { FieldConfig } from './types'

/**
 * 创建输入框字段配置
 */
export function createInputField(config: Partial<FieldConfig> & { name: string }): FieldConfig {
  return {
    type: 'input',
    label: config.name,
    placeholder: `请输入${config.label || config.name}`,
    ...config
  }
}

/**
 * 创建下拉选择框字段配置
 */
export function createSelectField(config: Partial<FieldConfig> & { name: string; options: FieldConfig['options'] }): FieldConfig {
  return {
    ...config,
    type: 'select',
    label: config.name,
    placeholder: `请选择${config.label || config.name}`,
    options: config.options,
  }
}

/**
 * 创建单选框字段配置
 */
export function createRadioField(config: Partial<FieldConfig> & { name: string; options: FieldConfig['options'] }): FieldConfig {
  return {
    ...config,
    type: 'radio',
    label: config.name,
    options: config.options,
  }
}

/**
 * 创建复选框字段配置
 */
export function createCheckboxField(config: Partial<FieldConfig> & { name: string; options: FieldConfig['options'] }): FieldConfig {
  return {
    ...config,
    type: 'checkbox',
    label: config.name,
    options: config.options,
  }
}

/**
 * 创建日期选择器字段配置
 */
export function createDateField(config: Partial<FieldConfig> & { name: string }): FieldConfig {
  return {
    type: 'date',
    label: config.name,
    placeholder: `请选择${config.label || config.name}`,
    ...config
  }
}

/**
 * 创建文本域字段配置
 */
export function createTextareaField(config: Partial<FieldConfig> & { name: string }): FieldConfig {
  return {
    type: 'textarea',
    label: config.name,
    placeholder: `请输入${config.label || config.name}`,
    ...config
  }
}

/**
 * 创建开关字段配置
 */
export function createSwitchField(config: Partial<FieldConfig> & { name: string }): FieldConfig {
  return {
    type: 'switch',
    label: config.name,
    ...config
  }
}

/**
 * 创建滑块字段配置
 */
export function createSliderField(config: Partial<FieldConfig> & { name: string }): FieldConfig {
  return {
    type: 'slider',
    label: config.name,
    ...config
  }
}

/**
 * 预设的常用验证规则
 */
export const RULES = {
  required: {
    required: true,
    message: '此项为必填项',
    trigger: 'blur'
  },
  email: {
    type: 'email',
    message: '请输入有效的邮箱地址',
    trigger: 'blur'
  },
  url: {
    type: 'url',
    message: '请输入有效的URL',
    trigger: 'blur'
  },
  number: {
    type: 'number',
    message: '请输入数字',
    trigger: 'blur'
  },
  integer: {
    type: 'integer',
    message: '请输入整数',
    trigger: 'blur'
  },
  float: {
    type: 'float',
    message: '请输入小数',
    trigger: 'blur'
  },
  minLength: (min: number) => ({
    min,
    message: `长度不能少于${min}个字符`,
    trigger: 'blur'
  }),
  maxLength: (max: number) => ({
    max,
    message: `长度不能超过${max}个字符`,
    trigger: 'blur'
  }),
  range: (min: number, max: number) => ({
    min,
    max,
    message: `请输入${min}到${max}之间的数值`,
    trigger: 'blur'
  })
} as const