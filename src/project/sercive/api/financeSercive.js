import { reportService } from '../axiosService'
import deleteEmpty from '@/utils/deleteEmpty'

export function repDataList(params) {
    deleteEmpty(params, true)
    return reportService({
        url: "/v3/repData/pageList",
        method: "post",
        data: params
    });
}

export function repDataDownload(params) {
    deleteEmpty(params, true)
    return reportService({
        url: "/v3/repData/pageListDownload",
        // headers: { 'Content-Type': 'application/json' },
        responseType: 'blob',
        method: "post",
        data: params
    });
    
}

export function repChannelList(params) {
    deleteEmpty(params, true)
    return reportService({
        url: "/v3/repChannel/pageList",
        method: "get",
        data: params
    });
}

export function repDailyExport(params) {
    deleteEmpty(params, true)
    return reportService({
        url: "/v3/repDaily/export",
        responseType: 'blob',
        method: "post",
        data: params
    });
}

export function repDailyExportVaild(params) {
    deleteEmpty(params, true)
    return reportService({
        url: "/v3/repDaily/export",
        method: "post",
        data: params
    });
}
export function exportRatify(params) {
    deleteEmpty(params, true)
    return reportService({
        url: "/v3/repDaily/exportRatify",
        headers: { 'Content-Type': 'application/json' },
        responseType: 'blob',
        method: "post",
        data: params
    });
}

export function exportRatifyVaild(params) {
    deleteEmpty(params, true)
    return reportService({
        url: "/v3/repDaily/exportRatify",
        method: "post",
        data: params
    });
}
export function channelStatistics(params) {
    deleteEmpty(params, true)
    return reportService({
        url: "/v3/repDaily/channelStatistics",
        method: "post",
        data: params
    });
}

export function areaStatistics(params) {
    deleteEmpty(params, true)
    return reportService({
        url: "/v3/repDaily/areaStatistics",
        method: "post",
        data: params
    });
}

export function merchantStatistics(params) {
    deleteEmpty(params, true)
    return reportService({
        url: "/v3/repDaily/merchantStatistics",
        method: "post",
        data: params
    });
}

export function expanderStatistics(params) {
    deleteEmpty(params, true)
    return reportService({
        url: "/v3/repDaily/expanderStatistics",
        method: "post",
        data: params
    });
}

export function newMechantStatistics(params) {
    deleteEmpty(params, true)
    return reportService({
        url: "/v3/repDaily/newMechantStatistics",
        method: "post",
        data: params
    });
}

// 汇总批量查询导入导出
export function uploadQueryExcel(data) {
    return reportService({
        url: "/v3/repData/uploadQueryExcel",
        method: "post",
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' },
        // responseType: 'arraybuffer'
    });
}

// 汇总批量查询导入导出
export function transactionDetail(params) {
    return reportService({
        url: "/v3/Transaction/details",
        method: "get",
        params
    });
}

export function transactionExport(params) {
    return reportService({
        url: "/v3/Transaction/exportDown",
        // headers: { 'Content-Type': 'application/json' },
        // responseType: 'blob',
        method: "get",
        params
    });
}

// 交易明细批量导入下载
export function downTransaction(data) {
    return reportService({
        url: "/v3/Transaction/downTransaction",
        method: "post",
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
        // responseType: 'arraybuffer'
    });
}


// 拓展人提成报表汇总报表
export function pageSummy(data) {
    return reportService({
        url: "/v3/expanderProfitReport/pageExpanderProfitSummy",
        method: "post",
        data
        // responseType: 'arraybuffer'
    });
}
// 拓展人提成商户明细报表
export function pageProfitMerchant(data) {
    return reportService({
        url: "/v3/expanderProfitReport/pageExpanderProfitMerchant",
        method: "post",
        data
        // responseType: 'arraybuffer'
    });
}
// 拓展人提成补发商户明细报表
export function pageMerchantSupply(data) {
    return reportService({
        url: "/v3/expanderProfitReport/pageExpanderProfitMerchantSupply",
        method: "post",
        data
        // responseType: 'arraybuffer'
    });
}

// 拓展人提成报表调整单报表
export function pageAdjust(data) {
    return reportService({
        url: "/v3/expanderProfitReport/pageExpanderProfitAdjust",
        method: "post",
        data
        // responseType: 'arraybuffer'
    });
}

// 导出
export function expanderExport(data) {
    return reportService({
        url: "/v3/expanderProfitReport/export",
        method: "post",
        data
        // responseType: 'arraybuffer'
    });
}

