<template>
    <div class="c-content-inner">
        <el-row :gutter="24" style="margin-bottom:30px">
            <el-col :span="8">
                <el-date-picker
                    v-model="dateTime"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    value-format="yyyy-MM"
                    end-placeholder="结束月份">
                </el-date-picker>
            </el-col>
            <el-col :span="16" style="text-align:right;">
                <el-button type="success" @click="queryList" icon="el-icon-search">查询</el-button>
                <el-button type="primary" @click="ruleAddVisible = true" icon="el-icon-plus">新建</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%;" v-loading="loading">
            <el-table-column
                align="center"
                prop="billDate"
                label="月份"
            >
            </el-table-column>
            <el-table-column
                align="center"
                prop="userName"
                label="配置人"
            >
            </el-table-column>
            <el-table-column
                align="center"
                prop="createTime"
                label="配置时间"
            >
            </el-table-column>
            <el-table-column
                align="center"
                label="操作"
            >
             <template slot-scope="scope">
                <el-button @click="configEdit(scope.row)" type="text" size="small">配置编辑</el-button>
                <el-button @click="toDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="table-page">
            <el-pagination
                @size-change="handleSizeChange($event,form)"
                @current-change="handleCurrentChange($event,form)"
                :current-page="form.pageNo"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="form.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
        <el-dialog :title="curMonth+'提成规则编辑'"  width="80%" :visible.sync="ruleEditVisible">
            <el-tabs tab-position="left" >
                <el-tab-pane label="商户">
                    <rule-title title="商户性质提成分配" @onUpdate="expanderConfigUpdate"></rule-title>
                    <el-scrollbar
                        :native="false"
                        wrap-class="column-wrapper scrollable-items-container check-item-box"
                        style="height: 450px;"
                    >
                     <el-table :data="merchantData" style="width: 100%;" v-loading="loading">
                        <el-table-column
                            align="center"
                            prop="commissionType"
                            label="提成性质"
                            :formatter="formatterCommissionType"
                        >
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="commissionRate"
                            label-class-name="customLabel"
                            label="提成比例"
                        >
                            <template slot-scope="scope">
                                <el-input placeholder="请输入" type="number" v-model="scope.row.commissionRate" class="input-with-select">
                                    <el-button slot="append">%</el-button>
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="range"
                            label-class-name="customLabel"
                            label="时间区间"
                        >
                            <template slot-scope="{row}">
                                <el-date-picker
                                    v-model="row.range"
                                    @input="dateChange($event,row)"
                                    type="daterange"
                                    :value-format="'yyyy-MM-dd'"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </template>
                        </el-table-column>
                     </el-table>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="渠道">
                    <rule-title title="渠道归属类型设置" @onUpdate="expanderConfigUpdate"></rule-title>
                    <el-scrollbar
                        :native="false"
                        wrap-class="column-wrapper scrollable-items-container check-item-box"
                        style="height: 450px;"
                    >
                    <el-table :data="channelData" style="width: 100%;" v-loading="loading">
                        <el-table-column
                            align="center"
                            prop="channelName"
                            label="渠道名称"
                        >
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="channelAcc"
                            label="渠道账号"
                        >
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="belongType"
                            label-class-name="customLabel"
                            label="归属类型"
                        >
                            <template slot-scope="scope">
                                <el-radio v-model="scope.row.belongType" :label="1">移动支付</el-radio>
                                <el-radio v-model="scope.row.belongType" :label="2">第三方</el-radio>
                            </template>
                        </el-table-column>
                    </el-table>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="提成部门">
                    <rule-title title="部门特殊提成设定" @onUpdate="expanderConfigUpdate"></rule-title>
                    <el-scrollbar
                        :native="false"
                        wrap-class="column-wrapper scrollable-items-container check-item-box"
                        style="height: 450px;"
                    >
                    <el-table :data="deptCommissionData" style="width: 100%;" v-loading="loading">
                        <el-table-column
                            align="center"
                            prop="departmentName"
                            label="部门名称"
                        >
                        </el-table-column>
                            <el-table-column
                            align="center"
                            prop="newBusCommission"
                            label="新增商户提成"
                        >
                            <template slot-scope="scope">
                                <el-input placeholder="请输入" type="number" v-model="scope.row.newBusCommission">
                                    <el-button slot="append">%</el-button>
                                </el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="指标部门">
                    <rule-title title="商户归属部门指标设定" @onUpdate="expanderConfigUpdate"></rule-title>
                    <el-scrollbar
                        :native="false"
                        wrap-class="column-wrapper scrollable-items-container check-item-box"
                        style="height: 450px;"
                    >
                     <el-table :data="deptIndicatorsData" style="width: 100%;" v-loading="loading">
                        <el-table-column
                            align="center"
                            prop="departmentName"
                            label="部门名称"
                        >
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="mobilePayTarget"
                            label="移动支付指标(万元)"
                        >
                            <template slot-scope="scope">
                                <el-input placeholder="请输入" type="number" v-model="scope.row.mobilePayTarget"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="threePayTarget"
                            label="第三方业务指标(万元)"
                        >
                            <template slot-scope="scope">
                                <el-input placeholder="请输入" type="number" v-model="scope.row.threePayTarget"></el-input>
                            </template>
                        </el-table-column>
                     </el-table>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="拓展人">
                    <rule-title title="拓展人特殊比例设置" @onUpdate="expanderConfigUpdate"></rule-title>
                    <el-form class="customForm" label-width="75px">
                        <el-form-item label="提成比例:">
                            <el-input placeholder="请填写" type="number" v-model="expanderData.peopleLeaveTrans">
                                <el-button slot="append">%</el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <el-button size="mini" class="tip">离职转接</el-button>
                </el-tab-pane>
                <el-tab-pane label="项目组">
                    <rule-title title="项目组提成比例设置" @onUpdate="expanderConfigUpdate"></rule-title>
                    <el-scrollbar
                        :native="false"
                        wrap-class="column-wrapper scrollable-items-container check-item-box"
                        style="height: 450px;"
                    >
                    <el-form class="customForm" label-width="120px">
                        <el-form-item  label="项目组">
                            <el-input placeholder="请填写" type="number" v-model="expanderData.projectGroup">
                                <el-button slot="append">%</el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item v-for="(item,idx) of projectGroupData" :key="idx" :label="item.groupUsername">
                            <el-input placeholder="请填写" type="number" v-model="item.commission">
                                <el-button slot="append">%</el-button>
                            </el-input>
                        </el-form-item>
                        <p style="margin-bottom: 30px;" v-if="!projectGroupData.length">暂无数据</p>
                    </el-form>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="项目">
                    <rule-title title="项目提成设置" @onUpdate="expanderConfigUpdate"></rule-title>
                    <el-form>
                        <el-form-item label="花呗分期提成比例:" label-width="130px">
                            <el-input placeholder="请填写" type="number" v-model="projectData.hbInstallment">
                                <el-button slot="append">%</el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="其他">
                    <rule-title title="其他提成设置" @onUpdate="expanderConfigUpdate"></rule-title>
                    <el-form>
                        <el-form-item label="团体激励金抽取比例:" label-width="150px">
                            <el-input placeholder="请填写" type="number" v-model="otherData.teamMotivation">
                                <el-button slot="append">%</el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="提成达标发放比例:" label-width="150px">
                            <el-input placeholder="请填写" type="number" v-model="otherData.expanderStand">
                                <el-button slot="append">%</el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                  
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <el-dialog title="提成规则新建" :visible.sync="ruleAddVisible">
            <el-form :model="ruleAddForm" :rules="addFormRules" ref="ruleAddForm" label-width="120px">
                <el-form-item label="选择月份:" prop="month">
                    <el-date-picker
                        v-model="ruleAddForm.month"
                        type="month"
                        value-format="yyyy-MM"
                        placeholder="选择月">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="是否与上月一致:">
                    <el-radio v-model="monthRadio" label="1">是</el-radio>
                    <el-radio v-model="monthRadio" label="2">否</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ruleAddVisible = false">取 消</el-button>
                <el-button type="primary" v-show="monthRadio == 2" @click="nextStep">下一步</el-button>
                <el-button type="primary" v-show="monthRadio == 1" @click="saveSameWithLastMonth">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {expanderConfig,expanderDeptOrChannel,expanderMerchOrProject,expanderConfigUpdate,expanderConfigDel,findLastMonthSetting,saveSameWithLastMonth} from '@/sercive/api/configMsgSercive'
