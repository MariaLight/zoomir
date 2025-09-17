import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  mode: process.env.NODE_ENV || 'development',
  base: process.env.NODE_ENV === 'production' ? '/zoomir/dist/' : '/',
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(css)$/.test(assetInfo.name)) {
            return 'css/[name]-[hash].[ext]'
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return 'images/[name].[ext]'
          }
          if (/\.(woff|woff2|ttf|eot)$/i.test(assetInfo.name)) {
            return 'fonts/[name].[ext]'
          }
          return `assets/[name].[ext]`
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  css: {
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('cssnano')({
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
          }]
        })
      ]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@js': resolve(__dirname, 'src/js'),
      '@scss': resolve(__dirname, 'src/scss'),
      '@images': resolve(__dirname, 'src/images'),
      '@resources': resolve(__dirname, 'src/resources')
    }
  }
})
