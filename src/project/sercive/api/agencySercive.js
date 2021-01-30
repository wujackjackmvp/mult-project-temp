import { reportService } from "../axiosService";
import deleteEmpty from "@/utils/deleteEmpty";

/*===========================代理商分润生成================================*/
export function agentList(params) {
    deleteEmpty(params, true);
    return reportService({
        url: "/v3/configInfo/pageAgent",
        method: "post",
        data: params
    });
}

export function synchAgent(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/configInfo/synchAgent",
        method: "get",
        params
    });
}

export function repAgentProfit(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/repAgentProfit/count",
        method: "get",
        params
    });
}
export function repAgentProfitList(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/repAgentProfit/pageList",
        method: "post",
        data: params
    });
}

export function repAgentProfitCreate(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/repAgentProfit/Create",
        method: "post",
        data: params
    });
}

export function reSend(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/repAgentProfit/reSend",
        method: "post",
        data: params
    });
}

export function financeAuthorize(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/repRatity/financeAuthorize",
        method: "get",
        params
    });
}

export function reboot(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/repRatity/reboot",
        method: "post",
        data: params
    });
}
export function handOut(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/repRatity/handOut",
        method: "post",
        data: params
    });
}

export function discard(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/repRatity/discard",
        method: "post",
        data: params
    });
}

export function addReport(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/repRatity/addReport",
        method: "post",
        data: params
    });
}

export function repAgentMonthSend(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/repAgentMonthSend/pageList",
        method: "post",
        data: params
    });
}

export function preSend(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/repAgentMonthSend/preSend",
        method: "post",
        data: params
    });
}

export function ratifySend(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/repAgentMonthSend/ratifySend",
        method: "post",
        data: params
    });
}

export function rebootFind(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/repRatity/rebootFind",
        method: "get",
        // method: "post",
        params: params
    });
}

export function authorizeReport(params) {
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/authorizeUpload/authorizeReport",
        method: "get",
        params
    });
}

// 代理商同步接口状态查询
export function synchAgentState(params) {
    deleteEmpty(params, true);
    return reportService({
        url: "/v3/configInfo/synchAgentState",
        method: "get",
        params
    });
}


// 代理商分润--系统自动生成--调整明细查看
export function findAdjustment(params) {
    deleteEmpty(params, true);
    return reportService({
        url: "/v3/repAgentProfit/findAdjustment",
        method: "post",
        data:params
    });
}

// 代理商分润--系统自动生成--调整
export function selectAdjustUploadAgent(params) {
    deleteEmpty(params, true);
    return reportService({
        url: "/v3/repAgentProfit/selectAdjustUploadAgent",
        method: "post",
        data:params
    });
}

// 代理商分润--系统自动生成--调整确认
export function adjustDetermine(params) {
    deleteEmpty(params, true);
    return reportService({
        url: "/v3/repAgentProfit/determine",
        method: "post",
        data:params
    });
}

// 代理商分润--财务核准生成--调整明细查看
export function authFindAdjustment(params) {
    deleteEmpty(params, true);
    return reportService({
        url: "/v3/repRatity/authorize/findAdjustment",
        method: "get",
        params
    });
}

// 代理商分润--财务核准生成--调整选择
export function authSelectAdjustUpload(params) {
    deleteEmpty(params, true);
    return reportService({
        url: "/v3/adjustUpload/selectAdjustUpload",
        method: "post",
        data:params
    });
}