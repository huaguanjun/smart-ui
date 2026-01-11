# SmartTable 组件

SmartTable 是 Smart UI 的核心组件之一，它可以通过简单的 JS 配置自动生成复杂的表格。

## 基本用法

```vue
<template>
  <smart-table
    :data="tableData"
    :columns="columns"
  ></smart-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 表格数据
const tableData = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', gender: 'male', status: 'active' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com', gender: 'male', status: 'active' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com', gender: 'female', status: 'inactive' },
  { id: 4, name: '赵六', age: 35, email: 'zhaoliu@example.com', gender: 'male', status: 'active' },
  { id: 5, name: '孙七', age: 22, email: 'sunqi@example.com', gender: 'female', status: 'active' }
])

// 表格列配置
const columns = [
  { prop: 'id', dataIndex: 'id', label: 'ID', width: 80, align: 'center' },
  { prop: 'name', dataIndex: 'name', label: '姓名', width: 120 },
  { prop: 'age', dataIndex: 'age', label: '年龄', width: 80, align: 'center' },
  { prop: 'email', dataIndex: 'email', label: '邮箱', minWidth: 200 },
  { prop: 'gender', dataIndex: 'gender', label: '性别', width: 80, align: 'center', formatter: (row: any) => row.gender === 'male' ? '男' : '女' },
  { prop: 'status', dataIndex: 'status', label: '状态', width: 100, align: 'center', formatter: (row: any) => row.status === 'active' ? '活跃' : '禁用' }
]
</script>
```

## 可交互演示

以下是 Smart UI 的综合演示，您可以体验表单生成、表格生成和适配器切换等功能：

<FullScreenDemo />

## 配置选项

### SmartTable Props

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| data | `Array<any>` | 表格数据 | `[]` |
| columns | `ColumnConfig[]` | 表格列配置 | `[]` |
| adapter | `'element'  'ant'` | UI 适配器 | `'element'` |
| border | `boolean` | 是否显示边框 | `false` |
| stripe | `boolean` | 是否显示斑马纹 | `false` |
| highlightCurrentRow | `boolean` | 是否高亮当前行 | `false` |
| pagination | `boolean  any` | 是否显示分页器及分页配置 | `false` |
| rowSelection | `any` | 行选择配置 | - |
| loading | `boolean` | 是否显示加载状态 | `false` |
| size | `'small'  'medium'  'large'` | 表格大小 | `'medium'` |
| align | `'left'  'center'  'right'` | 全局对齐方式 | `'left'` |
| showHeader | `boolean` | 是否显示表头 | `true` |
| [key: string] | `any` | 其他自定义属性 | - |

### ColumnConfig

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| prop | `string` | 字段名 | - |
| dataIndex | `string` | 数据索引 | - |
| label | `string` | 列标题 | - |
| width | `number  string` | 列宽度 | - |
| minWidth | `number  string` | 列最小宽度 | - |
| align | `'left'  'center'  'right'` | 列对齐方式 | - |
| formatter | `(row: any, column: any, cellValue: any, index: number) => any` | 单元格格式化函数 | - |
| sortable | `boolean` | 是否可排序 | `false` |
| fixed | `'left'  'right'` | 是否固定列 | - |
| slot | `string` | 自定义插槽名 | - |
| [key: string] | `any` | 其他自定义属性 | - |

## 插槽使用

SmartTable 支持为每个列自定义插槽，您可以通过插槽完全控制单元格的渲染。

### 基本插槽用法

```vue
<template>
  <smart-table
    :data="tableData"
    :columns="columns"
  >
    <!-- 自定义状态列 -->
    <template #status="{ row }">
      <span 
        class="status-tag" 
        :class="row.status === 'active' ? 'status-active' : 'status-inactive'"
      >
        {{ row.status === 'active' ? '活跃' : '禁用' }}
      </span>
    </template>
    
    <!-- 自定义操作列 -->
    <template #action="{ row }">
      <div class="action-buttons">
        <button @click="handleEdit(row)" class="edit-btn">编辑</button>
        <button @click="handleDelete(row)" class="delete-btn">删除</button>
      </div>
    </template>
  </smart-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  // 数据...
])

const columns = [
  // 其他列配置...
  { prop: 'status', dataIndex: 'status', label: '状态', width: 100, align: 'center', slot: 'status' },
  { prop: 'action', dataIndex: 'action', label: '操作', width: 150, align: 'center', slot: 'action' }
]

const handleEdit = (row) => {
  console.log('编辑行:', row)
}

const handleDelete = (row) => {
  console.log('删除行:', row)
}
</script>
```

### 插槽作用域

| 属性名 | 类型 | 说明 |
|-------|------|------|
| row | `any` | 行数据 |
| column | `ColumnConfig` | 列配置 |
| index | `number` | 行索引 |
| cellValue | `any` | 单元格值 |

## 高级功能

### 分页

```vue
<smart-table
  :data="tableData"
  :columns="columns"
  :pagination="{
    pageSize: 5,
    total: 100,
    layout: 'total, prev, pager, next, jumper',
    onChange: (page, pageSize) => {
      console.log('分页变化:', page, pageSize)
      // 处理分页逻辑
    }
  }"
>
  <!-- 表格内容 -->
</smart-table>
```

### 行选择

```vue
<smart-table
  :data="tableData"
  :columns="columns"
  :row-selection="{
    type: 'checkbox',
    onChange: (selection) => {
      console.log('选择变化:', selection)
    }
  }"
>
  <!-- 表格内容 -->
</smart-table>
```

