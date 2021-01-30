import { addFeeConfigSave, addFeeConfigList } from '@/sercive/api/rateSercive'
export default {
    data() {
        return {
            SettlementAndRateParams: {
                repChannelId: null,
                channelLeader: null,
                companyType: null,
                ratioCalculationRules: null,
                addFeeSettings: [
                    {
                        startDate: null,
                        endDate: null,
                        rateSettings: [
                            {
                                settlementTime: null,
                                calculationForm: null,
                                addRate: null,
                                addAmount: null,
                                startAmount: null,
                                endAmount: null,
                                id: null
                            }
                        ]
                    }
                ]
            }
        }
    },
    methods: {
        /* =================结算加费率设置=================== */
        // 以下4个函数都是设置结算加费率之前的判断
        isRepeactTime() {
            let isRepeact = false;
            let { addFeeSettings } = this.SettlementAndRateParams;
            if (addFeeSettings.length <= 1) {
                return isRepeact;
            }
            return isRepeact = addFeeSettings.some((item, index) => {
                let curStartTime = item.startDate;
                let curEndTime = item.endDate;
                return this.filterTimeRepeact(curStartTime, curEndTime, index);
            });
        },
        filterTimeRepeact(curStartTime, curEndTime, lastIndex) {
            let { addFeeSettings } = this.SettlementAndRateParams;
            let isRepeact = false;
            return isRepeact = addFeeSettings.some((item, index) => {
                if (lastIndex !== index) {
                    let flag1 = this.isDuringDate(
                        curStartTime,
                        item.startDate,
                        item.endDate
                    );
                    let flag2 = this.isDuringDate(
                        curEndTime,
                        item.startDate,
                        item.endDate
                    );
                    return (flag1 || flag2);
                } else {
                    return false
                }
            });
        },
        isDuringDate(currentTime, startTime, endTime) {
            let startTimeDate = new Date(startTime);
            let endTimeDate = new Date(endTime);
            let curTimeDate = new Date(currentTime);
            let flag = (curTimeDate >= startTimeDate && curTimeDate <= endTimeDate)
            return flag;
        },
        testPar02(settings) {
            if (settings.length > 1) {
                let settingsStr = settings.map(v => {
                    return v.settlementTime + v.calculationForm
                })
                return this.isRepeat(settingsStr)
            }
            return false
        },
        // 
        sureModify02() {
            if (!this.SettlementAndRateParams.channelLeader || this.SettlementAndRateParams.ratioCalculationRules === null) {
                this.$message.error("负责人不能为空！");
                return;
            }
            if (!this.SettlementAndRateParams.ratioCalculationRules || this.SettlementAndRateParams.ratioCalculationRules === null) {
                this.$message.error("进位方式不能为空！");
                return;
            }
            let arr = this.SettlementAndRateParams.addFeeSettings;
            if (!arr || arr.length === 0) {
                this.$message.error("请填写项目！");
                return;
            }
            if (this.hasNullTest02(arr)) {
                this.$message.error("必填项不能为空！");
                return;
            } else if (this.isRepeactTime()) {
                this.$message.error("生效时间不可以交叉重叠");
                return;
            }
            let booleans = this.SettlementAndRateParams.addFeeSettings.map(v =>
                this.testPar02(v.rateSettings)
            );
            if (booleans.includes(true)) {
                this.$message.error("在同一时间段存在相同条件，请修改或删除！");
            } else {
                this.addFeeConfigSave()
            }
        },
        // 增
        async addFeeConfigSave() {
            let res = await addFeeConfigSave(
                this.SettlementAndRateParams
            )
            if (res.data.code == 0) {
                this.$message.success("修改成功");
                this.dialogFormVisible = false;
            } else {
                this.$message.error(res.data.errMsg);
            }
        },
        // 查
        async addFeeConfigList(row) {
            let params = "?repChannelId=" + encodeURIComponent(row.repChannelId)
            let res = await addFeeConfigList(params)
            let data = res.data.extra
            if (res.data.code == 0 && data) {
                if (data.addFeeSettings.length === 0 || data.addFeeSettings === null) {
                    this.addRateConf02();
                } else {
                    this.SettlementAndRateParams.channelLeader = data.channelLeader
                    this.SettlementAndRateParams.companyType = data.companyType
                    this.SettlementAndRateParams.repChannelId = data.repChannelId
                    this.SettlementAndRateParams.ratioCalculationRules = data.ratioCalculationRules
                    let setIds = []
                    this.SettlementAndRateParams.addFeeSettings = []
                    // 因为接口不能直接返回理想的格式 所以这里先得到所有的时间段
                    data.addFeeSettings.forEach(item => {
                        let setId = item.startDate + item.endDate
                        if (setIds.indexOf(setId) === -1) {
                            setIds.push(setId)
                        }
                    })
                    // 得到时间段之后以时间段为一个单位去遍历得到每一个时间段里面的内容
                    setIds.forEach((item, index) => {
                        let startDate = ''
                        let endDate = ''
                        let rateSettings = []
                        data.addFeeSettings.forEach(rateSet => {
                            if (item === (rateSet.startDate + rateSet.endDate)) {
                                startDate = rateSet.startDate
                                endDate = rateSet.endDate
                                rateSettings.push({
                                    settlementTime: rateSet.settlementTime,
                                    calculationForm: rateSet.calculationForm,
                                    addRate: rateSet.addRate * 100,
                                    addAmount: rateSet.addAmount,
                                    startAmount: rateSet.startAmount,
                                    endAmount: rateSet.endAmount,
                                    id: rateSet.id
                                })
                            }
                        })
                        this.SettlementAndRateParams.addFeeSettings.push({
                            startDate,
                            endDate,
                            rateSettings
                        })
                        this.$nextTick(() => {
                            let name = 'rate-config'+ index
                            this.$refs[name][0].updateTime([startDate, endDate])
                        })
                    })
                }
            }
            this.dialogFormVisible = true;
        },
        // 添加一整个费率选项
        addRateConf02() {
            this.SettlementAndRateParams.addFeeSettings.push({
                startDate: null,
                endDate: null,
                rateSettings: [
                    {
                        settlementTime: null,
                        calculationForm: null,
                        addRate: null,
                        addAmount: null,
                        startAmount: null,
                        endAmount: null,
                        id: null
                    }
                ]
            });
        },
        // 删除某一整个费率设置
        deleteConf02(index) {
            this.SettlementAndRateParams.addFeeSettings.splice(index, 1);
            this.updateTiem()
        },
        // 找到rate-config02 会发现我定义了ref名字 循环调用里面的updateTime刷新时间
        updateTiem(){
            this.SettlementAndRateParams.addFeeSettings.forEach((item, index)=>{
                this.$nextTick(() => {
                    let name = 'rate-config'+ index
                    this.$refs[name][0].updateTime([item.startDate, item.endDate])
                })
            })
        },
        // 非法判断
        hasNullTest02(arr) {
            let hasNull = false;
            for (let i = 0; i < arr.length; i++) {
                let settings = arr[i].rateSettings;
                if (settings && settings.length > 0) {
                    for (let j = 0; j < settings.length; j++) {
                        let v = settings[j];
                        if (
                            !v ||
                            !v.settlementTime ||
                            !v.calculationForm
                        ) {
                            hasNull = true;
                        }
                    }
                } else {
                    hasNull = true;
                }
            }
            return hasNull;
        },
    }
}