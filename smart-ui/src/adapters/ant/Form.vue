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
    
    <!-- 表单操作按钮 -->
    <a-row style="margin-top: 20px;">
      <a-col :span="24" style="text-align: right;">
        <!-- 取消按钮 -->
        <a-button
          v-if="cancelButton.visible !== false"
          :type="cancelButton.type ?? 'default'"
          :size="cancelButton.size"
          :style="cancelButton.style"
          :class="cancelButton.class"
          @click="handleCancel"
          v-bind="cancelButton"
        >
          {{ cancelButton.title ?? '取消' }}
        </a-button>
        
        <!-- 提交按钮 -->
        <a-button
          v-if="submitButton.visible !== false"
          :type="submitButton.type ?? 'primary'"
          :size="submitButton.size"
          :style="{ ...submitButton.style, marginLeft: '10px' }"
          :class="submitButton.class"
          @click="handleSubmit"
          v-bind="submitButton"
        >
          {{ submitButton.title ?? '提交' }}
        </a-button>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { FieldConfig, ButtonConfig } from '../../core/types'
import { antComponentsMap } from './components'

/* -------------------------------- props -------------------------------- */

const props = defineProps<{
  model: Record<string, any>
  fields?: FieldConfig[]
  rules?: Record<string, any[]>
  itemSpan?: number
  submitButton?: ButtonConfig
  cancelButton?: ButtonConfig
  [key: string]: any
}>()

const { model, fields, rules, itemSpan, submitButton = {}, cancelButton = {} } = props

/* ---------------------------- emit events ---------------------------- */

const emit = defineEmits<{
  (e: 'submit', isValid: boolean, model: Record<string, any>): void
  (e: 'cancel'): void
}>()

/* ---------------------------- form ref ----------------------------- */

const formRef = ref<any>(null)

/* ---------------------------- a-form props ----------------------------- */

const formProps = computed(() => ({
  ...props,
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
  if (config && typeof (config as any).props === 'function') {
    return typeof (config as any).props === 'function' ? (config as any).props(field) : {}
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

/* ------------------------ 表单操作 ------------------------ */

/**
 * 处理表单提交
 */
async function handleSubmit() {
  if (!formRef.value) return
  
  try {
    await formRef.value.validateFields()
    emit('submit', true, model)
  } catch (error) {
    emit('submit', false, model)
  }
}

/**
 * 处理表单取消
 */
function handleCancel() {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  emit('cancel')
}
</script>

<style scoped>
.smart-form-ant {
  width: 100%;
}
</style>
