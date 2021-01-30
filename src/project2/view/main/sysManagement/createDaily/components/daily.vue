<template>
    <div class="c-content-inner" style="margin-top:0">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="选择日期">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" >查询</el-button>
            </el-form-item>
        </el-form>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark"><i class="el-icon-info" style="color: cornflowerblue;"></i>系统每日凌晨自动生成前日日报，已生成<span style="color: cornflowerblue;">{{this.allExport}}</span>份</div></el-col>
        </el-row>
        <el-row style="margin-top: 20px">
            <el-col :span="24">
                <div>
                    <el-table
                        v-loading="isLoading"
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            label="序号"
                            prop="id">
                        </el-table-column>
                        <el-table-column
                            label="报表名称"
                            prop="buildDate"
                            :formatter="nameFormat"
                        >
                        </el-table-column>
                        <el-table-column
                            label="状态"
                            prop="state"
                        >
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top" v-if="scope.row.state === 2">
                                    <p>{{ scope.row.errorMessage }}</p>
                                    <div slot="reference" class="name-wrapper" style="color: #f00;">
                                       完全失败
                                    </div>
                                </el-popover>
                                <div v-if="scope.row.state === 0">进行中</div>
                                <div v-if="scope.row.state === 1">成功</div>
                                <div v-if="scope.row.state === 3">部分失败</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="生成时间"
                            prop="finishTime">
                        </el-table-column>
                        <el-table-column
                              label="描述"
                              prop="errorMessage">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    @click="handleGen(scope.$index, scope.row)" :disabled="scope.row.state === 0">重新生成</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block" style="margin-top: 20px;">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {
        allExport,
        repDaily,
        repDailyCreate
    } from '@/sercive/api/dailySercive'
    export default {
        name: "daily",
        data(){
            return {
                allExport: 0,
                isLoading: false,
                formInline: null,
                date: null,
                tableData:[],
                page: 1,
                size: 10,
                total: 0,
            }
        },
        mounted(){
            this.getList()
            this.getAllExport()
        },
        methods: {
            async getAllExport(){
                try {
                    let res = await allExport({})
                    this.allExport = res.data.extra.exportNumber || 0
                } catch (error) {
                    console.log("error")
                }
            },
            async getList(){
                this.isLoading = true
                let startDate = this.date && this.date[0] || ""
                let endDate = this.date && this.date[1] || ""
                try {
                    let params = {
                        startDate, 
                        endDate, 
                        page:this.page,
                        size:this.size
                    }
                    let res = await repDaily(params)
                    this.tableData = res.data.extra.rows || []
                    this.total =  res.data.extra.total || 0
                    this.isLoading = false
                } catch (error) {
                    console.log(error)
                }
            },
            nameFormat(row, col, cellValue, index){
                return cellValue.slice(0,10) + "日报"
            },
            stateFormat(row, col, cellValue, index){
                return cellValue === 0 ? "进行中" :  cellValue=== 1 ? "成功" : "失败"
            },
            onSubmit(){
                this.page = 1
                this.getList()
            },
            handleGen(index, row){
                this.$confirm('重新生成日报大概需要5分钟，你还需要继续吗？', '请确认是否重新生成日报', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    this.$message({
                        type: 'success',
                        message: '正在生成请耐心等待!'
                    });
                    row.state = 0
                    row.finishTime = ""
                    let  date =  row.buildDate.slice(0,10)
                    try {
                        let res = await repDailyCreate({date:date})
                        this.getList()
                    } catch (error) {
                        console.log("error", error)   
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消生成'
                    });
                });
            },
            handleSizeChange(val){
                this.size = val
                this.getList()
            },
            handleCurrentChange(val){
                this.page = val
                this.getList()
            }
        }
    }
</script>

<style>
    .el-table .cell{
        text-align: center;
    }
</style>
