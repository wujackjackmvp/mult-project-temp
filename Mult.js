const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const isAnalyzer = false

const path = require('path')
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}

function isObject(value) {
    const type = typeof value
    if(type === 'function') {
        return true
    }
    if (type === 'object' && value != null) {
        return true
    }
    return false
}

class Mult {
    constructor(options){
        this.options = options // 接收配置
        this.tplPath = '' // 模板地址
    }
    create(){
        this.getAppName()
        this.initDevServer()
        this.initChainWebpack()
        this.initConfigureWebpack()
        this.intEnv()
        this.initEntry()
        this.initOutPut()
        return this.options
    }
    getAppName(){
        let tplName = process.env.VUE_APP_NAME
        this.tplPath = tplName.replace("-", "/");
    }
    // 热更新状态
    initDevServer(){
        this.options.devServer = {
            disableHostCheck: true,
            port: 8090,
            open: true,
            hot: true,
            hotOnly: true,
            watchOptions: {
                poll: false,
            }
        }
    }
    // 更加颗粒化去改变webpack的配置
    initChainWebpack(){
        this.options.chainWebpack = this.mergeConfig(this.options.chainWebpack, this.preChainWebpack)
    }
    // webpack merge
    initConfigureWebpack(){
        this.options.configureWebpack = this.mergeConfig(this.options.configureWebpack, this.preConfigureWebpack)
    }
    mergeConfig(tranFun, preFun){
        if (tranFun) {
            return (config) => {
                tranFun.call(this, config)
                preFun.call(this, config)
            };
        } else {
            return (config) => {
                preFun.call(this, config)
            };
        }
    }
    preChainWebpack(config){
        let { tplPath } = this
        config.resolve.alias
            .set('common',resolve(`./src/common`))
            .set('@',resolve(`./src/${tplPath}`))
        // 移除预加载，用不上
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')

        config.plugin('copy')
        .tap(args => {
          args[0][0].from = path.resolve(__dirname, `./public/${tplPath}`);
          return args;
        });
        
        if (isAnalyzer) {
            config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
                {
                    analyzerMode: 'static'
                }
            ])
        }
        // 如果 热模块更新失败 就设置这个
        config.resolve.symlinks(true)
        return config
    }
    preConfigureWebpack(){

    }
    // 初始化项目常量
    intEnv(){
        let { tplPath } = this
        let requirePath = `./env/${tplPath}/index.js`
        require(requirePath)
    }
    // 初始化入口文件
    initEntry(){
        let { tplPath } = this
        this.options.pages = {
            app: {
                // page的入口
                entry: `src/${tplPath}/main.js`,
                // 模板来源
                template: `public/${tplPath}/index.html`,
                // 在 dist/index.html 的输出
                filename: 'index.html',
                title: '项目一',
                // chunks: ['chunk-vendors', 'chunk-common', 'app'] // 这里可以配置在html上面引入什么script
            }
        }
    }
    // 初始化打包后的文件
    initOutPut(){
        let { tplPath } = this
        console.log("tplPath", tplPath)
        let outputDir = `dist/${tplPath}`
        this.options.outputDir = outputDir
    }
}

module.exports = Mult