<template>
    <el-dialog
        width="80%"
        :title="`${form.buildYear||''}核准记录`"
        :visible.sync="visible"
    >
        <el-form :model="form" label-width="80px" v-loading="loading">
            <el-row :gutter="24">
                <el-col :span="7">
                    <el-form-item label="发放状态:">
                        <el-select
                            v-model="form.rebateProfitStatus"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in profitStatusOps"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="核准类型:">
                        <el-select
                            v-model="form.authorizeType"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in authorizeTypeOps"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="渠道：">
                            <!-- multiple -->
                            <el-select
                                v-model="form.repChannelId"
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
                <el-button type="primary" @click="onSearch">查询</el-button>
            </el-row>
        </el-form>
        <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
        >
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <!-- ref="multipleTable" -->
            <el-table-column label="渠道名称" align="center" prop="repChannelName">
            </el-table-column>
            <el-table-column label="渠道账号" align="center" prop="repChannelId">
            </el-table-column>
            <el-table-column label="核准类型" :formatter="formatterType" align="center" prop="authorizeType">
            </el-table-column>
            <el-table-column label="核准月份" align="center" prop="authorizeMonth">
            </el-table-column>
            <el-table-column label="核准代号" align="center" prop="authorizeCode">
            </el-table-column>
            <el-table-column label="核准上传时间" align="center" prop="updateTime">
            </el-table-column>
            <el-table-column label="所属报表" align="center" prop="rebateReport">
            </el-table-column>
            <el-table-column label="发放状态" :formatter="formatterStatus" align="center" prop="rebateProfitStatus">
            </el-table-column>
        </el-table>
        <div class="table-page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.pageNo"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="form.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="onConfirm"
                >确 定</el-button
            >
        </span>
    </el-dialog>
</template>

<script>
import { findRecord } from "@/sercive/api/dailySercive";

export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            visible:false,
            loading: false,
            authorizeTypeOps: [
                { label: "移动", value: 0 },
                { label: "刷卡", value: 1 },
                { label: "花呗分期", value: 2 }
            ],
            profitStatusOps: [
                { label: "未发放", value: 0 },
                { label: "已发放", value: 1 }
            ],
            form: {
                pageNo:1,
                pageSize:5,
                buildYear:''
            },
            total: 0,
            tableData: [],
            channelIdListData:[],
            multipleSelection:[]
        };
    },
    watch:{
        show(val){
            this.visible = val
        },
        visible(val){
            this.$emit('update:show',val)
        }
    },
    created() {
        this.channel()
    },
    methods: {
        onSearch(){
            this.form.pageNo = 1
            this.getApproveRecord();
        },
        formatterStatus(row,col){
            let selItem= this.profitStatusOps.find(v=>v.value == row.rebateProfitStatus)
            return selItem.label
        },
        formatterType(row,col){
            let selItem= this.authorizeTypeOps.find(v=>v.value == row.authorizeType)
            return selItem.label
        },
        onConfirm(){
            this.$emit('update:show',false)
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
       handleSizeChange(val) {
            this.form.pageSize = val;
            this.getApproveRecord();
        },
        handleCurrentChange(val) {
            this.form.pageNo = val;
            this.getApproveRecord();
        },
        getApproveRecord() {
            this.loading = true;
            findRecord(this.form)
                .then(res => {
                    this.loading = false;
                    if (res.data.code == 0 && res.data.extra) {
                        this.tableData = res.data.extra.rows;
                        this.total = res.data.extra.total;
                    } else {
                        this.$message.error(res.data.errMsg);
                    }
                })
                .catch(e => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style scoped>
.table-page{
    margin-top: 20px;
}
</style>
