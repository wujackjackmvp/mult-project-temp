<template>
    <div class="c-content-inner">
        <!-- <div class="search-box check-box" >
           <el-button type="primary" @click="dataAggDataCheck()" >汇总数据检查</el-button>
        </div> -->
        <div class="search-box">
            <el-form
                :model="formInline"
                label-width="85px"
                class="demo-form-inline"
            >
                <el-row :gutter="24">
                    <el-col :span="18">
                        <el-form-item label="时间：">
                            <el-date-picker
                                v-model="dataTime"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                             <span class="timeOutTip"
                            >（注意：选择日期不支持跨月）</span
                        >
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="6">
                        <span class="timeOutTip"
                            >（注意：选择日期不支持跨月）</span
                        >
                    </el-col> -->
                    <el-col :span="6" style="text-align: right;">
                        <el-button type="primary" @click="onSubmit"
                            >查询</el-button
                        >
                        <el-button
                            type="primary"
                            plain
                            @click="dataAggDownload()"
                            >导出</el-button
                        >
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="6">
                        <el-form-item label="渠道：">
                            <el-select
                                :clearable="true"
                                v-model="formInline.repChannelIds"
                                multiple
                                collapse-tags
                                placeholder="请选择渠道"
                            >
                                <el-option
                                    v-for="item in channelIdListData"
                                    :key="item.id"
                                    :label="item.repChannelName"
                                    :value="item.repChannelId"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="商户名称：">
                            <el-input
                                v-model="formInline.merchantName"
                                clearable
                                placeholder="请输入商户名称"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="商户编号：">
                            <el-input
                                :clearable="true"
                                v-model="formInline.merchantId"
                                placeholder="请输入商户编号"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="text-align: right;">
                        <el-button @click="showBatchQuery = true" type="primary"
                            >批量查询导出</el-button
                        >
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="summary-area">
            <div class="summary-item">
                <div class="item-icon">
                    <img src="../../../assets/img/merchant.png" />
                </div>
                <div class="item-content">
                    <div class="content-label">商户数</div>
                    <div class="content-value">
                        {{ summaryData.countMerchant | numberFormat }}
                    </div>
                </div>
            </div>
            <div class="summary-item">
                <div class="item-icon">
                    <img src="../../../assets/img/money.png" />
                </div>
                <div class="item-content">
                    <div class="content-label">支付净额</div>
                    <div class="content-value">
                        {{ summaryData.countPayAmt | numberFormat }}
                    </div>
                </div>
            </div>
            <div class="summary-item">
                <div class="item-icon">
                    <img src="../../../assets/img/order.png" />
                </div>
                <div class="item-content">
                    <div class="content-label">净额笔数</div>
                    <div class="content-value">
                        {{ summaryData.countPay | numberFormat }}
                    </div>
                </div>
            </div>
            <!-- <div class="summary-item">
                <div class="item-icon">
                    <img src="../../../assets/img/debate.png" />
                </div>
                <div class="item-content">
                    <div class="content-label">商户手续费</div>
                    <div class="content-value">{{summaryData.countMerchantFee|numberFormat}}</div>
                </div>
            </div> -->
            <div class="summary-item">
                <div class="item-icon">
                    <img src="../../../assets/img/profit.png" />
                </div>
                <div class="item-content">
                    <div class="content-label">我司分润</div>
                    <div class="content-value">
                        {{ summaryData.countMrechantProfit | numberFormat }}
                    </div>
                </div>
            </div>
        </div>
        <div class="table-box">
            <el-table
                :empty-text="nodata"
                v-loading="loading"
                border
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column prop="billDate" label="日结时间" />
                <el-table-column prop="month" label="月份" />
                <el-table-column prop="repChannelName" label="渠道名称" />
                <el-table-column prop="repChannelAcc" label="渠道账号" />
                <el-table-column prop="merchantName" label="商户名称" />
                <el-table-column prop="merchantId" label="商户编号" />
                <el-table-column prop="payAmt" label="支付净额" />
                <el-table-column prop="count" label="笔数" />
                <el-table-column prop="merchantProfit" label="分润额" />
                <!--                <el-table-column prop="payType" label="支付类型">-->
                <!--                </el-table-column>-->
                <!-- <el-table-column prop="merchantFee" label="商户手续费"  :formatter="rateFormat" >

                </el-table-column>
                <el-table-column prop="merchantRate" label="商户费率"  :formatter="rateFormat"  >

                </el-table-column> -->
                <!--                    <template slot-scope="scope">-->
                <!--                        {{scope.row.payMonth}}月-->
                <!--                    </template>-->
                <!-- <el-table-column prop="costRate" label="成本费率" /> -->
                <!-- <el-table-column prop="code" label="渠道编码">
                </el-table-column> -->
                <!--                <el-table-column prop="expanderName" label="拓展人">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column prop="areaName" label="区域">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column label="公司">-->
                <!--                    <template slot-scope="scope">-->
                <!--                        <div v-if="scope.row.companyType  == 1">母公司</div>-->
                <!--                        <div v-if="scope.row.companyType  == 2">子公司</div>-->
                <!--                    </template>-->
                <!--                </el-table-column>-->
                <!-- <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary"  @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
        <div class="table-page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="parseInt(size)"
                layout="total, sizes, prev, pager, next, jumper"
                :total="parseInt(total)"
            >
            </el-pagination>
        </div>
        <batch-query
            @importSuccess="importSuccess"
            :downLoadName="'交易汇总批量查询导出'"
            :show.sync="showBatchQuery"
        ></batch-query>
    </div>
