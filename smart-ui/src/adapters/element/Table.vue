<template>
  <el-table
    v-bind="tableProps"
    class="smart-table-element"
  >
    <!-- 自动生成列 -->
    <el-table-column
      v-for="column in normalizedColumns"
      :key="column.key"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :min-width="column.minWidth"
      :align="column.align"
      :sortable="column.sortable"
      :fixed="column.fixed"
    >
      <!-- 单元格渲染 -->
      <template #default="scope">
        {{ renderCell(column, scope) }}
      </template>
    </el-table-column>

    <!-- 透传插槽 -->
    <slot />
  </el-table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SmartTableProps, TableColumnConfig } from '../../core/types'

const props = defineProps<SmartTableProps>()

/**
 * Element Table slot scope
 */
interface ElementTableColumnScope {
  row: Record<string, any>
  column: any
  $index: number
}

/**
 * 规范化 columns
 * - 统一 prop / dataIndex
 * - 生成稳定 key
 */
const normalizedColumns = computed(() => {
  if (!props.columns) return []

  return props.columns.map((column: TableColumnConfig) => {
    const prop = column.prop ?? column.dataIndex ?? ''

    return {
      ...column,
      prop,
      key: prop,
    }
  })
})

/**
 * 单元格渲染统一出口
 * 不在 template 里写逻辑
 */
function renderCell(
  column: TableColumnConfig & { prop: string },
  scope: ElementTableColumnScope
) {
  const value = scope.row[column.prop]

  if (typeof column.formatter === 'function') {
    return column.formatter(
      scope.row,
      scope.column,
      value,
      scope.$index
    )
  }

  return value
}

/**
 * el-table props
 * 过滤掉 columns（Element 不认）
 */
const tableProps = computed(() => {
  const { columns, ...restProps } = props
  return restProps
})
</script>

<style scoped>
.smart-table-element {
  width: 100%;
}
</style>
