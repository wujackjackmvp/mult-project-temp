<template>
    <div class="c-content-inner" style="margin-top:0">
        <el-form :inline="true" :model="approvalForm">
            <el-form-item label="年份" style="margin-left:20px;">
                <el-date-picker
                    style="width:400px"
                    v-model="approvalForm.authorizeMonth"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="生成状态" style="margin-left:20px">
                <el-select
                    clearable
                    v-model="approvalForm.taskStatus"
                    placeholder="请选择生成状态"
                >
                    <el-option label="失败" value="0"></el-option>
                    <el-option label="成功" value="1"></el-option>
                    <el-option label="进行中" value="2"></el-option>
                    <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> -->
                </el-select>
            </el-form-item>
            <el-form-item label="发放状态" style="margin-left:20px">
                <el-select
                    clearable
                    v-model="approvalForm.profitStatus"
                    placeholder="请选择发放状态"
                >
                    <el-option label="未发放" value="0"></el-option>
                    <el-option label="已发放" value="1"></el-option>
                    <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> -->
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="primary" @click="showRatityAdd"
                    >生成核准</el-button
                >
            </el-form-item>
        </el-form>
        <el-row>
            <el-col :span="24">
                <div>
                    <el-table
                        v-loading="risLoading"
                        :data="financeLiist"
                        style="width: 100%;text-align:center"
                    >
                        <el-table-column
                            label="报表名称"
                            width="120"
                            prop="authorizeName"
                        ></el-table-column>
                        <el-table-column
                            label="支付类型"
                            width="120"
                            prop="authorizeType"
                            :formatter="formatter.formatAuthorizeType"
                        ></el-table-column>

                        <el-table-column
                            label="生成状态"
                            prop="taskStatus"
                            :formatter="formatter.taskStatusFormat"
                        ></el-table-column>

                        <el-table-column
                            label="执行时间"
                            prop="runTime"
                        ></el-table-column>
                        <el-table-column
                            label="推送状态"
                            width="120"
                            prop="pushStatus"
                            :formatter="formatter.pushStatusFormat"
                        ></el-table-column>
                        <el-table-column
                            label="发放状态"
                            prop="profitStatus"
                            :formatter="formatter.profitStatusFormat"
                        ></el-table-column>
                        <el-table-column
                            label="发放日期"
                            prop="profitTime"
                        ></el-table-column>
                        <el-table-column label="操作" width="470">
                            <template slot-scope="scope">
                                <el-button
                                    :disabled="+scope.row.profitStatus === 1 || +scope.row.pushStatus === 1"
                                    type="text"
                                    @click="reboot(scope.row)"
                                    >重新选择生成</el-button
                                >
                                <el-button
                                    :disabled="+scope.row.profitStatus === 1 || +scope.row.pushStatus === 1"
                                    type="text"
                                    @click="discard(scope.row)"
                                    >撤销</el-button
                                >
                                <el-button
                                    type="text"
                                    @click="showHandOut(scope.row)"
                                    >发放回填</el-button
                                >
                                <el-button
                                    type="text"
                                    @click="approvalCheck(scope.row)"
                                    >核准记录查看</el-button
                                >
                                <el-button
                                    type="text"
                                    @click="toAdjustDetail(scope.row)"
                                    >调整明细查看</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block" style="margin-top: 20px;">
                    <el-pagination
                        @size-change="rHandleAgentSizeChange"
                        @current-change="rHandleAgentCurrentChange"
                        :current-page="rPage"
                        :page-sizes="[5, 10, 20, 30]"
                        :page-size="rSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="rTotal"
                    ></el-pagination>
                </div>
            </el-col>
        </el-row>
        <approveCreate
            ref="approveCreate"
            @reGetList="reGetList"
        ></approveCreate>
        <approveSel ref="approveSel"></approveSel>
        <approveReRoot
            ref="approveReRoot"
            @reGetList="reGetList"
        ></approveReRoot>
        <approvalCheck ref="approvalCheck"></approvalCheck>

        <el-dialog
            :title="'发放回填'"
            :visible.sync="dialogHandOut"
            width="400px"
        >
            <span>月份：</span>
            <el-date-picker
                v-model="handOutMonth"
                type="month"
                value-format="yyyy-MM"
                placeholder="选择月"
            ></el-date-picker>
            <div slot="footer" class="dialog-footer">
                <el-button @click="hideHandOut">取 消</el-button>
                <el-button type="primary" @click.native="handOut"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <select-adjust @confirm="adjustConfirm" :adjustIds.sync="adjustNo" ref="selAdjust" :apiFn="adjustFn" :mode="mode" :show.sync="adjustCompVisible"></select-adjust>

    </div>
