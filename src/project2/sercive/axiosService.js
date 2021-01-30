import Vue from 'vue'
import { Message } from 'element-ui'
import axiosClass from './axiosClass'
import $config from '@/config'
import { redirectUrl } from '@/utils/url'
const getAccessToken = () => {
    const accessToken = Vue.prototype.$ls.get('access_token')
    if (accessToken) {
        return accessToken
    }
    return ''
}
const getUserId = () => {
    const userId = Vue.prototype.$ls.get('user_id')
    if (userId) {
        return userId
    }
    return 0
}

// 自动对账初始化axios配置
const dgwConfig = {
    baseURL: $config.dgwBaseUrl,
    timeout: 60000,
    requestHandler: (config) => {
        if (getAccessToken()) {
            config.headers.token = getAccessToken()
        }
        if (getUserId()) {
            config.headers.userId = getUserId()
        }
        return config
    },
    responseHanlder: (response) => {
        let isProduct = (process.env.NODE_ENV === 'production')
        let url = isProduct ? '' : response.config.url
        let errorMsg = ''
        if(response.data.code === 500){
            errorMsg = `系统错误 ${url}`
            Message.error(errorMsg);
            return
        }
        if ([901, 902, 903].indexOf(response.data.code) > -1) {
            Message.error('登录超时,请重新登录');
            window.localStorage.clear()
            redirectUrl()
        }
        return response
    },
    errorHanlder: (error)=>{
        return error
    }
}

// 报表系统初始化axios配置
const reportConfig = {
    baseURL: $config.reportBaseUrl,
    timeout: 60000,
    requestHandler: (config) => {
        if (getAccessToken()) {
            config.headers.token = getAccessToken()
        }
        console.log("config", config)
        return config
    },
    responseHanlder: (response) => {
        if ([901, 903].indexOf(response.data.code) > -1) {
            Message.error('登录超时,请重新登录')
            window.localStorage.clear()
            redirectUrl()
        }
        return response
    },
    errorHanlder: (error)=>{
        if (!error.response) {
            // localStorage.clear()
            return
        }
        let message = error.response.data || error.response.message

        return Promise.reject(message)
    }
}


const dgwService = new axiosClass(dgwConfig).create()
const reportService = new axiosClass(reportConfig).create()
export { 
    dgwService,
    reportService
}
