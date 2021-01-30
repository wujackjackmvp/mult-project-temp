
import { dgwService } from '../axiosService'
export function submitLogout(params) {
    return dgwService({
        url: "/sys/user/loginOut",
        method: "post",
        data: params
    });
}
export function getUserInfo(params) {
    return dgwService({
        url: "/sys/user/queryInfo",
        method: "post",
        data: params
    });
}

export function loginOut(params) {
    return dgwService({
        url: "/sys/user/loginOut",
        method: "post",
        data: params
    });
}