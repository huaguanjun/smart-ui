<template>
  <el-form v-bind="formProps" class="smart-form-element" ref="formRef">
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
                    :popper-append-to-body="false"
                  />
                </template>
              </component>
            </slot>
          </el-form-item>
        </el-col>
      </template>

      <!-- 自定义内容 -->
      <slot />
    </el-row>
    
    <!-- 表单操作按钮 -->
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="24" style="text-align: right;">
        <!-- 取消按钮 -->
        <el-button
          v-if="cancelButton.visible !== false"
          :style="cancelButton.style"
          :class="cancelButton.class"
          @click="handleCancel"
          v-bind="cancelButton"
        >
          {{ cancelButton.title ?? '取消' }}
        </el-button>
        
        <!-- 提交按钮 -->
        <el-button
          v-if="submitButton.visible !== false"
          :style="{ ...submitButton.style, marginLeft: '10px' }"
          :class="submitButton.class"
          @click="handleSubmit"
          v-bind="submitButton"
        >
          {{ submitButton.title ?? '提交' }}
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { FieldConfig, ButtonConfig } from '../../core/types'
import { elementComponentsMap } from './components'

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

/* ---------------------------- el-form props ----------------------------- */

const formProps = computed(() => ({
  ...props,
  model,
  rules,
  itemSpan
}))

/* -------------------------- 组件映射定义 -------------------------- */

type FieldType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'select-v2'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'time'
  | 'switch'
  | 'slider'
  | 'mention'
  | 'input-number'
  | 'cascader'
  | 'tree-select'
  | 'upload'
  | 'rate'
  | 'color-picker'
  | 'transfer'
  | 'autocomplete'

// 从 components.ts 中使用组件映射
const componentMap: Record<FieldType, string> = {
  input: elementComponentsMap.input.component,
  textarea: elementComponentsMap.textarea.component,
  select: elementComponentsMap.select.component,
  'select-v2': elementComponentsMap['select-v2'].component,
  radio: elementComponentsMap.radio.component,
  checkbox: elementComponentsMap.checkbox.component,
  date: elementComponentsMap.date.component,
  time: elementComponentsMap.time.component,
  switch: elementComponentsMap.switch.component,
  slider: elementComponentsMap.slider.component,
  mention: elementComponentsMap.mention.component,
  'input-number': elementComponentsMap['input-number'].component,
  cascader: elementComponentsMap.cascader.component,
  'tree-select': elementComponentsMap['tree-select'].component,
  upload: elementComponentsMap.upload.component,
  rate: elementComponentsMap.rate.component,
  'color-picker': elementComponentsMap['color-picker'].component,
  transfer: elementComponentsMap.transfer.component,
  autocomplete: elementComponentsMap.autocomplete.component,
}

const componentChildrenMap: Partial<Record<FieldType, string>> = {
  select: elementComponentsMap.select.optionsComponent,
  'select-v2': elementComponentsMap['select-v2'].optionsComponent,
  radio: elementComponentsMap.radio.optionsComponent,
  checkbox: elementComponentsMap.checkbox.optionsComponent,
}

/* ------------------------ 工具函数（关键） ------------------------ */

/**
 * 判断字段是否需要 options
 */
function hasOptions(type: FieldType): boolean {
  return type === 'select' || type === 'select-v2' || type === 'radio' || type === 'checkbox'
}

/**
 * 提取真正传给组件的 props
 * ❗️避免 v-bind="field" 造成 type / name 等污染
 * 使用 components.ts 中定义的 props 函数
 */
function getComponentProps(field: FieldConfig) {
  const config = elementComponentsMap[field.type as keyof typeof elementComponentsMap]
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

  return {
    ...rest,
    ...(type === 'textarea' ? { type: 'textarea' } : {}),
  }
}

/* ------------------------ 表单操作 ------------------------ */

/**
 * 处理表单提交
 */
async function handleSubmit() {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
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
.smart-form-element {
  width: 100%;
}
</style>
