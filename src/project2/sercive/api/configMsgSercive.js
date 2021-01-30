import { reportService } from '../axiosService'
import deleteEmpty from '@/utils/deleteEmpty'

/*===========================配置信息================================*/
export function RateConfigSave(params) {
    deleteEmpty(params, true)
    return reportService({
        url: '/v3/channelCostRate/RateConfigSave',
        method: "post",
        data: params
    });
}
export function RateConfigPageList(params) {
    deleteEmpty(params, true)
    return reportService({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        url: '/v3/channelCostRate/RateConfigPageList' + params,
        method: "get"
    });
}

export function modify(params) {
    deleteEmpty(params, true)
    return reportService({
        url: '/v3/channelCostRate/modify',
        method: "post",
        data: params
    });
}


export function enAble(params) {
    return reportService({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        url: '/v3/repChannel/enAble' + params,
        method: "get"
    });
}

export function channelDelete(params) {
    deleteEmpty(params, true)
    return reportService({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        url: '/channel/delete' + params,
        method: "post"
    });
}

export function repChannelList(params) {
    deleteEmpty(params, true)
    return reportService({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        url: '/v3/repChannel/pageList' + params,
        method: "get"
    });
}

/* ========== 2020/8/24 ===========*/
// 部门信息
export function getDepartment(params) {
    deleteEmpty(params, true)
    return reportService({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        url: '/v3/configInfo/pageArea',
        method: "get",
        params
    });
}
// 拓展人
export function pageAreaExpander(params) {
    deleteEmpty(params, true)
    return reportService({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        url: '/v3/configInfo/pageAreaExpander',
        method: "get",
        params
    });
}

// 商户信息
export function pageMerchantNew(data) {
    deleteEmpty(data, true)
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        url: '/v3/configInfo/pageMerchantNew',
        method: "post",
        data
    });
}

// 下载商户模板
export function downloadMerchant(data) {
    deleteEmpty(data, true)
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        url: '/v3/configInfo/downloadMerchant',
        method: "post",
        data
    });
}

// 上传商户模板
export function uploadMerchant(params) {
    deleteEmpty(params, true)
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        url: '/v3/configInfo/uploadMerchant',
        method: "get",
        params
    });
}

// 特殊商户
export function pageMerchantSpecial(data) {
    deleteEmpty(data, true)
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        url: '/v3/configInfo/pageSpecialMerchant',
        method: "post",
        data
    });
}

// 拓展人提成配置列表
export function expanderConfig(data) {
    return reportService({
        url: '/v3/repExpander/listExpanderSetting',
        method: "post",
        data
    });
}

// 获取拓展人提成配置(1.渠道配置2.提成部门3.指标部门)
export function expanderDeptOrChannel(data) {
    return reportService({
        url: '/v3/repExpander/listExpanderSettingPage',
        method: "post",
        data
    });
}

// 获取拓展人提成配置(商户、项目、项目组)
export function expanderMerchOrProject(params) {
    return reportService({
        url: '/v3/repExpander/findExpanderSetting',
        method: "get",
        params
    });
}

// 拓展人提成配置更新
export function expanderConfigUpdate(data) {
    return reportService({
        url: '/v3/repExpander/upExpanderSetting',
        method: "post",
        data
    });
}

// 拓展人提成配置删除
export function expanderConfigDel(params) {
    return reportService({
        url: '/v3/repExpander/delExpanderSetting',
        method: "get",
        params
    });
}

// 拓展人提成配置--新建与上月一致
export function saveSameWithLastMonth(params) {
    return reportService({
        url: '/v3/repExpander/saveSameWithLastMonth',
        method: "get",
        params
    });
}

// 拓展人提成配置--查询上月拓展人提成配置
export function findLastMonthSetting(params) {
    return reportService({
        url: '/v3/repExpander/findLastMonthSetting',
        method: "get",
        params
    });
}


