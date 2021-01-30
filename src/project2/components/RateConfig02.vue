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
                        <div class="w18">
                            <i class="is-required">*</i>结算时间
                        </div>
                        <div class="w18" style="padding-left:24px">
                            <i class="is-required">*</i>计算形式
                        </div>
                        <div
                            style="text-align:left;padding-left:25px;width:45%;"
                        >
                            加费费率
                        </div>
                        <div class="w14">操作</div>
                    </div>
                    <div style="color: #ccc;">
                        (费率配置所有填写文本框皆为非必填，如果没有对应类型费率设置，可以不填)
                    </div>
                </div>
                <rate-config-body
                    v-for="(item, index) in tbdata.rateSettings"
                    :row="item"
                    @destroy="deleteRow(index, item.id)"
                    :key="index"
                    :index="index"
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
import { addFeeDelById } from '@/sercive/api/rateSercive'
import RateConfigBody from "./RateConfigBody02";
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
            date: [],
            date2: [],
            isExpand: true
        };
    },
    methods: {
        handlerDateChange(v) {
            this.tbdata.startDate = v[0];
            this.tbdata.endDate = v[1];
        },
        // 删除一条结算加费率
        deleteRow(index, id) {
            if (this.tbdata.rateSettings.length === 1) {
                this.$message.error("不能删除首项！");
                return;
            }
            this.$confirm("确定要删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    await addFeeDelById({
                            repChannelId: this.pardata.repChannelId,
                            id
                        }
                    )
                    this.$message.success("删除成功");
                    this.tbdata.rateSettings.splice(index, 1);
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "删除失败"
                    });
                });
        },
        // 添加一条结算加费率空配置
        addBody() {
            this.tbdata.rateSettings.push({
                settlementTime: null,
                calculationForm: null,
                addRate: null,
                addAmount: null,
                startAmount: null,
                endAmount: null,
                id: null
            });
        },
        profitChange(v) {
            console.log(v);
        },
        // 删除一整个大的配置
        isDeleteFuc() {
            if (this.pardata.addFeeSettings.length > 0) {
                this.$confirm("确定要删除吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(async () => {
                    await addFeeDelById(
                        {
                            repChannelId: this.pardata.repChannelId,
                            startTime: this.date[0],
                            endTime: this.date[1]
                        }
                    )
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
        },
        // 强行更新时间用的
        updateTime(value) {
            if (value[0] !== null) {
                this.date = [value[0], value[1]];
            }
        }
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
    width: 40%;
    text-align: center;
}
.w18 {
    width: 18%;
    text-align: center;
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
