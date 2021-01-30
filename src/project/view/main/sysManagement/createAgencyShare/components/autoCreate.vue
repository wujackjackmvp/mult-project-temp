<template>
    <div class="c-content-inner">
         <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="选择报表日期">
                <el-date-picker
                    v-model="formInline.dataTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"  format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="生成状态" placeholder="请选择生成状态">
                <el-select clearable v-model="formInline.createState">
                    <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="自动推送状态" placeholder="请选择自动推送状态">
                <el-select clearable v-model="formInline.sendState">
                    <el-option
                        v-for="item in sendList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" >查询</el-button>
            </el-form-item>
        </el-form>
        <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark flex-s" style="background-color: rgb(236, 245, 255);padding:10px">
                <i class="el-icon-info" style="color: cornflowerblue;font-size:30px;margin-right: 10px"></i>
                <div>
                    <div class="flex-s" style="color:rgb(83, 168, 255);font-size:14px">
                        系统每日凌晨自动生成日报，已生成报表 <span style="color: #f56c6c;margin:0 10px"> {{this.allExport}} </span> 份
                    </div>
                    <div class="flex-s" style="color:rgb(83, 168, 255);font-size:14px">生成成功后自动将测算数据推送代理商系统进行测算，实际分润值需要财务手工推送</div>
                </div>
              </div>
            </el-col>
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
                            width="60"
                            prop="id">
                        </el-table-column>
                        <el-table-column
                            label="报表名称"
                            prop="buildDate"
                            :formatter="nameFormat"
                        >
                        </el-table-column>
                        <el-table-column
                            width="120"
                            label="估算生成状态"
                            prop="preState"
                        >
                            <template slot-scope="scope">
                                <el-tag :type="preStateClass(scope.row.preState)">{{preStateFormat(scope.row.preState)}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="估算生成时间"
                            prop="preFinishTimeS"
                        ></el-table-column>
                        <el-table-column
                            label="系统推送状态"
                            prop="preSendAgent"
                        >
                            <template slot-scope="scope">
                                 <el-tag :type="sendStateClass(scope.row.preSendAgent)">{{sendAgentFormat(scope.row.preSendAgent)}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="系统推送时间"
                            prop="autoSendAgentTimeS"
                        ></el-table-column>
                        <!-- slot-scope="scope" -->
                                    <!-- @click="handleCheck(scope.$index, scope.row)" :disabled="scope.row.state !== 1">查看</el-button> -->
                          <el-table-column label="操作" width="320">
                            <template slot-scope="scope">
                                <!-- <el-button
                                    size="mini" @click.native="jumpDetail(scope.row)">查看
                                </el-button> -->
                                <el-button
                                    :disabled="scope.row.preState !== 1 ? 'disabled' : false"
                                    type="text"
                                    @click.native="createReqProfit(scope.row)">估算重新生成
                                </el-button>
                                <el-button
                                    :disabled="scope.row.preState !== 1 ? 'disabled' : false"
                                    type="text" @click.native="sendReqProfit(scope.row)">系统重新推送
                                </el-button>
                                <el-button
                                    type="text" @click="toAdjust(scope.row)">调整
                                </el-button>
                                <el-button
                                    type="text" @click="toAdjustDetail(scope.row)">调整明细查看
                                </el-button>
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
        <select-adjust ref="selAdjust" @confirm="adjustConfirm" :adjustIds.sync="adjsutForm.adjustNo" :apiFn="adjustFn" :mode="mode" :show.sync="adjustCompVisible"></select-adjust>
    </div>
</template>

<script>
    import { repAgentProfit, repAgentProfitList, repAgentProfitCreate, reSend,selectAdjustUploadAgent,findAdjustment,adjustDetermine} from '@/sercive/api/agencySercive'
    import selectAdjust from './selectAdjust'
    
    export default {
        name: "daily",
        components:{
            selectAdjust
        },
        data(){
            return {
                adjustFn:function(){},
                mode:'selectAll',
                adjustCompVisible:false,
                allExport: 0,
                isLoading: false,
                formInline: {
                    agentId: '',
                    agentName: '',
                    createState: null,
                    sendState: null,
                    endDate: '',
                    startDate: '',
                    dataTime: ''
                },
                tableData:[],
                page: 1,
                size: 10,
                total: 0,
                count: 0,
                statusList: [
                    {'label': '全部', "value": null},
                    {'label': '进行中', "value": 0},
                    {'label': '成功', "value": 1},
                    {'label': '失败', "value": 2}
                ],
                sendList: [
                    {'label': '全部', "value": null},
                    {'label': '未推送', "value": 0},
                    {'label': '已推送', "value": 1}
                ],
                apiList:{
                    getReqProfit: this.api.shareProfit.getReqProfit,
                    createReqProfit: this.api.shareProfit.createReqProfit,
                    sendReqProfit: this.api.shareProfit.sendReqProfit,
                    repAgentProfitCount: this.api.shareProfit.repAgentProfitCount
                },
                adjsutForm:{
                    adjustNo:[],
                    date:''
                }
            }
        },
        mounted(){
            this.repAgentProfitCount()
            this.getReqProfit()
        },
        methods: {
            adjustConfirm(){
                const loading = this.$loading({
                        lock: true,
                        text: '加载中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                adjustDetermine(this.adjsutForm).then(res=>{
                    loading.close()
                    if (res.data.code == 0) {
                        this.$message.success('操作成功')
                        this.getReqProfit()
                    } else {
                        this.$message.error(res.data.errMsg);
                    }
                }).catch(e=>{
                     loading.close()
                    console.log(e)
                })
            },
            toAdjust(row){
                this.adjustCompVisible = true
                this.mode = 'reSelect'
                this.adjustFn = selectAdjustUploadAgent
                this.$refs.selAdjust.form = this.$refs.selAdjust.$options.data().form
                this.$refs.selAdjust.form.agentDate = row.buildDate
                this.adjsutForm.date = row.buildDate
                selectAdjustUploadAgent({
                    agentDate: row.buildDate
                }).then(res=>{
                     if (res.data.code == 0) {
                        this.adjsutForm.adjustNo = res.data.extra.occupy.map(v=>v.adjustNo)
                        this.$refs.selAdjust.onSearch()
                     }else{
                        this.$message.error(res.data.errMsg);
                     }
                }).catch(e=>{
                    console.log(e)
                })
            },
            toAdjustDetail(row){
                this.adjustCompVisible = true
                this.adjustFn = findAdjustment
                this.mode = 'detail'
                this.$refs.selAdjust.form = this.$refs.selAdjust.$options.data().form
                this.$refs.selAdjust.form.agentDate = row.buildDate
                this.$nextTick(()=>{
                    this.$refs.selAdjust.onSearch()
                })
            },
            async repAgentProfitCount(){
                try {
                    let res = await repAgentProfit()
                    this.allExport = res.data.extra.count
                } catch (error) {
                    console.log(error)
                }
            },
            async getReqProfit(){
                this.isLoading = true
                let { page, size } = this
                let { date, createState, sendState, endDate, startDate, dataTime  } = this.formInline
                if(dataTime){
                    startDate = dataTime[0]
                    endDate = dataTime[1]
                } else{
                    startDate = null
                    endDate = null
                }
                try {
                    let res = await repAgentProfitList({
                        startDate,
                        endDate,
                        createState,
                        sendState,
                        page,
                        size
                    })
                    this.tableData = res.data.extra.rows || []
                    this.total =  res.data.extra.total || 0
                    this.isLoading = false
                } catch (error) {
                    console.log(error)
                }
            },
            createReqProfit(item){
                if(+item.preState !== 1){
                    return
                }
                this.$confirm('请确认是否重新生成代理商分润报表', '重新生成报表大约需要30分钟,你还要继续吗？', {
                    confirmButtonText: '继续',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await repAgentProfitCreate({
                        date:item.buildDate
                    })
                    res.data.errMsg === 'success' ? this.showMsg('success', '正在估算请耐心等待!') : this.showMsg('error', '估算失败!')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消生成'
                    });
                });
            },
            sendReqProfit(item){
                if(+item.preState !== 1){
                    return
                }
                this.$confirm('请确认是否已经重新生成报表', '重新推送会覆盖原测算数据，你还要继续吗？', {
                    confirmButtonText: '继续',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await this.ajax.commonApi2("post","JSON",this.apiList.sendReqProfit,{
                        date:item.buildDate
                    })
                     res.data.errMsg === 'success' ? this.showMsg('success', '推送成功!') : this.showMsg('error', '推送失败!')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消推送'
                    });
                });
            },
            onSubmit(item){
                this.page = 1
                this.getReqProfit()
            },
            jumpDetail(item){
                // if(+item.preState !== 1){
                //     return
                // }
                this.$router.push({name: 'agencyShareDetail', params: {detail: item}})
            },
            handleSizeChange(val){
                this.size = val
                this.getReqProfit()
            },
            handleCurrentChange(val){
                this.page = val
                this.getReqProfit()
            },
            showMsg(type, message){
                this.$message({
                    type,
                    message
                });
            },
            /*===================== 一些数据处理的函数 ======================= */
            preStateFormat(row, col, cellValue, index){
                let obj = {
                    0: '进行中',
                    1: '成功',
                    2: '失败'
                }
                return obj[row]
            },
            nameFormat(row, col, cellValue, index){
                return cellValue + "代理分润报表"
            },
            sendAgentFormat(row, col, cellValue, index){
                return +row === 1 ? '已推送' : '未推送'
            },
            preStateClass(val){
                let obj = {
                    '0': '',
                    '1': 'success',
                    '2': 'danger'
                }
                return obj[val]
            },
            sendStateClass(val){
                let obj = {
                    '0': '',
                    '1': 'success'
                }
                return obj[val]
            }
        }
    }
</script>

<style>
    .el-table .cell{
        text-align: center;
    }
    .el-pagination{
        display: flex;
        justify-content: flex-end;
    }
</style>
