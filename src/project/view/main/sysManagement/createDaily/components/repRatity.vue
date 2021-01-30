<template>
    <div class="c-content-inner" style="margin-top:0">
        <el-form :inline="true" :model="approvalForm">
            <!-- <el-form-item label="报表系统">
                <el-checkbox-group v-model="typeList">
                    <el-checkbox label="日报"></el-checkbox>
                    <el-checkbox label="代理商分润"></el-checkbox>
                </el-checkbox-group>
            </el-form-item> -->
            <el-form-item label="年份" style="margin-left:20px">
                <el-date-picker
                    style="width:200px;"
                    v-model="approvalForm.buildYear"
                    value-format="yyyy-MM-dd"
                    type="year"
                    placeholder="选择年份"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="生成状态" style="margin-left:20px">
                <el-select
                    clearable
                    v-model="approvalForm.status"
                    placeholder="请选择生成状态"
                >
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option label="生成中" :value="0"></el-option>
                    <el-option label="已生成" :value="1"></el-option>
                    <el-option label="失败" :value="2"></el-option>
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
                        :data="ratityList"
                        style="width: 100%;text-align:center"
                    >
                        <el-table-column label="序号" width="100" prop="id">
                        </el-table-column>
                        <!-- <el-table-column
                            label="报表类型"
                            :formatter="typeFormat"
                            prop="type"
                        >
                        </el-table-column> -->
                        <el-table-column
                            label="年份"
                            prop="buildYear"
                        ></el-table-column>
                        <el-table-column
                            label="生成状态"
                            :formatter="statusFormat"
                            prop="state"
                        ></el-table-column>
                        <el-table-column label="生成时间" prop="finishTime">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="repeatCreate(scope.row)">重新选择生成</el-button>
                                <el-button type="text" @click="revokeHandle(scope.row)">撤销</el-button>
                                <el-button type="text" @click="toApprovalRecord(scope.row)">核准记录查看</el-button>
                                <el-button type="text" @click="toAdjustRecord(scope.row)">调整明细查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block" style="margin-top: 20px;">
                    <el-pagination
                        @size-change="rHandleAgentSizeChange"
                        @current-change="rHandleAgentCurrentChange"
                        :current-page="rPage"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="rSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="rTotal"
                    >
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
        <!-- 弹框 -->
        <el-dialog
            :title="'核准生成'"
            :visible.sync="dialogFormVisible"
            width="680px"
            :before-close="clearData"
        >
        <el-alert
            style="margin-bottom:22px"
            title="生成整年的核准报表"
            type="info">
        </el-alert>
            <el-form :inline="true" :model="dialogForm">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="年份:" style="margin-left:20px">
                            <el-date-picker
                                style="width:200px;"
                                v-model="dialogForm.buildYear"
                                value-format="yyyy"
                                type="year"
                                placeholder="选择年份"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-button @click="chooseAdjust">选择调整明细</el-button>
                        <span>{{dialogForm.adjustNo.length==0?'未选择':'已选择'+dialogForm.adjustNo.length+'条'}}</span>
                    </el-col>
                </el-row>
        
                <!-- <el-form-item label="调整明细:" style="margin-left:20px">
                    <el-select clearable v-model="dialogForm.tiaozheng" placeholder="请选择调整明细">
                        <el-option label="已调整" value="0"></el-option>
                        <el-option label="未调整" value="1"></el-option>
                    </el-select>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="clearData">取 消</el-button>
                <el-button type="primary" @click="ratityAdd">确 定</el-button>
            </div>
        </el-dialog>
        <select-adjust ref="selAdjust" :apiFn="apiFn" :mode="mode" :adjustIds.sync="dialogForm.adjustNo" :show.sync="adjustCompVisible"></select-adjust>
        <select-approve ref="selApprove" :show.sync="approveCompVisible"></select-approve>
        
    </div>
</template>

