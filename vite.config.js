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
      minify: false, // 必须关闭
      sourcemap: false, // 必须关闭
      cssCodeSplit: false, // 必须关闭
      reportCompressedSize: false, // 禁用体积计算
      chunkSizeWarningLimit: 5000, // 调高到 5MB 避免干扰
      rollupOptions: {
        maxParallelFileOps: 1, // 关键！单文件串行处理
        treeshake: false, // 必须关闭
        output: {
        // 移除 manualChunks 和 inlineDynamicImports 的冲突配置
        // 使用以下替代方案来减少内存压力
          compact: true, // 压缩输出代码（不进行完整minify）
          hoistTransitiveImports: false, // 禁止提升间接导入
        },
      },
    },
    worker: {
      format: 'es',
      rollupOptions: {
        maxParallelFileOps: 1, // Worker 也限制并发
      },
    },
  }
})
