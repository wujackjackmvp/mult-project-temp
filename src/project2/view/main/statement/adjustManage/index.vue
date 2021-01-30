<template>
    <div class="c-content-inner">
        <el-form ref="form" :model="form" label-width="80px">
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="调整类型:">
                        <el-select v-model="form.adjustType" placeholder="请选择">
                            <el-option
                                v-for="item in adjustTypeOps"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="调整月份:" prop="">
                        <el-date-picker
                            v-model="monthArr"
                            type="monthrange"
                            value-format="yyyy-MM"
                            range-separator="至"
                            start-placeholder="开始月份"
                            end-placeholder="结束月份"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="发放状态:">
                        <el-select v-model="form.sendState" placeholder="请选择">
                            <el-option
                                v-for="item in statusOps"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button type="success" @click="adjustVisible = true"
                    >调整上传</el-button
                >
            </el-row>
        </el-form>
        <el-table :data="tableData" style="width: 100%;" v-loading="loading">
            <el-table-column
                align="center"
                prop="adjustType"
                :formatter="formatterAdjustType"
                label="调整类型"
            ></el-table-column>
            <el-table-column
                align="center"
                prop="adjustMonth"
                label="调整月份"
            ></el-table-column>
            <el-table-column
                align="center"
                prop="adjustNo"
                label="调整代号"
            ></el-table-column>
            <el-table-column
                align="center"
                prop="createTime"
                label="调整上传时间"
            ></el-table-column>
            <el-table-column
                align="center"
                prop="belongTo"
                label="所属报表"
            ></el-table-column>
            <el-table-column
                align="center"
                prop="sendState"
                :formatter="formatterStatus"
                label="发放状态"
            ></el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" :disabled="scope.row.sendState == 1" @click="toCancel(scope.row)"
                        >撤销</el-button
                    >
                    <el-button type="text" @click="toDownloadDetail(scope.row)">下载调整明细</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="table-page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.pageNum"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="form.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
        <el-dialog title="调整上传" :visible.sync="adjustVisible">
            <el-alert
                title="请先选择需要调整的类型和月份，再上传文件"
                style="margin-bottom:10px"
                type="info"
                show-icon>
            </el-alert>
            <el-form :model="adjustForm" ref="adjustUploadForm" :rules="adjustFormRules"  label-width="120px">
                <el-form-item label="调整类型:">
                    <el-radio-group v-model="adjustForm.adjustType">
                        <el-radio
                            v-for="item in adjustTypeOps"
                            :key="item.value"
                            :label="item.value"
                        >{{item.label}}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="选择月份:" prop="month">
                    <el-date-picker
                        v-model="adjustForm.month"
                        type="month"
                        value-format="yyyy-MM"
                        placeholder="选择月"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="上传:">
                    <el-upload
                        :headers="{ token: access_token }"
                        :action="uploadExcelUrl"
                        class="upload-demo"
                        ref="upload"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                        :show-file-list="false"
                        :on-success="dataUploadSuccess"
                        accept=".csv ,.xlsx, .xls"
                        :on-error="onError"
                        :data="adjustForm"
                    >
                        <el-button size="small" type="primary"
                            >点击上传</el-button
                        >
                        <div slot="tip" class="el-upload__tip" style="line-height: 20px;">
                            支持扩展名：.csv .xlsx .xls
                            <br>
                            <el-link type="primary" :href="`../../../../static/excel/${downLoadName}.xlsx`">模板下载</el-link>
                        </div>
                    </el-upload>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {adjustList,downloadAdjust,cancelAdjust,adjustUpload} from '@/sercive/api/adjustService'
