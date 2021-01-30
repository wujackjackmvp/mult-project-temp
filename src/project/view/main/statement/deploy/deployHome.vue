<template>
    <div class="c-content-inner">
        <div class="search-box">
            <div class="search-box-head">
                <div style="float:left;margin-right:10px;">
                    <el-button :loading="isLoading"  type="primary" @click="download()">下载模板</el-button>
                </div>
                <el-upload
                    style="float:left;margin-right:10px;"
                    class="upload-demo"
                    ref="upload"
                    :action="uploadExcelUrl"
                    :headers="{'token':access_token}"
                    :show-file-list="false"
                    :before-upload="beforeUpload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="uploadSuccess"
                    :file-list="fileList"
                    :on-error="onError"
                >
                    <el-button :loading="isLoading02" slot="trigger" type="primary">上传文件</el-button>
                    <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                    <!-- <div slot="tip" class="el-upload__tip">上传文件大小不能超过10M</div> -->
                </el-upload>
<!--                <div style="float:left;margin-right:10px;">-->
<!--                    <el-button type="primary" @click="dialogFormVisible1=true">匹配成本</el-button>-->
<!--                </div>-->
<!--                <div style="float:left;margin-right:10px;">-->
<!--                    <el-button type="primary" @click="dialogFormVisible = true">处理数据</el-button>-->
<!--                </div>-->
            </div>
            <el-dialog title="匹配成本费率" width="450px" :visible.sync="dialogFormVisible1">
                <el-date-picker
                    v-model="dataTime"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                >
                </el-date-picker>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="dealData()">确 定</el-button>
                </div>
            </el-dialog>
            
            <el-dialog title="处理数据" width="450px" :visible.sync="dialogFormVisible">
                <el-date-picker
                    v-model="dataTime"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="change"
                >
                </el-date-picker>
                <div class="moreThree">（注意：选择日期不能超过31天且不能跨月）</div>
                <div v-show="!timeOutTip" class="timeOutTip">
                    选择日期不能超过31天且不能跨月
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deldata()">确 定</el-button>
                </div>
            </el-dialog>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="部门信息" name="DepartMent" />
                <el-tab-pane label="拓展人" name="District" />
                <el-tab-pane label="商户信息" name="Service" />
                <el-tab-pane label="特殊商户" name="Special" />
                <!-- <el-tab-pane label="代理商信息" name="agentMsg" /> -->
                <!-- <el-tab-pane label="讯联渠道商户信息" name="relation"></el-tab-pane> -->
                <!-- <el-tab-pane label="代理商" name="agent"></el-tab-pane>-->
                <!-- <el-tab-pane label="公立医院" name="hospital"></el-tab-pane>-->
            </el-tabs>
            <!-- <el-button size="mini" type="primary" class="primaryBut">上传数据</el-button> -->
            <!-- dealDataAggByConfig -->
            <!-- <el-button size="mini" type="primary" class="primaryBut" v-if="scope.row.status == 'CHECK_PENDING' && $store.state.pmsAggcodePassRequest" @click="disable(scope.$index, scope.row)">上传数据</el-button> -->
        </div>
        <router-view :key="activeCode" />
    </div>
</template>

