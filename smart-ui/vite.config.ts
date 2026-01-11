import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 开发模式下的入口文件
  build: {
    lib: {
      entry: {
        'smart-ui': path.resolve(__dirname, 'src/index.ts'),
        'smart-ui-element': path.resolve(__dirname, 'src/element.ts'),
        'smart-ui-ant': path.resolve(__dirname, 'src/ant.ts')
      },
      name: 'SmartUI',
      fileName: (format, entryName) => {
        if (format === 'es') {
          return `${entryName}.js`
        }
        return `${entryName}.umd.cjs`
      }
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        },
        // 确保正确导出命名导出，支持 tree shaking
        exports: 'named'
      }
    },
    // 生成 sourcemap
    sourcemap: true,
    // 关闭 minify 以便调试，生产环境可以开启
    minify: false,
    // 生成分离的 CSS 文件
    cssCodeSplit: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})