<template>
    <div class="c-content-inner">
        <div class="search-box">
            <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
            >
                <el-form-item label="渠道">
                    <el-select
                        clearable
                        v-model="formInline.repChannelIds"
                        multiple
                        collapse-tags
                        style="width:280px;"
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
                <el-form-item label="核准类型">
                    <el-select
                        clearable
                        v-model="formInline.authorizeType"
                        style="width:200px;"
                        placeholder="请选择核准类型"
                    >
                        <el-option label="移动支付" value="0"></el-option>
                        <el-option label="刷卡" value="1"></el-option>
                        <el-option label="花呗分期" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="代理商分润发放状态">
                    <el-select
                        clearable
                        v-model="formInline.agentProfitStatus"
                        style="width:200px;"
                        placeholder="请选择代理商发放状态"
                    >
                        <el-option label="已发放" value="1"></el-option>
                        <el-option label="未发放" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提成发放状态">
                    <el-select
                        clearable
                        v-model="formInline.rebateProfitStatus"
                        style="width:180px;"
                        placeholder="请选择提成发放状态"
                    >
                        <el-option label="已发放" value="1"></el-option>
                        <el-option label="未发放" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
            <el-row>
                <el-button type="primary" @click="showDialog"
                    >核准上传</el-button
                >
            </el-row>
        </div>
        <div class="table-box">
            <el-table v-loading="loading" border :data="tableData">
                <el-table-column
                    width="120"
                    prop="repChannelName"
                    label="渠道名称"
                />
                <el-table-column
                    width="180"
                    prop="repChannelId"
                    label="渠道账号"
                />
                <el-table-column
                    width="120"
                    prop="authorizeType"
                    label="核准类型"
                    :formatter="authorizeTypeFormat"
                />
                <el-table-column
                    width="120"
                    prop="authorizeMonth"
                    label="核准月份"
                />
                <el-table-column
                    width="130"
                    prop="authorizeCode"
                    label="核准代号"
                />
                <el-table-column
                    width="120"
                    prop="updateTime"
                    label="核准上传时间"
                />
                <el-table-column
                    width="150"
                    prop="agentReport"
                    label="所属代理商分润报表"
                />
                <el-table-column
                    width="120"
                    prop="rebateReport"
                    label="所属提成报表"
                />
                <el-table-column
                    width="160"
                    prop="agentProfitStatus"
                    label="代理商分润发放状态"
                    :formatter="agentProfitStatusFormat"
                />
                <el-table-column
                    width="120"
                    prop="rebateProfitStatus"
                    label="提成发放状态"
                    :formatter="rebateProfitStatusFormat"
                />
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div style="width:200px">
                            <el-button
                                :disabled="+scope.row.agentProfitStatus === 1"
                                size="mini"
                                @click.native="undoAuthorize(scope.row)"
                                >撤销
                            </el-button>
                            <el-button
                                size="mini"
                                @click.native="downloadAuthorize(scope.row)"
                                >下载核准内容
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="table-page" style="padding-top:20px;display:flex;    justify-content: flex-end;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="formInline.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="parseInt(formInline.size)"
                layout="total, sizes, prev, pager, next, jumper"
                :total="parseInt(total)"
            >
            </el-pagination>
        </div>
        <!-- 弹框 -->
        <el-dialog
            class="approval-dialog"
            title="核准上传"
            width="660px"
            :visible.sync="dialogFormVisible"
        >
            <el-row style="margin-bottom:10px">
                <el-col>
                    <div
                        class="grid-content bg-purple-dark flex-s"
                        style="background-color: rgb(236, 245, 255);padding:10px"
                    >
                        <i
                            class="el-icon-info"
                            style="color: cornflowerblue;font-size:30px;margin-right: 10px"
                        ></i>
                        <div
                            class="flex-s"
                            style="color:rgb(83, 168, 255);font-size:14px"
                        >
                            请先选择需要核准的渠道和月份，再上传文件
                            <span style="display:none">{{
                                approvalForm.repChannelName
                            }}</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-form :model="approvalForm" :rules="rules">
                <el-form-item
                    prop="bizType"
                    label="核准类型 :"
                    style="width:500px"
                    label-width="90px"
                >
                    <el-radio-group v-model="approvalForm.bizType">
                        <el-radio :label="0">移动支付</el-radio>
                        <el-radio :label="1">刷卡</el-radio>
                        <el-radio :label="2">花呗分期</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    prop="repChannelId"
                    label="渠道 :"
                    style="width:500px"
                    label-width="90px"
                >
                    <el-select
                        @change="changeChannel"
                        v-model="approvalForm.repChannelId"
                        style="width:300px;"
                        placeholder="请选择渠道:"
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
                <el-form-item
                    prop="billMonth"
                    label="月份 :"
                    style="width:500px"
                    label-width="90px"
                >
                    <el-date-picker
                        style="width:300px;"
                        v-model="approvalForm.billMonth"
                        value-format="yyyy-MM"
                        type="month"
                        placeholder="请选择月份"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-upload
                        style="height:30px"
                        class="upload-demo"
                        ref="upload"
                        :headers="{ token: access_token }"
                        :action="uploadExcelUrl"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="dataUploadSuccess"
                        :file-list="fileList"
                        :on-error="onError"
                        :data="approvalForm"
                    >
                        <el-form-item
                            label="账单文件:"
                            :label-width="formLabelWidth"
                        >
                            <el-button type="primary" style="font-size:14px"
                                >点击上传</el-button
                            >
                        </el-form-item>
                    </el-upload>
                    <div style="margin-left:80px">
                        <div
                            style="height:24px;font-size:14px;margin-left:10px;margin-top:5px"
                        >
                            支持扩展名：.csv .xlsx .xls
                        </div>
                        <div
                            @click="downLoadTemp"
                            style="font-size:14px;margin-left:10px;cursor:pointer;color: #70A2EF"
                        >
                            模板下载
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <!-- <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div> -->
        </el-dialog>
    </div>
