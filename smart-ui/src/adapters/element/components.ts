import type { FieldConfig } from '../../core/types'

/* ----------------------------- 工具函数 ----------------------------- */

/** 合并用户 props（事件也是 props） */
function mergeProps(
  config: FieldConfig,
  defaults: Record<string, any> = {}
) {
  const { typeProps = {} } = config
  return {
    ...defaults,
    ...typeProps
  }
}

/** 取第一个非 undefined 的值 */
function pickFirst<T = any>(...args: T[]) {
  return args.find(v => v !== undefined)
}

/* ----------------------- Element Plus Map -------------------------- */

export const elementComponentsMap = {
  input: {
    component: 'el-input',
    props: (config: FieldConfig) => {
      const base = mergeProps(config)

      return {
        ...base,
        readonly: pickFirst(
          base.readonly,
          base.readOnly,
          config.readonly,
          config.readOnly
        ),
        autofocus: pickFirst(
          base.autofocus,
          base.autoFocus,
          config.autofocus,
          config.autoFocus
        ),
        maxlength: pickFirst(
          base.maxlength,
          base.maxLength,
          config.maxlength,
          config.maxLength
        ),
        clearable: pickFirst(
          base.clearable,
          base.allowClear,
          config.clearable,
          config.allowClear
        ),
        placeholder: pickFirst(base.placeholder, config.placeholder),
        disabled: pickFirst(base.disabled, config.disabled),
        type: pickFirst(
          base.type,
          config.type === 'textarea' ? 'textarea' : 'text'
        ),
        rows: pickFirst(base.rows, config.rows, 3)
      }
    }
  },

  select: {
    component: 'el-select',
    props: (config: FieldConfig) => {
      const base = mergeProps(config)

      const multiple = pickFirst(
        base.multiple,
        base.mode === 'multiple'
      )

      return {
        ...base,
        disabled: pickFirst(base.disabled, config.disabled),
        placeholder: pickFirst(base.placeholder, config.placeholder),
        size: pickFirst(base.size, config.size),
        multiple: multiple ?? false,
        filterable: pickFirst(
          base.filterable,
          base.showSearch,
          config.filterable,
          config.showSearch,
          false
        ),
        filterMethod: pickFirst(
          base.filterMethod,
          base.filterOption,
          config.filterMethod,
          config.filterOption
        ),
        popperClass: pickFirst(
          base.popperClass,
          base.dropdownClassName,
          config.popperClass,
          config.dropdownClassName
        ),
        noMatchText: pickFirst(
          base.noMatchText,
          base.notFoundContent,
          config.noMatchText,
          config.notFoundContent,
          '无匹配数据'
        ),
        collapseTags: pickFirst(
          base.collapseTags,
          base.maxTagCount,
          config.collapseTags,
          config.maxTagCount
        ),
        loading: pickFirst(base.loading, config.loading, false),
        allowCreate: pickFirst(
          base.allowCreate,
          base.mode === 'tags'
        ) ?? false,
        clearable: pickFirst(
          base.clearable,
          base.allowClear,
          config.clearable,
          config.allowClear,
          false
        )
      }
    },
    optionsComponent: 'el-option',
    optionProps: (option: any) => ({
      label: option.label,
      value: option.value,
      ...(option.props || {})
    })
  },

  radio: {
    component: 'el-radio-group',
    optionsComponent: 'el-radio',
    optionProps: (option: any) => ({
      label: option.value,
      ...(option.props || {})
    })
  },

  checkbox: {
    component: 'el-checkbox-group',
    optionsComponent: 'el-checkbox',
    optionProps: (option: any) => ({
      label: option.value,
      ...(option.props || {})
    })
  },

  date: {
    component: 'el-date-picker',
    props: (config: FieldConfig) => {
      const base = mergeProps(config)

      return {
        ...base,
        type: pickFirst(
          base.type,
          base.dateType,
          config.dateType,
          'date'
        ),
        placeholder: pickFirst(base.placeholder, config.placeholder),
        disabled: pickFirst(base.disabled, config.disabled),
        format: pickFirst(base.format, config.format, 'YYYY-MM-DD'),
        valueFormat: pickFirst(
          base.valueFormat,
          config.valueFormat,
          'YYYY-MM-DD'
        )
      }
    }
  },

  textarea: {
    component: 'el-input',
    props: (config: FieldConfig) => {
      const base = mergeProps(config)

      return {
        ...base,
        readonly: pickFirst(
          base.readonly,
          base.readOnly,
          config.readonly,
          config.readOnly
        ),
        placeholder: pickFirst(base.placeholder, config.placeholder),
        disabled: pickFirst(base.disabled, config.disabled),
        type: 'textarea',
        rows: pickFirst(base.rows, config.rows, 3)
      }
    }
  },

  switch: {
    component: 'el-switch',
    props: (config: FieldConfig) => {
      const base = mergeProps(config)

      return {
        ...base,
        activeText: pickFirst(
          base.activeText,
          base.checkedChildren,
          config.activeText
        ),
        inactiveText: pickFirst(
          base.inactiveText,
          base.unCheckedChildren,
          config.inactiveText
        ),
        disabled: pickFirst(base.disabled, config.disabled)
      }
    }
  },

  slider: {
    component: 'el-slider',
    props: (config: FieldConfig) => {
      const base = mergeProps(config)

      return {
        ...base,
        disabled: pickFirst(base.disabled, config.disabled),
        min: pickFirst(base.min, config.min, 0),
        max: pickFirst(base.max, config.max, 100),
        step: pickFirst(base.step, config.step, 1),
        showInput: pickFirst(base.showInput, config.showInput, false)
      }
    }
  }
} as const

/* ------------------------- 对外获取方法 -------------------------- */

export function getElementComponentConfig(type: FieldConfig['type']) {
  return (
    elementComponentsMap[type as keyof typeof elementComponentsMap] ||
    elementComponentsMap.input
  )
}
