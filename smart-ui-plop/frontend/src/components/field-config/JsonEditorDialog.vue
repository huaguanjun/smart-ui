<template>
  <el-dialog
    v-model="visible"
    title="JSON编辑"
    width="700px"
    :body-style="{ padding: '20px' }"
    class="json-dialog"
  >
    <el-input
      v-model="localJsonContent"
      type="textarea"
      rows="12"
      placeholder="请输入字段配置JSON"
      class="json-input"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue';

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  jsonContent: {
    type: String,
    default: ''
  }
});

// Emits
const emit = defineEmits([
  'update:modelValue',
  'save'
]);

// 响应式数据
const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const localJsonContent = ref(props.jsonContent);

// 监听jsonContent变化
watch(() => props.jsonContent, (newContent) => {
  localJsonContent.value = newContent;
});

// 方法
const handleSave = () => {
  emit('save', localJsonContent.value);
  visible.value = false;
};

const handleCancel = () => {
  visible.value = false;
};
</script>

<style scoped>
/* JSON编辑器 */
.json-dialog {
  border-radius: 8px;
  overflow: hidden;
}

.json-input {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.5;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.json-input:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

/* 底部按钮 */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.dialog-footer .el-button {
  transition: all 0.3s ease;
  font-size: 14px;
}

.dialog-footer .el-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dialog-footer {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>