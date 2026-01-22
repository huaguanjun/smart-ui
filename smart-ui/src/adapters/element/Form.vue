<template>
  <el-form
    ref="formRef"
    v-bind="formProps"
    class="smart-form-element"
  >
    <el-row :gutter="20">
      <!-- 自动字段 -->
      <template v-if="fields?.length">
        <el-col
          v-for="field in fields"
          :key="field.name"
          :span="field.span ?? itemSpan ?? 24"
        >
          <el-form-item
            :label="field.label"
            :prop="field.name"
            :rules="field.rules ?? rules?.[field.name]"
          >
            <!-- 命名插槽优先 -->
            <slot
              :name="field.name"
              :field="field"
              :model="model"
            >
              <component
                :is="componentMap[field.type as FieldType]"
                v-model="model[field.name]"
                v-bind="getComponentProps(field)"
              >
                <!-- select / radio / checkbox 子节点 -->
                <template v-if="hasOptions(field.type as FieldType)">
                  <component
                    v-for="option in field.options ?? []"
                    :key="option.value"
                    :is="componentChildrenMap[field.type as FieldType]"
                    :label="option.label"
                    :value="option.value"
                    :popper-append-to-body="false"
                  />
                </template>
              </component>
            </slot>
          </el-form-item>
        </el-col>
      </template>

      <!-- 自定义内容 -->
      <el-col :span="24">
        <slot />
      </el-col>
    </el-row>
  </el-form>
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

/* ----------------------------- el-form props ----------------------------- */
/**
 * Element 壳不做跨 UI 逻辑
 * 只负责把 FormEngine 给的 props + attrs 透传给 el-form
 */
const formProps = computed(() => Object.assign({}, attrs, props))

/* ----------------------------- expose api ----------------------------- */

defineExpose({
  validate(callback?: (valid: boolean) => void) {
    return formRef.value?.validate(callback)
  },

  validateField(
    prop: string | string[],
    callback?: (valid: boolean) => void
  ) {
    return formRef.value?.validateField(prop, callback)
  },

  resetFields() {
    formRef.value?.resetFields()
  },

  scrollToField(fieldName: string) {
    formRef.value?.scrollToField(fieldName)
  },

  clearValidate(fieldName?: string) {
    formRef.value?.clearValidate(fieldName)
  },

  fields() {
    return formRef.value?.fields
  },

  getField(fieldName: string) {
    return formRef.value?.getField(fieldName)
  },
  
  setInitialValues(values: Record<string, any>) {
    formRef.value?.setInitialValues(values)
  }
})
</script>

<style scoped>
.smart-form-element {
  width: 100%;
}
</style>
