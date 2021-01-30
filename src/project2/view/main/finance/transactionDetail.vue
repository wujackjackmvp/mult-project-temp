<template>
    <div class="c-content-inner">
        <div class="search-box">
            <!-- :inline="true" -->
            <el-form
                label-width="85px"
                :model="formInline"
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
                                :clearable="false"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                              <span class="timeOutTip"
                            >（注意：选择日期不支持跨月）</span
                        >
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="8">
                        <span class="timeOutTip"
                            >（注意：选择日期不支持跨月）</span
                        >
                    </el-col> -->
                    <el-col :span="6" style="text-align: right;">
                        <el-button type="primary" @click="searchList"
                            >查询</el-button
                        >
                        <el-button type="primary" plain @click="exportFile"
                            >导出</el-button
                        >
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="6">
                        <el-form-item label="渠道：">
                            <!-- multiple -->
                            <el-select
                                v-model="formInline.repChannelId"
                                clearable
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
                                v-model="formInline.dgwMerchantName"
                                clearable
                                placeholder="请输入商户名称"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="商户编号：">
                            <el-input
                                v-model="formInline.dgwMerchantId"
                                clearable
                                placeholder="请输入商户编号"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="text-align: right;">
                        <el-button @click="showBatchQuery = true" type="primary">批量查询导出</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <el-alert
            title="本表中的分润仅为单笔预计估算，与汇总表计算的无关"
            type="info"
            show-icon
        >
        </el-alert>
        <div class="table-box">
            <el-table
                v-loading="loading"
                border
                :data="tableData"
                style="width: 100%;"
            >
                <el-table-column prop="billDate" label="日结时间" width="100px"/>
                <el-table-column prop="month" label="月份" />
                <el-table-column prop="repChannelName" label="渠道名称" />
                <el-table-column prop="repChannelAcc" label="渠道账号" />
                <el-table-column prop="merchantName" label="商户名称" />
                <el-table-column prop="merchantId" label="商户编码" />
                <el-table-column prop="orderId" label="订单编号" />
                <el-table-column prop="upOrderId" width="110px" label="渠道订单编号" />
                <el-table-column prop="payTime" width="110px" label="订单完成时间" />
                <!-- :formatter="formatterPayType" -->
                <el-table-column prop="payState" label="交易类型"  />
                <el-table-column prop="payType" label="支付方式" />
                <el-table-column prop="cardType" width="100px" label="银行卡类型" :formatter="formatterCardType" />
                <el-table-column prop="payAmt" label="订单金额" :formatter="(row)=>NP.round(row.payAmt,2).toFixed(2)"/>
                <el-table-column prop="merchantFee" label="手续费" :formatter="(row)=>NP.round(row.merchantFee,2).toFixed(2)"/>
                <el-table-column prop="merchantProfit" label="分润" :formatter="(row)=>NP.round(row.merchantProfit,2).toFixed(2)"/>
                <el-table-column prop="merchantRate" label="手续费率"/>
                <el-table-column v-if="Authority.showCapping == 1" prop="costRate" label="成本费率" />
                <el-table-column v-if="Authority.showRate == 1" prop="capping" label="封顶值" />
            </el-table>
        </div>
        <div class="table-page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="parseInt(size)"
                layout="total, sizes, prev, pager, next, jumper"
                :total="parseInt(total)"
            >
            </el-pagination>
        </div>
        <batch-query :show.sync="showBatchQuery" @importSuccess="importSuccess"></batch-query>
    </div>
</template>

<script>
import batchQuery from './components/batchQuery'
import moment from 'moment'
import {transactionDetail,transactionExport,downTransaction} from '@/sercive/api/financeSercive.js'
import {mapState} from 'vuex'
import NP from 'number-precision'
export default {
    data() {
        return {
            NP:NP,
            formInline: {
                page:1,
                size:10,
                startDate:moment().format('YYYY-MM-DD'),
                endDate:moment().format('YYYY-MM-DD'),
                repChannelId:null,
                dgwMerchantName:null,
                dgwMerchantId:null
            },
            dataTime: [moment().format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')],
            channelIdListData: [],
            loading: false,
            tableData: [],
            currentPage: 1,
            size: 10,
            total: 0,
            showBatchQuery:false,
            Authority:{}
        };
    },
    components:{
        batchQuery
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
    computed: {
        ...mapState({
            userId: state => state.userInfo.userId
        })
    },
    created(){
        this.channel()
        // this.getTransactionDetailList()
    },
    methods: {
        searchList(){
            this.currentPage = 1
            this.size = 10
            this.formInline.page = 1
            this.formInline.size = 10
            this.getTransactionDetailList()
        },
        formatterCardType(row){
            const typeMap = {
                '01':'借记卡','02':'贷记卡','03':'edc','04':'ddc'
            } 
            return typeMap[row.cardType]
        },
        formatterPayType(row){
            const typeMap = {
                0:'支付成功', 8:'退款'
            } 
            return typeMap[row.payState]
        },
        importSuccess(file) {
            // if(!this.formInline.startDate || !this.formInline.endDate){
            //     this.$message({
            //         type: "error",
            //         message: "请选择时间区间"
            //     }); 
            //     return
            // }
            const loading = this.$loading({
                lock: true,
                text: "加载中，请稍后...",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            const data = new FormData();
            data.append("file", file);
            // data.append("userId", this.userId);
            data.append("startDate", this.formInline.startDate);
            data.append("endDate", this.formInline.endDate);
            downTransaction(data)
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
        getTransactionDetailList(){
            this.loading = true;
            transactionDetail(this.formInline).then(res=>{
                this.loading = false;
                if(res.data.extra){
                    this.tableData = res.data.extra.rows
                    this.total = res.data.extra.total || 0
                    this.Authority = {
                        showCapping:res.data.extra.showCapping,
                        showRate:res.data.extra.showRate
                    }
                }
            }).catch(e=>{
                console.log(e)
                this.loading = false;
            })
        },
        // 渠道
        channel() {
            this.ajax.commonApi2('get', 'X', this.api.statement.channelPageList + '?page=1&size=500&status=0')
                .then(res => {
                    if (res.data.extra) {
                        this.channelIdListData = res.data.extra.rows
                    }
                })
        },
        async exportFile() {
            if(!this.formInline.startDate || !this.formInline.endDate){
                this.$message({
                    type: "error",
                    message: "请选择时间区间"
                }); 
                return
            }
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
                let res = await transactionExport(this.formInline);
                loading.close();
                if(res.data.code == 0){
                    this.$message({
                        message: "操作成功，请到下载列表统一下载",
                        type: "success"
                    });
                }else{
                    this.$message({
                        message: res.data.errMsg,
                        type: "success"
                    });
                }
            } catch (e) {
                loading.close();
                console.log(e);
            }
        },
        handleSizeChange(val) {
            this.formInline.size = val;
            this.size = val
            this.getTransactionDetailList()
        },
        handleCurrentChange(val) {
            this.formInline.page = val;
            this.currentPage = val
            this.getTransactionDetailList()
        },
    },
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
