import { ref, computed, shallowRef } from 'vue'
import type { SmartFormProps, FieldInstance, FormEngine } from './types'
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
  labelCol?: {
    style?: {
      width?: string
    }
  }
  labelAlign?: 'left' | 'right' | 'top'
  [key: string]: any
}

/**
 * 将 SmartFormProps 转换为 Ant Design Vue 表单属性
 */
function convertToAntFormProps(props: SmartFormProps): AntFormProps {
  const antProps: AntFormProps = {
    model: props.model,
    rules: props.rules,
    fields: props.fields,
    inline: props.inline,
    size: props.size,
    disabled: props.disabled,
    ...props
  }
  
  // 处理 labelWidth 转换为 labelCol
  if (props.labelWidth) {
    const width = typeof props.labelWidth === 'number' 
      ? `${props.labelWidth}px` 
      : props.labelWidth
    
    antProps.labelCol = {
      ...antProps.labelCol,
      style: {
        ...antProps.labelCol?.style,
        width
      }
    }
  }
  
  // 处理 labelPosition 转换为 labelAlign
  if (props.labelPosition) {
    antProps.labelAlign = props.labelPosition as 'left' | 'right' | 'top'
  }
  
  return antProps
}

export function useFormEngine(props: SmartFormProps): FormEngine {
  const fields = ref<Map<string, FieldInstance>>(new Map())
  
  // 缓存适配器名称，避免重复计算
  const adapterName = computed(() => resolveAdapter(props.adapter))
  
  // 缓存基础属性，减少对象创建
  const baseProps = computed(() => ({
    model: props.model,
    rules: props.rules,
    fields: props.fields,
    inline: props.inline,
    size: props.size,
    disabled: props.disabled
  }))

  // 将 props 转换为适配不同 UI 库的表单属性
  const formProps = computed(() => {
    // 获取当前适配器
    const adapter = adapterName.value
    
    // 根据适配器类型转换属性
    if (isElementUI(adapter)) {
      // Element Plus 直接使用 labelWidth 和 labelPosition
      return {
        ...baseProps.value,
        labelWidth: props.labelWidth,
        labelPosition: props.labelPosition,
        ...props
      }
    } else if (isAntDesignVue(adapter)) {
      // Ant Design Vue 使用转换函数
      return convertToAntFormProps({
        ...baseProps.value,
        ...props
      } as SmartFormProps)
    }
    
    return {
      ...baseProps.value,
      ...props
    }
  })

  // 注册字段
  const registerField = (field: FieldInstance) => {
    fields.value.set(field.name, field)
  }

  // 注销字段
  const unregisterField = (name: string) => {
    fields.value.delete(name)
  }

  // 验证单个字段
  const validateField = async (name: string): Promise<boolean> => {
    let isDev = false
    try {
      // @ts-ignore - 兼容不同环境
      isDev = (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') ||
              (typeof import.meta !== 'undefined' && import.meta.env?.DEV)
    } catch {
      // 忽略环境检查错误
    }
    
    const field = fields.value.get(name)
    if (!field) {
      if (isDev) {
        console.warn(`Field "${name}" not found`)
      }
      return true
    }

    try {
      const result = await field.validate()
      return result === true
    } catch (error) {
      if (isDev) {
        console.error(`Validation failed for field "${name}":`, error)
      }
      return false
    }
  }

  // 验证整个表单
  const validateForm = async (): Promise<boolean> => {
    let isDev = false
    try {
      // @ts-ignore - 兼容不同环境
      isDev = (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') ||
              (typeof import.meta !== 'undefined' && import.meta.env?.DEV)
    } catch {
      // 忽略环境检查错误
    }
    
    const validationPromises = Array.from(fields.value.values()).map(async (field) => {
      try {
        const result = await field.validate()
        return result === true
      } catch (error) {
        if (isDev) {
          console.error(`Field validation error:`, error)
        }
        return false
      }
    })
    
    const validationResults = await Promise.all(validationPromises)
    return validationResults.every(result => result === true)
  }

  // 重置表单
  const resetForm = () => {
    fields.value.forEach(field => {
      field.reset()
    })
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