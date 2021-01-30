// 关于环境变量的文件 我这里使用策略模式来代理if else
// 以环境变量作为key,根据环境变量的变化去动态改变VUE_APP_XXX 的一些值
// 例如你运行的时 cross-env VUE_APP_NAME=project NODE_ENV=gray vue-cli-service build
// 因为NODE_ENV=gray 所以返回的肯定灰度的常量

let reportObj = {
    'development': 'http://report.833006.biz/tgjf-report-web-report',
    'production': 'http://report.yltg.com.cn/tgjf-report-web-report',
    'gray': 'http://report-gray.833006.biz/tgjf-report-web-report',
}

let redirectObj = {
    'development': 'http://sso.833006.biz',
    'production': 'http://datagw-sso.833006.net',
    'gray': 'http://sso-gray.833006.biz',
}

let dgwObj = {
    'development': 'http://dgwrec.yltg.com.cn',
    'production': 'http://dgwpro.yltg.com.cn',
    'gray': 'http://dgwpro-gray.833006.biz',
}
process.env.VUE_APP_REDIRECT_URL = redirectObj[process.env.NODE_ENV]
process.env.VUE_APP_REPORT_URL = reportObj[process.env.NODE_ENV]
process.env.VUE_APP_DGW_URL = dgwObj[process.env.NODE_ENV]

// 可以在这里打印 console.log(process.env.VUE_APP_REDIRECT_URL) 在终端看到输出查看是否生效