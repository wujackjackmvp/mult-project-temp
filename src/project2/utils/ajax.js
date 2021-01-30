import axios from "axios";
import deleteEmpty from "./deleteEmpty";
import Vue from "vue";
import { redirectUrl } from "@/utils/url";
import $config from '@/config'
const apiHost2 = $config.reportBaseUrl
// axios.defaults.withCredentials = true
// axios.defaults.baseURL = api.host +'/aggcode-backstage'

// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
// http response 拦截器
axios.interceptors.response.use(
    response => {
        if ([901, 903].indexOf(response.data.code) > -1) {
            Vue.prototype.$message.error("登录超时,请重新登录");
            Vue.prototype.$ls.remove("access_token");
            setTimeout(() => {
                redirectUrl();
            }, 1000);
        }
        return response;
    },
    error => {
        if (!error.response) {
            // localStorage.clear()
            return;
        }
        let message = error.response.data || error.response.message;

        return Promise.reject(message);
    }
);

export function fetch(type, contentTpye, url, params) {
    if (contentTpye == "X") {
        contentTpye = "application/x-www-form-urlencoded";
    }
    if (contentTpye == "JSON") {
        contentTpye = "application/json";
    }

    if (contentTpye == "down") {
        var responseType = "blob";
        contentTpye = "application/json";
    }

    deleteEmpty(params, true);
    return new Promise((resolve, reject) => {
        let obj = {
            method: type,
            url: url,
            headers: { "Content-Type": contentTpye },
            responseType: responseType
        };
        if (type === "post") {
            obj.data = params;
        } else {
            obj.params = params;
        }
        // tokentoken
        let token = Vue.prototype.$ls.get("access_token");
        if (token !== null || token) {
            obj.headers.token = Vue.prototype.$ls.get("access_token");
        }
        axios(obj)
            .then(response => {
                console.log("response", response);
                resolve(response);
            })
            .catch(error => {
                console.log(error, "ppp");
                reject(error);
            });
    });
}

export default {
    // 获取我的页面的后台数据
    mineBaseMsgApi() {
        // alert('进入api.js')
        return fetch("/api/getBoardList");
    },
    apiHost2,
    //   报表系统请求

    commonApi2(type, contentTpye, url, params) {
        return new Promise((resolve, reject) => {
            fetch(type, contentTpye, apiHost2 + url, params)
                .then(res => {
                    console.log("resolve");
                    resolve(res);
                })
                .catch(error => {
                    console.log("21212", error);
                    reject(error);
                });
        });
        // return fetch(type, contentTpye, apiHost2 + url, params)
    }
};


export { axios, apiHost2 };
