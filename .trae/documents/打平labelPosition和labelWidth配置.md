## 实现计划

### 问题分析
由于Ant Design Vue和Element Plus在表单标签配置上的差异：
- **Element Plus**：使用`label-width`（短横线命名）和`label-position`
- **Ant Design Vue**：使用`labelCol`（配置标签宽度）和`labelAlign`（配置标签位置）

当前实现直接将统一属性传递给表单组件，导致配置不生效。

### 解决方案
修改`useFormEngine.ts`，根据当前适配器类型，将统一配置转换为对应UI库支持的属性格式：

1. **引入依赖**：
   - 从`../core/common/utils`导入`getAdapter`函数
   - 从`../core/common/adapter`导入适配器类型检查函数

2. **修改`useFormEngine`函数**：
   - 在计算`formProps`前，获取当前使用的适配器
   - 根据适配器类型，将`labelWidth`和`labelPosition`转换为对应UI库的属性：
     - **Element Plus**：保持使用`labelWidth`和`labelPosition`
     - **Ant Design Vue**：
       - 将`labelWidth`转换为`labelCol`对象的`style.width`属性
       - 将`labelPosition`转换为`labelAlign`属性

3. **优化属性传递**：
   - 移除重复的属性声明
   - 确保属性优先级正确

### 预期结果
- 统一的`labelWidth`和`labelPosition`配置能同时支持Element Plus和Ant Design Vue
- 表单组件能正确应用标签宽度和位置配置
- 保持代码的可扩展性，便于后续添加更多适配器

### 实现步骤
1. 修改`useFormEngine.ts`文件，引入必要的依赖
2. 在`formProps`计算属性中添加适配器类型判断
3. 根据适配器类型转换`labelWidth`和`labelPosition`属性
4. 测试修改后的代码，确保两种UI库都能正常工作