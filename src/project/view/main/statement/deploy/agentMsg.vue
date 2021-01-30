<template>
    <div class="c-content-inner">
         <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="代理商编号">
                <el-input style="width:200px"  v-model="formInline.agentId" placeholder="请输入代理商编号"></el-input>
            </el-form-item>
            <el-form-item label="代理商名称">
                <el-input style="width:230px" v-model="formInline.agentName" placeholder="请输入代理商名称"></el-input>
            </el-form-item>
            <el-form-item label="代理状态" placeholder="请选择代理状态">
                <el-select style="width:120px" v-model="formInline.state">
                    <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" >查询</el-button>
                <el-button :loading="syncIng" type="primary" @click="synchAgent" >同步</el-button>
            </el-form-item>
        </el-form>
        <el-row style="margin-top: 20px">
            <el-col :span="24">
                <div>
                    <el-table
                        v-loading="isLoading"
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            label="代理商编号"
                            prop="agentId">
                        </el-table-column>
                        <el-table-column
                            label="代理商名称"
                            prop="agentName"
                        >
                        </el-table-column>
                        <el-table-column
                            label="拓展人"
                            prop="agentExpandName"
                        ></el-table-column>
                        <el-table-column
                            label="移动支付扫码费率"
                            width="180px"
                        >
                            <template slot-scope="scope">
                                <div
                                class="rate-tags"
                                >
                                    <div
                                        style="color: #67c23a"
                                        v-if="scope.row.t1WeixxinRate !== null"
                                    >{{scope.row.t1WeixxinRate}}(微信)</div>
                                    <div
                                        style="color: #409EFF"
                                        v-if="scope.row.t1AlipayRate !== null"
                                    >{{scope.row.t1AlipayRate}}(支付宝)</div>
                                    <!-- <span
                                        style="color: #e6a23c"
                                        v-if="scope.row.specialRate !== null"
                                    >{{scope.row.specialRate}}(特殊)</span>
                                    <span
                                        style="color: #f56c6c"
                                        v-if="scope.row.cardRate !== null && formInline.bizType === '1'"
                                    >{{scope.row.cardRate}}(刷卡)</span> -->
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="移动支付特殊分润比例"
                            prop="specialRate"
                            width="180px"
                        > 
                        </el-table-column>
                        <el-table-column
                            label="刷卡分润比例"
                            prop="cardRate"
                        ></el-table-column>
                        <el-table-column
                            label="代理状态"
                            prop="state"
                            :formatter="stateFormat"
                        ></el-table-column>
                    </el-table>
                </div>
                <div class="block" style="margin-top: 20px;">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNo"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "daily",
        data(){
            return {
                syncIng: false,
                isLoading: false,
                formInline: {
                    agentId: '',
                    agentName: '',
                    state: undefined,
                },
                tableData:[],
                pageNo: 1,
                pageSize: 10,
                total: 0,
                statusList: [
                    {'label': '全部', "value": null},
                    {'label': '已解约', "value": 3},
                    {'label': '正常', "value": 0}
                ],
                apiList:{
                    synchAgent: this.api.statement.synchAgent,
                    pageAgent: this.api.statement.pageAgent
                }
            }
        },
        mounted(){
            this.getList()
        },
        methods: {
            stateFormat(row, col, cellValue, index){
                let stateObj = {
                    0: '正常',
                    1: '冻结',
                    2: '删除',
                    3: '已解约',
                }
                return stateObj[cellValue]
            },
            async getList(){
                let {pageNo, pageSize} = this
                let {agentId, agentName, state} = this.formInline
                this.isLoading = true
                let res = await this.ajax.commonApi2("post","JSON",this.apiList.pageAgent,{
                    agentId, 
                    agentName, 
                    state,
                    pageNo,
                    pageSize
                })
                this.tableData = res.data.extra.rows || []
                this.total =  res.data.extra.total || 0
                this.isLoading = false
            },
            async synchAgent(){
                this.syncIng = true
                let res = await this.ajax.commonApi2("get","JSON",this.apiList.synchAgent)
                res.data.errMsg === '成功' ? this.showMsg('success', '同步成功!') : this.showMsg('error', '同步失败!')
                this.syncIng = false
                this.getList()
            },
            onSubmit(){
                this.getList()
            },
            handleSizeChange(val){
                this.pageSize = val
                this.getList()
            },
            handleCurrentChange(val){
                this.pageNo = val
                this.getList()
            },
            showMsg(type, message){
                this.$message({
                    type,
                    message
                });
            }
        }
    }
</script>

<style>
    .el-table .cell{
        text-align: center;
    }
</style>
