<template>
    <div class="c-content-inner">
        <el-form ref="form" :model="form" label-width="80px">
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="生成状态:">
                        <el-select
                            v-model="form.taskStatus"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in taskStatusOps"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="发放状态:">
                        <el-select
                            v-model="form.profitStatus"
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
                <el-col :span="10">
                    <el-form-item label="选择报表日期:" label-width="100px">
                        <el-date-picker
                            v-model="dateTimeArr"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button
                type="success"
                @click="toCreateExpanderDialog"
                icon="el-icon-plus"
                >生成核准报表</el-button
            >
        </el-form>
        <el-alert
            title="财务手工确认处理后自动更新交易和分润"
            style="margin:30px 0"
            type="info"
        >
        </el-alert>
        <el-table :data="tableData" style="width: 100%;" v-loading="loading">
            <el-table-column
                align="center"
                prop="authorizeName"
                label="报表名称"
            >
            </el-table-column>
            <el-table-column align="center" prop="recordId" label="调整代号">
            </el-table-column>
            <el-table-column :formatter="formatterStatus" align="center" prop="taskStatus" label="生成状态">
            </el-table-column>
            <el-table-column align="center" prop="runTime" label="执行时间">
            </el-table-column>
            <el-table-column
                align="center"
                prop="profitStatus"
                :formatter="formatterProfitStatus"
                label="发放状态"
            >
            </el-table-column>
            <el-table-column align="center" prop="profitTime" label="发放日期">
            </el-table-column>
            <el-table-column
                width="380px"
                align="center"
                prop="test"
                label="操作"
            >
                <template slot-scope="scope">
                    <el-button
                        @click="repeatCreate(scope.row)"
                        type="text"
                        size="small"
                        >重新选择生成</el-button
                    >
                    <el-button @click="revokeHandle(scope.row)" type="text" size="small">撤销</el-button>
                    <el-button @click="sendInput(scope.row)" type="text" size="small">发放回填</el-button>
                    <el-button @click="toAuthorizeDetail(scope.row)"  type="text" size="small">核准记录查看</el-button>
                    <el-button @click="toAdjustDetail(scope.row)" type="text" size="small">调整明细查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="table-page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.page"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="form.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
        <el-dialog
            width="65%"
            title="核准生成"
            @close="closeDialog"
            :visible.sync="approvedCreateVisible"
        >
            <el-form :model="approvedCreateForm" label-width="80px">
                <el-row :gutter="24">
                    <el-col :span="10">
                        <el-form-item label="选择月份:">
                            <el-date-picker
                                v-model="approvedCreateForm.authorizeMonth"
                                value-format="yyyy-MM"
                                type="month"
                                placeholder="选择月"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-button @click="toChooseApprovedRecord"
                            >选择核准记录</el-button
                        >
                        <span>{{approvedCreateForm.authorizeIds.length == 0?'未选择':'已选择'+approvedCreateForm.authorizeIds.length+'条'}}</span>
                    </el-col>
                    <el-col :span="6">
                        <el-button @click="toChooseAdjustDetail"
                            >选择调整明细</el-button
                        >
                        <span>{{approvedCreateForm.adjustIds.length == 0?'未选择':'已选择'+approvedCreateForm.adjustIds.length+'条'}}</span>
                    </el-col>
                </el-row>
                <el-form-item label="备注" style="width:80%">
                    <el-input
                        type="textarea"
                        v-model="approvedCreateForm.remark"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="approvedCreateVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="handleExpanderCreate"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
        <approve-record-dialog :date="date" :isDetail="isDetail" :recordId="curApproveRecordId" :authorizeIds.sync="approvedCreateForm.authorizeIds" :show.sync="approvedRecordVisible"></approve-record-dialog>
        <adjust-comp :date="date" :isDetail="isDetail" :recordId="curAdjustRecordId" :adjustIds.sync="approvedCreateForm.adjustIds" :show.sync="adjustmentDetailVisible"></adjust-comp>
        <!-- width="65%" -->
         <el-dialog
            title="发放回填"
            :visible.sync="sendVisible"
        >
            <el-form :model="sendForm" ref="send" label-width="80px">
                <!-- type: 'date',  -->
                <el-form-item prop="sendDate" label="活动时间" :rules="{ required: true, message: '请选择时间', trigger: 'change' }">
                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="sendForm.sendDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="sendVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="sendHandle"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { expanderProfit,expanderCreate,approveRecord,adjustList,expanderRemake,expanderSend,expanderRevoke } from "@/sercive/api/expanderService";
