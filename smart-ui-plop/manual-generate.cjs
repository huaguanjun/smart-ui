#!/usr/bin/env node

/**
 * 手动生成文件脚本（CommonJS 版本）
 * 绕过 plop 命令的 Node.js 版本兼容性问题
 * 直接使用模板文件生成代码
 */

const { dirname, join } = require('path');
const { existsSync, mkdirSync, writeFileSync, readFileSync } = require('fs');

// 在 CommonJS 模块中，__dirname 是全局变量，不需要手动声明

/**
 * 生成页面
 * @param {Object} options 生成选项
 * @param {string} options.name 页面名称
 * @param {string} options.apiUrl API地址
 * @param {boolean} options.hasSearchForm 是否需要搜索表单
 * @param {boolean} options.hasTable 是否需要表格
 * @param {boolean} options.hasForm 是否需要表单
 * @param {Array} options.fields 字段配置
 */
async function manualGeneratePage(options) {
  try {
    console.log('开始手动生成页面...');
    console.log('生成选项:', options);
    
    const { name, apiUrl, hasSearchForm, hasTable, hasForm, fields = [] } = options;
    
    // 生成 kebab-case 名称
    const kebabCaseName = name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    
    // 确保 views 目录存在
    const viewsDir = join(__dirname, 'src/views');
    if (!existsSync(viewsDir)) {
      mkdirSync(viewsDir, { recursive: true });
    }
    
    // 确保页面目录存在
    const pageDir = join(viewsDir, name);
    if (!existsSync(pageDir)) {
      mkdirSync(pageDir, { recursive: true });
    }
    
    // 生成结果
    const result = {
      changes: [],
      failures: []
    };
    
    // 1. 生成页面主文件
    try {
      const pageContent = generatePageContent(name, apiUrl, hasSearchForm, hasTable, hasForm, fields);
      const pagePath = join(pageDir, 'index.vue');
      writeFileSync(pagePath, pageContent, 'utf8');
      result.changes.push({ type: 'add', path: pagePath });
      console.log(`✓ 生成页面主文件: ${pagePath}`);
    } catch (error) {
      result.failures.push({ path: `src/views/${name}/index.vue`, error: error.message });
      console.error(`✗ 生成页面主文件失败: ${error.message}`);
    }
    
    // 2. 生成表格组件
    if (hasTable) {
      try {
        const tableContent = generateTableContent(name, apiUrl, fields);
        const tablePath = join(pageDir, `${name}Table.vue`);
        writeFileSync(tablePath, tableContent, 'utf8');
        result.changes.push({ type: 'add', path: tablePath });
        console.log(`✓ 生成表格组件: ${tablePath}`);
      } catch (error) {
        result.failures.push({ path: `src/views/${name}/${name}Table.vue`, error: error.message });
        console.error(`✗ 生成表格组件失败: ${error.message}`);
      }
    }
    
    // 3. 生成表单组件
    if (hasForm) {
      try {
        const formContent = generateFormContent(name, fields);
        const formPath = join(pageDir, `${name}Form.vue`);
        writeFileSync(formPath, formContent, 'utf8');
        result.changes.push({ type: 'add', path: formPath });
        console.log(`✓ 生成表单组件: ${formPath}`);
      } catch (error) {
        result.failures.push({ path: `src/views/${name}/${name}Form.vue`, error: error.message });
        console.error(`✗ 生成表单组件失败: ${error.message}`);
      }
    }
    
    // 4. 生成搜索表单组件
    if (hasSearchForm) {
      try {
        const searchFormContent = generateSearchFormContent(name, fields);
        const searchFormPath = join(pageDir, `${name}SearchForm.vue`);
        writeFileSync(searchFormPath, searchFormContent, 'utf8');
        result.changes.push({ type: 'add', path: searchFormPath });
        console.log(`✓ 生成搜索表单组件: ${searchFormPath}`);
      } catch (error) {
        result.failures.push({ path: `src/views/${name}/${name}SearchForm.vue`, error: error.message });
        console.error(`✗ 生成搜索表单组件失败: ${error.message}`);
      }
    }
    
    // 5. 更新路由配置
    try {
      updateRouterConfig(name, kebabCaseName);
      const routerPath = join(__dirname, 'src/router/index.js');
      result.changes.push({ type: 'modify', path: routerPath });
      console.log(`✓ 更新路由配置: ${routerPath}`);
    } catch (error) {
      result.failures.push({ path: 'src/router/index.js', error: error.message });
      console.error(`✗ 更新路由配置失败: ${error.message}`);
    }
    
    console.log('\n生成结果:');
    console.log('成功生成:', result.changes.length, '个文件');
    console.log('失败:', result.failures.length, '个文件');
    
    console.log('\n页面生成完成！');
    return result;
  } catch (error) {
    console.error('生成失败:', error);
    throw error;
  }
}

