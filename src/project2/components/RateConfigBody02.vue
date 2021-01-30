<template>
    <div class="tb-body mt10">
        <div style="display: flex;">
            <div class="w18">
                <el-select
                    style="width:80%"
                    v-model="row.settlementTime"
                    @change="testUnit"
                >
                    <el-option
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                        v-for="item in settlementTimeList"
                    ></el-option>
                </el-select>
            </div>
            <div class="w18">
                <el-select
                    style="width:80%"
                    v-model="row.calculationForm"
                    @change="testUnit"
                >
                    <el-option
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                        v-for="item in calculationFormList"
                    ></el-option>
                </el-select>
            </div>
            <el-row style="width:45%;margin-left:10px">
                <el-col :span="12">
                    <el-input
                        style="width:80px;margin-left:10px"
                        v-only-number
                        v-model="row.addRate"
                    />
                    %+
                    <el-input
                        style="width:85px"
                        v-only-number
                        v-model="row.addAmount"
                    />
                    元
                </el-col>
                <el-col :span="12">
                    <el-input
                        style="width:85px"
                        v-only-number
                        v-model="row.startAmount"
                    />
                    元起
                    <el-input
                        style="width:85px"
                        v-only-number
                        v-model="row.endAmount"
                    />
                    元封顶
                </el-col>
            </el-row>
            <div class="w14">
                <el-button
                    type="text"
                    style="padding-right: 10px;"
                    @click="isDeleteFuc()"
                    >删除</el-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import { getAddFeeParams } from "@/sercive/api/rateSercive";

export default {
    name: "RateConfigBody",
    props: {
        row: { type: Object, required: true },
        pardata: { type: Object, required: true }
    },
    data() {
        return {
            id: null,
            payTypeList: null,
            settlementTimeList: null,
            calculationFormList: null,
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
            this.row.rateSettings = {
                settlementTime: null,
                calculationForm: null,
                addRate: null,
                addAmount: null,
                startAmount: null,
                endAmount: null,
                id: null
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
        },
        async getAddFeeParams() {
            let res = await getAddFeeParams();
            let d = res.data.extra;
            this.settlementTimeList = d.settlementTimeList;
            this.calculationFormList = d.calculationFormList;
        }
    },
    mounted() {
        this.getAddFeeParams();
    }
};
</script>

<style scoped lang="less">
.w40 {
    width: 25%;
    text-align: right;
    padding: 0 10px;
}
.w18 {
    width: 18%;
    text-align: center;
    padding: 0 10px;
}
.w14 {
    width: 14%;
    text-align: center;
    padding: 0 10px;
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