import approveRecordDialog from './components/approveRecordDialog'
// import adjustComp from '../components/adjustComp'
import adjustComp from './components/adjustComp'
export default {
    name: "CreateExpander",
    components: {
        approveRecordDialog,
        adjustComp
    },
    data() {
        return {
            date:'',
            sendVisible:false,
            sendForm:{
                sendDate:'',
                recordId:''
            },
            curRow:{},
            isDetail:2, // 1.明细查看 2.核准记录选择
            curAdjustRecordId:'',
            curApproveRecordId:'',
            approvedRecordVisible: false,
            // rebateProfitStatusOps:[
            //     {label:'未发放',value:0},
            //     {label:'已发放',value:1}
            // ],
            profitStatusOps: [
                { label: "未发放", value: 0 },
                { label: "已发放", value: 1 }
            ],
            taskStatusOps: [
                { label: "失败", value: 0 },
                { label: "成功", value: 1 },
                { label: "进行中", value: 2 },
                { label: "已撤销", value: 3 }
            ],
            dateTimeArr: [],
            form: {
                startMonth: "",
                endMonth: "",
                profitStatus: "",
                taskStatus: "",
                page: 1,
                size: 10
            },
            total: 0,
            tableData: [],
            loading: false,
            approvedCreateForm: {
                authorizeIds:[],
                adjustIds:[],
                authorizeMonth:'',
                remark:''
            },
            originForm:{
                authorizeIds:[],
                adjustIds:[],
                authorizeMonth:'',
                remark:''
            },
            approvedCreateVisible: false,

            adjustmentDetailVisible: false,
        
        };
    },
    created() {
        this.getExpanderProfit();
    },
    watch: {
        dateTimeArr(val) {
            if (val) {
                this.form.startMonth = val[0];
                this.form.endMonth = val[1];
            } else {
                this.form.startMonth = null;
                this.form.endMonth = null;
            }
        }
    },
    methods: {
        revokeHandle(row){
            this.$confirm('您确定要撤销该报表吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 expanderRevoke({
                     recordId:row.recordId
                 }).then(res=>{
                    if (res.data.code == 200) {
                        this.$message.success('撤销成功')
                        this.getExpanderProfit()
                    } else {
                        this.$message.error(res.data.errMsg);
                    }
                }).catch(e=>{
                    console.log(e)
                })
            }).catch(() => {
                    
            });
        },
        sendHandle(){
            this.$refs.send.validate(valid=>{
                if(valid){
                    const loading = this.$loading({
                        lock: true,
                        text: '加载中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    expanderSend(this.sendForm).then(res=>{
                        loading.close()
                        if (res.data.code == 0) {
                            this.sendVisible = false
                            this.$message.success('操作成功')
                            this.getExpanderProfit()
                        } else {
                            this.$message.error(res.data.errMsg);
                        }
                    }).catch(e=>{
                        console.log(e)
                        loading.close()
                    })
                }
            })
        },
        sendInput(row){
            this.sendVisible = true
            this.sendForm.recordId = row.recordId
        },
        toCreateExpanderDialog(){
            this.curRow = {},
            this.isDetail = 2 // 1.明细查看 2.核准记录选择
            // this.curRecordId = ''
            this.approvedCreateVisible = true
        },
        closeDialog(){
            this.approvedCreateForm = Object.assign({},this.originForm)
        },
        toChooseAdjustDetail(){
            this.adjustmentDetailVisible = true
            if(this.isDetail == 2){
                this.curAdjustRecordId = this.curRow.recordId
                this.date = ''
            }else{
                this.curAdjustRecordId = ''
            }
        },
        toChooseApprovedRecord(){
            this.approvedRecordVisible = true
            if(this.isDetail == 2){
                this.curApproveRecordId = this.curRow.recordId
                this.date = ''
            }else{
                this.curApproveRecordId = ''
            }
        },
        toAdjustDetail(row){
            this.curAdjustRecordId = row.recordId
            this.isDetail = 1 // 明细查看
            this.date = row.authorizeMonth
            this.adjustmentDetailVisible = true
        },
        toAuthorizeDetail(row){
            this.curApproveRecordId = row.recordId
            this.isDetail = 1 // 明细查看
            this.date = row.authorizeMonth
            this.approvedRecordVisible = true
        },
        formatterStatus(row){
            let item = this.taskStatusOps.find(v=>v.value == row.taskStatus)
            return item && item.label
        },
         formatterProfitStatus(row){
            let item = this.profitStatusOps.find(v=>v.value == row.profitStatus)
            return item && item.label
        },
        handleExpanderCreate(){
            if(!this.approvedCreateForm.authorizeMonth){
                this.$message.error('请选择月份')
                return
            }
            if(!this.approvedCreateForm.authorizeIds.length){
                this.$message.error('请选择核准记录')
                return
            }
            const loading = this.$loading({
                lock: true,
                text: "加载中，请稍后...",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            if(this.approvedCreateForm.recordId){
                expanderRemake(this.approvedCreateForm).then(res=>{
                    loading.close();
                    if (res.data.code == 0) {
                        this.approvedCreateVisible = false
                        this.$message.success('生成成功')
                        this.getExpanderProfit()
                    } else {
                        this.$message.error(res.data.errMsg);
                    }

                }).catch(e=>{
                    console.log(e)
                    loading.close();
                })
            }else{
                expanderCreate(this.approvedCreateForm).then(res=>{
                    loading.close();
                    if (res.data.code == 0) {
                        this.approvedCreateVisible = false
                        this.$message.success('生成成功')
                        this.getExpanderProfit()
                    } else {
                        this.$message.error(res.data.errMsg);
                    }

                }).catch(e=>{
                    console.log(e)
                    loading.close();
                }) 
            }
           
        },
        onSearch(){
            this.form.page = 1
            this.getExpanderProfit()
        },
        getExpanderProfit() {
            this.loading = true;
            expanderProfit(this.form)
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
        },

        repeatCreate(row) {
            this.curRow = row
            this.approvedCreateForm.authorizeMonth = row.authorizeMonth
            this.approvedCreateForm.recordId = row.recordId
            this.approvedCreateForm.remark = row.remark
            this.isDetail = 2 // 核准记录选择
            // this.curRecordId = row.recordId
            const params = {
                isDetail:1,
                isNoPage:1,
                recordId:row.recordId
            }
            const loading = this.$loading({
                lock: true,
                text: '加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([approveRecord(params),adjustList(params)]).then(res=>{
                loading.close();
                this.approvedCreateVisible = true
                this.approvedCreateForm.authorizeIds = res[0].data.extra.rows.map(v=>v.authorizeRecordId)
                this.approvedCreateForm.adjustIds = res[1].data.extra.rows.map(v=>v.id)
            }).catch(e=>{
                console.log(e)
                loading.close();
            })
        },
        handleSizeChange(val) {
            this.form.size = val;
            this.getExpanderProfit();
        },
        handleCurrentChange(val) {
            this.form.page = val;
            this.getExpanderProfit();
        },
        handleSelectionChange() {}
    }
};
</script>

<style scoped>
.table-page {
    margin: 20px 10px;
    text-align: right;
}
</style>
