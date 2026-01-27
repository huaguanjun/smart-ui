// docs/.vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { plumeTheme } from "vuepress-theme-plume";
import { mediumZoomPlugin } from "@vuepress/plugin-medium-zoom";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { viteBundler } from "@vuepress/bundler-vite";
import path from "path";
var __vite_injected_original_dirname = "/Users/apple/Desktop/migu/test/middleUI/smart-ui-docs/docs/.vuepress";
var config_default = defineUserConfig({
  lang: "zh-CN",
  title: "Smart UI",
  description: "\u4E00\u4E2A\u57FA\u4E8E Vue 3 \u7684\u667A\u80FD UI \u7EC4\u4EF6\u5E93",
  base: "/smart-ui/",
  /**
   * bundler 配置（vite）
   */
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: {
          // ⚠️ 注意：这是给「文档源码」用的别名
          "@components": path.resolve(__vite_injected_original_dirname, "./components")
        }
      }
    }
  }),
  /**
   * 插件
   */
  plugins: [
    mediumZoomPlugin(),
    registerComponentsPlugin({
      componentsDir: path.resolve(__vite_injected_original_dirname, "./components")
    })
  ],
  /**
   * 主题配置
   */
  theme: plumeTheme({
    logo: "/logo.svg",
    docsRepo: "https://github.com/huaguanjun/smart-ui",
    docsDir: "docs",
    docsBranch: "main",
    // 顶部导航栏
    navbar: [
      { text: "\u6307\u5357", link: "/guide/" },
      { text: "API \u53C2\u8003", link: "/api/" },
      { text: "GitHub", link: "https://github.com/huaguanjun/smart-ui" }
    ],
    // 侧边栏
    sidebar: {
      "/guide/": [
        { text: "\u4ECB\u7ECD", link: "/guide/" },
        { text: "SmartForm \u7EC4\u4EF6", link: "/guide/smart-form.md" },
        { text: "SmartTable \u7EC4\u4EF6", link: "/guide/smart-table.md" },
        { text: "\u9002\u914D\u5668\u7CFB\u7EDF", link: "/guide/adapter.md" }
      ],
      "/api/": [
        { text: "API \u53C2\u8003", link: "/api/" },
        { text: "SmartForm", link: "/api/smart-form.md" },
        { text: "SmartTable", link: "/api/smart-table.md" },
        { text: "\u7C7B\u578B\u5B9A\u4E49", link: "/api/types.md" }
      ]
    },
    // 页脚配置
    footer: {
      message: "\u57FA\u4E8E Vue 3 \u5F00\u53D1\uFF0C\u652F\u6301 Element Plus \u548C Ant Design Vue",
      copyright: "Copyright \xA9 2025 Smart UI"
    }
  })
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2FwcGxlL0Rlc2t0b3AvbWlndS90ZXN0L21pZGRsZVVJL3NtYXJ0LXVpLWRvY3MvZG9jcy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hcHBsZS9EZXNrdG9wL21pZ3UvdGVzdC9taWRkbGVVSS9zbWFydC11aS1kb2NzL2RvY3MvLnZ1ZXByZXNzL2NvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYXBwbGUvRGVza3RvcC9taWd1L3Rlc3QvbWlkZGxlVUkvc21hcnQtdWktZG9jcy9kb2NzLy52dWVwcmVzcy9jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVVc2VyQ29uZmlnIH0gZnJvbSAndnVlcHJlc3MnXG5pbXBvcnQgeyBwbHVtZVRoZW1lIH0gZnJvbSAndnVlcHJlc3MtdGhlbWUtcGx1bWUnXG5pbXBvcnQgeyBtZWRpdW1ab29tUGx1Z2luIH0gZnJvbSAnQHZ1ZXByZXNzL3BsdWdpbi1tZWRpdW0tem9vbSdcbmltcG9ydCB7IHJlZ2lzdGVyQ29tcG9uZW50c1BsdWdpbiB9IGZyb20gJ0B2dWVwcmVzcy9wbHVnaW4tcmVnaXN0ZXItY29tcG9uZW50cydcbmltcG9ydCB7IHZpdGVCdW5kbGVyIH0gZnJvbSAnQHZ1ZXByZXNzL2J1bmRsZXItdml0ZSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZVVzZXJDb25maWcoe1xuICBsYW5nOiAnemgtQ04nLFxuICB0aXRsZTogJ1NtYXJ0IFVJJyxcbiAgZGVzY3JpcHRpb246ICdcdTRFMDBcdTRFMkFcdTU3RkFcdTRFOEUgVnVlIDMgXHU3Njg0XHU2NjdBXHU4MEZEIFVJIFx1N0VDNFx1NEVGNlx1NUU5MycsXG4gIGJhc2U6ICcvc21hcnQtdWkvJyxcblxuICAvKipcbiAgICogYnVuZGxlciBcdTkxNERcdTdGNkVcdUZGMDh2aXRlXHVGRjA5XG4gICAqL1xuICBidW5kbGVyOiB2aXRlQnVuZGxlcih7XG4gICAgdml0ZU9wdGlvbnM6IHtcbiAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAvLyBcdTI2QTBcdUZFMEYgXHU2Q0U4XHU2MTBGXHVGRjFBXHU4RkQ5XHU2NjJGXHU3RUQ5XHUzMDBDXHU2NTg3XHU2ODYzXHU2RTkwXHU3ODAxXHUzMDBEXHU3NTI4XHU3Njg0XHU1MjJCXHU1NDBEXG4gICAgICAgICAgJ0Bjb21wb25lbnRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vY29tcG9uZW50cycpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9KSxcblxuICAvKipcbiAgICogXHU2M0QyXHU0RUY2XG4gICAqL1xuICBwbHVnaW5zOiBbXG4gICAgbWVkaXVtWm9vbVBsdWdpbigpLFxuICAgIHJlZ2lzdGVyQ29tcG9uZW50c1BsdWdpbih7XG4gICAgICBjb21wb25lbnRzRGlyOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9jb21wb25lbnRzJyksXG4gICAgfSksXG4gIF0sXG5cbiAgLyoqXG4gICAqIFx1NEUzQlx1OTg5OFx1OTE0RFx1N0Y2RVxuICAgKi9cbiAgdGhlbWU6IHBsdW1lVGhlbWUoe1xuICAgIGxvZ286ICcvbG9nby5zdmcnLFxuICAgIGRvY3NSZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL2h1YWd1YW5qdW4vc21hcnQtdWknLFxuICAgIGRvY3NEaXI6ICdkb2NzJyxcbiAgICBkb2NzQnJhbmNoOiAnbWFpbicsXG5cbiAgICAvLyBcdTk4NzZcdTkwRThcdTVCRkNcdTgyMkFcdTY4MEZcbiAgICBuYXZiYXI6IFtcbiAgICAgIHsgdGV4dDogJ1x1NjMwN1x1NTM1NycsIGxpbms6ICcvZ3VpZGUvJyB9LFxuICAgICAgeyB0ZXh0OiAnQVBJIFx1NTNDMlx1ODAwMycsIGxpbms6ICcvYXBpLycgfSxcbiAgICAgIHsgdGV4dDogJ0dpdEh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vaHVhZ3Vhbmp1bi9zbWFydC11aScgfSxcbiAgICBdLFxuXG4gICAgLy8gXHU0RkE3XHU4RkI5XHU2ODBGXG4gICAgc2lkZWJhcjoge1xuICAgICAgJy9ndWlkZS8nOiBbXG4gICAgICAgIHsgdGV4dDogJ1x1NEVDQlx1N0VDRCcsIGxpbms6ICcvZ3VpZGUvJyB9LFxuICAgICAgICB7IHRleHQ6ICdTbWFydEZvcm0gXHU3RUM0XHU0RUY2JywgbGluazogJy9ndWlkZS9zbWFydC1mb3JtLm1kJyB9LFxuICAgICAgICB7IHRleHQ6ICdTbWFydFRhYmxlIFx1N0VDNFx1NEVGNicsIGxpbms6ICcvZ3VpZGUvc21hcnQtdGFibGUubWQnIH0sXG4gICAgICAgIHsgdGV4dDogJ1x1OTAwMlx1OTE0RFx1NTY2OFx1N0NGQlx1N0VERicsIGxpbms6ICcvZ3VpZGUvYWRhcHRlci5tZCcgfSxcbiAgICAgIF0sXG4gICAgICAnL2FwaS8nOiBbXG4gICAgICAgIHsgdGV4dDogJ0FQSSBcdTUzQzJcdTgwMDMnLCBsaW5rOiAnL2FwaS8nIH0sXG4gICAgICAgIHsgdGV4dDogJ1NtYXJ0Rm9ybScsIGxpbms6ICcvYXBpL3NtYXJ0LWZvcm0ubWQnIH0sXG4gICAgICAgIHsgdGV4dDogJ1NtYXJ0VGFibGUnLCBsaW5rOiAnL2FwaS9zbWFydC10YWJsZS5tZCcgfSxcbiAgICAgICAgeyB0ZXh0OiAnXHU3QzdCXHU1NzhCXHU1QjlBXHU0RTQ5JywgbGluazogJy9hcGkvdHlwZXMubWQnIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgLy8gXHU5ODc1XHU4MTFBXHU5MTREXHU3RjZFXG4gICAgZm9vdGVyOiB7XG4gICAgICBtZXNzYWdlOiAnXHU1N0ZBXHU0RThFIFZ1ZSAzIFx1NUYwMFx1NTNEMVx1RkYwQ1x1NjUyRlx1NjMwMSBFbGVtZW50IFBsdXMgXHU1NDhDIEFudCBEZXNpZ24gVnVlJyxcbiAgICAgIGNvcHlyaWdodDogJ0NvcHlyaWdodCBcdTAwQTkgMjAyNSBTbWFydCBVSScsXG4gICAgfSxcbiAgfSksXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1gsU0FBUyx3QkFBd0I7QUFDclosU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyxnQ0FBZ0M7QUFDekMsU0FBUyxtQkFBbUI7QUFDNUIsT0FBTyxVQUFVO0FBTGpCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8saUJBQVEsaUJBQWlCO0FBQUEsRUFDOUIsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS04sU0FBUyxZQUFZO0FBQUEsSUFDbkIsYUFBYTtBQUFBLE1BQ1gsU0FBUztBQUFBLFFBQ1AsT0FBTztBQUFBO0FBQUEsVUFFTCxlQUFlLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsUUFDdkQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS0QsU0FBUztBQUFBLElBQ1AsaUJBQWlCO0FBQUEsSUFDakIseUJBQXlCO0FBQUEsTUFDdkIsZUFBZSxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLElBQ3ZELENBQUM7QUFBQSxFQUNIO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLQSxPQUFPLFdBQVc7QUFBQSxJQUNoQixNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsSUFDVixTQUFTO0FBQUEsSUFDVCxZQUFZO0FBQUE7QUFBQSxJQUdaLFFBQVE7QUFBQSxNQUNOLEVBQUUsTUFBTSxnQkFBTSxNQUFNLFVBQVU7QUFBQSxNQUM5QixFQUFFLE1BQU0sb0JBQVUsTUFBTSxRQUFRO0FBQUEsTUFDaEMsRUFBRSxNQUFNLFVBQVUsTUFBTSx5Q0FBeUM7QUFBQSxJQUNuRTtBQUFBO0FBQUEsSUFHQSxTQUFTO0FBQUEsTUFDUCxXQUFXO0FBQUEsUUFDVCxFQUFFLE1BQU0sZ0JBQU0sTUFBTSxVQUFVO0FBQUEsUUFDOUIsRUFBRSxNQUFNLDBCQUFnQixNQUFNLHVCQUF1QjtBQUFBLFFBQ3JELEVBQUUsTUFBTSwyQkFBaUIsTUFBTSx3QkFBd0I7QUFBQSxRQUN2RCxFQUFFLE1BQU0sa0NBQVMsTUFBTSxvQkFBb0I7QUFBQSxNQUM3QztBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1AsRUFBRSxNQUFNLG9CQUFVLE1BQU0sUUFBUTtBQUFBLFFBQ2hDLEVBQUUsTUFBTSxhQUFhLE1BQU0scUJBQXFCO0FBQUEsUUFDaEQsRUFBRSxNQUFNLGNBQWMsTUFBTSxzQkFBc0I7QUFBQSxRQUNsRCxFQUFFLE1BQU0sNEJBQVEsTUFBTSxnQkFBZ0I7QUFBQSxNQUN4QztBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsUUFBUTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLElBQ2I7QUFBQSxFQUNGLENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
