export default {
    redirectUrl: process.env.VUE_APP_REDIRECT_URL, // 登录中台
    dgwBaseUrl: process.env.VUE_APP_DGW_URL, // 自动对账
    reportBaseUrl: process.env.VUE_APP_REPORT_URL, // 报表
    storageOptions: {
        namespace: "TG_REPORT_", // key prefix
        name: "ls", // name variable Vue.[ls] or this.[$ls],
        storage: "local" // storage name session, local, memory
    },
    message: {
        maxCount: 2,
        duration: 3,
        errorDuration: 5
    }
};
