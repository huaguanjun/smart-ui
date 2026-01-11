import type { Adapter, TableColumnConfig, FieldConfig } from '../../core/types'
import { antComponentsMap } from './components'

/**
 * Ant Design Vue 适配器配置
 */
export const antAdapter: Adapter = {
  name: 'ant',
  components: antComponentsMap as any,
  
  /**
   * 处理表格列配置，转换为 Ant Design Vue Table 格式
   */
  processColumns(columns: TableColumnConfig[]): any[] {
    return columns.map(column => {
      const dataIndex = column.dataIndex || column.prop
      return {
        title: column.label,
        dataIndex,
        key: dataIndex,
        width: column.width,
        align: column.align,
        fixed: column.fixed,
        sorter: column.sortable,
        customRender: column.formatter
          ? ({ text, record, index, column: col }: any) => {
              return column.formatter!(record, col, text, index)
            }
          : undefined
      }
    })
  },
  
  /**
   * 处理表单字段配置，转换为 Ant Design Vue Form 格式
   */
  processFields(fields: FieldConfig[]): any[] {
    return fields.map(field => {
      const { name, label, ...rest } = field
      return {
        name,
        label,
        ...rest
      }
    })
  }
}