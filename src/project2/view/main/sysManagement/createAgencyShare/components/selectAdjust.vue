<template>
    <div>
        <el-dialog
            width="80%"
            :title="`${form.agentDate||''}代理商分润调整明细选择`"
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
                    <el-col :span="8" v-show="mode == 'detail'">
                        <el-form-item label="发放状态:">
                            <el-select
                                v-model="form.sendState"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="(item, idx) in sendStateOps"
                                    :key="idx"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-button type="primary" @click="onSearch">查询</el-button>
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
                <el-table-column v-if="mode != 'detail'" type="selection" width="55"></el-table-column>
                <el-table-column
                    :formatter="formatterType"
                    label="调整类型"
                    align="center"
                    prop="adjustType"
                >
                </el-table-column>
                <el-table-column
                    label="调整月份"
                    align="center"
                    prop="adjustMonth"
                >
                </el-table-column>
                <el-table-column
                    label="调整代号"
                    align="center"
                    prop="adjustNo"
                >
                </el-table-column>
                <el-table-column
                    label="调整上传时间"
                    align="center"
                    prop="updateTime"
                >
                </el-table-column>
                <el-table-column
                    label="所属报表"
                    align="center"
                    prop="belongTo"
                >
                </el-table-column>
                <el-table-column
                    :formatter="formatterStatus"
                    label="发放状态"
                    align="center"
                    prop="sendState"
                >
                </el-table-column>
            </el-table>
            <div class="table-page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="form.pageSize"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="form.pageNum"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                >
                </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visiable = false">取 消</el-button>
                <el-button @click="onConfirm" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props:{
        show: {
            type: Boolean,
            default: false
        },
        adjustIds:{
            type:Array,
            default:()=>[]
        },
        mode:{
            type:String,
            default:'selectAll' // 三种模式，生成核准选择调整明细：selectAll；重新生成选择调整明细：reSelect；查看调整明细详情：detail
        },
        apiFn:{
            type:Function,
            default:function(){}
        }
    },
    data() {
        return {
            visiable:false,
            form: {
                pageNum: 1,
                pageSize: 5,
            },
            total:0,
            loading: false,
            dateTiemArr: [],
            sendStateOps: [
                { label: "已发放", value: 1 },
                { label: "未发放", value: 2 }
            ],
            tableData: [],
            multipleSelection:[]
        };
    },
    watch: {
        dateTiemArr(val) {
            if (val) {
                this.form.startDate = val[0];
                this.form.endDate = val[1];
            } else {
                this.form.startDate = null;
                this.form.endDate = null;
            }
        },
        show(val){
            this.visiable = val
        },
        visiable(val){
            this.$emit('update:show',val)
        },
        adjustIds(val){
            this.multipleSelection = JSON.parse(JSON.stringify(val))
        }
    },
    methods: {
        onSearch(){
            this.form.pageNum = 1
            this.getSelectAdjustUpload()
        },
        getSelectAdjustUpload() {
            this.loading = true;
            this.apiFn(this.form)
                .then(res => {
                    this.loading = false;
                    if (res.data.code == 0 && res.data.extra) {
                        if(this.mode == 'detail'){
                            this.tableData = res.data.extra.rows;
                        }else {
                            this.tableData = res.data.extra.row;
                        }
                        // 分页如果当前页为选中状态，设置当前行选中
                        if(this.mode == 'reSelect'){
                            this.$nextTick(() => {
                                this.tableData.forEach(item => {
                                    if (this.multipleSelection.includes(item.adjustNo)) {
                                        this.$refs["multipleTable"] && this.$refs["multipleTable"].toggleRowSelection(item);
                                    }
                                });
                            });
                        }
                     
                        this.total = res.data.extra.total;
                    } else {
                        this.$message.error(res.data.errMsg);
                    }
                })
                .catch(e => {
                    this.loading = false;
                });
        },
        formatterStatus(row) {
            const item = this.sendStateOps.find(v => v.value == row.sendState);
            return item.label;
        },
        formatterType(row) {
            const mapType = {
                1: "部门营收",
                2: "代理商分润",
                3: "拓展人提成"
            };
            return mapType[row.adjustType];
        },
        onConfirm() {
            this.$emit("update:adjustIds", this.multipleSelection);
            this.$emit("update:show", false);
            this.$emit('confirm')
        },
        handleSizeChange(val) {
            this.form.pageSize = val;
            this.getSelectAdjustUpload();
        },
        handleCurrentChange(val) {
            this.form.pageNum = val;
            this.getSelectAdjustUpload();
        },
        handleSelectionChange(rows) {
            rows.forEach(row => {
                if (!this.multipleSelection.includes(row.adjustNo)) {
                    this.multipleSelection.push(row.adjustNo);
                }
            });
        },
        handleSelect(selection,row){
            this.multipleSelection = this.multipleSelection.filter(v => v != row.adjustNo)
        },
    }
};
</script>

<style scoped></style>
