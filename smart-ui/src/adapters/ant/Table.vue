<template>
  <a-table
    v-bind="tableProps"
    class="smart-table-ant"
  >
    <!-- 透传插槽（如 expandedRowRender / emptyText 等） -->
    <slot />
  </a-table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SmartTableProps, TableColumnConfig } from '../../core/types'

/**
 * Ant Design Vue Table customRender 参数结构
 * 官方定义较宽，这里收敛成我们需要的
 */
interface AntCustomRenderParams<T = any> {
  text: any
  record: T
  index: number
  column: any
}

const props = defineProps<SmartTableProps>()

/**
 * columns 适配：
 * SmartTableColumn → Ant Design Vue Column
 */
const processedColumns = computed(() => {
  if (!props.columns) return []

  return props.columns.map((column: TableColumnConfig) => {
    const dataIndex = column.dataIndex ?? column.prop

    return {
      title: column.label,
      dataIndex,
      key: dataIndex,
      width: column.width,
      align: column.align,
      fixed: column.fixed,
      sorter: column.sortable,

      /**
       * formatter → customRender
       * 统一参数签名，避免运行时猜参数
       */
      customRender: column.formatter
        ? (params: AntCustomRenderParams) => {
            return column.formatter!(
              params.record,
              { dataIndex },
              params.text,
              params.index
            )
          }
        : undefined,
    }
  })
})

/**
 * Table props 适配：
 * - data → dataSource
 * - columns 使用处理后的
 * - 自动兜底 rowKey
 */
const tableProps = computed(() => {
  const {
    data,
    columns,
    rowKey,
    ...restProps
  } = props

  return {
    ...restProps,
    columns: processedColumns.value,
    dataSource: data,
    rowKey: rowKey ?? 'id',
  }
})
</script>

<style scoped>
.smart-table-ant {
  width: 100%;
}
</style>
