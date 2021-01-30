<template>
    <el-dialog
        :title="'核准生成'"
        :visible.sync="dialogSelVisible"
        width="1300px"
        :before-close="clearApproveSel"
    >
        <el-form :inline="true" :model="approveSelFrom">
            <el-form-item label="核准类型:" style="margin-left:20px">
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
            </el-form-item>
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
                        style="width: 100%"
                    >
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
            <el-button type="primary" @click="clearApproveSel()"
                >确 定</el-button
            >
        </div>
    </el-dialog>
</template>

<script>
import { repChannelList, authorizeUpload, FindAuthorize } from "@/sercive/api/channelSercive";
import formatter from "@/utils/filter/formatter";
export default {
    data() {
        return {
            formatter,
            sIsLoading: false,
            approveSelFrom: {
                repChannelId: "",
                recordId: "",
                authorizeType: "",
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
            id: "",
            channelIdListData: [],
            // 缓存列表
            cacheList: [],
            // 是否是重新生成
            isReboot: false
        };
    },
    methods: {
        async showSelList(row) {
            console.log("row ", row.authorizeRecordId)
            this.approveSelFrom.recordId = row.authorizeRecordId;
            this.getChannel();
            this.dialogSelVisible = true;
            this.FindAuthorize ();
        },
        /* ===============初始化=============== */
        // 获取待核准生成列表
        async FindAuthorize () {
            let {
                authorizeType,
                repChannelId,
                recordId
            } = this.approveSelFrom;
            let { sSize, sPage } = this;
            this.sIsLoading = true;
            let params = {
                recordId,
                authorizeType: authorizeType ? authorizeType : undefined,
                size: sSize,
                // page: sPage - 1
                page: sPage
            };
            if (repChannelId && repChannelId.length > 0) {
                params.repChannelId = `${repChannelId}`;
            }
            let res = await FindAuthorize (params);
            this.approveSelTable = res.data.extra.rows;
            this.sTotal = res.data.extra.total || 0;
            this.sIsLoading = false;
        },
        /* ===============table操作=============== */
        searchSelectList() {
            this.sPage = 1;
            this.FindAuthorize();
        },
        // 分页相关
        sHandleSizeChange(val) {
            this.sSize = val;
            this.FindAuthorize();
        },
        sHandleCurrentChange(val) {
            this.sPage = val;
            this.FindAuthorize();
        },
        // 单纯的清空表单数据
        clearApproveFrom() {
            this.approveSelFrom = {
                repChannelId: "",
                agentProfitStatus: "",
                recordId: "",
            };
            this.FindAuthorize();
        },
        clearApproveSel() {
            this.dialogSelVisible = false;
            this.approveSelFrom = {
                repChannelId: "",
                agentProfitStatus: "",
                recordId: "",
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
        }
    }
};
</script>

<style></style>
