<template>
  <a-form
    :model="form"
    :rules="rules"
    ref="formRef"
    :scroll-to-first-error="true"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item label="用户名" name="username">
      <a-input v-model:value="form.username" />
    </a-form-item>

    <a-form-item label="邮箱" name="email">
      <a-input v-model:value="form.email" />
    </a-form-item>

    <a-button type="primary" html-type="submit">提交</a-button>
  </a-form>
</template>

<script setup>
import { reactive, ref } from 'vue'

const formRef = ref()
const form = reactive({
  username: '',
  email: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '邮箱格式不正确' }
  ]
}

const onFinish = (values) => {
  console.log('Success:', values)
}

const onFinishFailed = () => {
  // 此时如果 scrollToFirstError=true，页面会自动滚动到第一个错误字段
}
</script>