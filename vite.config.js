import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import removeNoMatch from 'vite-plugin-router-warn'
import VueDevTools from 'vite-plugin-vue-devtools'
import { pluginIcons, pluginPagePathes } from './build/plugin-isme'

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd())
  const { VITE_PUBLIC_PATH, VITE_PROXY_TARGET } = viteEnv

  return {
    base: VITE_PUBLIC_PATH || '/',
    plugins: [
      Vue(),
      VueJsx(),
      // 生产环境禁用 DevTools（节省构建资源）
      mode === 'development' ? VueDevTools() : undefined,
      Unocss(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: false,
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        dts: false,
      }),
      pluginPagePathes(),
      pluginIcons(),
      removeNoMatch(),
    ].filter(Boolean), // 过滤 undefined 插件
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
        '~': path.resolve(process.cwd()),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3200,
      open: false,
      proxy: {
        '/api': {
          target: VITE_PROXY_TARGET,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
          secure: false,
          configure: (proxy, options) => {
            proxy.on('proxyRes', (proxyRes, req) => {
              proxyRes.headers['x-real-url'] = new URL(req.url || '', options.target)?.href || ''
            })
          },
        },
      },
    },
    build: {
      // 关闭所有高内存消耗的优化
      minify: false, // 禁用代码压缩
      sourcemap: false, // 禁用 sourcemap
      cssCodeSplit: false, // 禁用 CSS 分割
      chunkSizeWarningLimit: 2000, // 调高 chunk 警告阈值（避免干扰）
      rollupOptions: {
        maxParallelFileOps: 1, // 关键！限制并行文件处理
        treeshake: false, // 禁用 Tree-shaking
        output: {
          manualChunks: {}, // 禁用自动拆包
        },
      },
    },
  }
})
