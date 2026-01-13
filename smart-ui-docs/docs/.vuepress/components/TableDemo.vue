<template>
  <div class="table-demo-container">
    <div class="table-demo-gradient-bar"></div>
    <h3 class="table-demo-title">智能表格生成</h3>
    <p class="table-demo-description">通过配置生成功能完整的表格，支持分页、选择、排序等高级功能。</p>
    <smart-table
      :data="tableData"
      :columns="tableColumns"
      :adapter="adapter"
      border
      stripe
      highlight-current-row
      :pagination="{
        pageSize: 5,
        total: tableData.length
      }"
      :row-selection="{
        type: 'checkbox',
        onChange: handleTableSelectionChange
      }"
      @sort-change="handleTableSortChange"
      @row-click="handleTableRowClick"
    >
      <!-- 自定义状态列 -->
      <template #status="{ row }">
        <span class="status-badge status-active" v-if="row.status === 'active'">活跃</span>
        <span class="status-badge status-inactive" v-else>禁用</span>
      </template>
      
      <!-- 自定义操作列 -->
      <template #action="{ row }">
        <div class="action-buttons">
          <button @click="handleEdit(row)" class="btn-edit">编辑</button>
          <button @click="handleDelete(row)" class="btn-delete">删除</button>
        </div>
      </template>
    </smart-table>
  </div>
</template>

<script>
import SmartTable  from '../../../../smart-ui/src/components/table/SmartTable.vue'

export default {
  components: {
    SmartTable
  },
  props: {
    adapter: {
      type: String,
      default: 'element'
    }
  },
  data() {
    return {
      // 表格数据
      tableData: [
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', gender: 'male', status: 'active', createdAt: '2023-01-01' },
        { id: 2, name: '李四', age: 30, email: 'lisi@example.com', gender: 'male', status: 'active', createdAt: '2023-02-01' },
        { id: 3, name: '王五', age: 28, email: 'wangwu@example.com', gender: 'female', status: 'inactive', createdAt: '2023-03-01' },
        { id: 4, name: '赵六', age: 35, email: 'zhaoliu@example.com', gender: 'male', status: 'active', createdAt: '2023-04-01' },
        { id: 5, name: '孙七', age: 22, email: 'sunqi@example.com', gender: 'female', status: 'active', createdAt: '2023-05-01' },
        { id: 6, name: '周八', age: 29, email: 'zhouba@example.com', gender: 'male', status: 'inactive', createdAt: '2023-06-01' },
        { id: 7, name: '吴九', age: 32, email: 'wujiu@example.com', gender: 'female', status: 'active', createdAt: '2023-07-01' },
        { id: 8, name: '郑十', age: 26, email: 'zhengshi@example.com', gender: 'male', status: 'active', createdAt: '2023-08-01' }
      ],
      
      // 表格列配置
      tableColumns: [
        { prop: 'id', dataIndex: 'id', label: 'ID', width: 80, align: 'center', sortable: true },
        { prop: 'name', dataIndex: 'name', label: '姓名', width: 120 },
        { prop: 'age', dataIndex: 'age', label: '年龄', width: 80, align: 'center', sortable: true },
        { prop: 'email', dataIndex: 'email', label: '邮箱', minWidth: 200 },
        { prop: 'gender', dataIndex: 'gender', label: '性别', width: 80, align: 'center', formatter: (row) => row.gender === 'male' ? '男' : '女' },
        { prop: 'status', dataIndex: 'status', label: '状态', width: 100, align: 'center', slot: 'status' },
        { prop: 'createdAt', dataIndex: 'createdAt', label: '创建时间', minWidth: 150, align: 'center', sortable: true },
        { prop: 'action', dataIndex: 'action', label: '操作', width: 120, align: 'center', slot: 'action' }
      ]
    }
  },
  methods: {
    // 表格选择变化
    handleTableSelectionChange(selection) {
      console.log('选择变化:', selection)
    },
    
    // 表格排序变化
    handleTableSortChange(sortInfo) {
      console.log('排序变化:', sortInfo)
    },
    
    // 表格行点击
    handleTableRowClick(row, column, index) {
      console.log('行点击:', row, column, index)
    },
    
    // 编辑行
    handleEdit(row) {
      alert(`编辑用户: ${row.name}`)
    },
    
    // 删除行
    handleDelete(row) {
      alert(`删除用户: ${row.name}`)
    }
  }
}
</script>

<style scoped>
/* 容器样式 */
.table-demo-container {
  padding: 28px;
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* 顶部渐变条 */
.table-demo-gradient-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  width: 0;
  background: linear-gradient(90deg, #42b883, #359b70);
  transition: width 0.3s ease;
}

/* 标题样式 */
.table-demo-title {
  margin-top: 0;
  margin-bottom: 16px;
  border-bottom: 2px solid #f0f2f5;
  padding-bottom: 12px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #42b883, #359b70);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 描述文本样式 */
.table-demo-description {
  color: #909399;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.6;
}

/* 状态徽章基础样式 */
.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 活跃状态样式 */
.status-active {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05));
  color: #67c23a;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

/* 禁用状态样式 */
.status-inactive {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05));
  color: #f56c6c;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

/* 操作按钮容器样式 */
.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

/* 编辑按钮样式 */
.btn-edit {
  padding: 6px 16px;
  background: linear-gradient(135deg, #42b883, #359b70);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 删除按钮样式 */
.btn-delete {
  padding: 6px 16px;
  background: linear-gradient(135deg, #f56c6c, #dc2626);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>