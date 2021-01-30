const TerserPlugin = require('terser-webpack-plugin')

const webpack = require('webpack')
const fs = require('fs')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const path = require('path')
const Mult = require('./Mult')

function resolve(dir){
  return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}

// 初始化样式
let config = {
      productionSourceMap: false,
      // DLL
      configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
          // 生产环境gz压缩
          const CompressionWebpackPlugin = require('compression-webpack-plugin')
          config.plugins.push(new CompressionWebpackPlugin({
            test: new RegExp('\\.(css|js)$'),
            threshold: 10240
          }))
      
          config.plugins.push(
            new TerserPlugin({
              cache: true,
              parallel: true, // 多线程
              sourceMap: true, // Must be set to true if using source-maps in production
              terserOptions: {
                compress: {
                  drop_console: true,
                  drop_debugger: true
                }
              }
            })
          )
          // 代码分割
          config.optimization = {
            splitChunks: {
              cacheGroups: {
                common: {
                  name: 'chunk-common',
                  chunks: 'initial',
                  minChunks: 2,
                  maxInitialRequests: 5,
                  minSize: 0,
                  priority: 1,
                  reuseExistingChunk: true,
                  enforce: true
                },
                vendors: {
                  name: 'chunk-vendors',
                  test: /[\\/]node_modules[\\/]/,
                  chunks: 'initial',
                  priority: 2,
                  reuseExistingChunk: true,
                  enforce: true
                },
                antDesignVue: {
                  name: 'chunk-elementui',
                  test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                  chunks: 'all',
                  priority: 3,
                  reuseExistingChunk: true,
                  enforce: true
                }
              }
            }
          }
        }
      
        if (process.env.NODE_ENV === 'development') {
          let isDll = fs.existsSync(`./build/vender-manifest.json`)
          if(isDll){
            config.plugins.push(
              new webpack.HotModuleReplacementPlugin(), // 热模块更新
              new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require('./build/vender-manifest.json')
              }),
              // 将 dll 注入到 生成的 html 模板中
              new AddAssetHtmlPlugin({
                // dll文件位置
                filepath: path.resolve(__dirname, './public/project/*.js'),
                // dll 引用路径
                publicPath: './',
                // dll最终输出的目录
                outputPath: './'
              })
            )
          }
        }
      
      }
}

module.exports = new Mult(config).create()


