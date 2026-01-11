import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { viteBundler } from '@vuepress/bundler-vite'
import path from 'path'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Smart UI',
  description: '一个基于 Vue 3 的智能 UI 组件库',
  base: '/',

  /**
   * bundler 配置（vite）
   */
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: {
          // ⚠️ 注意：这是给「文档源码」用的别名
          '@components': path.resolve(__dirname, './components'),
        },
      },
    },
  }),

  /**
   * 插件
   */
  plugins: [
    mediumZoomPlugin(),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],

  /**
   * 主题配置
   */
  theme: plumeTheme({
    logo: '/logo.svg',
    docsRepo: 'https://github.com/your-repo/smart-ui',
    docsDir: 'docs',
    docsBranch: 'main',

    // 顶部导航栏
    navbar: [
      { text: '指南', link: '/guide/' },
      { text: 'API 参考', link: '/api/' },
      { text: 'GitHub', link: 'https://github.com/your-repo/smart-ui' },
    ],

    // 侧边栏
    sidebar: {
      '/guide/': [
        { text: '介绍', link: '/guide/' },
        { text: 'SmartForm 组件', link: '/guide/smart-form.md' },
        { text: 'SmartTable 组件', link: '/guide/smart-table.md' },
        { text: '适配器系统', link: '/guide/adapter.md' },
      ],
      '/api/': [
        { text: 'API 参考', link: '/api/' },
        { text: 'SmartForm', link: '/api/smart-form.md' },
        { text: 'SmartTable', link: '/api/smart-table.md' },
        { text: '类型定义', link: '/api/types.md' },
      ],
    },
    // 页脚配置
    footer: {
      message: '基于 Vue 3 开发，支持 Element Plus 和 Ant Design Vue',
      copyright: 'Copyright © 2025 Smart UI',
    },
  }),
})