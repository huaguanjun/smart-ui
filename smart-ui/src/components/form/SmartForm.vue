<template>
  <!-- 动态渲染适配器组件 -->
  <component
    :is="formComponent"
    v-bind="mergedFormProps"
    @submit="handleSubmit"
    @cancel="handleCancel"
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
import { computed } from 'vue'
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
  submitButton: () => ({ visible: true, text: '提交', type: 'primary' }),
  cancelButton: () => ({ visible: true, text: '取消', type: 'default' })
})

/**
 * SmartForm Events
 */
const emit = defineEmits<{
  (e: 'submit', isValid: boolean, model: Record<string, any>): void
  (e: 'cancel'): void
}>()

/**
 * 当前使用的适配器
 */
const currentAdapter = computed(() => resolveAdapter(props.adapter))

/**
 * 表单引擎（UI 无关）
 */
const {
  formProps,
  registerField,
  unregisterField,
  validateField,
  validateForm
} = useFormEngine(props)

/**
 * 根据 adapter 选择表单实现
 */
const formComponent = computed(() => {
  return currentAdapter.value === 'ant'
    ? AntForm
    : ElementForm
})

const mergedFormProps = computed(() => ({
  ...formProps.value,
  class: 'smart-form',
  submitButton: props.submitButton,
  cancelButton: props.cancelButton
}))

/**
 * 提交事件处理
 */
const handleSubmit = (isValid: boolean) => {
  emit('submit', isValid, props.model)
}

/**
 * 取消事件处理
 */
const handleCancel = () => {
  emit('cancel')
}

/**
 * 对外暴露能力
 */
defineExpose({
  registerField,
  unregisterField,
  validateField,
  validateForm
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
