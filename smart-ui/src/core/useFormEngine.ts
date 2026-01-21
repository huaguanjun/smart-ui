/**
 * SmartForm 核心表单引擎
 *
 * Element Plus / Ant Design Vue 共用
 * 负责表单字段注册、属性适配、跨 UI 逻辑统一
 */

import { ref, computed } from 'vue'
import type {
  SmartFormProps,
  FieldInstance,
  FormEngine,
  UIAdapter
} from './types'

import { resolveAdapter } from './common/utils'
import { isElementUI, isAntDesignVue } from './common/adapter'

/* --------------------------------------------------
 * 工具函数
 * -------------------------------------------------- */

/**
 * 将 SmartFormProps 转换为 Ant Design Vue 表单属性
 * ⚠️ 必须是纯函数，不能修改原 props
 */
function convertToAntFormProps(props: SmartFormProps): SmartFormProps {
  const nextProps: SmartFormProps = { ...props }

  if (props.labelWidth && !props.labelCol?.style?.width) {
    const width =
      typeof props.labelWidth === 'number'
        ? `${props.labelWidth}px`
        : props.labelWidth

    nextProps.labelCol = {
      ...props.labelCol,
      style: {
        ...props.labelCol?.style,
        width
      }
    }
  }

  return nextProps
}

/**
 * size 兼容处理
 *
 * Element Plus : large | default | small
 * Ant Design   : large | middle  | small
 */
function normalizeSize(
  adapter: UIAdapter,
  size?: SmartFormProps['sizeType']
) {
  if (!size) return size

  if (isElementUI(adapter) && size === 'middle') return 'default'
  if (isAntDesignVue(adapter) && size === 'default') return 'middle'

  return size
}

/* --------------------------------------------------
 * useFormEngine
 * -------------------------------------------------- */

export function useFormEngine(props: SmartFormProps): FormEngine {
  /* ----------------------------
   * 字段注册表
   * ---------------------------- */
  const fields = ref<Map<string, FieldInstance>>(new Map())

  /* ----------------------------
   * 当前 UI 适配器
   * ---------------------------- */
  const adapter = computed<UIAdapter>(() =>
    resolveAdapter(props.adapter)
  )

  /* ----------------------------
   * 所有 UI 共用的基础属性
   * ---------------------------- */
  const baseProps = computed(() => ({
    model: props.model,
    rules: props.rules,
    fields: props.fields,
    inline: props.inline,
    disabled: props.disabled
  }))

  /* ----------------------------
   * 最终传给 UI Form 的 props
   * ---------------------------- */
  const formProps = computed(() => {
    const currentAdapter = adapter.value
    const size = normalizeSize(currentAdapter, props.size)

    /* Element Plus */
    if (isElementUI(currentAdapter)) {
      return {
        ...props,
        ...baseProps.value,
        size,
        labelWidth: props.labelWidth,
        labelPosition: props.labelPosition
      }
    }

    /* Ant Design Vue */
    if (isAntDesignVue(currentAdapter)) {
      return convertToAntFormProps({
        ...props,
        ...baseProps.value,
        size
      })
    }

    /* 其他 UI（兜底） */
    return {
      ...props,
      ...baseProps.value,
      size
    }
  })

  /* ----------------------------
   * 字段管理
   * ---------------------------- */

  const registerField = (field: FieldInstance) => {
    if (!field?.name) return
    fields.value.set(field.name, field)
  }

  const unregisterField = (name: string) => {
    fields.value.delete(name)
  }

  /* ----------------------------
   * 暴露引擎能力
   * ---------------------------- */
  return {
    formProps,
    registerField,
    unregisterField
  }
}
