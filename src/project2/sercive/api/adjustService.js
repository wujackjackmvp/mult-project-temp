import { reportService } from '../axiosService'

// 调整明细列表
export function adjustList(data) {
    return reportService({
        url: '/v3/adjustUpload/listAdjustUpload',
        method: "post",
        data
    });
}

// 下载调整明细
export function downloadAdjust(data) {
    return reportService({
        url: '/v3/adjustUpload/downloadAdjustUpload',
        method: "post",
        data
    });
}

// 撤销调整明细
export function cancelAdjust(data) {
    return reportService({
        url: '/v3/adjustUpload/deleteAdjustUpload',
        method: "post",
        data
    });
}

// 调整上传
export function adjustUpload(data) {
    return reportService({
        url: '/v3/adjustUpload/adjustUploadFile',
        method: "post",
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
    });
}


