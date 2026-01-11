<template>
  <component :is="tableComponent" v-bind="tableProps">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTableEngine } from '../../core/useTableEngine'
import ElementTable from '../../adapters/element/Table.vue'
import AntTable from '../../adapters/ant/Table.vue'
import { resolveAdapter } from '../../core/common/utils'
import type { SmartTableProps } from '../../core/types'

const props = withDefaults(defineProps<SmartTableProps>(), {
  adapter: undefined,
  data: () => [],
  columns: () => []
})

// 获取最终使用的适配器
const currentAdapter = computed(() => resolveAdapter(props.adapter))

const {
  tableProps,
  refresh,
  reload,
  sort,
  filter
} = useTableEngine(props)

const tableComponent = computed(() => {
  return currentAdapter.value === 'ant' ? AntTable : ElementTable
})

defineExpose({
  refresh,
  reload,
  sort,
  filter
})
</script>

<script lang="ts">
export default {
  name: 'SmartTable'
}
</script>

<style scoped>
.smart-table {
  width: 100%;
}
</style>