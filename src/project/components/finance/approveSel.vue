<template>
    <el-dialog
        :title="'核准生成'"
        :visible.sync="dialogSelVisible"
        width="1300px"
        :before-close="clearApproveSel"
    >
        <el-form :inline="true" :model="approveSelFrom">
            <!-- <el-form-item label="核准类型:" style="margin-left:20px">
        <el-select clearable v-model="approveSelFrom.authorizeType" style="width:200px">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item> -->
            <el-form-item label="渠道" style="margin-left:20px">
                <el-select
                    clearable
                    v-model="approveSelFrom.repChannelId"
                    multiple
                    collapse-tags
                    style="width:300px;"
                    placeholder="请选择渠道"
                >
                    <el-option
                        v-for="item in channelIdListData"
                        :key="item.id"
                        :label="item.repChannelName"
                        :value="item.repChannelId"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" @click="searchSelectList">查询</el-button>
            <el-button type="primary" @click="clearApproveFrom">清空</el-button>
        </el-form>
        <el-row style="margin-top: 20px">
            <el-col :span="24">
                <div>
                    <el-table
                        ref="multipleTable"
                        tooltip-effect="dark"
                        v-loading="sIsLoading"
                        :data="approveSelTable"
                        @selection-change="handleSelectionChange"
                        style="width: 100%"
                    >
                        <el-table-column
                            type="selection"
                            width="50"
                        ></el-table-column>
                        <el-table-column
                            label="渠道名称"
                            prop="repChannelName"
                        ></el-table-column>
                        <el-table-column
                            label="渠道账号"
                            prop="repChannelId"
                        ></el-table-column>
                        <el-table-column
                            width="120"
                            label="核准类型"
                            prop="authorizeType"
                            :formatter="formatter.formatAuthorizeType"
                        ></el-table-column>
                        <el-table-column
                            label="核准月份"
                            prop="authorizeMonth"
                        ></el-table-column>
                        <el-table-column
                            label="核准代号"
                            prop="authorizeCode"
                        ></el-table-column>
                        <el-table-column
                            label="核准上传时间"
                            prop="updateTime"
                        ></el-table-column>
                        <el-table-column
                            label="所属代理商分润列表"
                            prop="agentReport"
                        ></el-table-column>
                        <el-table-column
                            label="代理商分润发放状态"
                            prop="agentProfitStatus"
                            :formatter="formatter.formatProfitStatus"
                        ></el-table-column>
                    </el-table>
                </div>
                <div class="block" style="margin-top: 20px;">
                    <el-pagination
                        @size-change="sHandleSizeChange"
                        @current-change="sHandleCurrentChange"
                        :current-page="sPage"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="sSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="sTotal"
                    ></el-pagination>
                </div>
            </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer">
            <el-button @click="clearApproveSel()">取 消</el-button>
            <el-button type="primary" @click="sendAuthorizeRecordIds()"
                >确 定</el-button
            >
        </div>
    </el-dialog>
</template>

