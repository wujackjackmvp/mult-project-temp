import Vue from 'vue'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

import router from './router'
import store from './store'
import { setNoParamsUrl, redirectUrl } from './utils/url'

// 页面白名单
const whiteList = []

// 获取重定向带过来的参数
function getRedirectParams(strName) {
    const strHref = window.location.href; // 获取Url字串
    const intPos = strHref.indexOf('?'); // 参数开始位置
    const strRight = strHref.substr(intPos + 1);
    const arrTmp = strRight.split('&'); // 参数分割符
    for (let i = 0; i < arrTmp.length; i++) {
        const arrTemp = arrTmp[i].split('=');
        if (arrTemp[0].toUpperCase() == strName.toUpperCase()) { return arrTemp[1]; }
    }
    return '';
}

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const urlToken = Vue.ls.get('access_token') || getRedirectParams('token')
    const urlUserId = Vue.ls.get('userId') || getRedirectParams('userId')
    if (urlToken) {
        if (urlToken) {
            Vue.ls.set('access_token', urlToken, 1000 * 60 * 60 * 24 * 7)
            Vue.ls.set('userId', urlUserId, 1000 * 60 * 60 * 24 * 7)
        }

        // 同步用户数据
        if (!store.state.userInfo.userId) {
            try {
                await store.dispatch('getUserInfo', { userId: urlUserId })
                await store.dispatch('repChannelList')
                next()
            } catch (error) {
                redirectUrl()
            }
        }
        if (getRedirectParams('token')) {
            setNoParamsUrl()
        }
        next()
    } else {
        if (whiteList.includes(to.name)) {
            next()
        } else {
            redirectUrl()
        }
    }
})

router.afterEach((to, from, next) => {
    NProgress.done()
})