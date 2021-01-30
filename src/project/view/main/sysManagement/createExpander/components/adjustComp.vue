<template>
    <div class="AdjustComp">
        <el-dialog
            width="80%"
            :title="date+'部门营收调整明细选择'"
            :visible.sync="visiable"
        >
            <el-form :model="form" label-width="80px" v-loading="loading">
                <el-row :gutter="24">
                    <el-col :span="8">
                        <el-form-item label="调整月份:">
                            <el-date-picker
                                v-model="dateTiemArr"
                                value-format="yyyy-MM"
                                type="monthrange"
                                range-separator="至"
                                start-placeholder="开始月份"
                                end-placeholder="结束月份"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="发放状态:">
                            <el-select
                                v-model="form.sendState"
                                placeholder="请选择"
                            >
                                <el-option
                                v-for="(item,idx) in sendStateOps"
                                :key="idx"
                                :label="item.label"
                                :value="item.value">
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
                @select="handleSelect"
                @selection-change="handleSelectionChange"
            >
                <el-table-column v-if="isDetail == 2" type="selection" width="55"></el-table-column>
                <el-table-column :formatter="formatterType" label="调整类型" align="center" prop="adjustType">
                </el-table-column>
                <el-table-column label="调整月份" align="center" prop="adjustMonth">
                </el-table-column>
                <el-table-column label="调整代号" align="center" prop="adjustNo">
                </el-table-column>
                <el-table-column
                    label="调整上传时间"
                    align="center"
                    prop="updateTime"
                >
                </el-table-column>
                <el-table-column label="所属报表" align="center" prop="belongTo">
                </el-table-column>
                <el-table-column :formatter="formatterStatus" label="发放状态" align="center" prop="sendState">
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
            <span slot="footer" class="dialog-footer">
                <el-button @click="visiable = false"
                    >取 消</el-button
                >
                <el-button
                    @click="onConfirm"
                    type="primary"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { adjustList } from "@/sercive/api/expanderService";
export default {
    name: "AdjustComp",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        recordId:{
            type:[String,Number],
            default:''
        },
        adjustIds:{
            type:Array,
            default:()=>[]
        },
        isDetail:{ //1.明细查看 2.核准记录选择
            type:Number,
            default:1
        },
        date:{
            type:[String,Number],
            default:'' 
        }
    },
    data() {
        return {
            visiable:false,
            loading:false,
            sendStateOps:[
                {label:'已发放',value:1},
                {label:'未发放',value:2},
            ],
            form: {
                page:1,
                size:5,
                sendState:'',
                startMonth:'',
                endMonth:'',
                recordId:'',
                isDetail:2,
                isNoPage:0 // 分页
            },
            total:0,
            tableData: [],
            dateTiemArr:[],
            multipleSelection:[]
        };
    },
    watch:{
        dateTiemArr(val){
            if(val){
                this.form.startMonth = val[0]
                this.form.endMonth = val[1]
            }else{
                this.form.startMonth = null
                this.form.endMonth = null
            }
        },
        recordId(val){
            this.form.recordId = val
            this.form.isDetail = this.isDetail
            this.getAdjustList()
        },
        show(val){
            this.visiable = val
        },
        visiable(val){
            this.$emit('update:show',val)
        },
        adjustIds(val){
            val.forEach(v => {
                if (!this.multipleSelection.includes(v)) {
                    this.multipleSelection.push(v) // 添加
                }
            })
        }
    },
    created(){
        this.getAdjustList()
    },
    methods: {
        onConfirm(){
            this.$emit('update:adjustIds',this.multipleSelection)
            this.$emit('update:show',false)
        },
        formatterStatus(row){
            const item = this.sendStateOps.find(v=>v.value = row.sendState)
            return item.label
        },
        formatterType(row){
            const mapType = {
                1:'部门营收',
                2:'代理商分润',
                3:'拓展人提成'
            }
            return mapType[row.adjustType]
        },
        getAdjustList(){
            this.loading = true;
            adjustList(this.form)
                .then(res => {
                    this.loading = false;
                    if (res.data.code == 0 && res.data.extra) {
                        this.tableData = res.data.extra.rows;
                            // 分页如果当前页为选中状态，设置当前行选中
                        this.$nextTick(() => {
                            this.tableData.forEach(item => {
                                if (this.multipleSelection.includes(item.id)) {
                                    this.$refs['multipleTable'].toggleRowSelection(item)
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
        },
        handleSizeChange(val) {
            this.form.size = val;
            this.getAdjustList();
        },
        handleCurrentChange(val) {
            this.form.page = val;
            this.getAdjustList();
        },
        handleSelectionChange(rows) {
            rows.forEach(row => {
                if (!this.multipleSelection.includes(row.id)) {
                    this.multipleSelection.push(row.id)
                }
            })
        },
        handleSelect(selection,row){
            this.multipleSelection = this.multipleSelection.filter(v => v != row.id)
        }
    }
};
</script>

<style scoped>
.table-page{
    margin: 20px 10px;
    text-align: right;
}
</style>