</template>

<script>
import {
    repChannelList,
    authorizeUpload,
    downloadAuthorize,
    downAuthorizeTemplate,
    undoAuthorize
} from "@/sercive/api/channelSercive";
import $config from "@/config";
export default {
    data() {
        return {
            rules: {
                bizType: [{ required: true, message: "核准类型不能为空" }],
                repChannelId: [{ required: true, message: "渠道不能为空" }],
                billMonth: [{ required: true, message: "月份不能为空" }]
            },
            // 多选结束
            formInline: {
                repChannelIds: [],
                type: 0,
                sendStatus: 0,
                ticheng: 0,
                size: 10,
                page: 1
            },
            tableData: [],
            currentRow: null,
            channelIdListData: [],
            page: 1,
            size: 10,
            loading: false,
            total: 0,
            // 弹框
            formLabelWidth: "80px",
            dataUploadfrom: {
                billMonth: "",
                repChannelId: "",
                bizType: "",
                repChannelName: ""
            },
            fileList: [],
            dialogFormVisible: false,
            approvalForm: {
                billMonth: "",
                repChannelId: "",
                bizType: "",
                repChannelName: ""
            },
            uploadExcelUrl:
                $config.reportBaseUrl +
                "/v3/authorizeUpload/uploadAuthorizeData"
        };
    },
    methods: {
        onSearch(){
            // this.page = 1
            this.formInline.page = 1;
            this.dataList()
        },
        changeChannel(v) {
            let getList = this.channelIdListData.filter(
                item => item.repChannelId === v
            );
            this.approvalForm.repChannelName = getList[0].repChannelName;
        },
        authorizeTypeFormat(row, col, cellValue, index) {
            cellValue = +cellValue;
            let obj = {
                0: "移动支付",
                1: "刷卡",
                2: "花呗分期"
            };
            return obj[cellValue];
        },
        agentProfitStatusFormat(row, col, cellValue, index) {
            cellValue = +cellValue;
            let obj = {
                0: "未发放",
                1: "已发放"
            };
            return obj[cellValue];
        },
        rebateProfitStatusFormat(row, col, cellValue, index) {
            let obj = {
                0: "未发放",
                1: "已发放"
            };
            return obj[cellValue];
        },
        /** ===================== http请求 ==================*/
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
        async dataList() {
            let {
                authorizeType,
                page,
                size,
                agentProfitStatus,
                rebateProfitStatus,
                repChannelIds
            } = this.formInline;
            let params = {
                page: page,
                size,
                authorizeType,
                agentProfitStatus,
                rebateProfitStatus
            };
            let url = "";
            if (repChannelIds.length !== 0) {
                params.repChannelId = repChannelIds.join(",");
            }
            let res = await authorizeUpload(params);
            this.tableData = res.data.extra.rows;
            this.total = res.data.extra.total;
        },
        handleSizeChange(val) {
            this.formInline.size = val;
            this.dataList();
        },
        handleCurrentChange(val) {
            this.formInline.page = val;

            this.dataList();
        },
        /** ===================下载相关 =======================*/
        // 下载核准内容
        async downloadAuthorize(item) {
            item.isLoading = true;
            try {
                let params = {
                    authorizeRecordId: item.authorizeRecordId,
                    billMonth: item.authorizeMonth,
                    bizType: item.authorizeType
                };
                let response = await downloadAuthorize(params);
                let blob = new Blob([response.data]);
                let downloadElement = document.createElement("a");
                let href = window.URL.createObjectURL(blob); //创建下载的链接
                downloadElement.href = href;
                downloadElement.download = `核准内容${new Date().getTime()}.xlsx`; //下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click(); //点击下载
                document.body.removeChild(downloadElement); //下载完成移除元素
                window.URL.revokeObjectURL(href); //释放掉blob对象
            } catch (error) {
                console.log("error", error);
                this.$message.error("下载失败");
            }
        },
        // 下载模板
        async downLoadTemp() {
            let vaild = this.beforeUpload();
            if (!vaild) return;
            let {
                billMonth,
                repChannelId,
                bizType,
                repChannelName
            } = this.approvalForm;
            let params = {
                billMonth,
                repChannelId,
                bizType,
                repChannelName
                // file: ''
            };
            let response = await downAuthorizeTemplate(params);
            let blob = new Blob([response.data]);
            let downloadElement = document.createElement("a");
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            let name = this.createFileName();
            downloadElement.download = `${name}.xlsx`; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
        },
        createFileName() {
            let { billMonth, repChannelId, bizType } = this.approvalForm;
            bizType = this.authorizeTypeFormat(null, null, bizType);
            let repChannelName = this.channelIdListData.filter(
                item => item.repChannelId === repChannelId
            )[0].dgwChannelName;
            return `${repChannelName}_${billMonth}_${bizType}_${new Date().getTime()}`;
        },
        async undoAuthorize(item) {
            this.$confirm("确定要删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(async () => {
                let agentProfitStatus =
                    item.agentProfitStatus === null ? "3" : item.agentProfitStatus;
                try {
                    let parasm = {
                        authorizeRecordId: item.authorizeRecordId,
                        agentProfitStatus: item.agentProfitStatus
                    };
                    let res = await undoAuthorize(parasm);
                    if (res.data.code !== 0) throw res.data.errMsg;
                    this.$message.success("撤销成功！");
                    this.dataList();
                } catch (error) {
                    this.$message.error(error);
                }
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
        },
        /** ==================== 弹框 ========================*/
        showDialog() {
            this.dialogFormVisible = true;
        },
        handlePreview(file) {
            console.log(file);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        beforeUpload() {
            let { billMonth, repChannelId, bizType } = this.approvalForm;
            if (billMonth === "") {
                this.$message.error("月份不能为空");
                return false;
            } else if (repChannelId === "") {
                this.$message.error("渠道不能为空");
                return false;
            } else if (bizType === "") {
                this.$message.error("核准类型不能为空");
                return false;
            }
            return true;
        },
        onError(res) {
            // alert(res,'ddd')
            this.$message({
                type: "error",
                message: "上传失败，重新上传"
            });
        },
        dataUploadSuccess(res) {
            if (res.code === 0) {
                this.$message.success("上传成功！");
                this.dataList();
            } else {
                this.$message.error(res.errMsg);
            }
        }
    },
    mounted() {
        this.access_token = this.$ls.get("access_token");
        this.channel();
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
.el-button--primary.is-plain {
    color: #409eff !important;
}
.upload-demo {
    margin-left: 10px;
}
.upload-demo2 {
    text-align: left;
}
</style>
