<template>
  <a-form
    ref="formRef"
    v-bind="formProps"
    class="smart-form-ant"
  >
    <a-row>
      <!-- 自动字段 -->
      <template v-if="fields?.length">
        <a-col
          v-for="field in fields"
          :key="field.name"
          :span="field.span ?? itemSpan ?? 24"
        >
          <a-form-item
            :label="field.label"
            :name="field.name"
            :rules="field.rules ?? rules?.[field.name]"
          >
            <!-- 命名插槽优先 -->
            <slot
              :name="field.name"
              :field="field"
              :model="model"
            >
              <!-- Switch（checked） -->
              <a-switch
                v-if="field.type === 'switch'"
                v-model:checked="model[field.name]"
                v-bind="getComponentProps(field)"
              />

              <!-- 其他组件（value） -->
              <component
                v-else
                :is="componentMap[field.type as FieldType]"
                v-model:value="model[field.name]"
                v-bind="getComponentProps(field)"
              >
                <!-- options -->
                <template v-if="hasOptions(field.type as FieldType)">
                  <component
                    v-for="option in field.options ?? []"
                    :key="option.value"
                    :is="componentChildrenMap[field.type as FieldType]"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </component>
                </template>
              </component>
            </slot>
          </a-form-item>
        </a-col>
      </template>

      <!-- 自定义内容 -->
      <a-col :span="24">
        <slot />
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import type { SmartFormProps } from '../../core/types'
import {
  FieldType,
  componentMap,
  componentChildrenMap,
  hasOptions,
  getComponentProps
} from './utils'

/* -------------------------------- props -------------------------------- */

const props = defineProps<SmartFormProps>()
const attrs = useAttrs()

const { model, fields, rules, itemSpan } = props

/* -------------------------------- refs -------------------------------- */

const formRef = ref<any>(null)

/* ----------------------------- a-form props ----------------------------- */
/**
 * 只负责透传 Ant Design Form 需要的 props
 * SmartForm 的跨 UI 逻辑由 FormEngine 处理
 */
const formProps = computed(() => Object.assign({}, attrs, props))

/* ----------------------------- expose api ----------------------------- */

defineExpose({
  async validate() {
    try {
      await formRef.value?.validateFields()
      return true
    } catch {
      return false
    }
  },

  async validateField(name: string) {
    try {
      await formRef.value?.validateFields([name])
      return true
    } catch {
      return false
    }
  },

  resetFields() {
    formRef.value?.resetFields()
  },
  scrollToField(fieldName: string) {
    formRef.value?.scrollToField(fieldName)
  },
  clearValidate(fieldName?: string) {
    formRef.value?.clearValidate(fieldName)
  }
})
</script>

<style scoped>
.smart-form-ant {
  width: 100%;
}
</style>
