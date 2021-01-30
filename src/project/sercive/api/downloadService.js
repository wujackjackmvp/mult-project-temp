import { reportService } from '../axiosService'

export function downloadList(params) {
    return reportService({
        url: '/v3/fileDownload/pageList',
        method: "get",
        params: params
    });
}