import ruleTitle from './ruleTitle'
    export default {
        name:'expander',
        data(){
            return {
                curMonth:'',
                monthRadio:'1',
                dateTime:[],
                tableData:[],
                loading:false,
                ruleEditVisible:false,
                merchantData:[],
                channelData:[],
                otherData:{
                    teamMotivation:null,
                    expanderStand:null
                },
                projectData:{
                    hbInstallment:null
                },
                projectGroupData:{},
                expanderData:{
                    peopleLeaveTrans:null,

                },
                deptIndicatorsData:[],
                deptIndicators:{
                    queryType:3,
                    expanderId:null
                },
                deptCommissionData:[],
                deptCommission:{
                    queryType:2,
                    expanderId:null
                },
                channel:{
                    queryType:1,
                    expanderId:null
                },
                ruleAddVisible:false,
                ruleAddForm:{
                    month:'',
                },
                addFormRules:{
                    month:[{required: true, message: '请选择月份' ,trigger: 'change'}]
                },
                form:{
                    startMonth:null,
                    endMonth:null,
                    pageNo:1,
                    pageSize:10,
                },
                total:0,
                curRowId:null
            }
        },
        components:{
            ruleTitle
        },
        watch:{
            dateTime(val){
                if(val){
                    this.form.startMonth = val[0]
                    this.form.endMonth = val[1]
                }else{
                    this.form.startMonth = null
                    this.form.endMonth = null
                }
            }
        },
        created(){
            this.getExpanderConfigList()
        },
        methods:{
            saveSameWithLastMonth(){
               this.$refs.ruleAddForm.validate(valid=>{
                   if(valid){
                        const loading = this.$loading({
                            lock: true,
                            text: '加载中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        })
                        saveSameWithLastMonth(this.ruleAddForm).then(res=>{
                            loading.close()
                            if(res.data.code == 0){
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                })
                                this.ruleAddVisible = false
                                this.getExpanderConfigList()
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
                   }
                })
            },
            nextStep(){
                this.curMonth = this.ruleAddForm.month
                this.$refs.ruleAddForm.validate(valid=>{
                    if(valid){
                        const loading = this.$loading({
                            lock: true,
                            text: '加载中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        })
                        findLastMonthSetting(this.ruleAddForm).then(res=>{
                            loading.close()
                            if(res.data.code == 0){
                                this.curRowId = res.data.extra.expanderId
                                this.getExpanderConfigById({id:this.curRowId})
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
                    }
                })
              
            },
            toDelete(row){
                this.$confirm('您确定要删除该拓展人配置吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const loading = this.$loading({
                        lock: true,
                        text: '加载中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    })
                    expanderConfigDel({ expanderId: row.id }).then(res => {
                        loading.close()
                        if(res.data.code == 0){
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            })
                            this.ruleAddVisible = false
                            this.getExpanderConfigList()
                        }else{
                            this.$message({
                                message:res.data.errMsg,
                                type:'error'
                            })
                        }
                    }).catch(e => {
                        loading.close()
                    })
                })
            },
            dateChange(val,row){
                row.startTime = val[0]
                row.endTime = val[1]
                this.merchantData.forEach((item,idx)=>{
                    this.$set(this.merchantData,idx,item)
                })
            },
            expanderConfigUpdate(){
                const isMerchantDataEmpty = this.merchantData.some(v=>!v.commissionRate || !v.startTime || !v.endTime)
                if(isMerchantDataEmpty){
                    this.$message({
                        message:'请填写完整商户性质提成分配信息',
                        type:'warning'
                    })
                    return
                }
                const isChannelDataEmpty = this.channelData.some(v=>!v.belongType)
                if(isChannelDataEmpty){
                    this.$message({
                        message:'请填写完整渠道归属类型信息',
                        type:'warning'
                    })
                    return
                }
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.merchantData.forEach(item=>{
                    delete item.range
                })
                expanderConfigUpdate({
                    expanderId:this.curRowId,
                    expanderSettings:{
                        listBusiness:this.merchantData, // 商户
                        listChannel:this.channelData, // 渠道
                        listDepartment:this.deptCommissionData, // 提成部门
                        listTargetDepartment:this.deptIndicatorsData, // 指标部门
                        listProjectGroup:this.projectGroupData, // 项目组
                        project:{
                         projectGroup:this.expanderData.projectGroup,
                         peopleLeaveTrans:this.expanderData.peopleLeaveTrans, // 拓展人-离职转接比例
                         hbInstallment:this.projectData.hbInstallment, // 项目-花呗分期提成比例
                         teamMotivation:this.otherData.teamMotivation, // 其他-团队激励金抽取
                         expanderStand:this.otherData.expanderStand // 其他-提成达标发放比例
                       }
                    }
                }).then(res=>{
                    loading.close()
                    if(res.data.code == 0){
                        this.ruleEditVisible = false
                        this.ruleAddVisible = false
                        this.$message({
                            message:'更新成功',
                            type:'success'
                        })
                        this.getExpanderConfigList()
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
            formatterCommissionType(row){
                const map = {
                    1:'新增商户',
                    2:'存量商户',
                    3:'过度商户'
                }
                return map[row.commissionType]
            },
            // getChannelConfig(form){
            //     this.loading = true
            //     expanderDeptOrChannel(form).then(res=>{
            //         this.loading = false
            //         if(form.queryType == 1){
            //             this.channelData = res.data.extra.row
            //         }else if(form.queryType == 2){
            //             this.deptCommissionData = res.data.extra.row// 提成部门
            //         }else if(form.queryType == 3){
            //             this.deptIndicatorsData = res.data.extra.row
            //         }
            //     }).catch(e=>{
            //         console.log(e)
            //         this.loading = false
            //     })
            // },
            getExpanderConfigById(row){
                let params = {
                    expanderId:row.id
                }
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                Promise.all([
                expanderDeptOrChannel(Object.assign({},params,{queryType:1})), // 渠道
                expanderDeptOrChannel(Object.assign({},params,{queryType:2})), // 提成部门
                expanderDeptOrChannel(Object.assign({},params,{queryType:3})), // 指标部门
                expanderMerchOrProject({
                    expanderId:row.id
                })]).then(res=>{
                    this.ruleEditVisible = true
                    loading.close()
                    const channel = res[0].data.extra
                    const deptCommission = res[1].data.extra
                    const deptIndicators = res[2].data.extra
                    const expanderSetting = res[3].data.extra
                    this.merchantData = expanderSetting.ListBusiness // 商户
                    this.merchantData = this.merchantData.map(v=>{
                        v.range =v.startTime&&v.endTime? [v.startTime,v.endTime]:[]
                        return v 
                    })
                    this.channelData = channel.row // 渠道
                    this.deptCommissionData = deptCommission.row // 提成部门
                    this.deptIndicatorsData = deptIndicators.row // 指标部门
                    this.expanderData = expanderSetting.ListProject.length == 0?{
                        peopleLeaveTrans:null,
                        projectGroup:null
                    }:{ peopleLeaveTrans: expanderSetting.ListProject[0].peopleLeaveTrans,
                        projectGroup: expanderSetting.ListProject[0].projectGroup} // 拓展人 提成比例和项目组
                    this.projectGroupData = expanderSetting.ListProjectGroup // 项目组
                    this.projectData = expanderSetting.ListProject.length == 0?{
                        hbInstallment:null
                    }:{hbInstallment:expanderSetting.ListProject[0].hbInstallment} // 项目
                    this.otherData = expanderSetting.ListProject.length == 0?{  // 其他
                        teamMotivation:null,
                        expanderStand:null
                    }:{
                        teamMotivation:expanderSetting.ListProject[0].teamMotivation,
                        expanderStand:expanderSetting.ListProject[0].expanderStand
                    }
                }).catch(e=>{
                    console.log(e)
                    loading.close()
                })
            },
            queryList(){
                this.form.pageNo = 1
                this.getExpanderConfigList()
            },
            getExpanderConfigList(){
                this.loading = true
                expanderConfig(this.form).then(res=>{
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
            configEdit(row){
                this.curRowId = row.id
                this.curMonth = row.billDate
                this.getExpanderConfigById(row)
            },
            handleSizeChange(val,form) {
                this.form.pageSize = val;
                this.getExpanderConfigList();
            },
            handleCurrentChange(val,form) {
                this.form.pageNo = val;
                this.getExpanderConfigList();
            },
        }
    }
</script>

<style lang="less" scoped>
.table-page {
    margin: 20px 10px;
    text-align: right;
}
.c-content-inner /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
.c-content-inner /deep/ .cell.customLabel::before{
    content: '*';
    color: red;
}
.c-content-inner /deep/ .el-tabs--left .el-tabs__header.is-left{
    margin-right: 30px;
}
.c-content-inner /deep/ .customForm{
    margin-top: 30px;
    border: 1px solid #aaa;
    border-radius: 5px;
    padding: 22px 22px 0;
}
.c-content-inner .tip{
    position: absolute;
    top: 78px;
    left: 15px;
}
</style>