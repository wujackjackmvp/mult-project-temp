<template>
    <div class="tb-body mt10">
        <div style="display: flex;">
            <div class="w12">
                <el-select v-model="row.payType" @change="testUnit">
                    <el-option
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                        v-for="item in payTypeList"
                    ></el-option>
                </el-select>
            </div>
            <div class="w12">
                <el-select v-model="row.settlementTime" @change="testUnit">
                    <el-option
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                        v-for="item in settlementTimeList"
                    ></el-option>
                </el-select>
            </div>
            <div class="w12">
                <el-select v-model="row.merchantType" @change="testUnit">
                    <el-option
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                        v-for="item in merchantTypeList"
                    ></el-option>
                </el-select>
            </div>
            <div class="w12">
                <el-select v-model="row.specialIndusrty" @change="testUnit">
                    <el-option
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                        v-for="item in specialIndusrtyList"
                    ></el-option>
                </el-select>
            </div>
            <div class="w12">
                <el-select
                    v-model="row.profitExpression"
                    @change="profitChange"
                >
                    <el-option
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                        v-for="item in profitExpressionList"
                    ></el-option>
                </el-select>
            </div>
            <div class="w40">
                <el-button
                    type="text"
                    style="padding-right: 10px;"
                    @click="isDeleteFuc"
                    >删除</el-button
                >
            </div>
        </div>
        <div>
            <div class="df mt10" v-if="row.profitExpression == 1">
                (交易金额-退款)*(商户费率-成本费率:<el-input
                    v-only-number
                    size="mini"
                    v-model="row.costRate.rate"
                />%)<el-input
                    v-only-number
                    size="mini"
                    v-model="row.costRate.maxfee"
                />元封顶，<el-input
                    v-only-number
                    size="mini"
                    v-model="row.costRate.minfee"
                />元起
            </div>
            <div
                class="df mt10"
                v-if="row.profitExpression == 2 || row.profitExpression == 3"
            >
                (交易金额-退款)*(商户费率-成本费率:<el-input
                    v-only-number
                    size="mini"
                    v-model="row.costRate.maxMoney"
                />元及以下<el-input
                    v-only-number
                    size="mini"
                    v-model="row.costRate.lowRate"
                />%;{{
                    row.costRate.maxMoney ? row.costRate.maxMoney : "**"
                }}以上<el-input
                    v-only-number
                    size="mini"
                    v-model="row.costRate.upRate"
                />%)<el-input
                    v-only-number
                    size="mini"
                    v-model="row.costRate.maxfee"
                />元封顶，<el-input
                    v-only-number
                    size="mini"
                    v-model="row.costRate.minfee"
                />元起
            </div>
            <div class="df mt10" v-if="row.profitExpression == 5">
                (交易金额-退款)*特殊返佣费率:<el-input
                    v-only-number
                    size="mini"
                    v-model="row.costRate.rate"
                />%*比例：<el-input
                    v-only-number
                    size="mini"
                    v-model="row.costRate.ratio"
                />%，单笔封顶<el-input
                    size="mini"
                    v-only-number
                    v-model="row.costRate.maxfee"
                />元，<el-input
                    v-only-number
                    size="mini"
                    v-model="row.costRate.minfee"
                />元起
            </div>
            <div class="df mt10" v-if="row.profitExpression == 4">
                商户费率><el-input
                    v-only-number
                    size="mini"
                    v-model="row.costRate.merchantRate"
                />%(交易金额-退款)*（商户费率-成本费率：<el-input
                    v-only-number
                    size="mini"
                    v-model="row.costRate.rate"
                />%);商户费率<={{
                    row.costRate.merchantRate
                        ? row.costRate.merchantRate
                        : "**"
                }}%,返佣=(交易金额-退款)*特殊返佣费率：<el-input
                    v-only-number
                    size="mini"
                    v-model="row.costRate.ratio"
                />%，单笔封顶<el-input
                    size="mini"
                    v-only-number
                    v-model="row.costRate.maxfee"
                />元，<el-input
                    v-only-number
                    size="mini"
                    v-model="row.costRate.minfee"
                />元起
            </div>
        </div>
    </div>
</template>

<script>
import { getRateConfigSetting } from "@/sercive/api/rateSercive";
export default {
    name: "RateConfigBody",
    props: {
        row: { type: Object, required: true },
        pardata: { type: Object, required: true }
    },
    data() {
        return {
            payTypeList: null,
            profitExpressionList: null,
            settlementTimeList: null,
            specialIndusrtyList: null,
            merchantTypeList: null,
            isExpand: true,
            isDelete: false
        };
    },
    methods: {
        testUnit(v) {
            // if(this.testPar()){
            //     this.$message.error("已存在相同条件，请修改或删除！")
            // }
        },
        profitChange(v) {
            // if(this.testPar()){
            //     this.$message.error("已存在一样的选择条件，请重新选择或者删除，否则继续修改将不成功")
            // }
            this.row.costRate = {
                maxMoney: null,
                maxfee: null,
                upRate: null,
                lowRate: null,
                rate: null,
                ratio: null,
                merchantRate: null,
                minfee: null
            };
        },
        isDeleteFuc() {
            this.isDelete = true;
            this.$emit("destroy");
        },
        testPar() {
            let settings = this.pardata.setting;
            //let isEquel = false
            if (settings.length > 1) {
                let settingsStr = settings.map(v => {
                    return (
                        v.payType +
                        v.settlementTime +
                        v.merchantType +
                        v.specialIndusrty
                    );
                });
                return this.isRepeat(settingsStr);
            }
            return false;
        },
        isRepeat(arr) {
            let hash = {};
            for (let i in arr) {
                if (hash[arr[i]]) return true;
                hash[arr[i]] = true;
            }
            return false;
        }
    },
    async mounted() {
        let res = await getRateConfigSetting();
        let d = res.data.extra;
        this.payTypeList = d.payTypeList;
        this.profitExpressionList = d.profitExpressionList;
        this.settlementTimeList = d.settlementTimeList;
        this.specialIndusrtyList = d.specialIndusrtyList;
        this.merchantTypeList = d.merchantTypeList;
    }
};
</script>

<style scoped lang="less">
.w12 {
    width: 15%;
    text-align: center;
    margin: 0 10px;
}
.w40 {
    width: 25%;
    text-align: right;
}
/* .search-box{width: 100%; position: relative} */
.df {
    display: flex;
}
.df .el-input {
    width: 70px !important;
}
.mt10 {
    margin-top: 10px;
}
</style>