</template>

<script>
import {
    repDataList,
    repDataDownload,
    repChannelList,
    uploadQueryExcel
} from "@/sercive/api/financeSercive";
import batchQuery from "./components/batchQuery";
import { mapState } from "vuex";
import moment from 'moment'
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
    data() {
        return {
            // 多选结束
            visible2: false,
            formInline: {
                repChannelIds: [],
                operation: "",
                user: "",
                ip: "",
                region: "",
                page: 1,
                size: 10
            },
            dataTime: "",
            tableData: [],
            currentRow: null,
            channelIdListData: [],
            // dataAggAllAreaData: [],
            // 翻页
            currentPage4: 0,
            page: "0",
            size: "8",
            loading: true,
            total: "400",
            // 判断超过90天没
            timeOutTip: true,
            pageCheck: "",
            sizeCheck: "",
            labelName: "",
            nodata: "",
            isEnter: true,
            summaryData: {
                countMerchant: 0,
                countMerchantFee: 0,
                countMrechantProfit: 0,
                countPay: 0,
                countPayAmt: 0
            },
            btnDisabled: false,
            showBatchQuery: false
        };
    },
    components: {
        batchQuery
    },
    computed: {
        ...mapState({
            userId: state => state.userInfo.userId
        })
    },
    watch:{
        dataTime(val){
             if(val){
                const start = moment(val[0]);
                const end = moment(val[1]);
                if(start.years() != end.years() || start.months() != end.months()){
                    this.$message({
                         message:`选择日期不支持跨月`,
                         type:'warning'
                    })
                    this.dataTime = null
                    return
                }
                this.formInline.startDate = val[0]
                this.formInline.endDate = val[1]
            }else{
                this.formInline.startDate = null
                this.formInline.endDate = null
            }
        }
    },
    methods: {
        importSuccess(file) {
            const loading = this.$loading({
                lock: true,
                text: "加载中，请稍后...",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            const data = new FormData();
            data.append("file", file);
            data.append("userId", this.userId);
            data.append("startDate", this.formInline.startDate);
            data.append("endDate", this.formInline.endDate);
            uploadQueryExcel(data)
                .then(res => {
                    loading.close();
                    if(res.data.code == 0){
                        this.$message({
                            message: "操作成功，请到下载列表统一下载",
                            type: "success"
                        });
                     }else{
                        this.$message({
                            message: res.data.errMsg,
                            type: "error"
                        }); 
                     }
                  
                    this.showBatchQuery = false
                })
                .catch(e => {
                    loading.close();
                    console.log(e);
                });
        },
        onSubmit() {
            // if (this.dataTime) {
            //     this.formInline.startDate = this.dataTime[0];
            //     this.formInline.endDate = this.dataTime[1];
            // } else {
            //     this.formInline.startDate = "";
            //     this.formInline.endDate = "";
            // }
            this.formInline.page = 1;
            this.currentPage4 = 1;
            this.dataList();
        },
        indexMethod(index) {
            // console.log("sss");
            return index + 1;
        },
        async dataList() {
            // if (!this.timeOutTip) {
            //     this.$alert("查询日期不能超过90天", "提示", {
            //         confirmButtonText: "确定",
            //         callback: action => {
            //             this.$message({
            //                 type: "error",
            //                 message: "查询日期不能超过90天"
            //             });
            //         }
            //     });
            //     return;
            // }
            this.loading = true;
            let res = await repDataList(this.formInline);
            if (res.data.code === 1) {
                this.$message.error(res.data.errMsg);
                this.loading = false;
                return;
            }
            if (res.data.extra) {
                this.tableData = res.data.extra.rows;
                this.total = res.data.extra.total;
                this.summaryData = res.data.extra.statistic;
                this.btnDisabled = !this.tableData.length;
            }
            this.loading = false;
        },
        // 翻页
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.formInline.size = val;
            this.dataList();
        },
        handleCurrentChange(val) {
            console.log("val", val);
            // console.log(`当前页: ${val}`);
            // this.formInline.page = val - 1;
            this.formInline.page = val;
            this.loading = true;
            this.dataList();
        },
        // // 重置
        // reset() {
        //   this.formInline.operation = "";
        //   this.formInline.user = "";
        //   this.formInline.ip = "";
        //   this.formInline.region = "";
        //   this.dataTime = "";
        //   this.formInline = JSON.parse(JSON.stringify(this.formInline));
        // },
        // 下载列表
        async dataAggDownload() {
            // if (this.total > 300000) {
            //     this.$alert('下载失败，下载量需≤30W条', '提示', {
            //         confirmButtonText: '确定',
            //         callback: action => {
            //             this.$message({
            //                 type: 'error',
            //                 message: '下载失败，下载量需≤30W条'
            //             })
            //         }
            //     })
            //     return
            // }
            if(this.tableData && this.tableData.length == 0){
                this.$message({
                    type: "error",
                    message: "暂无数据导出"
                });
                return
            }
            const loading = this.$loading({
                lock: true,
                text: "加载中，请稍后...",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            try {
                this.formInline.userId = this.userId;
                let res = await repDataDownload(this.formInline);
                loading.close();
                this.$message({
                    message: "操作成功，请到下载列表统一下载",
                    type: "success"
                });
            } catch (e) {
                loading.close();
                console.log(e);
            }
        },
        time() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate =
                date.getFullYear() +
                seperator1 +
                month +
                seperator1 +
                strDate +
                " " +
                date.getHours() +
                seperator2 +
                date.getMinutes() +
                seperator2 +
                date.getSeconds();
            return currentdate;
            // console.log(currentdate)
        },
        // 渠道
        async channel() {
            let res = await repChannelList({
                page: 1,
                size: 500,
                status: 0
            });
            if (res.data.extra) {
                this.channelIdListData = res.data.extra.rows;
            }
        },
        // 多选区域
        // dataAggAllArea() {
        // this.ajax
        //     .commonApi2('get', 'X', this.api.statement.dataAggAllArea)
        //     .then(res => {
        //         // console.log(res);
        //         if (res.data.extra) {
        //             this.dataAggAllAreaData = res.data.extra
        //         }
        //     })
        // },
        // 判断时间是不是超过3个月
        // change(res) {
        //     if (res) {
        //         var b = res[0].split("-");
        //         var oldTime = new Date(b[0], b[1] - 1, b[2]);
        //         var b2 = res[1].split("-");
        //         var oldTime2 = new Date(b2[0], b2[1] - 1, b2[2]);
        //         this.timeOutTip =
        //             (oldTime2 - oldTime) / (1000 * 60 * 60 * 24) < 91;
        //     }
        // },
        // 多选母子公司结束
        // 汇总数据检查
        dataAggDataCheck() {
            this.$router.push("/statement/SummaryCheck");
        },
        timestampToTime(timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + "-";
            var M =
                (date.getMonth() + 1 < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1) + "-";
            var D = date.getDate();
            var h = date.getHours() + ":";
            var m = date.getMinutes() + ":";
            var s = date.getSeconds();
            return Y + M + D;
        },
        rateFormat(row, column) {
            if (row.repChannelId == "FBE_tggf") {
                return "";
            } else {
                return row[column.property];
            }
        }
    },
    filters: {
        numberFormat(value) {
            if (!value) {
                return "0";
            }
            return value.toString().indexOf(".") !== -1
                ? value.toLocaleString()
                : value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
        }
    },
    mounted() {
        this.channel();
        // this.dataAggAllArea()
        var date = new Date();
        this.formInline.startDate = this.timestampToTime(
            date.setDate(date.getDate())
        );
        this.formInline.endDate = this.timestampToTime(
            date.setDate(date.getDate())
        );
        this.dataTime = [this.formInline.startDate, this.formInline.endDate];
        this.dataList();
    }
};
</script>

<style scoped>
/* .search-box{border-bottom:1px solid #eee} */
.table-page {
    margin: 20px 10px;
    text-align: right;
}
.more {
    height: 20px;
    width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.max-name {
    margin-right: 50px;
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.timeOutTip {
    line-height: 35px;
    padding-right: 10px;
    color: #666;
    font-size: 14px;
}
.check-box {
    overflow: hidden;
    margin-bottom: 15px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
}
.el-button--primary.is-plain {
    color: #409eff !important;
}
</style>
<style lang="less" scoped>
.summary-area {
    width: 100%;
    height: 96px;
    margin-top: 10px;
    padding: 0 80px;
    box-sizing: border-box;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    /*background: #f5f5f5;*/
    display: flex;
    align-items: center;
    .summary-item {
        flex: 1;
        height: 88px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #eee;
        &:last-child {
            border-right: none;
        }
        .item-icon {
            margin-right: 10px;
            img {
                width: auto;
                height: 50px;
            }
        }
        .item-content {
            font-size: 14px;
            .content-label {
                font-size: 16px;
                color: #999;
                font-weight: 700;
            }
            .content-value {
                color: #333;
                font-weight: 700;
            }
        }
    }
}
</style>
