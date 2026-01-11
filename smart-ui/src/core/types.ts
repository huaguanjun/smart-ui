export type UIAdapter = 'element' | 'ant'

// 表格相关类型
export type SortOrder = 'ascending' | 'descending' | null

export type AlignType = 'left' | 'center' | 'right'

export type SizeType = 'small' | 'medium' | 'large'

// 表格列配置
export interface TableColumnConfig {
  // Element Plus 使用 prop，Ant Design Vue 使用 dataIndex
  prop?: string
  dataIndex?: string
  // 列标题
  label: string
  // 列宽度
  width?: string | number
  // 最小宽度
  minWidth?: string | number
  // 对齐方式
  align?: AlignType
  // 是否可排序
  sortable?: boolean | string
  // 是否可过滤
  filterable?: boolean | Record<string, any>
  // 自定义格式化函数
  formatter?: ((row: any) => any) | ((row: any, column: any, cellValue: any, index: number) => any)
  // 固定列
  fixed?: 'left' | 'right'
  // 其他自定义属性
  [key: string]: any
}

// 表格属性
export interface SmartTableProps {
  // 使用的 UI 适配器
  adapter?: UIAdapter
  // 表格数据
  data: any[]
  // 列配置
  columns: TableColumnConfig[]
  // 加载状态
  loading?: boolean
  // 分页配置
  pagination?: boolean | {
    pageSize?: number
    currentPage?: number
    total?: number
    showSizeChanger?: boolean
    pageSizeOptions?: string[]
    [key: string]: any
  }
  // 是否显示边框
  border?: boolean
  // 表格大小
  size?: SizeType
  // 是否显示斑马纹
  stripe?: boolean
  // 是否高亮当前行
  highlightCurrentRow?: boolean
  // 行 key
  rowKey?: string | ((row: any) => string)
  // 事件回调
  onSort?: (sortState: SortState) => void
  onFilter?: (filters: FilterState) => void
  onPaginationChange?: (pagination: PaginationState) => void
  onReload?: () => Promise<void> | void
  // 是否使用本地排序/过滤（默认 false，使用远程）
  localSort?: boolean
  localFilter?: boolean
  localPagination?: boolean
  // 其他自定义属性
  [key: string]: any
}

// 分页状态
export interface PaginationState {
  currentPage: number
  pageSize: number
  total: number
}

// 排序状态
export interface SortState {
  column?: string
  order: SortOrder
}

// 过滤状态
export type FilterState = Record<string, any>

// 表格事件回调
export interface TableEventCallbacks {
  onSort?: (sortState: SortState) => void
  onFilter?: (filters: FilterState) => void
  onPaginationChange?: (pagination: PaginationState) => void
  onReload?: () => Promise<void> | void
}

// 表格引擎接口
export interface TableEngine {
  // 处理后的表格属性
  tableProps: Record<string, any>
  // 刷新表格数据
  refresh: () => void
  // 重新加载表格数据
  reload: () => Promise<void>
  // 排序处理
  sort: (column: string, order: SortOrder) => void
  // 过滤处理
  filter: (filters: Record<string, any>) => void
  // 分页状态
  paginationState: PaginationState
  // 排序状态
  sortState: SortState
  // 过滤状态
  filterState: FilterState
  // 设置分页
  setPagination: (pagination: Partial<PaginationState>) => void
}

// 表单相关类型
export type LabelPosition = 'left' | 'right' | 'top'

// 字段选项配置
export interface FieldOption {
  label: string
  value: any
}

// 字段配置
export interface FieldConfig {
  // 字段名
  name: string
  // 字段标签
  label?: string
  // 字段类型
  type: 'input' | 'select' | 'radio' | 'checkbox' | 'date' | 'textarea' | 'switch' | 'slider'
  // 占位符
  placeholder?: string
  // 选项列表
  options?: FieldOption[]
  // 验证规则
  rules?: any[]
  // 是否禁用
  disabled?: boolean
  // 是否只读
  readonly?: boolean
  // 默认值
  defaultValue?: any
  // 其他自定义属性
  [key: string]: any
}

// 表单字段实例
export interface FieldInstance {
  // 字段名
  name: string
  // 验证字段
  validate: () => Promise<boolean>
  // 重置字段
  reset: () => void
  // 获取字段值
  getValue: () => any
  // 设置字段值
  setValue: (value: any) => void
}

// 表单属性
export interface SmartFormProps {
  // 使用的 UI 适配器
  adapter?: UIAdapter
  // 表单数据模型
  model: Record<string, any>
  // 验证规则
  rules?: Record<string, any[]>
  // 字段配置
  fields?: FieldConfig[]
  // 标签宽度
  labelWidth?: string | number
  // 标签位置
  labelPosition?: LabelPosition
  // 是否内联表单
  inline?: boolean
  // 表单大小
  size?: SizeType
  // 是否禁用表单
  disabled?: boolean
  // 通用的字段 span 值
  itemSpan?: number
  // 其他自定义属性
  [key: string]: any
}

// 表单引擎接口
export interface FormEngine {
  // 处理后的表单属性
  formProps: Record<string, any>
  // 注册字段
  registerField: (field: FieldInstance) => void
  // 注销字段
  unregisterField: (name: string) => void
  // 验证单个字段
  validateField: (name: string) => Promise<boolean>
  // 验证整个表单
  validateForm: () => Promise<boolean>
  // 重置表单
  resetForm: () => void
}

// 全局配置
export interface SmartUIConfig {
  // 默认使用的 UI 适配器
  adapter: UIAdapter
  // 其他全局配置
  [key: string]: any
}

// 适配器接口
export interface Adapter {
  // 适配器名称
  name: UIAdapter
  // 组件映射
  components: Record<string, any>
  // 处理表格列配置
  processColumns?: (columns: TableColumnConfig[]) => any[]
  // 处理表单字段配置
  processFields?: (fields: FieldConfig[]) => any[]
}