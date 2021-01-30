<template>
    <div>
        <div class="mt10">
            <el-row :gutter="10">
                <el-col :span="16">
                    <div class="df">
                        <div
                            style="height: 40px;line-height: 40px;margin-right: 10px;"
                        >
                            <i class="is-required">*</i>生效时间段:
                        </div>
                        <div>
                            <el-date-picker
                                v-model="date"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                                @change="handlerDateChange"
                            >
                            </el-date-picker>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-button type="text" @click="isDeleteFuc">删除</el-button>
                    <el-button type="text" @click="isExpand = !isExpand">
                        {{ isExpand ? "收起" : "展开"
                        }}<i class="el-icon-caret-top" v-if="isExpand"></i
                        ><i class="el-icon-caret-bottom" v-if="!isExpand"></i
                    ></el-button>
                </el-col>
            </el-row>
            <div class="rate-tb mt10" v-show="isExpand">
                <div
                    class="tb-head"
                    style="background: #eee; padding: 10px; border: 1px solid #ddd; border-radius: 5px"
                >
                    <div style="display: flex; font-weight: bold;">
                        <div class="w12">
                            <i class="is-required">*</i>交易方式
                        </div>
                        <div class="w12">
                            <i class="is-required">*</i>结算时间
                        </div>
                        <div class="w12">
                            <i class="is-required">*</i>商户性质
                        </div>
                        <div class="w12">特殊行业</div>
                        <div class="w12">分润形式</div>
                        <div class="w40">操作</div>
                    </div>
                    <div style="color: #ccc;">
                        (费率配置所有填写文本框皆为非必填，如果没有对应类型费率设置，可以不填)
                    </div>
                </div>
                <rate-config-body
                    v-for="(item, index) in tbdata.setting"
                    :row="item"
                    @destroy="deleteRow(index)"
                    :key="index"
                    :pardata="tbdata"
                ></rate-config-body>
                <div
                    @click="addBody"
                    class="mt10"
                    style="height:30px;width:100%;line-height: 30px;text-align: center;border: 1px dashed #ccc; border-radius: 5px;cursor: pointer;"
                >
                    +&nbsp; 添加
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { RateConfigdelete } from "@/sercive/api/rateSercive";
import RateConfigBody from "./RateConfigBody";
export default {
    name: "RateConfig",
    components: {
        RateConfigBody
    },
    props: {
        tbdata: { type: Object, required: true },
        pardata: { type: Object, required: true }
    },
    data() {
        return {
            /*
                setting:[{
                    payType: null,
                    profitExpression: null,
                    settlementTime: null,
                    merchantType: null,
                    specialIndusrty: null,
                    costRate:{
                        maxMoney: null,
                        maxfee: null,
                        upRate: null,
                        lowRate: null,
                        rate: null,
                        ratio: null,
                        merchantRate: null
                    }
                }],
                startTime: null,
                endTime: null,*/
            date: null,
            isExpand: true
        };
    },
    methods: {
        handlerDateChange(v) {
            this.tbdata.startTime = v[0];
            this.tbdata.endTime = v[1];
        },
        deleteRow(index) {
            if (this.tbdata.setting.length === 1) {
                this.$message.error("不能删除首项！");
                return;
            }
            this.$confirm("确定要删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    let id = this.tbdata.setting[index].id;
                    if (id) {
                        let params = {
                            repChannelId: this.pardata.repChannelId,
                            settingId: id
                        };
                        let res = await RateConfigdelete(params);
                        if (res.data.code == 0) {
                            this.tbdata.setting.splice(index, 1);
                            this.$message.success("删除成功");
                        } else {
                            this.$message.error(res.data.errMsg);
                        }
                    } else {
                        this.tbdata.setting.splice(index, 1);
                        this.$message.success("删除成功");
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "删除失败"
                    });
                });
        },
        addBody() {
            this.tbdata.setting.push({
                id: null,
                payType: null,
                profitExpression: null,
                settlementTime: null,
                merchantType: null,
                specialIndusrty: null,
                costRate: {
                    maxMoney: null,
                    maxfee: null,
                    upRate: null,
                    lowRate: null,
                    rate: null,
                    ratio: null,
                    merchantRate: null,
                    minfee: null
                }
            });
        },
        profitChange(v) {
            console.log(v);
        },
        isDeleteFuc() {
            if (this.pardata.costRatetings.length > 0) {
                this.$confirm("确定要删除吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(async () => {
                        let repChannelId = this.pardata.repChannelId;
                        let settingId = this.tbdata.setting
                            .map(v => {
                                if (v.id) return v.id;
                            })
                            .join(",");
                        if (!!settingId) {
                            let res = await RateConfigdelete({
                                repChannelId,
                                settingId
                            });
                            if (res.data.code == 0) {
                            } else {
                                this.$message.error(res.data.errMsg);
                            }
                        }
                        this.$emit("destroyconf");
                        this.$message({
                            type: "success",
                            message: "删除成功"
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "删除失败"
                        });
                    });
            }
        }
    },
    mounted() {
        this.date = [this.tbdata.startTime, this.tbdata.endTime];
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
    width: 50px !important;
}
.mt10 {
    margin-top: 10px;
}
.is-required {
    color: #f56c6c;
    margin-right: 4px;
    font-style: normal;
}
</style>