<script>
import { addReport, authorizeReport } from "@/sercive/api/agencySercive";
import { repChannelList } from "@/sercive/api/configMsgSercive";
import formatter from "@/utils/filter/formatter";
export default {
    data() {
        return {
            formatter,
            sIsLoading: false,
            approveSelFrom: {
                repChannelId: "",
                agentProfitStatus: "",
                authorizeType: ""
            },
            dialogSelVisible: false,
            approveSelTable: [],
            statusList: [
                { label: "全部", value: null },
                { label: "进行中", value: 0 },
                { label: "成功", value: 1 },
                { label: "失败", value: 2 }
            ],
            sendList: [
                { label: "未发放", value: 0 },
                { label: "已发放", value: 1 }
            ],
            typeList: [
                { label: "移动支付", value: 0 },
                { label: "刷卡", value: 1 },
                { label: "花呗分期", value: 2 }
            ],
            sPage: 1,
            sSize: 5,
            sTotal: 0,
            selMonth: "",
            hadSelectction: [],
            noSelection: [],
            selIndex: "",
            channelIdListData: [],
            // 缓存列表
            cacheList: [],
            // 是否是重新生成
            isReboot: false
        };
    },
    mounted() {
        this.$bus.$on("showSelList", params => {
            this.showSelList(params);
        });
    },
    methods: {
        async showSelList(params) {
            let { index, approveList, authorizeType } = params;
            this.approveSelFrom.authorizeType = authorizeType;
            this.selIndex = params.index;
            this.cacheList = approveList;
            this.getChannel();
            this.dialogSelVisible = true;
            await this.getApproveSelectList();
            this.toggleSelection();
        },
        /* ===============初始化=============== */
        // 获取待核准生成列表
        async getApproveSelectList() {
            let {
                authorizeType,
                agentProfitStatus,
                repChannelId
            } = this.approveSelFrom;
            let { sSize, sPage } = this;
            this.sIsLoading = true;
            let params = {
                authorizeType,
                agentProfitStatus,
                size: sSize,
                // page: sPage - 1
                page: sPage
            };
            if (repChannelId && repChannelId.length > 0) {
                params.repChannelId = `${repChannelId}`;
            }
            let res = await authorizeReport(params);
            this.approveSelTable = res.data.extra.rows;
            this.sTotal = res.data.extra.total || 0;
            this.sIsLoading = false;
        },
        // 根据cache默认回填选项
        toggleSelection() {
            let { approveSelTable, cacheList } = this;
            let selList = [];
            approveSelTable.forEach(item => {
                if (cacheList.indexOf(item.authorizeRecordId) > -1) {
                    this.$nextTick(() => {
                        this.$refs.multipleTable.toggleRowSelection(item);
                        selList.push(item);
                    });
                }
            });
        },
        /* ===============table操作=============== */
        searchSelectList() {
            this.sPage = 1;
            this.cacheAndGetList();
        },
        // 分页相关
        sHandleSizeChange(val) {
            this.sSize = val;
            this.cacheAndGetList();
        },
        sHandleCurrentChange(val) {
            this.sPage = val;
            this.cacheAndGetList();
        },
        /* ===============缓存操作=============== */
        async cacheAndGetList() {
            this.cacheBeforeChange();
            await this.getApproveSelectList();
            this.toggleSelection();
        },
        // 查询 分页之前的缓存
        cacheBeforeChange() {
            this.cacheHadSelList();
            this.cancelCache();
            this.hadSelectction = [];
            this.noSelection = [];
        },
        cacheHadSelList() {
            if (this.hadSelectction.length === 0) return;
            let concatArray = [...this.hadSelectction, ...this.approveSelTable];
            this.hadSelectction.forEach(item => {
                if (this.cacheList.indexOf(item.authorizeRecordId) === -1) {
                    this.cacheList.push(item.authorizeRecordId);
                }
            });
        },
        cancelCache() {
            if (this.noSelection.length === 0) return;
            this.noSelection.forEach(item => {
                let cacheIndex = this.cacheList.indexOf(item.authorizeRecordId);
                if (cacheIndex > -1) {
                    this.cacheList.splice(cacheIndex, 1);
                }
            });
        },
        // 每次选择获取
        handleSelectionChange(val) {
            this.hadSelectction = val;
            let concatArray = [...this.hadSelectction, ...this.approveSelTable];
            this.noSelection = concatArray.filter(
                item =>
                    concatArray.indexOf(item) === concatArray.lastIndexOf(item)
            );
        },
        // 单纯的清空表单数据
        async clearApproveFrom() {
            this.approveSelFrom = {
                repChannelId: "",
                agentProfitStatus: "",
                authorizeType: this.approveSelFrom.authorizeType
            };
            this.cacheAndGetList();
        },
        clearApproveSel() {
            this.dialogSelVisible = false;
            this.approveSelFrom = {
                repChannelId: "",
                agentProfitStatus: "",
                authorizeType: this.approveSelFrom.authorizeType
            };
            this.hadSelectction = [];
            this.noSelection = [];
            this.cacheList = [];
            this.sPage = 1;
            this.sSize = 5;
            this.sTotal = 0;
        },
        async getChannel() {
            let params = "?page=1&size=500&status=0";
            let res = await repChannelList(params);
            if (res.data.extra) {
                this.channelIdListData = res.data.extra.rows;
            }
        },
        /* ===============确认=============== */
        sendAuthorizeRecordIds() {
            this.onlySelectEvent();
        },
        // 核准生成选择
        onlySelectEvent() {
            this.cacheBeforeChange();
            let params = {
                approveList: this.cacheList,
                index: this.selIndex,
                authorizeType: this.approveSelFrom.authorizeType
            };
            this.$bus.$emit("hadSelectApprove", params);
            // this.$parent.$refs.approveCreate(params)
            this.clearApproveSel();
        }
    }
};
</script>

<style></style>