<script>
// import { selectAdjustUpload,anewSelect,findAdjustment } from "@/sercive/api/dailySercive";
import { repRatity, ratityAdd, anewSelect,deleteRecord,selectAdjustUpload,findAdjustment  } from "@/sercive/api/dailySercive";
import selectAdjust from '@/view/main/sysManagement/createDaily/components/selectAdjust.vue'
import selectApprove from '@/view/main/sysManagement/createDaily/components/selectApprove.vue'
import moment from "moment";
export default {
    name: "daily",
    components:{
        selectAdjust,
        selectApprove
    },
    data() {
        return {
            apiFn:selectAdjustUpload,
            approveCompVisible:false,
            curAuthBuildYear:'',
            mode:'selectAll',
            rPage: 1,
            rSize: 10,
            rTotal: 0,
            typeList: [],
            approvalForm: {
                status: undefined,
                buildYear: null
            },
            risLoading: false,
            ratityList: [],
            // 弹框
            dialogFormVisible: false,
            dialogForm: {
                buildYear: null,
                adjustNo:[],
                types:['0']
                // types: ""
                // tiaozheng: null
            },
            adjustCompVisible:false,
            // adjustForm:{
            //     buildYear:'',
            //     adjustNo:[]
            // }
        };
    },
    mounted() {
        this.getRatityList();
    },
    methods: {
        chooseAdjust(){
            this.adjustCompVisible = true
            if(this.mode != 'reSelect'){
                this.mode = 'selectAll'
                this.apiFn = selectAdjustUpload
                this.$refs.selAdjust.form = this.$refs.selAdjust.$options.data().form
                this.$refs.selAdjust.form.pageNum = 1
                this.$refs.selAdjust.form.pageSize = 5
                this.$refs.selAdjust.form.adjustType = 1
                this.$refs.selAdjust.form.selectType = 1
                this.$nextTick(()=>{
                    this.$refs.selAdjust.onSearch()
                })
            }
        },
        toAdjustRecord(row){
            this.mode = 'detail'
            this.adjustCompVisible = true
            this.apiFn = findAdjustment
            this.$nextTick(()=>{
                this.$refs.selAdjust.form = this.$refs.selAdjust.$options.data().form
                this.$refs.selAdjust.form.buildYear = row.buildYear
                this.$refs.selAdjust.form.pageNo = 1
                this.$refs.selAdjust.form.pageSize = 5
                this.$refs.selAdjust.onSearch()
            })
        },
        toApprovalRecord(row){
            this.approveCompVisible = true
            this.$refs.selApprove.form.buildYear = row.buildYear
            this.$refs.selApprove.onSearch()
        },
         revokeHandle(row){
            this.$confirm('您确定要撤销该记录吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 deleteRecord({
                    buildYear:row.buildYear,
                    status:row.state
                 }).then(res=>{
                    if (res.data.code == 0) {
                        this.$message.success('撤销成功')
                        this.getRatityList()
                    } else {
                        this.$message.error(res.data.errMsg);
                    }
                }).catch(e=>{
                    console.log(e)
                })
            }).catch(() => {
                    
            });
        },
        
        repeatCreate(row){
            this.dialogFormVisible = true
            this.mode = 'reSelect'
            this.$refs.selAdjust.form = this.$refs.selAdjust.$options.data().form
            this.$refs.selAdjust.form.buildYear = row.buildYear
            this.$refs.selAdjust.form.page = 1
            this.$refs.selAdjust.form.size = 5
            this.apiFn = anewSelect
            anewSelect({
                buildYear:row.buildYear
            }).then(res=>{
                if (res.data.code == 0 && res.data.extra) {
                    this.dialogForm.adjustNo = res.data.extra.occupy.map(v=>v.adjustNo);
                    this.$nextTick(()=>{
                        this.$refs.selAdjust.onSearch()
                    })
                } else {
                    this.$message.error(res.data.errMsg);
                }
            }).catch(e=>{
                console.log(e)
            })
        },
        statusFormat(row, col, cellValue, index) {
            let obj = {
                undefined: "全部",
                1: "已生成",
                0: "生成中",
                2: "失败"
            };
            return obj[cellValue];
        },
        typeFormat(row, col, cellValue, index) {
            return +cellValue === 1 ? "代理商分润" : "日报";
        },
        async getRatityList() {
            let { buildYear, status } = this.approvalForm;
            this.risLoading = true;
            let params = {
                buildYear,
                types: ["0"],
                status
            };
            console.log("buildYear", params.buildYear);
            try {
                let res = await repRatity(params);
                this.ratityList = res.data.extra.rows;
                this.rTotal = res.data.extra.total || 0;
                this.risLoading = false;
            } catch (error) {
                console.log(error);
            }
        },
        /* =============== 用户点击操作 ==============*/
        rHandleAgentSizeChange(val) {
            this.rSize = val;
            this.getRatityList();
        },
        rHandleAgentCurrentChange(val) {
            this.rPage = val;
            this.getRatityList();
        },
        search() {
            let { buildYear } = this.approvalForm;
            this.dialogForm.buildYear = buildYear;
            this.getRatityList();
        },
        /* =============== 弹框 ==============*/
        showRatityAdd() {
            this.mode = 'selectAll'
            this.dialogFormVisible = true;
        },
        async ratityAdd() {
            if(!this.dialogForm.buildYear){
                this.$message.error('请选择年份')
                return
            }
            if(!this.dialogForm.adjustNo.length){
                this.$message.error('请选择核准记录')
                return
            }
            const loading = this.$loading({
                lock: true,
                text: "加载中，请稍后...",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            ratityAdd(this.dialogForm).then(res=>{
                loading.close();
                if (res.data.code == 0) {
                    this.dialogFormVisible = false
                    this.$message.success('生成成功')
                    this.getRatityList()
                } else {
                    this.$message.error(res.data.errMsg);
                }
            }).catch(e=>{
                console.log(e)
                loading.close();
            })
        },
        clearData() {
            this.dialogForm.buildYear = null;
            this.dialogFormVisible = false;
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
