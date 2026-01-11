# SmartTable API 参考

## 组件概述

SmartTable 是 Smart UI 的核心表格组件，通过配置化的方式快速生成复杂表格，支持分页、排序、选择等高级功能。

## Props

### 基本属性

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| data | `Array<any>` | 表格数据 | `[]` |
| columns | `ColumnConfig[]` | 表格列配置 | `[]` |
| adapter | `'element' \| 'ant'` | UI 适配器 | `'element'` |
| border | `boolean` | 是否显示边框 | `false` |
| stripe | `boolean` | 是否显示斑马纹 | `false` |
| highlightCurrentRow | `boolean` | 是否高亮当前行 | `false` |
| size | `'small' \| 'medium' \| 'large'` | 表格大小 | `'medium'` |
| align | `'left' \| 'center' \| 'right'` | 全局对齐方式 | `'left'` |
| showHeader | `boolean` | 是否显示表头 | `true` |

### 分页相关

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| pagination | `boolean \| PaginationConfig` | 是否显示分页器及分页配置 | `false` |

### 选择相关

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| rowSelection | `RowSelectionConfig` | 行选择配置 | - |

### 加载相关

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| loading | `boolean` | 是否显示加载状态 | `false` |

### 其他属性

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| [key: string] | `any` | 传递给底层表格组件的其他属性 | - |

## ColumnConfig 类型

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| prop | `string` | 字段名 | - |
| dataIndex | `string` | 数据索引 | - |
| label | `string` | 列标题 | - |
| width | `number \| string` | 列宽度 | - |
| minWidth | `number \| string` | 列最小宽度 | - |
| align | `'left' \| 'center' \| 'right'` | 列对齐方式 | - |
| formatter | `(row: any, column: any, cellValue: any, index: number) => any` | 单元格格式化函数 | - |
| sortable | `boolean` | 是否可排序 | `false` |
| fixed | `'left' \| 'right'` | 是否固定列 | - |
| slot | `string` | 自定义插槽名 | - |
| [key: string] | `any` | 传递给底层列组件的其他属性 | - |

## PaginationConfig 类型

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| total | `number` | 总条数 | 0 |
| pageSize | `number` | 每页条数 | 10 |
| currentPage | `number` | 当前页码 | 1 |
| pageSizes | `number[]` | 每页条数选项 | `[10, 20, 50, 100]` |
| layout | `string` | 分页器布局 | `'total, prev, pager, next'` |
| background | `boolean` | 是否显示背景 | `false` |
| small | `boolean` | 是否使用小型分页器 | `false` |
| onChange | `(page: number, pageSize: number) => void` | 页码变化时的回调 | - |
| onSizeChange | `(pageSize: number) => void` | 每页条数变化时的回调 | - |

## RowSelectionConfig 类型

| 属性名 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| type | `'checkbox' \| 'radio'` | 选择类型 | `'checkbox'` |
| selectedRowKeys | `any[]` | 默认选中的行 keys | `[]` |
| onChange | `(selection: any[]) => void` | 选择变化时的回调 | - |
| onSelect | `(row: any, selected: boolean) => void` | 选择某一行时的回调 | - |
| onSelectAll | `(selected: boolean, selection: any[]) => void` | 全选/取消全选时的回调 | - |
| getCheckboxProps | `(row: any) => any` | 自定义 checkbox 属性 | - |

## Events

| 事件名 | 说明 | 回调参数 |
|-------|------|--------|
| sort-change | 排序变化时触发 | `{ column: ColumnConfig, prop: string, order: 'ascending' \| 'descending' \| null }` |
| selection-change | 选择变化时触发 | `any[]` |
| current-change | 当前行变化时触发 | `any, any` |
| row-click | 行点击时触发 | `any, any, number` |
| row-dblclick | 行双击时触发 | `any, any, number` |
| header-click | 表头点击时触发 | `any, any, number` |
| cell-click | 单元格点击时触发 | `any, any, any, number` |
| [eventName: string] | 其他自定义事件 | - |

## Methods

| 方法名 | 说明 | 参数 | 返回值 |
|-------|------|------|-------|
| setCurrentRow | 设置当前行 | `row: any` | `void` |
| clearSelection | 清空选择 | - | `void` |
| toggleRowSelection | 切换行选择状态 | `row: any, selected?: boolean` | `void` |
| toggleAllSelection | 切换全选状态 | - | `void` |
| getSelectionRows | 获取选中行 | - | `any[]` |
| sort | 手动排序 | `prop: string, order: 'ascending' \| 'descending' \| null` | `void` |
| reload | 重新加载数据 | - | `void` |

## Slots

### 自定义列插槽

通过 `columns` 配置中的 `slot` 属性，可以为特定列自定义渲染内容：

```vue
<smart-table :data="tableData" :columns="columns">
  <!-- 自定义状态列 -->
  <template #status="{ row, index }">
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
      <button @click="handleEdit(row)">编辑</button>
      <button @click="handleDelete(row)">删除</button>
    </div>
  </template>
</smart-table>
```

### 插槽作用域

| 属性名 | 类型 | 说明 |
|-------|------|------|
| row | `any` | 行数据 |
| column | `ColumnConfig` | 列配置 |
| index | `number` | 行索引 |
| cellValue | `any` | 单元格值 |

### 内置插槽

| 插槽名 | 说明 | 作用域参数 |
|-------|------|--------|
| header | 表头插槽 | - |
| footer | 表尾插槽 | - |
| empty | 空数据插槽 | - |

## 示例

### 基本用法

```vue
<template>
  <smart-table
    ref="tableRef"
    :data="tableData"
    :columns="columns"
    border
    stripe
  >
    <template #status="{ row }">
      <span :class="['status-tag', `status-${row.status}`]">
        {{ row.status === 'active' ? '活跃' : '禁用' }}
      </span>
    </template>
  </smart-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const tableData = ref([
  { id: 1, name: '张三', age: 25, status: 'active' },
  { id: 2, name: '李四', age: 30, status: 'inactive' }
])

const columns = ref([
  { prop: 'id', label: 'ID', width: 80, align: 'center' },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80, align: 'center' },
  { prop: 'status', label: '状态', width: 100, align: 'center', slot: 'status' }
])
</script>
```

### 带分页和选择功能

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
      total: 100,
      layout: 'total, prev, pager, next, jumper',
      onChange: handlePageChange
    }"
    :row-selection="{
      type: 'checkbox',
      onChange: handleSelectionChange
    }"
    @sort-change="handleSortChange"
    @row-click="handleRowClick"
  >
    <!-- 自定义操作列 -->
    <template #action="{ row }">
      <div class="action-buttons">
        <button @click="handleEdit(row)">编辑</button>
        <button @click="handleDelete(row)">删除</button>
      </div>
    </template>
  </smart-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  // 数据...
])

const columns = ref([
  { prop: 'id', label: 'ID', width: 80, align: 'center', sortable: true },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80, align: 'center', sortable: true },
  { prop: 'action', label: '操作', width: 150, align: 'center', slot: 'action' }
])

const handlePageChange = (page, pageSize) => {
  console.log('分页变化:', page, pageSize)
  // 处理分页逻辑
}

const handleSelectionChange = (selection) => {
  console.log('选择变化:', selection)
}

const handleSortChange = (sortInfo) => {
  console.log('排序变化:', sortInfo)
  // 处理排序逻辑
}

const handleRowClick = (row, column, index) => {
  console.log('行点击:', row, column, index)
}

const handleEdit = (row) => {
  console.log('编辑行:', row)
}

const handleDelete = (row) => {
  console.log('删除行:', row)
}
</script>
```
