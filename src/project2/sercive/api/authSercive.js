import { dgwService } from '../axiosService'
/*===========================数据权限管理================================*/   
export function userEdit(params) {
    return dgwService({
        url: "/sys/user/edit",
        method: "post",
        data: params
    });
}

export function getUserList(params) {
    return dgwService({
        url: "/sys/user/queryList",
        method: "post",
        data: params
    });
}

export function getUserType(params) {
    return dgwService({
        url: "/sys/userType/queryList",
        method: "post",
        data: params
    });
}

export function getRoleList(params) {
    console.log("params",  params)
    return dgwService({
        url: "/sys/role/queryList",
        method: "post",
        data: params
    });
}

export function getDepartmentList(params) {
    return dgwService({
        url: "/sys/depart/query",
        method: "post",
        data: params
    });
}

export function getUserDetail(params) {
    return dgwService({
        url: "/sys/user/queryInfo",
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
