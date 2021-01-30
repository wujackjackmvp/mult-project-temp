<template>
    <el-dialog
        width="80%"
        :title="date+'拓展人提成核准记录选择'"
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
                <el-button type="primary">查询</el-button>
            </el-row>
        </el-form>
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            @select="handleSelect"
        >
            <el-table-column v-if="isDetail == 2" type="selection" width="55"></el-table-column>
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
import { approveRecord } from "@/sercive/api/expanderService";

export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        authorizeIds:{
            type:Array,
            default:()=>[]
        },
        recordId:{
            type:[String,Number],
            default:''
        },
        isDetail:{ //1.明细查看 2.核准记录选择
            type:Number,
            default:2
        },
        date:{
            type:[String,Number],
            default:'' 
        }
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
                page: 1,
                size: 5,
                authorizeType: "",
                rebateProfitStatus: "",
                recordId: '',
                isDetail:2, // 1.明细查看 2.核准记录选择
                isNoPage:0 // 分页
            },
            total: 0,
            tableData: [],
            channelIdListData:[],
            multipleSelection:[]
        };
    },
    watch:{
        recordId(val){
            this.form.recordId = val
            this.form.isDetail = this.isDetail
            // this.form.recordId ? this.form.isDetail = 1:this.form.isDetail = 2
            this.getApproveRecord()
        },
        show(val){
            this.visible = val
        },
        visible(val){
            this.$emit('update:show',val)
        },
        authorizeIds(val){
            this.multipleSelection = JSON.parse(JSON.stringify(val))
            // val.forEach(v => {
            //     if (!this.multipleSelection.includes(v)) {
            //         this.multipleSelection.push(v) // 添加
            //     }
            // })
        }
    },
    created() {
        this.channel()
        this.getApproveRecord();
    },
    methods: {
        formatterStatus(row,col){
            let selItem= this.profitStatusOps.find(v=>v.value == row.rebateProfitStatus)
            return selItem.label
        },
        formatterType(row,col){
            let selItem= this.authorizeTypeOps.find(v=>v.value == row.authorizeType)
            return selItem.label
        },
        onConfirm(){
            this.$emit('update:authorizeIds',this.multipleSelection)
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
        handleSelectionChange(rows) {
            rows.forEach(row => {
                if (!this.multipleSelection.includes(row.authorizeRecordId)) {
                    this.multipleSelection.push(row.authorizeRecordId)
                }
            })
        },
        handleSelect(selection,row){
            this.multipleSelection = this.multipleSelection.filter(v => v != row.authorizeRecordId)
        },
       handleSizeChange(val) {
            this.form.size = val;
            this.getApproveRecord();
        },
        handleCurrentChange(val) {
            this.form.page = val;
            this.getApproveRecord();
        },
        getApproveRecord() {
            this.loading = true;
            approveRecord(this.form)
                .then(res => {
                    this.loading = false;
                    if (res.data.code == 0 && res.data.extra) {
                        this.tableData = res.data.extra.rows;
                        // 分页如果当前页为选中状态，设置当前行选中
                        this.$nextTick(() => {
                            this.tableData.forEach(item => {
                                if (this.multipleSelection.includes(item.authorizeRecordId)) {
                                    this.$refs['multipleTable'] && this.$refs['multipleTable'].toggleRowSelection(item)
                                }
                            })
                        })
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
