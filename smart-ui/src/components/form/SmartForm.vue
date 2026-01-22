<template>
  <!-- 动态渲染适配器组件 -->
  <component
    ref="formRef"
    :is="formComponent"
    v-bind="mergedFormProps"
  >
    <!-- 透传所有命名插槽 -->
    <template
      v-for="(_, name) in $slots"
      :key="name"
      #[name]="slotProps"
    >
      <slot
        :name="name"
        v-bind="slotProps"
      />
    </template>

    <!-- 默认插槽 -->
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { useFormEngine } from '../../core/useFormEngine'
import ElementForm from '../../adapters/element/Form.vue'
import AntForm from '../../adapters/ant/Form.vue'
import { resolveAdapter } from '../../core/common/utils'
import type { SmartFormProps } from '../../core/types'

/**
 * SmartForm Props
 */
const props = withDefaults(defineProps<SmartFormProps>(), {
  adapter: undefined,
  model: () => ({}),
  fields: () => [],
})

/**
 * 获取所有未声明为 props 的属性
 */
const attrs = useAttrs()

/**
 * 当前使用的适配器
 */
const currentAdapter = computed(() => resolveAdapter(props.adapter))

/**
 * 表单引擎（UI 无关）
 * 
 * 合并 props 和 attrs，确保所有用户传递的属性都能被正确处理
 */
const {
  formProps,
  registerField,
  unregisterField
} = useFormEngine(Object.assign({}, props, attrs))
/**
 * 底层表单组件引用
 */
const formRef = ref<any>(null)

/**
 * 根据 adapter 选择表单实现
 */
const formComponent = computed(() => {
  return currentAdapter.value === 'ant'
    ? AntForm
    : ElementForm
})

const mergedFormProps = computed(() => Object.assign({}, formProps.value, {
  class: 'smart-form'
}))


/**
 * 对外暴露能力
 * 
 * 根据当前使用的 UI 库，暴露相应的方法
 */
function call(method: string, ...args: any[]) {
  const form = formRef.value as any
  return form?.[method]?.(...args)
}

defineExpose({
  // 通用
  registerField,
  unregisterField,

  validate: (...args: any[]) => call('validate', ...args),
  validateField: (...args: any[]) => call('validateField', ...args),
  resetFields: (...args: any[]) => call('resetFields', ...args),
  scrollToField: (...args: any[]) => call('scrollToField', ...args),
  clearValidate: (...args: any[]) => call('clearValidate', ...args),

  // Element Plus only
  fields: () =>
    currentAdapter.value === 'element'
      ? call('fields')
      : undefined,

  getField: (name: string) =>
    currentAdapter.value === 'element'
      ? call('getField', name)
      : undefined,

  setInitialValues: (values: any) =>
    currentAdapter.value === 'element'
      ? call('setInitialValues', values)
      : undefined
})

</script>

<script lang="ts">
export default {
  name: 'SmartForm'
}
</script>

<style scoped>
.smart-form {
  width: 100%;
}
</style>
