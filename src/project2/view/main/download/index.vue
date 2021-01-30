<template>
    <div class="c-content-inner">
        <el-table :data="tableData" style="width: 100%;" v-loading="loading">
            <el-table-column
                align="center"
                prop="fileName"
                label="文件名称"
            >
            </el-table-column>
            <el-table-column
                align="center"
                prop="state"
                :formatter="formatterStatus"
                label="状态"
                width="180"
            >
            </el-table-column>
            <el-table-column
                align="center"
                prop="createTime"
                label="生成时间"
                width="180"
            >
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button
                        :disabled="scope.row.state != 1"
                        @click="download(scope.row)"
                        type="text"
                        size="small"
                        >下载</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <div class="table-page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {downloadList} from '@/sercive/api/downloadService'
import {mapState} from 'vuex'
export default {
    name: "downloadList",
    data() {
        return {
            pageNo: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            loading:false
        };
    },
    computed:{
        ...mapState({
            'userId': ( state ) => state.userInfo.userId
        })
    },
    created(){
        this.getDownloadList()
    },
    methods: {
        formatterStatus(row){
            const mapState = {
                0:'生成失败',1:'生成成功',2:'生成中'
            }
            return mapState[row.state]
        },
        getDownloadList(){
            this.loading = true
            downloadList({
                userId:this.userId,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res=>{
                if(res.data.extra){
                    this.tableData = res.data.extra.rows
                    this.total = res.data.extra.total
                }
                this.loading = false
            }).catch(e=>{
                this.loading = false
            })
        },
        download(row) {
            window.location.href = row.downloadUrl
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getDownloadList();
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getDownloadList();
        },
    },
};
</script>

<style scoped>
.table-page {
    margin: 20px 10px;
    text-align: right;
}
</style>
