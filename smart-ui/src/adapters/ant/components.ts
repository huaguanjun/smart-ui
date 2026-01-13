import type { FieldConfig } from '../../core/types'

// Ant Design Vue 组件映射配置
export const antComponentsMap = {
  input: {
    component: 'a-input',
    props: (config: FieldConfig) => {
      const { typeProps = {} } = config;
      return {
        // 首先应用用户配置
        ...typeProps,
        // 然后基于用户配置进行兼容性处理
        readOnly: typeProps.readOnly ?? typeProps.readonly ?? config.readOnly ?? config.readonly,
        autoFocus: typeProps.autoFocus ?? typeProps.autofocus ?? config.autoFocus ?? config.autofocus,
        maxLength: typeProps.maxLength ?? typeProps.maxlength ?? config.maxLength ?? config.maxlength,
        allowClear: typeProps.allowClear ?? typeProps.clearable ?? config.allowClear ?? config.clearable,
        // 基本属性处理
        placeholder: typeProps.placeholder ?? config.placeholder,
        disabled: typeProps.disabled ?? config.disabled
      }
    }
  },
  select: {
    component: 'a-select',
    props: (config: FieldConfig) =>{
      const { typeProps = {} } = config;
      return {
        // 首先应用用户配置
        ...typeProps,
        // 然后基于用户配置进行兼容性处理
        showSearch: typeProps.showSearch ?? typeProps.filterable ?? config.showSearch ?? config.filterable ?? false,
        filterOption: typeProps.filterOption ?? typeProps.filterMethod ?? config.filterOption ?? config.filterMethod,
        dropdownClassName: typeProps.dropdownClassName ?? typeProps.popperClass ?? config.dropdownClassName ?? config.popperClass,
        notFoundContent: typeProps.notFoundContent ?? typeProps.noMatchText ?? config.notFoundContent ?? config.noMatchText ?? '无匹配数据',
        maxTagCount: typeProps.maxTagCount ?? typeProps.collapseTags ?? config.maxTagCount ?? config.collapseTags,
        allowClear: typeProps.allowClear ?? typeProps.clearable ?? config.allowClear ?? config.clearable ?? false,
        // 基本属性处理
        disabled: typeProps.disabled ?? config.disabled,
        placeholder: typeProps.placeholder ?? config.placeholder,
        mode: typeProps.mode ?? config.mode,
        size: typeProps.size ?? config.size,
        loading: typeProps.loading ?? config.loading ?? false
      }
    },
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
    props: (config: FieldConfig) => {
      const { typeProps = {} } = config;
      return {
        // 首先应用用户配置
        ...typeProps,
        // 然后基于用户配置进行兼容性处理
        picker: typeProps.picker ?? typeProps.dateType ?? config.dateType ?? 'date',
        // 基本属性处理
        placeholder: typeProps.placeholder ?? config.placeholder,
        disabled: typeProps.disabled ?? config.disabled,
        format: typeProps.format ?? config.format ?? 'YYYY-MM-DD'
      }
    }
  },
  textarea: {
    component: 'a-textarea',
    props: (config: FieldConfig) => {
      const { typeProps = {} } = config;
      return {
        // 首先应用用户配置
        ...typeProps,
        // 然后基于用户配置进行兼容性处理
        readOnly: typeProps.readOnly ?? typeProps.readonly ?? config.readOnly ?? config.readonly,
        // 基本属性处理
        placeholder: typeProps.placeholder ?? config.placeholder,
        disabled: typeProps.disabled ?? config.disabled,
        rows: typeProps.rows ?? config.rows ?? 3
      }
    }
  },
  switch: {
    component: 'a-switch',
    props: (config: FieldConfig) => {
      const { typeProps = {} } = config;
      return {
        // 首先应用用户配置
        ...typeProps,
        // 然后基于用户配置进行兼容性处理
        checkedChildren: typeProps.checkedChildren ?? typeProps.activeText ?? config.activeText,
        unCheckedChildren: typeProps.unCheckedChildren ?? typeProps.inactiveText ?? config.inactiveText,
        // 基本属性处理
        disabled: typeProps.disabled ?? config.disabled
      }
    }
  },
  slider: {
    component: 'a-slider',
    props: (config: FieldConfig) => {
      const { typeProps = {} } = config;
      return {
        // 首先应用用户配置
        ...typeProps,
        // 基本属性处理
        disabled: typeProps.disabled ?? config.disabled,
        min: typeProps.min ?? config.min ?? 0,
        max: typeProps.max ?? config.max ?? 100,
        step: typeProps.step ?? config.step ?? 1,
        showInput: typeProps.showInput ?? config.showInput ?? false
      }
    }
  }
} as const

// 获取 Ant Design Vue 组件配置
export function getAntComponentConfig(type: FieldConfig['type']) {
  return antComponentsMap[type as keyof typeof antComponentsMap] || antComponentsMap.input
}