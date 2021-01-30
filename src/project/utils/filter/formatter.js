const formatter = {
    isReachFormat(row, col, cellValue, index) {
        let value = cellValue ? cellValue : row;
        let obj = {
            0: "未达标",
            1: "达标"
        };
        return obj[value];
    },
    taskStatusFormat(row, col, cellValue, index) {
        let value = cellValue ? cellValue : row;
        let obj = {
            0: "失败",
            1: "成功",
            2: "进行中"
        };
        return obj[value];
    },
    profitStatusFormat(row, col, cellValue, index) {
        let value = cellValue ? cellValue : row;
        let obj = {
            0: "未发放",
            1: "已发放"
        };
        return obj[value];
    },
    formatAuthorizeType(row, col, cellValue, index) {
        let value = cellValue ? +cellValue : +row;
        let obj = {
            0: "移动支付",
            1: "刷卡",
            2: "花呗分期"
        };
        return obj[value];
    },
    formatProfitStatus(row, col, cellValue, index) {
        let value = cellValue ? cellValue : row;
        let obj = {
            1: "已发放",
            0: "未发放"
        };
        return obj[value];
    },
    stateFormat(row, col, cellValue, index) {
        let value = cellValue ? cellValue : row;
        let obj = {
            1: "已生成",
            0: "生成中",
            2: "失败"
        };
        return obj[value];
    },
    typeFormat(row, col, cellValue, index) {
        let value = cellValue ? cellValue : row;
        return +value === 1 ? "代理商分润" : "日报";
    },
    pushStatusFormat(row, col, cellValue, index) {
        let value = cellValue ? cellValue : row;
        return +value === 1 ? "已推送" : "未推送";
    },
    expandStatusFormat(row, col, cellValue, index) {
        let value = cellValue ? cellValue : row;
        let obj = {
            0: "正常",
            1: "离职",
            2: "接替"
        };
        return obj[value];
    },
    filterDepart(row, col, cellValue, index){
        let value = cellValue
        console.log("value", value)
        if(!value || value.length === 0) return ''
        // 1日报 2普通提成 3项目组提成 4提测归属
        let obj = {
          1: "日报", 
          2: "普通提成",
          3: "项目组提成", 
          4: "提测归属"
        }
        let departArray = value.split(',').map(item=>{
            return obj[item]
        })
        return departArray.join(" , ")
    },
    sendType(row, col, cellValue, index){
        let value = cellValue
        console.log("value", value)
        if(!value || value.length === 0) return ''
        let obj = {
          1: "已发放", 
          0: "未发放"
        }
        let departArray = value.split(',').map(item=>{
            return obj[item]
        })
        return departArray.join(" , ")
    },
    merchantProfitType(row, col, cellValue, index){
        let value = cellValue
        console.log("value", value)
        if(!value || value.length === 0) return ''
        // 提成类型 1 离职 2新增 3存量
        let obj = {
          1: "离职", 
          2: "新增",
          3: "存量"
        }
        let departArray = value.split(',').map(item=>{
            return obj[item]
        })
        return departArray.join(" , ")
    },
};
export default formatter;
