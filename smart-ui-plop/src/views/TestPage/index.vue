<!-- TestPage 页面 -->
<template>
  <div class="testpage-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <el-icon><Grid /></el-icon>
          <span>TestPage</span>
        </div>
      </template>
      
      <!-- 搜索表单 -->
      <TestPageSearchForm @search="handleSearch" />
      
      <!-- 操作按钮 -->
      <div class="page-actions">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          新增
        </el-button>
      </div>
      
      <!-- 表格 -->
      <TestPageTable
        :data="tableData"
        :loading="loading"
        @edit="handleEdit"
        @delete="handleDelete"
      />
      
      <!-- 分页 -->
      <div class="page-pagination">
        <el-pagination
          v-model:current-page="pagination.current"
          v-model:page-size="pagination.size"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    
    <!-- 表单对话框 -->
    <TestPageForm
      v-model:visible="formVisible"
      :data="formData"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Grid, Plus, Edit, Delete } from '@element-plus/icons-vue';
import TestPageSearchForm from './TestPageSearchForm.vue';
import TestPageTable from './TestPageTable.vue';
import TestPageForm from './TestPageForm.vue';

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
    const response = await fetch('/api/test/list', {
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
.testpage-page {
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
</style>