<script>
    import moment from 'moment'
    import { apiHost2 } from '@/utils/ajax.js'
    import api from '../../../../utils/api'
    
    export default {
        watch:{
            $route(to,from){
                if(to.name === 'DepartMent'){
                    this.activeName = 'DepartMent'
                }
            }
        },
        data() {
            return {
                activeName: 'DepartMent',
                fileList: [],
                aggcode_token: '',
                uploadExcelUrl: apiHost2 + api.statement.UploadConfig,
                dataTime: '',
                dialogFormVisible: false,
                dialogFormVisible1: false,
                timeOutTip: true,
                beginDate: '',
                endDate: '',
                activeCode: null,
                uploadMask: null,
                access_token: '',
                isLoading: false,
                isLoading02: false
            }
        },
        methods: {
            handleClick(tab, event) {
                let routerObj = {
                    DepartMent: 'DepartMent',
                    District: 'District',
                    Service: 'Service',
                    Special: 'Special'
                }
                console.log(routerObj[this.activeName])
                this.$router.push({
                    name: routerObj[this.activeName]
                    // query: { type: 'service' }
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList)
            },
            handlePreview(file) {
                console.log(file)
            },
            beforeUpload() {
                this.isLoading02 = true
            },
            uploadSuccess(res) {
                if (!res.code) {
                    this.isLoading02 = false
                    this.$message({
                        type: 'success',
                        message: '上传成功'
                    })
                    this.activeCode = new Date() * 1
                } else {
                    this.isLoading02 = false
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
            onError(res) {
                console.log(res, 'uploaderr')
            },
            async download() {
                try {
                    this.isLoading = true
                    let res = await this.ajax   
                        .commonApi2('get', 'X', this.api.statement.configDownload)
                    concole.log(res)
                    this.isLoading = false
                    if(res.data.code === 0){
                        this.$message({
                            message: res.data.errMsg,
                            type: 'success'
                        })
                    }
                } catch (error) {
                    this.isLoading = false
                }
            },
            deldata() {
                this.beginDate = this.dataTime[0]
                this.endDate = this.dataTime[1]
                
                if (this.timeOutTip) {
                    this.dialogFormVisible = false
                    const loading = this.$loading({
                        lock: true,
                        text: '正在处理中，Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    })
                    
                    this.ajax
                        .commonApi2(
                            'post',
                            'X',
                            this.api.statement.dealDataAggByConfig +
                            '?beginDate=' +
                            this.beginDate +
                            '&endDate=' +
                            this.endDate
                        )
                        .then(res => {
                            // console.log(res.data.code)
                            if (!res.data.code) {
                                this.$message({
                                    message: '处理数据成功',
                                    type: 'success'
                                })
                                loading.close()
                            } else {
                                this.$message({
                                    message: '处理数据失败',
                                    type: 'error'
                                })
                                loading.close()
                            }
                        })
                }
            },
            dealData() {
                this.beginDate = this.dataTime[0]
                this.endDate = this.dataTime[1]
                
                if (this.timeOutTip) {
                    this.dialogFormVisible1 = false
                    const loading = this.$loading({
                        lock: true,
                        text: '正在匹配成本费率中，Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    })
                    
                    this.ajax
                        .commonApi2(
                            'post',
                            'X',
                            this.api.statement.updateDataAggCostRate +
                            '?beginDate=' +
                            this.beginDate +
                            '&endDate=' +
                            this.endDate
                        )
                        .then(res => {
                            console.log(res.data.code)
                            if (!res.data.code) {
                                this.$message({
                                    message: '匹配成本费率成功',
                                    type: 'success'
                                })
                                loading.close()
                            } else {
                                this.$message({
                                    message: '匹配成本费率失败',
                                    type: 'error'
                                })
                                loading.close()
                            }
                        })
                }
            },
            change(res) {
                var b = res[0].split('-')
                var oldTime = new Date(b[0], b[1] - 1, b[2])
                
                var b2 = res[1].split('-')
                var oldTime2 = new Date(b2[0], b2[1] - 1, b2[2])
                if (b[1] < b2[1]) {
                    this.$message({
                        message: '日期不能跨月',
                        type: 'error'
                    })
                    
                    return
                }
                this.timeOutTip = (oldTime2 - oldTime) / (1000 * 60 * 60 * 24) < 31
            }
        },
        mounted() {
            this.access_token = this.$ls.get('access_token')
            this.$router.push({
                name: 'DepartMent'
            })
            this.aggcode_token = this.$store.state.token
        }
    }
</script>

<style scoped>
    .moreThree {
        margin-top: 10px;
    }
    .timeOutTip {
        margin-top: 5px;
        color: red;
    }
    .search-box-head {
        overflow: hidden;
        padding-bottom: 10px;
    }
    .search-box {
        width: 100%;
        position: relative;
    }
    .table-page {
        margin: 20px 10px;
        text-align: right;
    }
    #search-box .el-tabs__item {
        font-size: 16px;
    }
    .tabs_color {
        color: red;
    }
    .primaryBut {
        width: 80px;
        height: 28px;
        position: absolute;
        right: 10px;
        top: 0px;
    }
    a:-webkit-any-link {
        text-decoration: none;
    }
</style>
