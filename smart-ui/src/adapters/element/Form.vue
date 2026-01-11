<template>
  <el-form v-bind="formProps" class="smart-form-element">
    <el-row :gutter="20">
      <template v-if="fields?.length">
        <el-col
          v-for="field in fields"
          :key="field.name"
          :span="field.span ?? formProps.itemSpan ?? 24"
        >
          <el-form-item
            :label="field.label"
            :prop="field.name"
            :rules="field.rules ?? rules?.[field.name]"
          >
            <!-- 命名插槽优先 -->
            <slot :name="field.name" :field="field" :model="model">
              <!-- 动态组件 -->
              <component
                :is="componentMap[field.type]"
                v-model="model[field.name]"
                v-bind="getComponentProps(field)"
              >
                <!-- select / radio / checkbox 子节点 -->
                <template
                  v-if="hasOptions(field.type)"
                >
                  <component
                    v-for="option in field.options ?? []"
                    :key="option.value"
                    :is="componentChildrenMap[field.type]"
                    :label="option.label"
                    :value="option.value"
                  >
                    {{ field.type === 'select' ? undefined : option.label }}
                  </component>
                </template>
              </component>
            </slot>
          </el-form-item>
        </el-col>
      </template>

      <!-- 自定义内容 -->
      <slot />
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FieldConfig } from '../../core/types'
import { elementComponentsMap } from './components'

/* -------------------------------- props -------------------------------- */

const props = defineProps<{
  model: Record<string, any>
  fields?: FieldConfig[]
  rules?: Record<string, any[]>
  itemSpan?: number
}>()

const { model, fields, rules, itemSpan } = props

/* ---------------------------- el-form props ----------------------------- */

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
  input: elementComponentsMap.input.component,
  textarea: elementComponentsMap.textarea.component,
  select: elementComponentsMap.select.component,
  radio: elementComponentsMap.radio.component,
  checkbox: elementComponentsMap.checkbox.component,
  date: elementComponentsMap.date.component,
  switch: elementComponentsMap.switch.component,
  slider: elementComponentsMap.slider.component,
}

const componentChildrenMap: Partial<Record<FieldType, string>> = {
  select: elementComponentsMap.select.optionsComponent,
  radio: elementComponentsMap.radio.optionsComponent,
  checkbox: elementComponentsMap.checkbox.optionsComponent,
}

/* ------------------------ 工具函数（关键） ------------------------ */

/**
 * 判断字段是否需要 options
 */
function hasOptions(type: FieldType): boolean {
  return type === 'select' || type === 'radio' || type === 'checkbox'
}

/**
 * 提取真正传给组件的 props
 * ❗️避免 v-bind="field" 造成 type / name 等污染
 * 使用 components.ts 中定义的 props 函数
 */
function getComponentProps(field: FieldConfig) {
  const config = elementComponentsMap[field.type as keyof typeof elementComponentsMap]
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

  return {
    ...rest,
    ...(type === 'textarea' ? { type: 'textarea' } : {}),
  }
}
</script>

<style scoped>
.smart-form-element {
  width: 100%;
}
</style>
