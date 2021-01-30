import { reportService } from "../axiosService";
import deleteEmpty from "@/utils/deleteEmpty";

/*===========================渠道核准上传================================*/
export function repChannelList(params) {
    deleteEmpty(params, true);
    return reportService({
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: "/v3/repChannel/pageList",
        method: "get",
        data: params
    });
}

export function authorizeUpload(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/authorizeUpload/pageAuthorize",
        method: "get",
        params
    });
}

export function downloadAuthorize(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/authorizeUpload/downloadAuthorize",
        method: "get",
        responseType: "blob",
        params
    });
}

export function downAuthorizeTemplate(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/authorizeUpload/downAuthorizeTemplate",
        method: "get",
        responseType: "blob",
        params
    });
}

export function undoAuthorize(params) {
    deleteEmpty(params, true);
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/authorizeUpload/undoAuthorize",
        method: "post",
        data: params
    });
}

export function reboot(params) {
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/repRatity/reboot",
        method: "post",
        data: params
    });
}
export function FindAuthorize(params) {
    return reportService({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: "/v3/repRatity/FindAuthorize",
        method: "get",
        params
    });
}
