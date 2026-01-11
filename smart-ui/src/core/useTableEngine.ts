import { ref, computed, shallowRef } from 'vue'
import type { SmartTableProps, TableEngine, SortOrder, PaginationState, SortState, FilterState } from './types'
import { processColumns } from './common/utils'

/**
 * 本地排序函数
 */
function localSortData<T>(data: T[], column: string, order: SortOrder): T[] {
  if (!order) return data
  
  const sorted = [...data]
  const compare = (a: T, b: T): number => {
    const aVal = (a as any)[column]
    const bVal = (b as any)[column]
    
    if (aVal === bVal) return 0
    if (aVal == null) return 1
    if (bVal == null) return -1
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return order === 'ascending' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }
    
    return order === 'ascending'
      ? aVal > bVal ? 1 : -1
      : aVal < bVal ? 1 : -1
  }
  
  return sorted.sort(compare)
}

/**
 * 本地过滤函数
 */
function localFilterData<T>(data: T[], filters: FilterState): T[] {
  if (!filters || Object.keys(filters).length === 0) return data
  
  return data.filter(row => {
    return Object.entries(filters).every(([key, value]) => {
      if (value == null || value === '') return true
      const rowValue = (row as any)[key]
      if (Array.isArray(value)) {
        return value.includes(rowValue)
      }
      return String(rowValue).toLowerCase().includes(String(value).toLowerCase())
    })
  })
}

/**
 * 本地分页函数
 */
function localPaginateData<T>(data: T[], pagination: PaginationState): T[] {
  const { currentPage, pageSize } = pagination
  const start = (currentPage - 1) * pageSize
  const end = start + pageSize
  return data.slice(start, end)
}

export function useTableEngine(props: SmartTableProps): TableEngine {
  const loading = ref(false)
  
  // 初始化分页状态
  const paginationState = ref<PaginationState>({
    currentPage: typeof props.pagination === 'object' && props.pagination?.currentPage 
      ? props.pagination.currentPage 
      : 1,
    pageSize: typeof props.pagination === 'object' && props.pagination?.pageSize
      ? props.pagination.pageSize
      : 10,
    total: typeof props.pagination === 'object' && props.pagination?.total
      ? props.pagination.total
      : props.data?.length || 0
  })
  
  // 初始化排序状态
  const sortState = ref<SortState>({
    column: undefined,
    order: null
  })
  
  // 初始化过滤状态
  const filterState = ref<FilterState>({})
  
  // 处理后的数据（应用排序、过滤、分页）
  const processedData = computed(() => {
    let result = [...props.data]
    
    // 应用本地过滤
    if (props.localFilter && Object.keys(filterState.value).length > 0) {
      result = localFilterData(result, filterState.value)
    }
    
    // 应用本地排序
    if (props.localSort && sortState.value.column && sortState.value.order) {
      result = localSortData(result, sortState.value.column, sortState.value.order)
    }
    
    // 更新总数（本地模式）
    if (props.localPagination || (props.localFilter || props.localSort)) {
      paginationState.value.total = result.length
    }
    
    // 应用本地分页
    if (props.localPagination) {
      result = localPaginateData(result, paginationState.value)
    }
    
    return result
  })

  // 缓存列配置，避免重复处理
  const processedColumns = computed(() => processColumns(props.columns))
  
  // 缓存分页配置
  const paginationConfig = computed(() => {
    if (!props.pagination) return false
    
    if (typeof props.pagination === 'boolean') {
      return {
        current: paginationState.value.currentPage,
        pageSize: paginationState.value.pageSize,
        total: paginationState.value.total,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100']
      }
    }
    
    return {
      ...props.pagination,
      current: paginationState.value.currentPage,
      pageSize: paginationState.value.pageSize,
      total: paginationState.value.total
    }
  })
  
  // 缓存样式属性，避免重复创建对象
  const styleProps = computed(() => ({
    border: props.border,
    size: props.size,
    stripe: props.stripe,
    highlightCurrentRow: props.highlightCurrentRow
  }))
  
  // 缓存排除事件回调后的其他属性
  const otherProps = computed(() => {
    const excludedKeys = ['onSort', 'onFilter', 'onPaginationChange', 'onReload', 'data', 'columns']
    return Object.fromEntries(
      Object.entries(props).filter(([key]) => !excludedKeys.includes(key))
    )
  })

  // 将 props 转换为适配不同 UI 库的表格属性
  const tableProps = computed(() => {
    // 使用处理后的数据或原始数据
    const tableData = (props.localSort || props.localFilter || props.localPagination)
      ? processedData.value
      : props.data

    // 只返回必要的表格属性，避免不必要的属性传递
    return {
      // 基本属性
      data: tableData,
      columns: processedColumns.value,
      loading: props.loading || loading.value,
      // 表格样式属性
      ...styleProps.value,
      // 分页属性
      pagination: paginationConfig.value,
      // 行标识
      rowKey: props.rowKey,
      // 其他自定义属性
      ...otherProps.value
    }
  })

  // 刷新表格数据
  const refresh = () => {
    // 触发表格数据更新
    // 在响应式系统中，数据更新会自动触发重新渲染
  }

  // 重新加载表格数据
  const reload = async () => {
    loading.value = true
    try {
      // 如果有外部 reload 回调，调用它
      if (props.onReload) {
        await props.onReload()
      } else {
        // 否则只刷新
        refresh()
      }
    } finally {
      loading.value = false
    }
  }

  // 排序处理
  const sort = (column: string, order: SortOrder) => {
    sortState.value = { column, order }
    
    // 如果使用本地排序，数据会自动更新
    if (!props.localSort && props.onSort) {
      // 远程排序，通知外部
      props.onSort(sortState.value)
    } else {
      // 本地排序，只记录状态（数据会通过 computed 自动更新）
      try {
        // @ts-ignore - 兼容不同环境
        const isDev = (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') ||
                      (typeof import.meta !== 'undefined' && import.meta.env?.DEV)
        if (isDev) {
          console.debug('Table sort:', column, order)
        }
      } catch {
        // 忽略环境检查错误
      }
    }
  }

  // 过滤处理
  const filter = (filters: Record<string, any>) => {
    filterState.value = { ...filters }
    
    // 重置到第一页
    paginationState.value.currentPage = 1
    
    // 如果使用本地过滤，数据会自动更新
    if (!props.localFilter && props.onFilter) {
      // 远程过滤，通知外部
      props.onFilter(filterState.value)
    } else {
      // 本地过滤，只记录状态（数据会通过 computed 自动更新）
      try {
        // @ts-ignore - 兼容不同环境
        const isDev = (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') ||
                      (typeof import.meta !== 'undefined' && import.meta.env?.DEV)
        if (isDev) {
          console.debug('Table filter:', filters)
        }
      } catch {
        // 忽略环境检查错误
      }
    }
  }
  
  // 设置分页
  const setPagination = (pagination: Partial<PaginationState>) => {
    paginationState.value = {
      ...paginationState.value,
      ...pagination
    }
    
    // 如果使用本地分页，数据会自动更新
    if (!props.localPagination && props.onPaginationChange) {
      // 远程分页，通知外部
      props.onPaginationChange(paginationState.value)
    }
  }

  return {
    tableProps,
    refresh,
    reload,
    sort,
    filter,
    paginationState,
    sortState,
    filterState,
    setPagination
  }
}