<template>
    <div class="c-content-inner">

        <div class="tab-area">
            <!--暂时隐藏上传数据功能-->
            <!--            <el-button @click="uploadDate()" type="primary">上传数据</el-button>-->
            <div class="filter-area">
                <el-form :inline="true" :model="filterForm" class="demo-form-inline">
                    <el-form-item  label="渠道">
                        <el-select
                            v-model="filterForm.repChannelId"
                            style="width:200px;"
                            placeholder="请选择渠道"
                            clearable
                        >
                            <el-option
                                v-for="item in allChannelsData"
                                :key="item.id"
                                :label="item.repChannelName"
                                :value="item.repChannelId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="账单日期">
                        <el-date-picker v-model="filterForm.dateTime" type="daterange" range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期" format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select
                            v-model="filterForm.status"
                            style="width:150px;"
                            placeholder="选择状态"
                            clearable
                        >
                            <el-option
                                v-for="item in statusListData"
                                :key="item.value"
                                :label="item.text"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上游是否变更">
                        <el-select
                            v-model="filterForm.upChange"
                            style="width:150px;"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否延迟入库">
                        <el-select
                            v-model="filterForm.lazyEnter"
                            style="width:150px;"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="margin-left: 30px;">
                        <el-button type="primary" @click="onSubmitSearch">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>
        <div>
            <el-row>
                <el-button
                    style="margin-bottom: 22px;"
                    class="sync-btn sync-btn-noright"
                    @click="uploadDate2()"
                    type="primary"
                >对接数据</el-button>
                <el-button
                    style="margin-bottom: 22px;"
                    class="sync-btn sync-btn-noright"
                    @click="uploadDate3()"
                    type="primary"
                >手工导入</el-button>
                <!-- <el-button
                    style="margin-bottom: 22px;"
                    class="sync-btn sync-btn-noright"
                    @click="uploadDate4()"
                    type="primary"
                >分润核准</el-button>
                <el-button
                    style="margin-bottom: 22px;"
                    class="sync-btn sync-btn-noright"
                    @click="uploadDate5()"
                    type="primary"
                >核准生成</el-button> -->
            </el-row>
        </div>
        <!-- <div>
                <span >
                    <el-button style="margin-bottom: 22px;"  class="sync-btn sync-btn-noright" @click="uploadDate2()" type="primary">对接数据</el-button>
                </span>
            <span >
                 <el-button style="margin-bottom: 22px;" class="sync-btn sync-btn-noright" @click="uploadDate3()" type="primary">手工导入</el-button>
                 </span>

            <el-button style="margin-bottom: 22px;" class="sync-btn sync-btn-noright" @click="uploadDate4()" type="primary">分润核准</el-button>
        </div> -->

        <div class="grid-content bg-purple-dark flex-s" style="background-color: rgb(236, 245, 255);padding:10px">
            <i class="el-icon-info" style="color: cornflowerblue;font-size:30px;margin-right: 10px"></i>
            <div>
                <div class="flex-s" style="color:rgb(83, 168, 255);font-size:14px">
                    系统每日自动对接网关数据
                </div>
            </div>
        </div>
        <!--上传数据-->
        <div class="table-box">
            <el-table v-loading="loading" border :data="tableData" style="width: 100%">
                <!--<el-table-column prop="id" width="50" label="编号" />-->
               <!-- <el-table-column prop="recordId" width="140" label="上传编号" />-->
                <el-table-column prop="repChannelName" width="150" label="渠道名称"   />
                <el-table-column prop="repChannelAcc" label="渠道账号" />
                <el-table-column prop="beginDate" width="110" label="账单日期" />
                <el-table-column prop="recordNum" width="90" label="成功条数" />
                <el-table-column prop="statusDesc" width="90" label="状态" >
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.remark"  placement="top">
                            <div>
                                <span  >{{ scope.row.statusDesc }}</span>
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column  width="120" label="上游是否变更" >
                    <template slot-scope="scope">
                        <div v-if="scope.row.upChange  == '1'">是</div>
                        <div v-if="scope.row.upChange  == '0'">否</div>
                    </template>
                </el-table-column>
                <el-table-column  width="120" label="是否延迟入库" >
                     <template slot-scope="scope">
                        <div v-if="scope.row.lazyEnter  == '0'">否</div>
                        <div v-if="scope.row.lazyEnter  == '1'">是</div>
                    </template>
                </el-table-column>
                <el-table-column prop="operator" width="100" label="执行人"  />
                <el-table-column prop="finishTimes"  width="200" label="最新上传时间" />

                <el-table-column label="操作" width="130">
                    <template slot-scope="scope">
                        <div class="table-option-box">

                         <!--  <el-button size="mini" v-if="['2','3'].indexOf(scope.row.status) > -1" type="primary"
                                       @click="handleEdit(scope.$index, scope.row)">撤销数据
                            </el-button>
                            <el-button size="mini" disabled v-else>{{scope.row.statusDesc}}</el-button>-->
                             <el-button size="mini" v-if="['2','3','4'].indexOf(scope.row.status) > -1" type="warning"
                                        @click="reUploadData(scope.$index, scope.row)">重新上传
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 表格分页 -->
            <el-pagination
                class="pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[5, 10, 20, 30, 40]"
                :page-size="parseInt(size)"
                layout="total, sizes, prev, pager, next, jumper"
                :total="parseInt(total)">
            </el-pagination>
        </div>
        <div class="table-page table-page-2">
            <!-- 上传数据弹框 -->
            <el-dialog title="上传数据"
                       width="600px"
                       :visible.sync="dialogFormVisible" class="dialog">
                <el-form :model="uploadData">
                    <el-form-item label="渠道和渠道账号" :label-width="formLabelWidth">
                        <el-select v-model="uploadData.channel" placeholder="选择渠道和渠道账号">
                            <el-option v-for="(item,index) in allChannelsData" :key="index"
                                       :label="'渠道：'+item.repChannelName+'，账号：'+item.repChannelId"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="uploadExcelUrl"
                    :headers="{ token: access_token }"
                    :data="{channelId:form.region}"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="uploadSuccess"
                    :before-upload="beforeAvatarUpload"
                    :file-list="fileList"
                    :on-error="onError"
                    v-show="form.region">
                    <el-button slot="trigger" size="small" type="primary">选取上传文件</el-button>
                    <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                    <div slot="tip" class="el-upload__tip">仅支持xls、xlsx、csv文件格式，大小须≤100M，且数据时间不能超过31天</div>
                </el-upload>
                <div v-if="tip" class="tip">
                    请选择并上传文件
                </div>

                <div slot="footer" class="dialog-footer">
                    <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
                    <el-button type="primary" @click="submitUpload()">完成</el-button>
                </div>
            </el-dialog>
            <!-- 对接数据弹框 -->
            <el-dialog title="对接数据"
                       width="1140px"
                       :visible.sync="dialogFormVisible2"
                       class="dialog"
                       element-loading-text="上传数据中"
                       element-loading-spinner="el-icon-loading"
                       element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-form :model="form">
                    <div class="filter-area">
                        <el-form-item label="渠道名称" :label-width="formLabelWidth">
                            <el-input v-model="dockingData.name" placeholder="请输入渠道名称查询" />
                        </el-form-item>
                        <el-form-item label="渠道账号" :label-width="formLabelWidth">
                            <el-input v-model="dockingData.account" placeholder="请输入渠道账号查询" />
                        </el-form-item>
                        <div class="search-btn" @click="onSearchQueryAll">查询</div>
                    </div>
                    <div class="option-area">
                        <el-form-item label="选择时间" :label-width="formLabelWidth">
                            <el-date-picker
                                v-model="form.dataTime"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <div class="option-box">
                            <div class="option-btn" @click="submitUploadAll">全部上传</div>
                            <div class="option-btn" @click="submitUploadSelect">上传</div>
                        </div>
                    </div>
                    <div class="data-area">
                        <el-form-item label="选择渠道" :label-width="formLabelWidth">
                            <el-table
                                ref="multipleTable"
                                :data="queryAllData"
                                tooltip-effect="dark"
                                style="width: 100%"
                                @selection-change="handleSelectionChange">
                                <el-table-column type="selection" align="center" width="55" />
                                <el-table-column label="渠道ID" prop="id" align="center" width="120">
                                    <!--                                    <template slot-scope="scope">{{ scope.row. }}</template>-->
                                </el-table-column>
                                <el-table-column label="渠道名称" prop="repChannelName" align="center" width="400" />
                                <el-table-column label="渠道账号" prop="repChannelAcc" align="center"
                                                 show-overflow-tooltip />
                            </el-table>
                        </el-form-item>
                        <el-pagination
                            class="pagination-area"
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page="dockingData.currentPage"
                            :page-sizes="[5, 10]"
                            :page-size="parseInt(dockingData.size)"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="parseInt(dockingData.total)">
                        </el-pagination>
                    </div>
                </el-form>
            </el-dialog>

            <el-dialog title="手工导入"
                       width="540px"
                       :visible.sync="dialogFormVisible3"
                       class="dialog"
                       element-loading-text="上传数据中"
                       element-loading-spinner="el-icon-loading"
                       element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-form :model="form">
                    <div class="filter-area">
                        <el-form-item label="渠道名称" :label-width="formLabelWidth">
                            <el-radio-group v-model="dataUploadfrom.type" @change="onchangeType()" >
                                <el-radio   :label="1" >付呗</el-radio>
                                <!-- <el-radio   :label="2" >微智金融</el-radio> -->
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div >
                    <el-form-item label="商户类型" :label-width="formLabelWidth" v-show="merchantTypeVisible">
                        <el-radio-group v-model="dataUploadfrom.subType">
                            <el-radio   :label="2" >零费率商户</el-radio>
                            <el-radio   :label="1" >普通商户</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="账单日期" :label-width="formLabelWidth" v-show="merchantTypeVisible" >
                            <el-date-picker  v-model="dataUploadfrom.billDate" dataformatas="yyyy-MM-dd" value-format="yyyy-MM-dd"/>
                        </el-form-item>
                    </div>
                    <div>
                        <el-upload
                            style="float:left;margin-right:10px;"
                            class="upload-demo"
                            ref="upload"
                            :action="uploadExcelUrl3"
                            :headers="{ token: access_token }"
                            :show-file-list="false"
                            :before-upload="beforeUpload"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="dataUploadSuccess"
                            :file-list="fileList"
                            :on-error="onError"
                            :data="dataUploadfrom">
                            <el-form-item label="账单文件" :label-width="formLabelWidth" >
                                <el-button style="font-size:14px" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">仅支持xls、xlsx、csv文件格式</div>
                            </el-form-item>
                        </el-upload>
                    </div>

                    <div style="height: 30px;">

                    </div>
                </el-form>
            </el-dialog>

            <el-dialog title="分润核准"
                       width="540px"
                       :visible.sync="dialogFormVisible4"
                       class="dialog"
                       element-loading-text="上传数据中"
                       element-loading-spinner="el-icon-loading"
                       element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-form :model="form">
                        <el-form-item label="渠道" :label-width="formLabelWidth">
                            <el-select
                                v-model="ratifyUploadfrom.repChannelId"
                                collapse-tags
                                style="width:350px;"
                                placeholder="请选择渠道">
                                <el-option
                                    v-for="item in channelIdListData"
                                    :key="item.id"
                                    :label="item.repChannelName"
                                    :value="item.repChannelId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <div>
                            <el-form-item label="月份" :label-width="formLabelWidth" >
                                <el-date-picker type="month" v-model="ratifyUploadfrom.billMonth" dataformatas="yyyy-MM" value-format="yyyy-MM"/>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="支付类型" :label-width="formLabelWidth" >
                                <el-radio-group v-model="ratifyUploadfrom.bizType">
                                    <el-radio :label="0" >移动支付</el-radio>
                                    <el-radio :label="1" >刷卡</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                        <div>
                            <el-upload
                                style="float:left;margin-right:10px;"
                                ref="upload"
                                :action="uploadExcelUrl4"
                                :headers="{'__vt_param__':aggcode_token}"
                                :show-file-list="false"
                                :before-upload="beforeUpload2"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-success="dataUploadSuccess"
                                :file-list="fileList"
                                :on-error="onError"
                                :data="ratifyUploadfrom">
                                <el-form-item label="上传" :label-width="formLabelWidth" >
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">仅支持xls、xlsx、csv文件格式
                                    </div>
                                </el-form-item>
                            </el-upload>
                            </div>
                    <div style="height: 40px;line-height: 40px;">
                        <a @click="download()" href="#">核准模板下载</a>
                    </div>
                </el-form>
            </el-dialog>

            <!-- 上传结果弹窗 -->
            <el-dialog class="upload-demo2" width="600px" title="上传成功提示" :visible.sync="dialogTableVisible">
                <div>
                    <p><span>表格名称：</span><span>{{dialog2Data2.channelName}} ({{dialog2Data2.dataDate}}) </span></p>
                    <p><span>编号：</span><span>{{dialog2Data2.id}}</span></p>
                    <p><span>上传成功条数：</span><span>{{dialog2Data2.successCount}}</span></p>
                    <p><span>上传失败条数：</span><span>{{dialog2Data2.count - dialog2Data2.successCount}}</span></p>
                </div>
                <ul class="dialog2">
                    <li v-for="(item,index) in dialog2Data" :key="index">
                        <span class="num">{{item.rowNum}}</span>
                        <span>{{item.errorMsg}}</span>
                    </li>
                </ul>
            </el-dialog>

            <!-- 生成核准 -->
            <el-dialog class="approval-dialog" title="核准生成" width="860px" :visible.sync="dialogFormVisible5">
                <el-row style="margin-bottom:10px">
                    <el-col>
                    <div class="grid-content bg-purple-dark flex-s" style="background-color: rgb(236, 245, 255);padding:10px">
                        <i class="el-icon-info" style="color: cornflowerblue;font-size:30px;margin-right: 10px"></i>
                        <div class="flex-s" style="color:rgb(83, 168, 255);font-size:14px">
                            生成整年的核准报表
                        </div>
                    </div>
                    </el-col>
                </el-row>
                <el-form :inline="true" :model="approvalForm">
                    <el-form-item label="报表系统">
                        <el-checkbox-group v-model="typeList">
                            <el-checkbox label="日报"></el-checkbox>
                            <el-checkbox label="代理商分润"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="年份" style="margin-left:20px">
                        <el-date-picker
                            style="width:200px;"
                            v-model="approvalForm.buildYear"
                            value-format="yyyy"
                            type="year"
                            placeholder="选择年">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" type="primary" @click="getRatityList" >查询</el-button>
                        <el-button size="mini" type="primary" @click="ratityAdd" >生成核准</el-button>
                    </el-form-item>
                </el-form>
                <el-row>
                    <el-col :span="24">
                        <div>
                            <el-table
                                v-loading="risLoading"
                                :data="ratityList"
                                style="width: 100%;height:200px;text-align:center">
                                <el-table-column
                                    label="序号"
                                    width="60"
                                    prop="id">
                                </el-table-column>
                                <el-table-column
                                    width="100"
                                    label="报表类型"
                                    :formatter="typeFormat"
                                    prop="type"
                                >
                                </el-table-column>
                                <el-table-column
                                    width="120"
                                    label="年份"
                                    prop="buildYear"
                                ></el-table-column>
                                <el-table-column
                                    label="生成状态"
                                    :formatter="stateFormat"
                                    prop="state"
                                ></el-table-column>
                                <el-table-column
                                    label="生成时间"
                                    prop="createTime"
                                > </el-table-column>
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
                                :total="rTotal">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-row>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { apiHost2 } from '../../../utils/ajax.js'
    export default {
        data() {
            return {
                // apiList:{
                //     pageList: this.api.shareProfit.pageList
                // },
                // 生成核准
                rPage: 1,
                rSize: 10,
                rTotal: 0,
                typeList: [],
                approvalForm:{
                    types: '',
                    buildYear: ''
                },
                risLoading: false,
                ratityList: [],
                // 其他页面
                formInline: {
                    operation: '',
                    user: '',
                    ip: '',
                    region: ''
                },      // 未知
                dataTime: '',                        // 选择日期
                tableData: [],                    // 结果数据
                billData:'',
                dialogFormVisible: false,             // 上传数据弹框
                dialogFormVisible2: false,            // 对接数据弹框
                dialogFormVisible3: false,
                dialogFormVisible4: false,
                dialogFormVisible5: false,
                radio2:1,
                radio3:1,
                merchantTypeVisible:true,

                /** 结果相关 */
                loading: true,                        // 结果加载状态
                // 翻页
                currentPage4: 1,
                page: '1',
                size: '10',
                total: '400',
                form: {
                    region: '',
                    dataTime: []
                },
                formLabelWidth: '120px',
                queryAllData: [],       // 表格数据
                fileList: [],
                uploadExcelUrl: apiHost2 + '/uploadRecord/uploadData',  // todo: 可修改接口位置为statement.uploadDataFile
                uploadExcelUrl2: apiHost2 + '/uploadRecord/addData',
                uploadExcelUrl3: apiHost2 + '/v3/uploadRecord/uploadData',
                uploadExcelUrl4: apiHost2 + '/v3/uploadRecord/uploadRatifyData',
                aggcode_token: '',
                //  弹框结束
                // 弹窗2
                dialog2Data: [],
                dialogTableVisible: false,
                dialog2Data2: [],
                tip: false,
                // 弹窗2结束
                timeBitween: [],
                // 对接数据相关
                dockingData: {
                    loading: false,
                    currentPage: 1,
                    page: '1',
                    size: '10',
                    total: '400',
                    name: '',
                    account: ''
                },
                // 上传数据相关
                uploadData: {
                    channel: ''
                },
                allChannelsData: [],
                selectAll: false,
                // 筛选
                filterForm: {
                    repChannelId: '',
                    dateTime: [],
                    status: '',
                    lazyEnter:"",
                    upChange:""
                },
                statusListData: [
                    {
                        text: '执行中',
                        value: '1'
                    },
                    {
                        text: '执行失败',
                        value: '2'
                    },
                    {
                        text: '执行成功',
                        value: '3'
                    }
                ],
                dataUploadfrom:{
                    type:1,
                    subType:1,
                    billDate:''
                },
                ratifyUploadfrom:{
                    bizType:0
                },
                channelIdListData: [],
                access_token: ''
            }
        },
        methods: {
            stateFormat(row, col, cellValue, index){
                let obj = {
                    1: '已生成',
                    0: '生成中',
                    2: '失败'
                }
                return obj[cellValue]
            },
            typeFormat(row, col, cellValue, index){
                return +cellValue === 1 ? '代理商分润' : '日报'
            },
            async ratityAdd(){
                let { buildYear} = this.approvalForm
                let types = ["0"]
                if([null,'',undefined,'null'].indexOf(buildYear) > -1){
                    this.$message({
                        type:'error',
                        message: '年份不能为空'
                    })
                    return
                }
                let params = {
                    buildYear,
                    types
                }
                let res = await this.ajax.commonApi2('post', 'JSON', this.api.statement.ratityAdd, params)
                if(res.data.code === 0){
                    this.$message({
                        type:'success',
                        message: '生成成功'
                    })
                    this.getRatityList()
                } else {
                     this.$message({
                        type:'error',
                        message: res.data.errMsg
                    })
                    this.getRatityList()                   
                }
           },
           
            async getRatityList(){
                let { buildYear} = this.approvalForm
                let types = []
                this.typeList.forEach(item=>{
                    let number = item === '日报' ? '0' : '1'
                    types.push(number)
                })
                this.risLoading = true
                let params = {
                    buildYear,
                    types
                }
                let res = await this.ajax.commonApi2('post', 'JSON', this.api.statement.pageList, params)
                this.ratityList = res.data.extra.rows
                this.rTotal = res.data.extra.total || 0
                this.risLoading = false
            },
            rHandleAgentSizeChange(val){
                this.rSize = val
                this.getRatityList()
            },
            rHandleAgentCurrentChange(val){
                this.rPage = val
                this.getRatityList()
            },
            onSubmit() {
                if (this.dataTime) {
                    this.formInline.startAt = this.dataTime[0] + ' ' + '00:00:00'
                    this.formInline.endAt = this.dataTime[1] + ' ' + '23:59:59'
                } else {
                    this.formInline.startAt = ''
                    this.formInline.endAt = ''
                }
                this.currentPage4 = 1
                this.dataList()
            },
            indexMethod(index) {
                return index + 1
            },
            dataList() {
                let params = this.api.statement.uploadList + '?page=' + this.page + '&size=' + this.size
                if (this.filterForm.repChannelId) {
                    params += '&repChannelId=' + this.filterForm.repChannelId
                }
                if (this.filterForm.status !== '') {
                    params += '&status=' + this.filterForm.status
                }
                if (this.filterForm.dateTime && this.filterForm.dateTime.length) {
                    params = params + '&startDate=' + this.filterForm.dateTime[0] + '&endDate=' + this.filterForm.dateTime[1]
                }
                if (this.filterForm.lazyEnter !== '') {
                    params = params + '&lazyEnter=' + this.filterForm.lazyEnter
                }
                if (this.filterForm.upChange !== '') {
                    params = params + '&upChange=' + this.filterForm.upChange
                }
                this.ajax.commonApi2(
                    'get',
                    'X',
                    params
                )
                    .then(res => {
                        this.tableData = res.data.extra.rows
                        this.total = res.data.extra.total
                        this.loading = false
                        // for (let i = 0; i < this.tableData.length; i++) {
                        //     this.timeBitween = this.tableData[i].dataDate.split(',')
                        //     if (this.timeBitween.length > 1) {
                        //         var allTime = this.sortarr(this.timeBitween)
                        //         this.tableData[i].startTime = this.timeBitween[0]
                        //         this.tableData[i].endTime = this.timeBitween[this.timeBitween.length - 1]
                        //     } else {
                        //         this.tableData[i].startTime = this.timeBitween[0]
                        //         this.tableData[i].endTime = this.timeBitween[0]
                        //         // console.log(this.timeBitween)
                        //     }
                        // }
                    })
            },
            sortarr(arr) {
                for (let i = 0; i < arr.length - 1; i++) {
                    for (let j = 0; j < arr.length - 1 - i; j++) {
                        if ((new Date(arr[j].replace(/-/g, '\/'))) > (new Date(arr[j + 1].replace(/-/g, '\/')))) {
                            var temp = arr[j]
                            arr[j] = arr[j + 1]
                            arr[j + 1] = temp
                        }
                    }
                }
                return arr
            },
            handleEdit(index, row) {
                this.$confirm('此操作将删除交易数据, 您将无法在「汇总表」里查询相关交易数据，确定要撤销吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).then(() => {
                    this.ajax
                        .commonApi2(
                            'get',
                            'X',
                            this.api.statement.uploadCancel + '?id=' + row.id + '&repChannelId=' + row.repChannelId
                        )
                        .then(res => {
                            if (res.data.code === 0) {
                                this.$message({
                                    type: 'success',
                                    message: res.data.extra
                                })
                                this.dataList()
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.extra
                                })
                            }
                        })
                })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            },
            reUploadData(index, row) {
                this.$confirm('此操作将重新上传数据, 你需要重新生成对应的报表，确定要重新上传吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).then(() => {
                    this.ajax
                        .commonApi2(
                            'get',
                            'X',
                            this.api.statement.reUploadData + '?id=' + row.id + '&repChannelId=' + row.repChannelId
                        )
                        .then(res => {
                            if (res.data.code === 0) {
                                this.dataList()
                            }
                            let msg = ''
                            if(res.data.code === 102) throw new Error(res.data.errMsg)
                            this.$message({
                                type: 'success',
                                message: res.data.extra
                            })
                        }).catch((err)=>{
                            this.$message({
                                type: 'error',
                                message: err.message
                            })                   
                        })
                })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消重新上传'
                        })
                    })
            },
            // 翻页
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.size = val
                this.dataList()
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                // this.page = val - 1
                this.page = val
                this.loading = true
                this.dataList()
            },
            // 翻页
            handleSizeChange1(val) {
                // console.log(`每页 ${val} 条`);
                this.dockingData.size = val
                this.queryAll()
            },
            handleCurrentChange1(val) {
                // console.log(`当前页: ${val}`);
                // this.dockingData.page = val - 1
                this.dockingData.page = val
                this.dockingData.loading = true
                this.queryAll()
            },
            reset() {
                this.formInline.operation = ''
                this.formInline.user = ''
                this.formInline.ip = ''
                this.formInline.region = ''
                this.dataTime = ''
                this.formInline = JSON.parse(JSON.stringify(this.formInline))
            },
            // 弹框
            uploadDate() {
                this.dialogFormVisible2 = true
                // this.queryAllChannels()
            },
            // 弹框（对接数据）
            uploadDate2() {
                this.dialogFormVisible2 = true
            },
            uploadDate3() {
                this.dialogFormVisible3 = true
            },
            uploadDate4() {
                this.dialogFormVisible4 = true
            },
            uploadDate5(){
                this.dialogFormVisible5 = true
                this.getRatityList()
            },
            handleSelectionChange(val) {
                const result = []
                val.forEach(item => {
                    result.push(item.repChannelId)
                })
                this.form.region = result
                // this.form.region = result.join(',')
            },
            onSearchQueryAll(){
                this.dockingData.page = 1
                this.queryAll()
            },
            // 获取全部渠道信息
            queryAll() {
                this.ajax
                    .commonApi2('get', 'X', this.api.statement.channelPageList
                        + '?page=' + this.dockingData.page
                        + '&size=' + this.dockingData.size
                        + '&repChannelId=' + this.dockingData.account
                        + '&repChannelName=' + encodeURI(encodeURI(this.dockingData.name))
                        + '&&status=0'
                    )
                    .then(res => {
                        this.queryAllData = res.data.extra.rows
                        this.dockingData.total = res.data.extra.total
                        this.dockingData.loading = false
                        // this.form.region = this.queryAllData[0].id
                    })
            },
            submitUpload() {
                if (!this.uploadData.channel) {
                    this.tip = true
                    return
                }
                this.$refs.upload.submit()
                this.dialogFormVisible = false
            },
            // 上传全部
            submitUploadAll() {
                this.selectAll = true
                this.submitUpload2()
            },
            // 上传选中渠道
            submitUploadSelect() {
                this.selectAll = false
                this.submitUpload2()
                if (!this.form.region.length) {
                    this.$message.warning('请先勾选渠道')
                    return
                }
            },
            /* 对接数据上传 */
            submitUpload2() {
                if (!this.form.dataTime.length) {
                    this.$message.warning('请先选择时间段')
                    return
                }
                const data = {
                    isAll: this.selectAll ? '1' : '0',
                    repChannelIds: this.form.region,
                    beginDate: this.transformToTimeString(this.form.dataTime[0]),
                    endDate: this.transformToTimeString(this.form.dataTime[1])
                }
                this.ajax
                    .commonApi2(
                        'post',
                        'JSON',
                        this.api.statement.uploadData2,
                        data
                    )
                    .then(res => {
                        this.dockingData.loading = false
                        if (res.data.code == 0) {
                            this.$message.success(res.data.extra)
                            this.queryAll()
                            // this.dialogTableVisible = true
                        } else {
                            this.$message.error(res.data.extra)
                        }
                    })
                this.form.dataTime = []
                this.form.region = []
                this.form = Object.assign({}, this.form)
                this.dialogFormVisible2 = false
            },

            handleRemove(file, fileList) {
                console.log(file, fileList)
            },
            handlePreview(file) {
                console.log(file)
            },
            uploadSuccess(res) {
                if (!res.code) {
                    if (res.extra.excelParseErrorInfoDtos) {
                        this.dialog2Data = res.extra.excelParseErrorInfoDtos
                    }
                    if (res.extra.uploadRecord) {
                        this.dialog2Data2 = res.extra.uploadRecord
                    }
                    this.dialogTableVisible = true
                    this.dataList()
                } else {
                    this.$alert(res.errMsg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'error',
                                message: res.errMsg
                            })
                        }
                    })
                }
            },
            beforeAvatarUpload(file) {
                const extension = file.name.split('.')[1] === 'xls'
                const extension2 = file.name.split('.')[1] === 'xlsx'
                const extension3 = file.name.split('.')[1] === 'csv'
                const isLt2M = file.size / 1024 / 1024 < 100
                if (!extension && !extension2 && !extension3) {
                    this.$message({
                        type: 'error',
                        message: '上传失败，请上传正确的文件格式'
                    })
                }
                if (!isLt2M) {
                    console.log('上传失败，上传文件须≤100M')
                }
                return extension || extension2 || (extension3 && isLt2M)
            },
            onError(res) {
                // alert(res,'ddd')
                this.$message({
                    type: 'error',
                    message: '上传失败，重新上传'
                })
                // console.log(res,'uploaderr')
            },
            transformToTimeString(time) {
                const time1 = time.getTime()
                const date = new Date(time1),
                    Y = date.getFullYear(),
                    M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
                    D = date.getDate()
                return `${Y}-${M}-${D}`
            },
            queryAllChannels() {
                this.ajax
                    .commonApi2('get', 'X', this.api.statement.channelPageList + '?page=1&size=500&status=0')
                    .then(res => {
                        this.allChannelsData = res.data.extra.rows
                        this.uploadData.channel = this.allChannelsData[0].id
                    })
            },
            onSubmitSearch() {
                // console.log(this.filterForm)
                this.page = 1
                this.loading = true
                let params = this.api.statement.uploadList + '?page=' + this.page + '&size=' + this.size
                if (this.filterForm.repChannelId) {
                    params += '&repChannelId=' + this.filterForm.repChannelId
                }
                if (this.filterForm.status !== '') {
                    params += '&status=' + this.filterForm.status
                }
                if (this.filterForm.lazyEnter !== '') {
                    params += '&lazyEnter=' + this.filterForm.lazyEnter
                }
                if (this.filterForm.upChange !== '') {
                    params += '&upChange=' + this.filterForm.upChange
                }
                if (this.filterForm.dateTime && this.filterForm.dateTime.length) {
                    params = params + '&startDate=' + this.filterForm.dateTime[0] + '&endDate=' + this.filterForm.dateTime[1]
                }

                this.ajax.commonApi2(
                    'get',
                    'X',
                    params
                )
                    .then(res => {
                        this.tableData = res.data.extra.rows
                        this.total = res.data.extra.total
                        this.loading = false
                    })
            },
            onchangeType(){
                if (this.dataUploadfrom.type==1){

                    this.merchantTypeVisible=true;
                }else if (this.dataUploadfrom.type==2){
                    this.merchantTypeVisible=false;

                }
            }, 
            beforeUpload() {
                if (this.dataUploadfrom.billDate==""&&this.dataUploadfrom.type==1){
                    this.$alert("请选择账单日期", '提示', {
                        confirmButtonText: '确定',
                        callback: action => {

                        }
                    })
                    return false;
                }else{
                    this.uploadMask = this.$loading({
                        lock: true,
                        text: '文件上传中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    })
                }
            },beforeUpload2() {
                if (!this.ratifyUploadfrom.repChannelId) {
                    this.$message.warning('请先选择渠道')
                    return false
                }
                if (!this.ratifyUploadfrom.billMonth) {
                    this.$message.warning('请先选择月份')
                    return false
                }

                this.uploadMask = this.$loading({
                    lock: true,
                    text: '文件上传中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })

            },
            dataUploadSuccess(res){
                console.log(res, 'upload')
                if (!res.code) {
                    this.uploadMask.close()
                    this.$message({
                        type: 'success',
                        message: '上传成功'
                    })
                    this.dialogFormVisible3 = false
                    this.dataList()
                    this.activeCode = new Date() * 1
                } else {
                    this.$alert(res.errMsg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.uploadMask.close()
                            /*this.$message({
                                type: 'error',
                                message: res.errMsg
                            })*/
                        }
                    })
                }
            },
            download() {
                if (!this.ratifyUploadfrom.repChannelId) {
                    this.$message.warning('请先选择渠道')
                    return
                }
                if (!this.ratifyUploadfrom.billMonth) {
                    this.$message.warning('请先选择月份')
                    return
                }

                const loading = this.$loading({
                    lock: true,
                    text: '正在下载中，Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.ajax
                    .commonApi2('get', 'X', this.api.statement.ratifyDownload+"?billMonth="+this.ratifyUploadfrom.billMonth+"&repChannelId="+this.ratifyUploadfrom.repChannelId+"&bizType="+this.ratifyUploadfrom.bizType)
                    .then(res => {
                        window.location.href = res.request.responseURL
                        loading.close()
                    })
            },
            channel() {
                this.ajax.commonApi2('get', 'X', this.api.statement.channelPageList + '?page=1&size=500&status=0')
                    .then(res => {
                        if (res.data.extra) {
                            this.channelIdListData = res.data.extra.rows
                        }
                })
            }
        },
        mounted() {
            this.access_token = this.$ls.get("access_token");
            this.channel();
            this.dataList();
            this.queryAll();
            this.queryAllChannels();
            this.aggcode_token = this.$store.state.token;
            this.formInline.size = 5;
            if (this.$route.query.page) {
                // alert(this.$route.query.page)
                this.currentPage4 = this.$route.query.page * 1
            } else {
                this.formInline.page = this.page
            }
        }
    }
</script>

<style scoped>
    .el-table::before {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0px;
    }
    .tip {
        padding-left: 10px;
        color: red;
    }
    .tab-area {
        width: 100%;
        /*height: 40px;*/
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }
    .dialog2 {
        max-height: 300px;
        overflow-x: auto;
        width: 350px;
        padding: 0px;
        margin: 0px;
    }
    .dialog2 li {
        display: inherit;
    }
    .dialog2 .num {
        padding-right: 10px;
    }
    .upload-demo {
        margin-left: 10px;
    }
    .upload-demo2 {
        text-align: left;
    }
    .table-box {
        margin-top: 0;
    }
    /* 0723 修改 */
    .table-box .pagination {
        width: 100%;
        padding: 15px;
        margin-top: 20px;
        box-sizing: border-box;
        text-align: right;
    }
    .table-box .table-option-box {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .table-box .table-option-box >>> .el-button + .el-button {
        margin-left: 0;
        margin-top: 10px;
    }
    .table-page {
        margin: 20px 10px;
    }
    .table-page >>> .el-dialog {
        margin-top: 5vh !important;
    }
    .table-page >>> .el-dialog__body {
        padding: 0 50px 20px 50px;
    }
    .table-page >>> .el-input {
        width: 260px;
        margin-bottom: 0;
    }
    .table-page-2 >>> .el-input{
        margin-bottom: 0;
    }
    .table-page >>> .el-input .el-input__inner {
        height: 32px;
    }
    .table-page .filter-area {
        width: 100%;
        /*padding-left: 150px;*/
        margin-bottom: 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .table-page .filter-area >>> .input.el-input__inner {
        width: 400px;
        margin-left: 20px;
    }
    .table-page .filter-area >>> .el-form-item {
        margin-bottom: 0;
    }
    .table-page .option-area {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .table-page .option-area >>> .el-form-item {
        margin-bottom: 0;
    }
    .table-page .option-area .option-box {
        display: flex;
        align-items: center;
    }
    .table-page .option-area .option-box .option-btn {
        height: 32px;
        padding: 0 30px;
        margin-bottom: 0;
        margin-left: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background: #70a2ed;
        color: #fff;
        border: 1px solid #70a2ed;
        cursor: pointer;
    }
    .table-page .option-area .option-box .option-btn:hover {
        background: #6f8ace;
    }
    .table-page .search-btn {
        width: 96px;
        height: 30px;
        margin-left: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        border: 1px solid #70a2ed;
        cursor: pointer;
    }
    .table-page .search-btn:hover {
        background: #70a2ed;
        color: #fff;
    }
    .table-page >>> .el-range-editor.el-input__inner {
        height: 32px;
        padding: 0 10px;
    }
    .table-page >>> .el-date-editor .el-range-input, .el-date-editor .el-range-separator {
        height: 20px;
    }
    .table-page >>> .el-table {
        height: 410px;
        overflow-y: scroll;
    }
    .table-page >>> .el-table td {
        padding: 6px 0;
    }
    .table-page >>> .el-table th {
        padding: 6px 0;
    }
    .el-dialog__wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .table-page .data-area {
        padding: 20px 0;
        display: flex;
        flex-direction: column;
    }
    .table-page .data-area .pagination-area {
        padding-top: 20px;
        text-align: right;
    }
    .table-page .pagination-area >>> .el-input {
        width: 100px;
    }
    .dialogs {
        width: 1000px;
        text-align: left;
        height: 550px;
    }
    .more {
        height: 20px;
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .tab-area .sync-btn {
        margin-right: 20px;
    }

    .sync-btn-float-right {
        float: right;

    }

    .tab-area .filter-area {
        /*height: 40px;*/
    }
    .tab-area .tip {
        margin: 10px 10px 0px 10px;
        overflow: hidden;
    }
    .tab-area .tip li {
        font-size: 14px;
        display: block;
        margin-bottom: 15px;
    }
    .check-box {
        overflow: hidden;
        margin-bottom: 15px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 15px;
    }

    .tab-area .sync-btn-noright{
        margin-right: 0px;
    }
</style>
