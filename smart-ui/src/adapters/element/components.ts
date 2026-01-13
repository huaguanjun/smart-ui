import type { FieldConfig } from '../../core/types'

// Element UI 组件映射配置
export const elementComponentsMap = {
  input: {
    component: 'el-input',
    props: (config: FieldConfig) => {
      const { typeProps = {} } = config;
      return ({
        // 首先应用用户配置
        ...typeProps,
        // 然后基于用户配置进行兼容性处理
        readonly: typeProps.readonly ?? typeProps.readOnly ?? config.readonly ?? config.readOnly,
        autofocus: typeProps.autofocus ?? typeProps.autoFocus ?? config.autofocus ?? config.autoFocus,
        maxlength: typeProps.maxlength ?? typeProps.maxLength ?? config.maxlength ?? config.maxLength,
        clearable: typeProps.clearable ?? typeProps.allowClear ?? config.clearable ?? config.allowClear,
        // 基本属性处理
        placeholder: typeProps.placeholder ?? config.placeholder,
        disabled: typeProps.disabled ?? config.disabled,
        type: typeProps.type ?? (config.type === 'textarea' ? 'textarea' : 'text'),
        rows: typeProps.rows ?? config.rows ?? 3
      })
    }
  },
  select: {
    component: 'el-select',
    props: (config: FieldConfig) => {
      const { typeProps = {} } = config;
      return ({
        ...typeProps,
        disabled: typeProps.disabled ?? config.disabled,
        placeholder: typeProps.placeholder ?? config.placeholder,
        size: typeProps.size ?? config.size,
        multiple: typeProps.multiple ?? typeProps.mode === 'multiple' ? true : false,
        filterable: typeProps.filterable ?? typeProps.showSearch ?? config.filterable ?? config.showSearch ?? false,
        filterMethod: typeProps.filterMethod ?? typeProps.filterOption ?? config.filterMethod ?? config.filterOption,
        popperClass: typeProps.popperClass ?? typeProps.dropdownClassName ?? config.popperClass ?? config.dropdownClassName,
        noMatchText: typeProps.noMatchText ?? typeProps.notFoundContent ?? config.noMatchText ?? config.notFoundContent ?? '无匹配数据',
        collapseTags: typeProps.collapseTags ?? typeProps.maxTagCount ?? config.collapseTags ?? config.maxTagCount,
        loading: typeProps.loading ?? config.loading ?? false,
        allowCreate: typeProps.allowCreate ?? typeProps.mode === 'tags' ? true : false,
        clearable: typeProps.clearable ?? typeProps.allowClear ?? config.clearable ?? config.allowClear ?? false
      })
    },
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
    props: (config: FieldConfig) => {
      const { typeProps = {} } = config;
      return ({
        // 首先应用用户配置
        ...typeProps,
        // 然后基于用户配置进行兼容性处理
        type: typeProps.type ?? typeProps.dateType ?? config.dateType ?? 'date',
        // 基本属性处理
        placeholder: typeProps.placeholder ?? config.placeholder,
        disabled: typeProps.disabled ?? config.disabled,
        format: typeProps.format ?? config.format ?? 'YYYY-MM-DD',
        valueFormat: typeProps.valueFormat ?? config.valueFormat ?? 'YYYY-MM-DD'
      })
    }
  },
  textarea: {
    component: 'el-input',
    props: (config: FieldConfig) => {
      const { typeProps = {} } = config;
      return ({
        // 首先应用用户配置
        ...typeProps,
        // 然后基于用户配置进行兼容性处理
        readonly: typeProps.readonly ?? typeProps.readOnly ?? config.readonly ?? config.readOnly,
        // 基本属性处理
        placeholder: typeProps.placeholder ?? config.placeholder,
        disabled: typeProps.disabled ?? config.disabled,
        type: 'textarea',
        rows: typeProps.rows ?? config.rows ?? 3
      })
    }
  },
  switch: {
    component: 'el-switch',
    props: (config: FieldConfig) => {
      const { typeProps = {} } = config;
      return ({
        // 首先应用用户配置
        ...typeProps,
        // 然后基于用户配置进行兼容性处理
        activeText: typeProps.activeText ?? typeProps.checkedChildren ?? config.activeText,
        inactiveText: typeProps.inactiveText ?? typeProps.unCheckedChildren ?? config.inactiveText,
        // 基本属性处理
        disabled: typeProps.disabled ?? config.disabled
      })
    }
  },
  slider: {
    component: 'el-slider',
    props: (config: FieldConfig) => {
      const { typeProps = {} } = config;
      return ({
        // 首先应用用户配置
        ...typeProps,
        // 基本属性处理
        disabled: typeProps.disabled ?? config.disabled,
        min: typeProps.min ?? config.min ?? 0,
        max: typeProps.max ?? config.max ?? 100,
        step: typeProps.step ?? config.step ?? 1,
        showInput: typeProps.showInput ?? config.showInput ?? false
      })
    }
  }
} as const

// 获取 Element UI 组件配置
export function getElementComponentConfig(type: FieldConfig['type']) {
  return elementComponentsMap[type as keyof typeof elementComponentsMap] || elementComponentsMap.input
}