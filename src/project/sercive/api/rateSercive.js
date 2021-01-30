import { reportService } from "../axiosService";
import deleteEmpty from "@/utils/deleteEmpty";
import config from '@/config/index.js'

const baseURL = config.channelUrl
/*===========================渠道成本费率================================*/
export function RateConfigSave(params) {
    deleteEmpty(params, true);
    return reportService({
        baseURL,
        url: "/v3/channelCostRate/RateConfigSave",
        method: "post",
        data: params
    });
}
export function RateConfigPageList(params) {
    deleteEmpty(params, true);
    return reportService({
        baseURL,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: "/v3/channelCostRate/RateConfigPageList" + params,
        method: "get"
    });
}

export function modify(params) {
    deleteEmpty(params, true);
    return reportService({
        url: "/v3/channelCostRate/modify",
        method: "post",
        data: params
    });
}

export function enAble(params) {
    return reportService({
        baseURL,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: "/v3/repChannel/enAble" + params,
        method: "get"
    });
}

export function channelDelete(params) {
    deleteEmpty(params, true);
    return reportService({
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: "/channel/delete" + params,
        method: "post"
    });
}

export function repChannelList(params) {
    deleteEmpty(params, true);
    return reportService({
        baseURL,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: "/v3/repChannel/pageList" + params,
        method: "get"
    });
}

export function RateConfigdelete(params) {
    deleteEmpty(params, true);
    return reportService({
        url: "/v3/channelCostRate/RateConfigdelete",
        method: "post",
        data: params
    });
}
export function getRateConfigSetting(params) {
    deleteEmpty(params, true);
    return reportService({
        baseURL,
        url: "/v3/common/getRateConfigSetting",
        method: "get"
    });
}
export function getAddFeeParams(params) {
    deleteEmpty(params, true);
    return reportService({
        baseURL,
        url: "/v3/common/getAddFeeParams",
        method: "get"
    });
}
export function addFeeDelById(data) {
    return reportService({
        url: "/v3/repAddFee/addFeeDelById",
        method: "post",
        data
    });
}
export function addFeeConfigSave(data) {
    return reportService({
        baseURL,
        url: "/v3/repAddFee/addFeeConfigSave",
        method: "post",
        data
    });
}

export function addFeeConfigList(params) {
    return reportService({
        baseURL,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: "/v3/repAddFee/addFeeConfigList" + params,
        method: "get"
    });
}

export function disAble(params) {
    return reportService({
        baseURL,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: "/v3/repChannel/disAble" + params,
        method: "get"
    });
}
