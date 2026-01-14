/**
 * SmartForm 核心表单引擎
 * 
 * 这是 Element Plus 和 Ant Design Vue 共用的表单引擎，负责处理跨 UI 库的表单逻辑
 * - 提供统一的字段验证机制
 * - 处理不同 UI 库之间的属性兼容
 * - 实现表单字段的注册、注销和验证
 * - 支持表单重置功能
 */
import { ref, computed } from 'vue'
import type { SmartFormProps, FieldInstance, FormEngine, UIAdapter } from './types'
import { resolveAdapter } from './common/utils'
import { isElementUI, isAntDesignVue } from './common/adapter'

/**
 * Ant Design Vue 表单属性类型
 * 
 * 用于将 SmartFormProps 转换为 Ant Design Vue 特有的表单属性
 */
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
 * Element Plus 表单属性类型
 * 
 * Element Plus 表单属性直接使用 SmartFormProps，不需要额外转换
 * 所以这里不需要单独定义 ElementFormProps 接口
 */

/**
 * 将 SmartFormProps 转换为 Ant Design Vue 表单属性
 * 
 * @param props SmartForm 通用属性
 * @returns 转换后的 Ant Design Vue 表单属性
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

  // 处理 labelWidth 转换为 labelCol.style.width
  // Element Plus 使用 labelWidth，Ant Design Vue 使用 labelCol.style.width
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

  // 处理 labelPosition 转换为 labelAlign
  // Element Plus 使用 labelPosition，Ant Design Vue 使用 labelAlign
  if (props.labelPosition) {
    antProps.labelAlign = props.labelPosition as 'left' | 'right' | 'top'
  }

  return antProps
}

/**
 * 转换 size 属性为当前 UI 适配器对应值
 * 
 * @param adapter 当前 UI 适配器
 * @param size 原始 size 值
 * @returns 转换后的 size 值
 * 
 * @description
 * Element Plus 和 Ant Design Vue 在 size 属性上存在差异：
 * - Element Plus 使用：large / default / small
 * - Ant Design Vue 使用：large / middle / small
 * 
 * 转换规则：
 * - 当使用 Element Plus 适配器时，将 'middle' 转换为 'default'
 * - 当使用 Ant Design Vue 适配器时，将 'default' 转换为 'middle'
 * - 其他情况保持不变
 */
function normalizeSize(adapter: UIAdapter, size?: SmartFormProps['sizeType']) {
  if (!size) return size
  if (isElementUI(adapter) && size === 'middle') return 'default'
  if (isAntDesignVue(adapter) && size === 'default') return 'middle'
  return size
}

/**
 * useFormEngine - 表单引擎 Hook
 * 
 * 提供跨 UI 库的表单核心逻辑，包括字段验证、注册、注销和重置等功能
 * 
 * @param props SmartForm 通用属性
 * @returns 表单引擎实例
 */
export function useFormEngine(props: SmartFormProps): FormEngine {
  // 存储已注册的字段实例
  const fields = ref<Map<string, FieldInstance>>(new Map())

  // 缓存适配器名称，避免重复计算
  const adapterName = computed(() => resolveAdapter(props.adapter))

  // 环境标识，用于开发环境的调试信息
  const isDev = (() => {
    return typeof import.meta !== 'undefined' && !!import.meta.env?.DEV
  })()

  // 基础属性缓存，减少重复创建对象
  const baseProps = computed(() => ({
    model: props.model,
    rules: props.rules,
    fields: props.fields,
    inline: props.inline,
    size: props.size,
    disabled: props.disabled
  }))

  /**
   * 根据不同 UI 适配器计算表单属性
   * 
   * @returns 适配后的表单属性对象
   * 
   * @description
   * - Element Plus: 返回包含 labelWidth、labelPosition 等原生属性
   * - Ant Design Vue: 返回经过 convertToAntFormProps 转换后的属性
   * - 其他适配器: 返回基础属性 + 自定义属性
   */
  const formProps = computed(() => {
    const adapter = adapterName.value
    // 处理 size 属性兼容
    const size = normalizeSize(adapter, props.size)

    // Element Plus 直接返回原生属性
    if (isElementUI(adapter)) {
      return {
        ...baseProps.value,
        labelWidth: props.labelWidth,
        labelPosition: props.labelPosition,
        size
      }
    }

    // Ant Design Vue 需要转换属性
    if (isAntDesignVue(adapter)) {
      return convertToAntFormProps({ ...baseProps.value, ...props, size })
    }

    // 其他适配器返回基础属性 + 自定义属性
    return { ...baseProps.value, ...props, size }
  })

  /**
   * 注册表单字段
   * 
   * @param field 字段实例
   */
  const registerField = (field: FieldInstance) => {
    fields.value.set(field.name, field)
  }

  /**
   * 注销表单字段
   * 
   * @param name 字段名称
   */
  const unregisterField = (name: string) => {
    fields.value.delete(name)
  }

  // 返回表单引擎实例
  return {
    formProps,
    registerField,
    unregisterField
  }
}
