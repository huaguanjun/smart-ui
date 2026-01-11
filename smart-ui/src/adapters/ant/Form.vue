<template>
  <a-form v-bind="formProps" class="smart-form-ant">
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
                  :is="componentMap[field.type]"
                  v-model:value="model[field.name]"
                  v-bind="getComponentProps(field)"
                >
                  <!-- select / radio / checkbox options -->
                  <template v-if="hasOptions(field.type)">
                    <component
                      v-for="option in field.options ?? []"
                      :key="option.value"
                      :is="componentChildrenMap[field.type]"
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
      <slot />
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FieldConfig } from '../../core/types'
import { antComponentsMap } from './components'

/* -------------------------------- props -------------------------------- */

const props = defineProps<{
  model: Record<string, any>
  fields?: FieldConfig[]
  rules?: Record<string, any[]>
  itemSpan?: number
}>()

const { model, fields, rules, itemSpan } = props

/* ---------------------------- a-form props ----------------------------- */

const formProps = computed(() => ({
  model,
  rules,
  itemSpan,
}))

/* -------------------------- 组件映射定义 -------------------------- */

type FieldType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'switch'
  | 'slider'

// 从 components.ts 中使用组件映射
const componentMap: Record<FieldType, string> = {
  input: antComponentsMap.input.component,
  textarea: antComponentsMap.textarea.component,
  select: antComponentsMap.select.component,
  radio: antComponentsMap.radio.component,
  checkbox: antComponentsMap.checkbox.component,
  date: antComponentsMap.date.component,
  switch: antComponentsMap.switch.component,
  slider: antComponentsMap.slider.component,
}

const componentChildrenMap: Partial<Record<FieldType, string>> = {
  select: antComponentsMap.select.optionsComponent,
  radio: antComponentsMap.radio.optionsComponent,
  checkbox: antComponentsMap.checkbox.optionsComponent,
}

/* ------------------------ 工具函数（关键） ------------------------ */

/**
 * 是否需要 options
 */
function hasOptions(type: FieldType): boolean {
  return type === 'select' || type === 'radio' || type === 'checkbox'
}

/**
 * 提取真正传给 AntD 组件的 props
 * ❗️避免 v-bind="field" 造成 type / name / rules 冲突
 * 使用 components.ts 中定义的 props 函数
 */
function getComponentProps(field: FieldConfig) {
  const config = antComponentsMap[field.type as keyof typeof antComponentsMap]
  if (config && typeof config.props === 'function') {
    return config.props(field)
  }
  
  // 回退逻辑
  const {
    name,
    label,
    rules,
    span,
    options,
    type,
    ...rest
  } = field

  return rest
}
</script>

<style scoped>
.smart-form-ant {
  width: 100%;
}
</style>