/**
 * 生成页面主文件内容
 */
function generatePageContent(name, apiUrl, hasSearchForm, hasTable, hasForm, fields) {
  return `<!-- ${name} 页面 -->
<template>
  <div class="${name.toLowerCase()}-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <el-icon><Grid /></el-icon>
          <span>${name}</span>
        </div>
      </template>
      
      <!-- 搜索表单 -->
      ${hasSearchForm ? `<${name}SearchForm @search="handleSearch" />` : ''}
      
      <!-- 操作按钮 -->
      <div class="page-actions">
        ${hasForm ? `<el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          新增
        </el-button>` : ''}
      </div>
      
      <!-- 表格 -->
      ${hasTable ? `<${name}Table
        :data="tableData"
        :loading="loading"
        @edit="handleEdit"
        @delete="handleDelete"
      />` : ''}
      
      <!-- 分页 -->
      ${hasTable ? `<div class="page-pagination">
        <el-pagination
          v-model:current-page="pagination.current"
          v-model:page-size="pagination.size"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>` : ''}
    </el-card>
    
    <!-- 表单对话框 -->
    ${hasForm ? `<${name}Form
      v-model:visible="formVisible"
      :data="formData"
      @save="handleSave"
    />` : ''}
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Grid, Plus, Edit, Delete } from '@element-plus/icons-vue';
${hasSearchForm ? `import ${name}SearchForm from './${name}SearchForm.vue';` : ''}
${hasTable ? `import ${name}Table from './${name}Table.vue';` : ''}
${hasForm ? `import ${name}Form from './${name}Form.vue';` : ''}

// 响应式数据
const loading = ref(false);
const tableData = ref([]);
const formVisible = ref(false);
const formData = ref({});

// 分页
const pagination = reactive({
  current: 1,
  size: 10,
  total: 0
});

// 搜索参数
const searchParams = reactive({});

// 生命周期
onMounted(() => {
  fetchData();
});

// 方法
const fetchData = async () => {
  loading.value = true;
  try {
    // 模拟 API 调用
    // 实际项目中替换为真实 API 请求
    const response = await fetch('${apiUrl}', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        ...searchParams,
        page: pagination.current,
        size: pagination.size
      }
    });
    const data = await response.json();
    tableData.value = data.items;
    pagination.total = data.total;
  } catch (error) {
    ElMessage.error('获取数据失败');
    console.error('获取数据失败:', error);
  } finally {
    loading.value = false;
  }
};

const handleSearch = (params) => {
  searchParams = { ...params };
  pagination.current = 1;
  fetchData();
};

const handleAdd = () => {
  formData.value = {};
  formVisible.value = true;
};

const handleEdit = (row) => {
  formData.value = { ...row };
  formVisible.value = true;
};

const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 模拟删除操作
    ElMessage.success('删除成功');
    fetchData();
  }).catch(() => {
    // 取消删除
  });
};

const handleSave = async (data) => {
  try {
    // 模拟保存操作
    ElMessage.success('保存成功');
    formVisible.value = false;
    fetchData();
  } catch (error) {
    ElMessage.error('保存失败');
    console.error('保存失败:', error);
  }
};

const handleSizeChange = (size) => {
  pagination.size = size;
  fetchData();
};

const handleCurrentChange = (current) => {
  pagination.current = current;
  fetchData();
};
</script>

<style scoped>
.${name.toLowerCase()}-page {
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}

.page-actions {
  margin: 16px 0;
  display: flex;
  gap: 12px;
}

.page-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>`;
}

/**
 * 生成表格组件内容
 */
function generateTableContent(name, apiUrl, fields) {
  const tableFields = fields.filter(field => field.table);
  
  return `<!-- ${name} 表格组件 -->
<template>
  <el-table :data="data" :loading="loading" style="width: 100%">
    ${tableFields.map(field => `
    <el-table-column prop="${field.field}" label="${field.label}" width="180">
      <template #default="scope">
        {{ scope.row.${field.field} }}
      </template>
    </el-table-column>`).join('')}
    
    <!-- 操作列 -->
    <el-table-column label="操作" width="180" fixed="right">
      <template #default="scope">
        <el-button type="primary" link @click="$emit('edit', scope.row)">
          <el-icon><Edit /></el-icon>
          编辑
        </el-button>
        <el-button type="danger" link @click="$emit('delete', scope.row)">
          <el-icon><Delete /></el-icon>
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';

// Props
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

// Emits
const emit = defineEmits(['edit', 'delete']);
</script>

<style scoped>
/* 表格样式 */
</style>`;
}

