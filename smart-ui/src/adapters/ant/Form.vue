<template>
  <a-form v-bind="formProps" class="smart-form-ant" ref="formRef">
    <a-row>
      <template v-if="fields?.length">
        <a-col
          v-for="field in fields"
          :key="field.name"
          :span="field.span ?? formProps.itemSpan ?? 24"
        >
          <a-form-item
            :label="field.label"
            :name="field.name"
            :rules="field.rules ?? rules?.[field.name]"
          >
            <!-- 命名插槽优先 -->
            <slot :name="field.name" :field="field" :model="model">
              <!-- switch 单独处理（checked） -->
              <template v-if="field.type === 'switch'">
                <a-switch
                  v-model:checked="model[field.name]"
                  v-bind="getComponentProps(field)"
                />
              </template>

              <!-- 其他组件（value） -->
              <template v-else>
                <component
                  :is="componentMap[field.type as FieldType]"
                  v-model:value="model[field.name]"
                  v-bind="getComponentProps(field)"
                >
                  <!-- select / radio / checkbox options -->
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
              </template>
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
import { computed, ref } from 'vue'
import { 
  FieldType, 
  componentMap, 
  componentChildrenMap, 
  hasOptions, 
  getComponentProps 
} from './utils'

/* -------------------------------- props -------------------------------- */

import type { SmartFormProps } from "../../core/types";

const props = defineProps<SmartFormProps>();
console.log('AntForm props:', props)
const { model, fields, rules, itemSpan } = props

/* ---------------------------- form ref ----------------------------- */

const formRef = ref<any>(null)

/* ---------------------------- a-form props ----------------------------- */

const formProps = computed(() => ({
  ...props,
  model,
  rules,
  itemSpan,
}))

/* ------------------------ 表单操作 ------------------------ */

/**
 * 暴露表单实例方法
 */
defineExpose({
  validate: async () => {
    try {
      await formRef.value.validateFields()
      return true
    } catch (error) {
      return false
    }
  },
  validateField: async (name: string) => {
    try {
      await formRef.value.validateFields([name])
      return true
    } catch (error) {
      return false
    }
  },
  resetFields: () => formRef.value?.resetFields()
})
</script>

<style scoped>
.smart-form-ant {
  width: 100%;
}
</style>
