import { ref, computed } from 'vue'
import type { SmartFormProps, FieldInstance, FormEngine, UIAdapter } from './types'
import { resolveAdapter } from './common/utils'
import { isElementUI, isAntDesignVue } from './common/adapter'

// Ant Design Vue 表单属性类型
interface AntFormProps {
  model: Record<string, any>
  rules?: Record<string, any[]>
  fields?: any[]
  inline?: boolean
  size?: string
  disabled?: boolean
  labelCol?: { style?: { width?: string } }
  labelAlign?: 'left' | 'right' | 'top'
  [key: string]: any
}

/**
 * 将 SmartFormProps 转换为 Ant Design Vue 表单属性
 */
function convertToAntFormProps(props: SmartFormProps): AntFormProps {
  const antProps: AntFormProps = {
    ...props,
    model: props.model,
    rules: props.rules,
    fields: props.fields,
    inline: props.inline,
    size: props.size,
    disabled: props.disabled
  }

  // labelWidth -> labelCol.style.width
  if (props.labelWidth) {
    const width = typeof props.labelWidth === 'number' ? `${props.labelWidth}px` : props.labelWidth
    antProps.labelCol = {
      ...antProps.labelCol,
      style: {
        ...antProps.labelCol?.style,
        width
      }
    }
  }

  // labelPosition -> labelAlign
  if (props.labelPosition) {
    antProps.labelAlign = props.labelPosition as 'left' | 'right' | 'top'
  }

  return antProps
}

/**
 * 转换 size 为当前适配器对应值
 */
function normalizeSize(adapter: UIAdapter, size?: SmartFormProps['sizeType']) {
  if (!size) return size
  if (isElementUI(adapter) && size === 'middle') return 'default'
  if (isAntDesignVue(adapter) && size === 'default') return 'middle'
  return size
}

/**
 * useFormEngine - 表单引擎 Hook
 */
export function useFormEngine(props: SmartFormProps): FormEngine {
  const fields = ref<Map<string, FieldInstance>>(new Map())

  // 缓存适配器名称
  const adapterName = computed(() => resolveAdapter(props.adapter))

  // 环境标识
  const isDev = (() => {
    try {
      return (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') ||
             (typeof import.meta !== 'undefined' && import.meta.env?.DEV)
    } catch {
      return false
    }
  })()

  // 基础属性缓存
  const baseProps = computed(() => ({
    model: props.model,
    rules: props.rules,
    fields: props.fields,
    inline: props.inline,
    size: props.size,
    disabled: props.disabled
  }))

  // formProps 根据不同 UI 适配器计算
  const formProps = computed(() => {
    const adapter = adapterName.value
    const size = normalizeSize(adapter, props.size)

    if (isElementUI(adapter)) {
      return {
        ...baseProps.value,
        labelWidth: props.labelWidth,
        labelPosition: props.labelPosition,
        size
      }
    }

    if (isAntDesignVue(adapter)) {
      return convertToAntFormProps({ ...baseProps.value, ...props, size })
    }

    return { ...baseProps.value, ...props, size }
  })

  // 注册字段
  const registerField = (field: FieldInstance) => {
    fields.value.set(field.name, field)
  }

  // 注销字段
  const unregisterField = (name: string) => {
    fields.value.delete(name)
  }

  // 通用验证方法
  const runValidation = async (targetFields: FieldInstance[]): Promise<boolean> => {
    const results = await Promise.all(
      targetFields.map(async (field) => {
        try {
          const result = await field.validate()
          return result === true
        } catch (error) {
          if (isDev) console.error(`Validation error on field "${field.name}":`, error)
          return false
        }
      })
    )
    return results.every(Boolean)
  }

  // 验证单个字段
  const validateField = async (name: string): Promise<boolean> => {
    const field = fields.value.get(name)
    if (!field) {
      if (isDev) console.warn(`Field "${name}" not found`)
      return true
    }
    return runValidation([field])
  }

  // 验证整个表单
  const validateForm = async (): Promise<boolean> => {
    return runValidation(Array.from(fields.value.values()))
  }

  // 重置表单
  const resetForm = () => {
    fields.value.forEach((field) => field.reset())
  }

  return {
    formProps,
    registerField,
    unregisterField,
    validateField,
    validateForm,
    resetForm
  }
}
