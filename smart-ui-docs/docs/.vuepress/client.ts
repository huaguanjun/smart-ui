import { defineClientConfig } from '@vuepress/client'

// UI 库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import AntDesignVue from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './styles/index.css'

export default defineClientConfig({
  enhance({ app }) {
    // 注册 UI 框架
    app.use(ElementPlus)
    app.use(AntDesignVue)
  },
})
