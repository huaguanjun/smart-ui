import type { FieldConfig } from '../../core/types'

/* ----------------------------- 工具函数 ----------------------------- */

/** 安全合并 props（事件也是 props） */
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

/** 兼容不同命名方式（readOnly / readonly 等） */
function pickFirst<T = any>(...args: T[]) {
  return args.find(v => v !== undefined)
}

/* ----------------------- Ant Design Vue Map ------------------------- */

export const antComponentsMap = {
  input: {
    component: 'a-input',
    props: (config: FieldConfig) => {
      const base = mergeProps(config)

      return {
        ...base,
        readOnly: pickFirst(
          base.readOnly,
          base.readonly,
          config.readOnly,
          config.readonly
        ),
        autoFocus: pickFirst(
          base.autoFocus,
          base.autofocus,
          config.autoFocus,
          config.autofocus
        ),
        maxLength: pickFirst(
          base.maxLength,
          base.maxlength,
          config.maxLength,
          config.maxlength
        ),
        allowClear: pickFirst(
          base.allowClear,
          base.clearable,
          config.allowClear,
          config.clearable
        ),
        placeholder: pickFirst(base.placeholder, config.placeholder),
        disabled: pickFirst(base.disabled, config.disabled)
      }
    }
  },

  select: {
    component: 'a-select',
    props: (config: FieldConfig) => {
      const base = mergeProps(config)

      return {
        ...base,
        showSearch: pickFirst(
          base.showSearch,
          base.filterable,
          config.showSearch,
          config.filterable,
          false
        ),
        filterOption: pickFirst(
          base.filterOption,
          base.filterMethod,
          config.filterOption,
          config.filterMethod
        ),
        dropdownClassName: pickFirst(
          base.dropdownClassName,
          base.popperClass,
          config.dropdownClassName,
          config.popperClass
        ),
        notFoundContent: pickFirst(
          base.notFoundContent,
          base.noMatchText,
          config.notFoundContent,
          config.noMatchText,
          '无匹配数据'
        ),
        maxTagCount: pickFirst(
          base.maxTagCount,
          base.collapseTags,
          config.maxTagCount,
          config.collapseTags
        ),
        allowClear: pickFirst(
          base.allowClear,
          base.clearable,
          config.allowClear,
          config.clearable,
          false
        ),
        disabled: pickFirst(base.disabled, config.disabled),
        placeholder: pickFirst(base.placeholder, config.placeholder),
        mode: pickFirst(base.mode, config.mode),
        size: pickFirst(base.size, config.size),
        loading: pickFirst(base.loading, config.loading, false)
      }
    },
    optionsComponent: 'a-select-option',
    optionProps: (option: any) => ({
      value: option.value,
      ...(option.props || {})
    })
  },

  radio: {
    component: 'a-radio-group',
    optionsComponent: 'a-radio',
    optionProps: (option: any) => ({
      value: option.value,
      ...(option.props || {})
    })
  },

  checkbox: {
    component: 'a-checkbox-group',
    optionsComponent: 'a-checkbox',
    optionProps: (option: any) => ({
      value: option.value,
      ...(option.props || {})
    })
  },

  date: {
    component: 'a-date-picker',
    props: (config: FieldConfig) => {
      const base = mergeProps(config)

      return {
        ...base,
        picker: pickFirst(
          base.picker,
          base.dateType,
          config.dateType,
          'date'
        ),
        placeholder: pickFirst(base.placeholder, config.placeholder),
        disabled: pickFirst(base.disabled, config.disabled),
        format: pickFirst(base.format, config.format, 'YYYY-MM-DD')
      }
    }
  },

  textarea: {
    component: 'a-textarea',
    props: (config: FieldConfig) => {
      const base = mergeProps(config)

      return {
        ...base,
        readOnly: pickFirst(
          base.readOnly,
          base.readonly,
          config.readOnly,
          config.readonly
        ),
        placeholder: pickFirst(base.placeholder, config.placeholder),
        disabled: pickFirst(base.disabled, config.disabled),
        rows: pickFirst(base.rows, config.rows, 3)
      }
    }
  },

  switch: {
    component: 'a-switch',
    props: (config: FieldConfig) => {
      const base = mergeProps(config)

      return {
        ...base,
        checkedChildren: pickFirst(
          base.checkedChildren,
          base.activeText,
          config.activeText
        ),
        unCheckedChildren: pickFirst(
          base.unCheckedChildren,
          base.inactiveText,
          config.inactiveText
        ),
        disabled: pickFirst(base.disabled, config.disabled)
      }
    }
  },

  slider: {
    component: 'a-slider',
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

export function getAntComponentConfig(type: FieldConfig['type']) {
  return (
    antComponentsMap[type as keyof typeof antComponentsMap] ||
    antComponentsMap.input
  )
}
