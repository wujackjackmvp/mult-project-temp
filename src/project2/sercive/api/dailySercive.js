import { reportService } from '../axiosService'
import deleteEmpty from '@/utils/deleteEmpty'

/*===========================日报生成================================*/
export function allExport(params) {
    deleteEmpty(params, true)
    return reportService({
        url: '/v3/repDaily/allExport',
        method: "post",
        data: params
    });
}

export function repDaily(params) {
    deleteEmpty(params, true)
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: '/v3/repDaily/pageList',
        method: "post",
        data: params
    });
}

export function repDailyCreate(params) {
    deleteEmpty(params, true)
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: '/v3/repDaily/Create',
        method: "post",
        data: params
    });
}


export function repRatity(params) {
    return reportService({
        headers: { 'Content-Type': 'application/json' },
        url: '/v3/repRatity/pageList',
        method: "post",
        data: params
    });
}

export function ratityAdd(params) {
    deleteEmpty(params, true)
    return reportService({
        url: '/v3/repRatity/ratityAdd',
        method: "post",
        data: params
    });
}

// 日报生成-核准-重新选择生成
export function anewSelect(params) {
    deleteEmpty(params, true)
    return reportService({
        url: '/v3/repRatity/anewSelect',
        method: "get",
        params
    });
}

// 日报生成-核准-撤销
export function deleteRecord(params) {
    deleteEmpty(params, true)
    return reportService({
        url: '/v3/repRatity/deleteRecord',
        method: "post",
        data:params
    });
}

// 日报生成-核准记录查看
export function findRecord(params) {
    deleteEmpty(params, true)
    return reportService({
        url: '/v3/repRatity/findRecord',
        method: "get",
        params
    });
}

// 日报生成-调整明细
export function findAdjustment(params) {
    deleteEmpty(params, true)
    return reportService({
        url: '/v3/repRatity/findAdjustment',
        method: "get",
        params
    });
}

// 日报生成-财务核准生成-选择明细列表
export function selectAdjustUpload(params) {
    deleteEmpty(params, true)
    return reportService({
        url: '/v3/adjustUpload/selectAdjustUpload',
        method: "post",
        data: params
    });
}

export function repDailyExport(params) {
    deleteEmpty(params, true)
    return reportService({
        url: '/v3/repDaily/export',
        method: "post",
        data: params,
        // responseType: "blob"
    });
}


export function exportRatify(params) {
    deleteEmpty(params, true)
    return reportService({
        url: '/v3/repDaily/export',
        method: "post",
        data: params,
        responseType: "blob"
    });
}

export function exportRatifyVaild(params) {
    deleteEmpty(params, true)
    return reportService({
        url: '/v3/repDaily/export',
        method: "post",
        data: params,
    });
}
 
export function merchantStatistics(params) {
    deleteEmpty(params, true)
    return reportService({
        url: '/v3/repDaily/merchantStatistics',
        method: "post",
        data: params,
    });
}

export function channelStatistics(params) {
    // deleteEmpty(params, true)
    return reportService({
        headers: { "Content-Type": "application/json" },
        url: '/v3/repDaily/channelStatistics',
        method: "post",
        data: params,
    });
}
