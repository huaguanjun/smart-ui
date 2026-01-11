import type { Adapter, TableColumnConfig, FieldConfig } from '../../core/types'
import { elementComponentsMap } from './components'

/**
 * Element UI 适配器配置
 */
export const elementAdapter: Adapter = {
  name: 'element',
  components: elementComponentsMap as any,
  
  /**
   * 处理表格列配置，转换为 Element Table 格式
   */
  processColumns(columns: TableColumnConfig[]): any[] {
    return columns.map(column => ({
      prop: column.prop || column.dataIndex,
      label: column.label,
      width: column.width,
      minWidth: column.minWidth,
      align: column.align,
      sortable: column.sortable,
      fixed: column.fixed,
      formatter: column.formatter
    }))
  },
  
  /**
   * 处理表单字段配置，转换为 Element Form 格式
   */
  processFields(fields: FieldConfig[]): any[] {
    return fields.map(field => {
      const { name, label, type, ...rest } = field
      return {
        name,
        label,
        type,
        ...rest
      }
    })
  }
}