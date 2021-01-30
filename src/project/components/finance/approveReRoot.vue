<template>
    <el-dialog
        :title="'核准生成'"
        :visible.sync="dialogSelVisible"
        width="1300px"
        :before-close="clearApproveSel"
    >
        <el-form :inline="true" :model="approveSelFrom">
            <!-- <el-form-item label="核准类型:" style="margin-left:20px">
                <el-select
                    clearable
                    v-model="approveSelFrom.authorizeType"
                    style="width:200px"
                >
                    <el-option
                        v-for="item in typeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="渠道">
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
import { rebootFind, reboot } from "@/sercive/api/agencySercive";
import { repChannelList } from "@/sercive/api/configMsgSercive";
import formatter from "@/utils/filter/formatter";
export default {
    data() {
        return {
            details: {
                taskStatus: 0,
                month: "",
                recordId: "",
                profitStatus: 0,
                pushStatus: 0,
                authorizeType: 0
            },
            formatter,
            sIsLoading: false,
            approveSelFrom: {
                repChannelId: "",
                agentProfitStatus: "",
                authorizeMonth: ""
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
            channelIdListData: [],
            // 缓存列表
            cacheList: [],
            // 是否是重新生成
            isReboot: false
        };
    },
    methods: {
        async showSelList(row) {
            this.details = {
                taskStatus: row.taskStatus,
                month: row.authorizeMonth,
                recordId: row.authorizeRecordId,
                profitStatus: row.profitStatus,
                pushStatus: row.pushStatus,
                authorizeType: row.authorizeType
            };
            try {
                let msg = await this.rebootFind();
                if (msg) throw msg;
                this.dialogSelVisible = true;
                this.getChannel();
                this.toggleSelection();
            } catch (error) {
                this.$message.error(error);
            }
        },
        // 重新生成
        async rebootFind() {
            this.sIsLoading = true;
            let {
                taskStatus,
                month,
                recordId,
                profitStatus,
                pushStatus,
                authorizeType
            } = this.details;
            let { agentProfitStatus, repChannelId } = this.approveSelFrom;
            let { sSize, sPage } = this;
            let params = {
                taskStatus,
                month,
                recordId,
                profitStatus,
                // page: sPage - 1,
                page: sPage,
                size: sSize,
                pushStatus
            };
            if (repChannelId) {
                params.repChannelId = repChannelId;
            }
            if (authorizeType) {
                params.authorizeType = authorizeType;
            }
            if (agentProfitStatus) {
                params.agentProfitStatus = profitStatus;
            }
            let res = await rebootFind(params);
            if (res.data.code === 0) {
                let optData = res.data.extra.optData;
                let rows = res.data.extra.rows;
                this.approveSelTable = rows;
                if (optData !== null) {
                    this.cacheList = optData.map(
                        item => item.authorizeRecordId
                    );
                }
                this.sTotal = res.data.extra.total || 0;
            } else {
                return res.data.errMsg;
            }
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
            await this.rebootFind();
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
        clearApproveFrom() {
            this.approveSelFrom = {
                repChannelId: "",
                agentProfitStatus: "",
                authorizeMonth: this.approveSelFrom.authorizeMonth
            };
            this.details = {
                taskStatus: 0,
                month: "",
                recordId: "",
                profitStatus: 0,
                pushStatus: 0,
                authorizeType: 0
            };
            this.cacheAndGetList();
        },
        clearApproveSel() {
            this.dialogSelVisible = false;
            this.approveSelFrom = {
                repChannelId: "",
                agentProfitStatus: "",
                authorizeMonth: ""
            };
            this.details = {
                taskStatus: 0,
                month: "",
                recordId: "",
                profitStatus: 0,
                pushStatus: 0,
                authorizeType: 0
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
            this.rebootEvent();
        },
        // 重新生成
        async rebootEvent() {
            this.cacheBeforeChange();
            let { taskStatus, month, recordId } = this.details;
            if (this.cacheList.length === 0) {
                this.$message.error("请选择要重新生成的选项");
                return;
            }
            let params = {
                taskStatus,
                recordId,
                month,
                authorizeRecordId: this.cacheList
            };
            let res = await reboot(params);
            if (res.data.code === 0) {
                this.$message.success(res.data.errMsg);
                this.clearApproveSel();
                this.$emit("reGetList");
            }
        }
    }
};
</script>

<style></style>
