<template>
    <div class="c-content-inner">
        <div class="search-box">
            <el-form
                label-width="85px"
                :model="formInline"
                class="demo-form-inline"
            >
                <el-row :gutter="24">
                    <el-col :span="6">
                        <el-form-item label="渠道：">
                                <!-- multiple -->
                            <el-select
                                v-model="formInline.repChannelId"
                                clearable
                                collapse-tags
                                placeholder="请选择"
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
                    <!-- <el-col :span="6">
                        <el-form-item label="渠道账号：">
                            <el-select
                                v-model="formInline.repChannelId"
                                clearable
                                collapse-tags
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in channelIdListData"
                                    :key="item.id"
                                    :label="item.repChannelId"
                                    :value="item.repChannelId"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="6">
                        <el-form-item label="更新类型：">
                            <el-select
                                v-model="formInline.updateType"
                                collapse-tags
                                clearable
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in updateTypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="处理结果：">
                            <el-select
                                v-model="formInline.dealFlag"
                                clearable
                                collapse-tags
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in handleResults"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="处理状态：">
                            <el-select
                                v-model="formInline.status"
                                clearable
                                collapse-tags
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in handleStatus"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">               
                    <el-col :span="10">
                        <el-form-item label="账单日期：">
                            <el-date-picker
                                v-model="dataTime"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                @change="timeChange"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-button style="text-align:right" type="primary" @click="onSearch"
                            >查询</el-button
                        >
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <el-alert
            title="财务手工确认处理后自动更新交易和分润"
            type="info"
            show-icon
        >
        </el-alert>
        <div class="table-box">
            <el-table
                v-loading="loading"
                border
                :data="tableData"
                style="width: 100%;"
            >
                <el-table-column prop="repChannelName" label="渠道名称" />
                <el-table-column prop="repChannelId" label="渠道账号" />
                <el-table-column width="100px" prop="billDate" label="账单日期" />
                <el-table-column width="90px" prop="updateType" :formatter="formatterTypes" label="更新类型" />
                <el-table-column prop="detectTime" label="检测时间" />
                <el-table-column width="80px" prop="dealFlag" :formatter="formatterDealFlag" label="处理结果" />
                <el-table-column width="80px" prop="status" label="状态" :formatter="formatterStatus"/>
                <el-table-column prop="updateTime" label="处理时间" />
                <el-table-column width="80px" prop="remark" label="备注" />
                <el-table-column width="70px" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            @click="handle(scope.row)"
                            :disabled="!(scope.row.status == 0 ||scope.row.status == null)"
                            type="text"
                            size="small"
                            >处理</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="table-page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="parseInt(size)"
                layout="total, sizes, prev, pager, next, jumper"
                :total="parseInt(total)"
            >
            </el-pagination>
        </div>
        <el-dialog title="处理" :visible.sync="dialogVisible">
            <el-alert
                title="财务手工确认处理后自动更新交易和分润"
                type="info"
                show-icon
                style="margin-bottom:22px"
            >
            </el-alert>
            <el-form ref="dialogForm" :model="dialogForm" label-width="100px">
                <el-form-item label="是否更新：">
                    <el-radio-group v-model="dialogForm.dealFlag">
                        <el-radio 
                            :label="item.value" 
                            v-for="item of handleResults" 
                            :key="item.value">{{item.label}}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注：" style="width:100%;">
                    <el-input
                        type="textarea"
                        v-model="dialogForm.remark"
                        placeholder="请输入备注"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmUpdate"
                    :loading="loading"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { upOrder,updateUpOrder } from '@/sercive/api/upOrderService'
import { repChannelList } from '@/sercive/api/channelSercive'

export default {
    name: "UpOrderConfirm",
    data() {
        return {
            handleStatus:[
                {value:0,label:'未处理'},
                {value:1,label:'处理中'},
                {value:2,label:'处理失败'},
                {value:3,label:'处理成功'},
            ],
            formInline: {
                page: 1,
                size: 10,
                repChannelId:null,	
                repChannelName:null,	
                updateType:null,	
                dealFlag:null,	
                startDate:null,	
                endDate:null,
                status:null
            },
            dataTime: [],
            channelIdListData: [],
            updateTypes:[{label:'账单变更',value:1},{label:'延迟入库',value:2}],
            handleResults:[{label:'更新',value:1},{label:'不更新',value:0}],
            loading: false,
            tableData: [],
            currentPage: 1,
            size: 10,
            total: 0,
            dialogVisible: false,
            dialogForm: {
                dealFlag:1,
                remark:''
            },
        };
    },
    created(){
        this.channel()
        this.getUpOrderList()
    },
    methods: {
        onSearch(){
            this.currentPage = 1
            this.size = 10
            this.formInline.page = 1
            this.formInline.size = 10
            this.getUpOrderList()
        },
        formatterStatus(row){
            const mapType = {
                0:'未处理', 1:'处理中',2:'处理失败',3:'处理成功'
            }
            return mapType[row.status] 
        },
        formatterDealFlag(row){
            const mapStatus = {
                0:'不更新', 1:'更新'
            }
            return mapStatus[row.dealFlag] 
        },
        formatterTypes(row){
            const mapType = {
                1:'账单变更', 2:'延迟入库'
            }
            return mapType[row.updateType]
        },
        async channel() {
            let res = await repChannelList({
                page: 1,
                size: 500,
                status: 0
            })
            if (res.data.extra) {
                this.channelIdListData = res.data.extra.rows
            }
        },
        getUpOrderList(){
            this.loading = true
            upOrder(this.formInline).then(res=>{
                if(res.data.code == 0 || res.data.code == 100){
                      if(res.data.extra){
                        this.tableData = res.data.extra.rows
                        this.total = res.data.extra.total || 0
                    } 
                }else{
                    this.$message({
                        message:res.data.errMsg,
                        type:'error'
                    })
                }
             
                this.loading = false
            }).catch(e=>{
                console.log(e)
                this.loading = false
            })
        },
        timeChange(date) {
            if(date){
                this.formInline.startDate = date[0]
                this.formInline.endDate = date[1]
            }else{
                this.formInline.startDate = null
                this.formInline.endDate = null
            }
        },
        handleSizeChange(val) {
            // this.formInline.pageSize = val;
            this.formInline.size = val;
            this.size = val
            this.getUpOrderList();
        },
        handleCurrentChange(val) {
            // this.formInline.pageNo = val;
            this.formInline.page = val;
            this.currentPage = val
            this.getUpOrderList();
        },
        handle(row) {
            this.dialogVisible = true;
            this.dialogForm.id = row.id
            this.dialogForm.repChannelId = row.repChannelId
        },
        confirmUpdate(){
            this.loading = true
            updateUpOrder(this.dialogForm).then(res=>{
                this.loading = false
                if(res.data.code == 0|| res.data.code == 100){
                    this.getUpOrderList()
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.dialogVisible = false
                    this.dialogForm = {
                        status:1,
                        remark:''
                    }
                }else{
                    this.$message({
                        message:res.data.errMsg,
                        type:'error'
                    })
                }
            }).catch(e=>{
                console.log(e)
                this.loading = false
            })
        },
    },
};
</script>

<style scoped>
/* .search-box{border-bottom:1px solid #eee} */
.table-page {
    margin: 20px 10px;
    text-align: right;
}
.more {
    height: 20px;
    width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.max-name {
    margin-right: 50px;
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.timeOutTip {
    line-height: 35px;
    padding-right: 10px;
    color: #666;
    font-size: 14px;
}
.check-box {
    overflow: hidden;
    margin-bottom: 15px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
}
.el-button--primary.is-plain {
    color: #409eff !important;
}
</style>
