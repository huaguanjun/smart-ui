# Smart UI API 参考

欢迎来到 Smart UI API 文档中心。这里提供了 Smart UI 所有组件和功能的详细 API 参考。

## API 文档列表

- [Smart Form API](smart-form.md)
  - 智能表单组件的完整 API 文档
  - 包含字段配置、验证规则、事件处理等详细说明
  - 支持多种适配器的配置选项

- [Smart Table API](smart-table.md)
  - 智能表格组件的完整 API 文档
  - 包含列配置、数据处理、分页、排序等功能说明
  - 支持多种适配器的配置选项

- [Adapter API](adapter.md)
  - 适配器机制的 API 参考
  - 如何自定义适配器
  - 现有适配器的使用说明
  - 适配器扩展指南

- [Type Definitions](types.md)
  - 完整的类型定义文档
  - TypeScript 类型参考
  - 接口和类型别名说明
  - 类型扩展指南

## 快速开始

### 安装

```bash
npm install smart-form
```

### 基本使用

```vue
<template>
  <SmartForm 
    :model="formData" 
    :fields="formFields"
    :adapter="adapter"
  />
  <SmartTable 
    :data="tableData" 
    :columns="tableColumns"
    :adapter="adapter"
  />
</template>

<script>
import { SmartForm, SmartTable } from 'smart-form'

export default {
  components: {
    SmartForm,
    SmartTable
  },
  data() {
    return {
      adapter: 'element',
      // 表单配置
      formData: {},
      formFields: [],
      // 表格配置
      tableData: [],
      tableColumns: []
    }
  }
}
</script>
```

## 适配器支持

Smart UI 支持多种 UI 框架适配器：

- [Element Plus](https://element-plus.org/)
- [Ant Design Vue](https://antdv.com/)

您可以根据项目需求选择合适的适配器，或参考 [Adapter API](adapter.md) 自定义适配器。

## 类型支持

Smart UI 提供了完整的 TypeScript 类型定义，您可以在 [Type Definitions](types.md) 中查看所有类型定义，或直接在 IDE 中享受类型提示。

## 社区与支持

- [GitHub 仓库](https://github.com/huaguanjun/smart-ui)
- [问题反馈](https://github.com/huaguanjun/smart-ui/issues)
- [贡献指南](https://github.com/huaguanjun/smart-ui/blob/main/CONTRIBUTING.md)

查看 [更新日志](https://github.com/huaguanjun/smart-ui/releases) 了解最新功能和改进。
