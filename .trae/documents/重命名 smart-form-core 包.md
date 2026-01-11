# 重命名 smart-form-core 包计划

## 现状分析
- 包目录名：`smart-form-core`
- 包实际功能：包含 Form 和 Table 组件
- package.json 中的包名：`smart-form`
- 构建输出文件名：`smart-ui.*.js`
- 被引用方式：在 demo 项目中以 `smart-form-core` 引用

## 重命名方案
将包目录名从 `smart-form-core` 改为 `smart-ui`，与构建输出文件名保持一致，更准确地反映其包含多种 UI 组件的功能。

## 实施步骤
1. **重命名目录**：将 `smart-form-core` 目录重命名为 `smart-ui`
2. **更新 demo 项目引用**：修改 `smart-form-demo/package.json` 中的依赖引用
3. **检查其他可能的引用**：搜索整个项目中对 `smart-form-core` 的引用
4. **验证构建**：确保重命名后项目能正常构建和运行

## 预期效果
- 包名更准确反映其功能（包含 Form 和 Table 等多种 UI 组件）
- 目录名与构建输出文件名保持一致
- 所有引用正常工作