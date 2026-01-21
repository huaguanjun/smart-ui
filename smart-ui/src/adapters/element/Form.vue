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
      <el-col>
        <slot />
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { 
  FieldType, 
  componentMap, 
  componentChildrenMap, 
  hasOptions, 
  getComponentProps 
} from "./utils";

/* -------------------------------- props -------------------------------- */

import type { SmartFormProps } from "../../core/types";

const props = defineProps<SmartFormProps>();

const { model, fields, rules, itemSpan } = props;

/* ---------------------------- form ref ----------------------------- */

const formRef = ref<any>(null);

/* ---------------------------- el-form props ----------------------------- */

const formProps = computed(() => ({
  ...props,
  model,
  rules,
  itemSpan,
}));

/* ------------------------ 表单操作 ------------------------ */

/**
 * 暴露表单实例方法
 */
defineExpose({
  validate: (callback?: (valid: boolean) => void) =>
    formRef.value?.validate(callback),
  validateField: (
    prop: string | string[],
    callback?: (valid: boolean) => void
  ) => formRef.value?.validateField(prop, callback),
  resetFields: () => formRef.value?.resetFields(),
});
</script>

<style scoped>
.smart-form-element {
  width: 100%;
}
</style>