</template>

<script>

import {
    financeAuthorize,
    reboot,
    handOut,
    discard,
    addReport,
    rebootFind,
    authFindAdjustment, //调整明细查看
    authSelectAdjustUpload // 调整明细选择
} from "@/sercive/api/agencySercive";
import approveSel from "@/components/finance/approveSel";
import approveCreate from "@/components/finance/approveCreate";
import approveReRoot from "@/components/finance/approveReRoot";
import approvalCheck from "@/components/finance/approvalCheck";
import moment from "moment";
import formatter from "@/utils/filter/formatter";
import selectAdjust from './selectAdjust'


export default {
    components: {
        approveSel,
        approveCreate,
        approveReRoot,
        approvalCheck,
        selectAdjust
    },
    name: "daily",
    data() {
        return {
            adjustNo:[],
            adjustFn:authSelectAdjustUpload,
            mode:'',
            adjustCompVisible:false,
            // 核准记录列表
            formatter,
            rebootIng: false,
            rPage: 1,
            rSize: 10,
            rTotal: 0,
            approvalForm: {
                authorizeMonth: [],
                taskStatus: "",
                profitStatus: ""
            },
            risLoading: false,
            financeLiist: [],
            // 回填
            handOutMonth: "",
            dialogHandOut: false,
            handOutForm: {
                authorizeRecordId: undefined,
                taskStatus: undefined,
                authorizeMonth: undefined
            },
            // 缓存列表
            cacheList: [],
            adjustParams:null
        };
    },
    mounted() {
        this.financeAuthorize();
        this.$bus.$on("showAdjustSelList", params => {
            this.showAdjustSelList(params);
        });
    },
    destroyed() {
        this.$bus.$off("hadSelectApprove");
        this.$bus.$off("showSelList");
        this.$bus.$off("showAdjustSelList");
    },
    methods: {
        adjustConfirm(){
            let params = this.adjustParams.approveList
            params[this.adjustParams.index].adjustNos = JSON.parse(JSON.stringify(this.adjustNo))
            this.$refs.approveCreate.approveBuild = params
        },
        showAdjustSelList(params){
            this.adjustNo = params.approveList[params.index].adjustNos
            this.adjustParams = params
            this.adjustCompVisible = true
            this.mode = 'reSelect'
            this.adjustFn = authSelectAdjustUpload
            this.$refs.selAdjust.form = this.$refs.selAdjust.$options.data().form
            this.$refs.selAdjust.form.adjustType = 2
            this.$refs.selAdjust.form.selectType = 1
            this.$nextTick(()=>{
                this.$refs.selAdjust.onSearch()
            })
        },
        toAdjustDetail(row){
            this.adjustCompVisible = true
            this.mode = 'detail'
            this.adjustFn = authFindAdjustment
            this.$nextTick(()=>{
                this.$refs.selAdjust.form = this.$refs.selAdjust.$options.data().form
                this.$refs.selAdjust.form.authorizeMonth = row.authorizeMonth
                this.$refs.selAdjust.form.authorizeType = row.authorizeType
                this.$refs.selAdjust.onSearch()
            })
        },
        /* ============ $emit =========== */
        reGetList() {
            this.financeAuthorize();
        },
        // http请求
        async financeAuthorize() {
            let {
                authorizeMonth,
                taskStatus,
                profitStatus
            } = this.approvalForm;
            let { rSize, rPage } = this;
            this.risLoading = true;
            if (authorizeMonth !== null && authorizeMonth.length > 0) {
                authorizeMonth[0] = moment(authorizeMonth[0]).format("yyyy-MM");
                authorizeMonth[1] = moment(authorizeMonth[1]).format("yyyy-MM");
                authorizeMonth = authorizeMonth.join(",");
            } else {
                authorizeMonth = undefined;
            }
            console.log("rPage", rPage)
            let params = {
                size: rSize,
                // page: rPage - 1,
                page: rPage,
                authorizeMonth,
                taskStatus,
                profitStatus
            };
            try {
                let res = await financeAuthorize(params);
                this.financeLiist = res.data.extra.rows;
                this.rTotal = res.data.extra.total || 0;
                this.risLoading = false;
            } catch (error) {
                console.log(error);
            }
        },
        /* =============== 用户点击操作 ==============*/
        async reboot(row) {
            this.$refs.approveReRoot.showSelList(row);
        },
        async approvalCheck(row) {
            this.$refs.approvalCheck.showSelList(row);
        },
        /* =============== 回调 ==============*/
        showHandOut(row) {
            this.handOutForm = {
                authorizeRecordId: row.authorizeRecordId,
                taskStatus: row.taskStatus,
                authorizeMonth: row.authorizeMonth,
                profitStatus: row.profitStatus,
                authorizeType:row.authorizeType
            };
            this.handOutMonth = row.authorizeMonth;
            this.dialogHandOut = true;
        },
        hideHandOut() {
            this.handOutForm = {
                authorizeRecordId: undefined,
                taskStatus: undefined,
                authorizeMonth: undefined,
                profitStatus: undefined
            };
            this.handOutMonth = ''
            this.dialogHandOut = false;
        },
        async handOut() {
            let {
                authorizeRecordId,
                taskStatu,
                profitStatus,
            } = this.handOutForm;
            let params = {
                profitStatus,
                recordId: authorizeRecordId,
                month: this.handOutMonth
            };
            let res = await handOut(params);
            if (res.data.code === 0) {
                this.financeAuthorize();
                this.$message.success(res.data.errMsg);
                this.dialogHandOut = false;
            } else {
                this.$message.error(res.data.errMsg);
            }
        },
        async discard(row) {
            this.$confirm("确定要撤销吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(async () => {
                let params = {
                    taskStatus: row.taskStatus,
                    recordId: row.authorizeRecordId,
                    profitStatus: row.profitStatus,
                    pushStatus: row.pushStatus
                };
                let res = await discard(params);
                if (res.data.code === 0) {
                    this.financeAuthorize();
                    this.$message.success("已撤销");
                } else {
                    this.$message.error(res.data.errMsg);
                }
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消撤销"
                });
            });
        },
        rHandleAgentSizeChange(val) {
            this.rSize = val;
            this.financeAuthorize();
        },
        rHandleAgentCurrentChange(val) {
            this.rPage = val;
            this.financeAuthorize();
        },
        search() {
            this.rPage = 1;
            this.financeAuthorize();
        },
        /* ================================ 核准生成弹框 ===========================*/
        showRatityAdd() {
            this.$refs.approveCreate.showRatityAdd();
        },
        // 确认选择那些核准生成
        sendAuthorizeRecordIds() {
            this.isReboot ? this.rebootEvent() : this.onlySelect();
        },
        // 重新生成
        rebootEvent() {
            this.$refs.approveSel.cacheForReboot();
        }
    }
};
</script>

<style>
.el-table .cell {
    text-align: center;
}
.el-pagination {
    display: flex;
    justify-content: flex-end;
}
</style>