### 排序

```vue
const columns = [
  { prop: 'id', dataIndex: 'id', label: 'ID', width: 80, align: 'center', sortable: true },
  { prop: 'name', dataIndex: 'name', label: '姓名', width: 120 },
  { prop: 'age', dataIndex: 'age', label: '年龄', width: 80, align: 'center', sortable: true },
  // 其他列...
]

<smart-table
  :data="tableData"
  :columns="columns"
  @sort-change="handleSortChange"
>
  <!-- 表格内容 -->
</smart-table>

<script setup lang="ts">
const handleSortChange = (sortInfo) => {
  console.log('排序变化:', sortInfo)
  // 处理排序逻辑
}
</script>
```

## 事件

### SmartTable Events

| 事件名 | 说明 | 回调参数 |
|-------|------|--------|
| sort-change | 排序变化时触发 | `{ column: ColumnConfig, prop: string, order: 'ascending'  'descending'  null }` |
| selection-change | 选择变化时触发 | `any[]` |
| current-change | 当前行变化时触发 | `any, any` |
| row-click | 行点击时触发 | `any, any, number` |
| row-dblclick | 行双击时触发 | `any, any, number` |
| header-click | 表头点击时触发 | `any, any, number` |
| [eventName: string] | 其他自定义事件 | - |

## 示例

### 完整表格示例

```vue
<template>
  <smart-table
    :data="tableData"
    :columns="columns"
    border
    stripe
    highlight-current-row
    :pagination="{
      pageSize: 5,
      total: tableData.length
    }"
    :row-selection="{
      type: 'checkbox',
      onChange: handleSelectionChange
    }"
    @sort-change="handleSortChange"
    @row-click="handleRowClick"
  >
    <!-- 自定义状态列 -->
    <template #status="{ row }">
      <span 
        class="status-tag" 
        :class="row.status === 'active' ? 'status-active' : 'status-inactive'"
      >
        {{ row.status === 'active' ? '活跃' : '禁用' }}
      </span>
    </template>
    
    <!-- 自定义操作列 -->
    <template #action="{ row }">
      <div class="action-buttons">
        <button @click="handleEdit(row)" class="edit-btn">编辑</button>
        <button @click="handleDelete(row)" class="delete-btn">删除</button>
        <button @click="handleDetail(row)" class="detail-btn">详情</button>
      </div>
    </template>
  </smart-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', gender: 'male', status: 'active', createdAt: '2023-01-01' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com', gender: 'male', status: 'active', createdAt: '2023-02-01' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com', gender: 'female', status: 'inactive', createdAt: '2023-03-01' },
  { id: 4, name: '赵六', age: 35, email: 'zhaoliu@example.com', gender: 'male', status: 'active', createdAt: '2023-04-01' },
  { id: 5, name: '孙七', age: 22, email: 'sunqi@example.com', gender: 'female', status: 'active', createdAt: '2023-05-01' },
  { id: 6, name: '周八', age: 29, email: 'zhouba@example.com', gender: 'male', status: 'inactive', createdAt: '2023-06-01' }
])

const columns = [
  { prop: 'id', dataIndex: 'id', label: 'ID', width: 80, align: 'center', sortable: true },
  { prop: 'name', dataIndex: 'name', label: '姓名', width: 120 },
  { prop: 'age', dataIndex: 'age', label: '年龄', width: 80, align: 'center', sortable: true },
  { prop: 'email', dataIndex: 'email', label: '邮箱', minWidth: 200 },
  { prop: 'gender', dataIndex: 'gender', label: '性别', width: 80, align: 'center', formatter: (row: any) => row.gender === 'male' ? '男' : '女' },
  { prop: 'status', dataIndex: 'status', label: '状态', width: 100, align: 'center', slot: 'status' },
  { prop: 'createdAt', dataIndex: 'createdAt', label: '创建时间', minWidth: 150, align: 'center', sortable: true },
  { prop: 'action', dataIndex: 'action', label: '操作', width: 180, align: 'center', slot: 'action' }
]

const handleSelectionChange = (selection) => {
  console.log('选择变化:', selection)
}

const handleSortChange = (sortInfo) => {
  console.log('排序变化:', sortInfo)
}

const handleRowClick = (row, column, index) => {
  console.log('行点击:', row, column, index)
}

const handleEdit = (row) => {
  console.log('编辑行:', row)
  alert(`编辑用户: ${row.name}`)
}

const handleDelete = (row) => {
  console.log('删除行:', row)
  alert(`删除用户: ${row.name}`)
}

const handleDetail = (row) => {
  console.log('查看详情:', row)
  alert(`查看用户 ${row.name} 的详情`)
}
</script>

<style scoped>
.status-tag {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
}

.status-active {
  background-color: #f0f9eb;
  color: #67c23a;
}

.status-inactive {
  background-color: #fef0f0;
  color: #f56c6c;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-buttons button {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s;
}

.edit-btn {
  background-color: #409eff;
  color: white;
}

.edit-btn:hover {
  background-color: #66b1ff;
}

.delete-btn {
  background-color: #f56c6c;
  color: white;
}

.delete-btn:hover {
  background-color: #f78989;
}

.detail-btn {
  background-color: #67c23a;
  color: white;
}

.detail-btn:hover {
  background-color: #85ce61;
}
</style>
```