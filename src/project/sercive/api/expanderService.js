import { reportService } from '../axiosService'

// 拓展人提成报表
export function expanderProfit(data) {
    return reportService({
        url: '/v3/expanderProfit/pageExpanderProfit',
        method: "post",
        data
    });
}

// 核准记录选择列表
export function approveRecord(data) {
    return reportService({
        url: '/v3/expanderProfit/pageRepAuthorizeUpload',
        method: "post",
        data
    });
}

// 调整明细选择列表
export function adjustList(data) {
    return reportService({
        url: '/v3/expanderProfit/pageRepAdjust',
        method: "post",
        data
    });
}


// 拓展人提成-生成核准报表
export function expanderCreate(data) {
    return reportService({
        url: '/v3/expanderProfit/create',
        method: "post",
        data
    });
}

// 拓展人提成-重新生成核准报表
export function expanderRemake(data) {
    return reportService({
        url: '/v3/expanderProfit/remake',
        method: "post",
        data
    });
}

// 拓展人提成-发放回填
export function expanderSend(data) {
    return reportService({
        url: '/v3/expanderProfit/send',
        method: "post",
        data
    });
}

// 拓展人提成-撤销
export function expanderRevoke(data) {
    return reportService({
        url: '/v3/expanderProfit/revoke',
        method: "post",
        data
    });
}

