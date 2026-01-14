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
import { computed, ref } from 'vue'
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
 * 当前使用的适配器
 */
const currentAdapter = computed(() => resolveAdapter(props.adapter))

/**
 * 表单引擎（UI 无关）
 */
const {
  formProps,
  registerField,
  unregisterField
} = useFormEngine(props)

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

const mergedFormProps = computed(() => ({
  ...formProps.value,
  class: 'smart-form',
  submitButton: props.submitButton,
  cancelButton: props.cancelButton
}))



/**
 * 验证整个表单
 */
const validateForm = async (): Promise<boolean> => {
  if (!formRef.value) return true
  
  try {
    return await formRef.value.validate()
  } catch (error) {
    return false
  }
}

/**
 * 验证单个字段
 */
const validateField = async (name: string): Promise<boolean> => {
  if (!formRef.value) return true
  
  try {
    return await formRef.value.validateField(name)
  } catch (error) {
    return false
  }
}

/**
 * 重置表单
 */
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

/**
 * 对外暴露能力
 */
defineExpose({
  registerField,
  unregisterField,
  validateField,
  validateForm,
  resetForm
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
