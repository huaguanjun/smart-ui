import type { FieldConfig } from '../../core/types'

// Ant Design Vue 组件映射配置
export const antComponentsMap = {
  input: {
    component: 'a-input',
    props: (config: FieldConfig) => ({
      placeholder: config.placeholder,
      disabled: config.disabled,
      readonly: config.readonly,
      ...config.antProps
    })
  },
  select: {
    component: 'a-select',
    props: (config: FieldConfig) => ({
      placeholder: config.placeholder,
      disabled: config.disabled,
      mode: config.mode,
      ...config.antProps
    }),
    optionsComponent: 'a-select-option',
    optionProps: (option: any) => ({
      value: option.value,
      ...option.props
    })
  },
  radio: {
    component: 'a-radio-group',
    optionsComponent: 'a-radio',
    optionProps: (option: any) => ({
      value: option.value,
      ...option.props
    })
  },
  checkbox: {
    component: 'a-checkbox-group',
    optionsComponent: 'a-checkbox',
    optionProps: (option: any) => ({
      value: option.value,
      ...option.props
    })
  },
  date: {
    component: 'a-date-picker',
    props: (config: FieldConfig) => ({
      placeholder: config.placeholder,
      disabled: config.disabled,
      picker: config.dateType || 'date',
      format: config.format || 'YYYY-MM-DD',
      ...config.antProps
    })
  },
  textarea: {
    component: 'a-textarea',
    props: (config: FieldConfig) => ({
      placeholder: config.placeholder,
      disabled: config.disabled,
      readonly: config.readonly,
      rows: config.rows || 3,
      ...config.antProps
    })
  },
  switch: {
    component: 'a-switch',
    props: (config: FieldConfig) => ({
      disabled: config.disabled,
      checkedChildren: config.activeText,
      unCheckedChildren: config.inactiveText,
      ...config.antProps
    })
  },
  slider: {
    component: 'a-slider',
    props: (config: FieldConfig) => ({
      disabled: config.disabled,
      min: config.min || 0,
      max: config.max || 100,
      step: config.step || 1,
      showInput: config.showInput || false,
      ...config.antProps
    })
  }
} as const

// 获取 Ant Design Vue 组件配置
export function getAntComponentConfig(type: FieldConfig['type']) {
  return antComponentsMap[type as keyof typeof antComponentsMap] || antComponentsMap.input
}