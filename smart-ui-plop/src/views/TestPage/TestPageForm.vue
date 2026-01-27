<!-- TestPage 表单组件 -->
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="500px"
    destroy-on-close
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      
      <el-form-item label="Name" prop="name">
        
        <el-input v-model="formData.name" placeholder="请输入Name" />
        
      </el-form-item>
      <el-form-item label="Status" prop="status">
        
        <el-select v-model="formData.status" placeholder="请选择Status">
          <el-option label="启用" value="enabled" /><el-option label="禁用" value="disabled" />
        </el-select>
      </el-form-item>
    </el-form>
    
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, watch, defineProps, defineEmits } from 'vue';
import { ElMessage } from 'element-plus';

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {}
  }
});

// Emits
const emit = defineEmits(['update:visible', 'save']);

// 响应式数据
const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
});

const formRef = ref(null);
const formData = reactive({});

// 计算属性
const dialogTitle = computed(() => {
  return props.data.id ? '编辑' : '新增';
});

// 表单规则
const rules = reactive({
  
  name: [
    { required: true, message: '请输入Name', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请输入Status', trigger: 'blur' }
  ]
});

// 监听数据变化
watch(() => props.data, (newData) => {
  Object.assign(formData, newData);
}, { deep: true, immediate: true });

// 方法
const handleSave = async () => {
  if (!formRef.value) return;
  
  try {
    await formRef.value.validate();
    emit('save', { ...formData });
    dialogVisible.value = false;
  } catch (error) {
    ElMessage.error('请检查表单数据');
  }
};

const handleCancel = () => {
  dialogVisible.value = false;
};
</script>

<style scoped>
/* 表单样式 */
</style>