import $config from "@/config";
export default {
    name: "AdjustManage",
    data() {
        return {
            uploadExcelUrl:
                $config.reportBaseUrl +
                "/v3/adjustUpload/adjustUploadFile",
            access_token: this.$ls.get("access_token"),
            actionUrl:'',
            monthArr:[],
            adjustTypeOps:[
                {label:'部门营收',value:1},
                {label:'代理商分润',value:2},
                {label:'拓展人提成',value:3},
            ],
            statusOps:[
                {label:'已发放',value:1},
                {label:'未发放',value:2},
            ],
            form: {
                adjustType:'',
                adjustMonthStart:'',
                adjustMonthEnd:'',
                sendState:'',
                pageNum:1,
                pageSize:10,
            },
            tableData: [],
            loading: false,
            pageNo: 1,
            pageSize: 10,
            total: 0,
            adjustVisible: false,
            adjustForm: {
                adjustType:1,
                month:'',
                // file:''
            },
            adjustFormRules: {
                month: [{ required: true, message: '请选月份',trigger: 'change' }],
                // file:[{required:true,message:'请选择上传文件',trigger: 'change'}]
            },
            fileList: []
        };
    },
    computed:{
        downLoadName(){
            const map = {
                1:'部门营收调整明细表',
                2:'代理商分润调整明细表',
                3:'移动支付提成调整明细表',
            }
            return map[this.adjustForm.adjustType]
        }
    },
    watch:{
        monthArr(val){
            if(val){
                this.form.adjustMonthStart = val[0]
                this.form.adjustMonthEnd = val[1]
            }else{
                this.form.adjustMonthStart = null
                this.form.adjustMonthEnd = null
            }
        }
    },
    created(){
        this.getAdjustList()
    },
    methods: {
        onSearch(){
            this.form.pageNum = 1
            this.getAdjustList()
        },
        formatterStatus(row){
            const map = {
                1:'已发放',
                2:'未发放',
            }
            return map[row.sendState]
        },
        formatterAdjustType(row){
            const map = {
                1:'部门营收',
                2:'代理商分润',
                3:'拓展人提成'
            }
            return map[row.adjustType]
        },
        getAdjustList(){
            this.loading = true
            adjustList(this.form).then(res=>{
                this.loading = false
                if(res.data.code == 0 && res.data.extra){
                    this.tableData = res.data.extra.row
                    this.total = res.data.extra.total
                }else{
                    this.$message.error(this.data.errMsg)
                }
            }).catch(e=>{
                this.loading = false
            })
        },
        toDownloadDetail(row){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            downloadAdjust({adjustNo:row.adjustNo}).then(res=>{
                loading.close()
                if(res.data.code == 0){
                    this.$message({
                        message:'操作成功，请到下载列表统一下载',
                        type:'success'
                    })
                    // this.getAdjustList()
                }else{
                    this.$message({
                        message:res.data.errMsg,
                        type:'error'
                    })
                }
            }).catch(e=>{
                console.log(e)
                 loading.close()
            })
        },
        toCancel(row) {
              this.$confirm('您确定要删除该拓展人配置吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    cancelAdjust({adjustNo:row.adjustNo}).then(res=>{
                        loading.close()
                        if(res.data.code == 0){
                            this.$message({
                                message:res.data.errMsg,
                                type:'success'
                            })
                            this.getAdjustList()
                        }else{
                            this.$message({
                                message:res.data.errMsg,
                                type:'error'
                            })
                        }
                    }).catch(e=>{
                        loading.close()
                    })
                }).catch(()=>{})
        },
        handleSizeChange(val) {
            this.form.pageSize = val;
            this.getAdjustList();
        },
        onError(res) {
            this.$message({
                type: "error",
                message: "上传失败，重新上传"
            });
        },
        handleCurrentChange(val) {
            this.form.pageNum = val;
            this.getAdjustList();
        },
        dataUploadSuccess(res) {
            if (res.code === 0) {
                this.$message.success("上传成功！");
                this.adjustVisible = false
                this.getAdjustList()
            } else {
                this.$message.error(res.errMsg);
            }
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        beforeUpload(file){
            console.log(123)
            const reg = /\.(?:xls|xlsx|csv)$/
            if (!reg.test(file.name)) {
                this.$message.error("文件格式不合法！");
                return false
            }
            const {month} = this.adjustForm
            if(!month){
                this.$message.error("请选择月份");
                return false
            }
            return true
        }
    }
};
</script>

<style scoped>
.table-page {
    margin: 20px 10px;
    text-align: right;
}
</style>
