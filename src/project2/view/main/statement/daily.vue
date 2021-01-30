<template>
    <div class="c-content-inner">
        <el-button type="primary" @click="dialogFormVisible = true"
            >生成日报</el-button
        >
        <div class="search-box" style="float:right">
            <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
            >
                <el-form-item label="时间">
                    <el-date-picker
                        v-model="dataTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-form-item>

                <!-- <el-form-item label="活动区域">
                <el-select v-model="formInline.region" placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item> -->

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <!-- <el-button type="primary" @click="reset" plain>重置</el-button> -->
                </el-form-item>
            </el-form>
        </div>

        <div class="table-box">
            <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                border
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    type="index"
                    :index="indexMethod"
                    label="序号"
                    width="50"
                >
                </el-table-column>
                <el-table-column prop="dailyDate" label="日报">
                </el-table-column>
                <el-table-column prop="operator" label="操作人">
                </el-table-column>
                <el-table-column prop="createTime" label="生成时间">
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)"
                            >查看</el-button
                        >
                        <!-- <el-button size="mini" type="primary">下载</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="table-page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="parseInt(size)"
                layout="total, sizes, prev, pager, next, jumper"
                :total="parseInt(total)"
            >
            </el-pagination>
        </div>

        <el-dialog
            title="选择日期"
            :visible.sync="dialogFormVisible"
            width="350px"
        >
            <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="dateSelect"
                type="date"
                placeholder="选择日期"
            >
            </el-date-picker>
            <div v-if="tiptxt" style="margin-top:15px;">请选择日期</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onBuild()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogFormVisible: false,
            dateSelect: "",
            formInline: {
                operation: "",
                user: "",
                ip: "",
                region: ""
            },
            dataTime: "",
            tableData: [],
            currentRow: null,
            // 翻页
            currentPage4: 0,
            page: "0",
            size: "8",
            loading: true,
            total: "400",
            tiptxt: ""
        };
    },
    methods: {
        onSubmit() {
            if (this.dataTime) {
                this.formInline.startTime = this.dataTime[0] + " 00:00:00";
                this.formInline.endTime = this.dataTime[1] + " 23:59:59";
            } else {
                this.formInline.startTime = "";
                this.formInline.endTime = "";
            }
            this.currentPage4 = 1;
            this.dataList();
        },
        indexMethod(index) {
            return index + 1;
        },
        dataList() {
            // this.formInline.page = '0'
            this.ajax
                .commonApi2(
                    "post",
                    "JSON",
                    this.api.statement.dailyList,
                    this.formInline
                )
                .then(res => {
                    this.tableData = res.data.extra.rows;
                    this.total = res.data.extra.total;
                    if (res.data.extra) {
                        this.loading = false;
                    } else {
                        this.loading = true;
                    }
                });
        },
        handleEdit(index, row) {
            console.log(index, row);
            this.$router.push({
                path: "/statement/dailyhome",
                query: {
                    page: this.formInline.page + 1,
                    id: row.id,
                    mount: row.dailyDate
                }
            });
            //  console.log(row.id)
        },
        // 翻页
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.formInline.size = val;
            this.dataList();
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.formInline.page = val - 1;
            this.loading = true;
            this.dataList();
        },
        reset() {
            this.formInline.operation = "";
            this.formInline.user = "";
            this.formInline.ip = "";
            this.formInline.region = "";
            this.dataTime = "";
            this.formInline = JSON.parse(JSON.stringify(this.formInline));
        },
        onBuild() {
            if (!this.dateSelect) {
                this.tiptxt = true;
                return;
            }
            this.tiptxt = false;
            const loading = this.$loading({
                lock: true,
                text: "正在生成中，Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });

            // if()
            this.dialogFormVisible = false;
            this.ajax
                .commonApi2("post", "JSON", this.api.statement.dailyBuild, {
                    generateDate: this.dateSelect
                })
                .then(res => {
                    console.log(res);
                    if (!res.data.code) {
                        this.$message({
                            type: "success",
                            message: "生成成功"
                        });
                        this.dataList();
                    } else {
                        this.$message({
                            type: "error",
                            message: "生成失败，该日期尚有信息未完善"
                        });
                    }

                    loading.close();
                })
                .catch(err => {
                    this.$message({
                        type: "error",
                        message: "生成失败，该日期尚有信息未完善"
                    });
                    loading.close();
                });
        }
    },
    mounted() {
        this.formInline.size = 10;
        if (this.$route.query.page) {
            // alert(this.$route.query.page)
            this.currentPage4 = this.$route.query.page * 1;
        } else {
            this.formInline.page = this.page;
        }
    },
    computed: {
        code() {
            return this.$store.state.code;
        }
    }
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
</style>