/**
 * 生成表单组件内容
 */
function generateFormContent(name, fields) {
  const formFields = fields.filter(field => field.form);
  
  return `<!-- ${name} 表单组件 -->
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
      ${formFields.map(field => `
      <el-form-item label="${field.label}" prop="${field.field}">
        ${field.type === 'select' ? `
        <el-select v-model="formData.${field.field}" placeholder="请选择${field.label}">
          ${field.options?.map(option => `<el-option label="${option.label}" value="${option.value}" />`).join('')}
        </el-select>` : `
        <el-input v-model="formData.${field.field}" placeholder="请输入${field.label}" />
        `}
      </el-form-item>`).join('')}
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
  ${formFields.map(field => `
  ${field.field}: [
    { required: true, message: '请输入${field.label}', trigger: 'blur' }
  ]`).join(',')}
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
</style>`;
}

/**
 * 生成搜索表单组件内容
 */
function generateSearchFormContent(name, fields) {
  const searchFields = fields.filter(field => field.search);
  
  return `<!-- ${name} 搜索表单组件 -->
<template>
  <el-form
    :model="searchForm"
    :inline="true"
    class="search-form"
  >
    ${searchFields.map(field => `
    <el-form-item label="${field.label}">
      ${field.type === 'select' ? `
      <el-select v-model="searchForm.${field.field}" placeholder="请选择${field.label}" clearable>
        ${field.options?.map(option => `<el-option label="${option.label}" value="${option.value}" />`).join('')}
      </el-select>` : `
      <el-input v-model="searchForm.${field.field}" placeholder="请输入${field.label}" clearable />
      `}
    </el-form-item>`).join('')}
    
    <el-form-item>
      <el-button type="primary" @click="handleSearch">
        <el-icon><Search /></el-icon>
        搜索
      </el-button>
      <el-button @click="handleReset">
        <el-icon><Refresh /></el-icon>
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, defineEmits } from 'vue';
import { Search, Refresh } from '@element-plus/icons-vue';

// Emits
const emit = defineEmits(['search']);

// 响应式数据
const searchForm = reactive({
  ${searchFields.map(field => `
  ${field.field}: ''`).join(',')}
});

// 方法
const handleSearch = () => {
  emit('search', { ...searchForm });
};

const handleReset = () => {
  Object.keys(searchForm).forEach(key => {
    searchForm[key] = '';
  });
  emit('search', { ...searchForm });
};
</script>

<style scoped>
.search-form {
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 8px;
}
</style>`;
}

/**
 * 更新路由配置
 */
function updateRouterConfig(name, kebabCaseName) {
  const routerPath = join(__dirname, 'src/router/index.js');
  
  // 确保 router 目录存在
  const routerDir = dirname(routerPath);
  if (!existsSync(routerDir)) {
    mkdirSync(routerDir, { recursive: true });
  }
  
  // 读取或创建路由文件
  let routerContent = '';
  if (existsSync(routerPath)) {
    routerContent = readFileSync(routerPath, 'utf8');
  } else {
    routerContent = `import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  // 自动生成路由 - 开始
  // 自动生成路由 - 结束
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
`;
  }
  
  // 检查是否已经存在该路由
  if (routerContent.includes(`path: '/${kebabCaseName}'`)) {
    console.log(`路由 ${kebabCaseName} 已存在，跳过更新`);
    return;
  }
  
  // 更新路由配置
  const updatedContent = routerContent.replace(
    /(\/\/ 自动生成路由 - 开始)[\s\S]*(\/\/ 自动生成路由 - 结束)/g,
    `$1
  {
    path: '/${kebabCaseName}',
    name: '${name}',
    component: () => import('../views/${name}/index.vue'),
    meta: {
      title: '${name}'
    }
  },
$2`
  );
  
  writeFileSync(routerPath, updatedContent, 'utf8');
}

// 如果直接运行脚本，使用默认参数生成测试页面
if (require.main === module) {
  manualGeneratePage({
    name: 'TestPage',
    apiUrl: '/api/test/list',
    hasSearchForm: true,
    hasTable: true,
    hasForm: true,
    fields: [
      {
        label: 'ID',
        field: 'id',
        type: 'input',
        search: true,
        table: true,
        form: false
      },
      {
        label: 'Name',
        field: 'name',
        type: 'input',
        search: true,
        table: true,
        form: true
      },
      {
        label: 'Status',
        field: 'status',
        type: 'select',
        search: true,
        table: true,
        form: true,
        options: [
          { label: '启用', value: 'enabled' },
          { label: '禁用', value: 'disabled' }
        ]
      }
    ]
  }).catch(console.error);
}

module.exports = { manualGeneratePage };
