import type { FieldConfig } from '../../core/types'

// Element UI 组件映射配置
export const elementComponentsMap = {
  input: {
    component: 'el-input',
    props: (config: FieldConfig) => ({
      placeholder: config.placeholder,
      disabled: config.disabled,
      readonly: config.readonly,
      type: config.type === 'textarea' ? 'textarea' : 'text',
      rows: config.rows || 3,
      ...config.elementProps
    })
  },
  select: {
    component: 'el-select',
    props: (config: FieldConfig) => ({
      placeholder: config.placeholder,
      disabled: config.disabled,
      ...config.elementProps
    }),
    optionsComponent: 'el-option',
    optionProps: (option: any) => ({
      label: option.label,
      value: option.value
    })
  },
  radio: {
    component: 'el-radio-group',
    optionsComponent: 'el-radio',
    optionProps: (option: any) => ({
      label: option.value,
      ...option.props
    })
  },
  checkbox: {
    component: 'el-checkbox-group',
    optionsComponent: 'el-checkbox',
    optionProps: (option: any) => ({
      label: option.value,
      ...option.props
    })
  },
  date: {
    component: 'el-date-picker',
    props: (config: FieldConfig) => ({
      placeholder: config.placeholder,
      disabled: config.disabled,
      type: config.dateType || 'date',
      format: config.format || 'YYYY-MM-DD',
      valueFormat: config.valueFormat || 'YYYY-MM-DD',
      ...config.elementProps
    })
  },
  textarea: {
    component: 'el-input',
    props: (config: FieldConfig) => ({
      placeholder: config.placeholder,
      disabled: config.disabled,
      readonly: config.readonly,
      type: 'textarea',
      rows: config.rows || 3,
      ...config.elementProps
    })
  },
  switch: {
    component: 'el-switch',
    props: (config: FieldConfig) => ({
      disabled: config.disabled,
      activeText: config.activeText,
      inactiveText: config.inactiveText,
      ...config.elementProps
    })
  },
  slider: {
    component: 'el-slider',
    props: (config: FieldConfig) => ({
      disabled: config.disabled,
      min: config.min || 0,
      max: config.max || 100,
      step: config.step || 1,
      showInput: config.showInput || false,
      ...config.elementProps
    })
  }
} as const

// 获取 Element UI 组件配置
export function getElementComponentConfig(type: FieldConfig['type']) {
  return elementComponentsMap[type as keyof typeof elementComponentsMap] || elementComponentsMap.input
}