import { reportService } from '../axiosService'

export function upOrder(data) {
    return reportService({
        url: '/v3/upOrderEvent/pageList',
        method: "post",
        data
    });
}

export function updateUpOrder(data) {
    return reportService({
        url: '/v3/upOrderEvent/updateUpOrder',
        method: "post",
        data
    });
}