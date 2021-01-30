<template>
    <!-- 核准生成框 -->
    <el-dialog
        :title="'核准生成'"
        :visible.sync="dialogFormVisible"
        width="970px"
        :before-close="cancelReport"
    >
        <el-row style="margin-bottom:20px;">
            <el-col>
                <div
                    class="grid-content bg-purple-dark flex-s"
                    style="background-color: rgb(236, 245, 255);padding:10px"
                >
                    <i
                        class="el-icon-info"
                        style="color: cornflowerblue;font-size:30px;margin-right: 10px"
                    ></i>
                    <div
                        class="flex-s"
                        style="color:rgb(83, 168, 255);font-size:14px"
                    >
                        可同时生成一个季度的核准报表
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-form :inline="true" :model="dialogForm">
            <el-row v-for="(item, index) in approveBuild" :key="index">
                <el-form-item label="月份:" style="margin-left:20px">
                    <el-date-picker
                        style="width:200px;"
                        type="month"
                        v-model="item.month"
                        value-format="yyyy-MM"
                        placeholder="选择月份"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item style="margin-left:20px">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="showTableForPhonePay(item.month, index)"
                        >选择移动核准记录</el-button
                    >
                    <el-tag type="success" v-if="item.movePayment.length > 0"
                        >已选择</el-tag
                    >
                    <el-tag v-else>未选择</el-tag>
                </el-form-item>
                <el-form-item style="margin-left:20px">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="showTableForCard(item.month, index)"
                        >选择刷卡核准记录</el-button
                    >
                    <el-tag type="success" v-if="item.swipeCard.length > 0"
                        >已选择</el-tag
                    >
                    <el-tag v-else>未选择</el-tag>
                </el-form-item>
                <el-form-item style="margin-left:20px">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="showTableForAdjust(item.month, index)"
                        >调整明细选择</el-button
                    >
                    <el-tag type="success" v-if="item.adjustNos.length > 0"
                        >已选择</el-tag
                    >
                    <el-tag v-else>未选择</el-tag>
                </el-form-item>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="cancelReport">取 消</el-button>
            <el-button type="primary" @click.native="addReport"
                >确 定</el-button
            >
        </div>
    </el-dialog>
</template>

<script>
import { addReport } from "@/sercive/api/agencySercive";
export default {
    data() {
        return {
            dialogFormVisible: false,
            dialogForm: {
                buildYear: null,
                types: "",
                tiaozheng: null
            },
            approveBuild: [
                {
                    movePayment: [],
                    swipeCard: [],
                    adjustNos:[],
                    month: null
                },
                {
                    movePayment: [],
                    swipeCard: [],
                    adjustNos:[],
                    month: null
                },
                {
                    movePayment: [],
                    swipeCard: [],
                    adjustNos:[],
                    month: null
                }
            ]
        };
    },
    watch: {
        dialogFormVisible: {
            handler: val => {
                console.log(this);
                // if(!val) this.approveBuild = Object.assign({}, this.$options.data().approveBuild);
            }
        }
    },
    methods: {
        showRatityAdd() {
            this.dialogFormVisible = true;
        },
        cancelReport() {
            this.dialogFormVisible = false;
            this.approveBuild = this.$options.data().approveBuild;
        },
        vaildBeforeShowSel(month) {
            let result = {
                vaild: true,
                msg: ""
            };
            if (month === "" || month === null) {
                result.msg = "请选择月份";
                result.vaild = false;
                return result;
            }
            let haveRepeactMonth = this.$vaild.haveRepeactMonth(
                this.approveBuild
            );
            if (haveRepeactMonth) {
                result.msg = "存在重复月份,请修改";
                result.vaild = false;
                return result;
            }
            return result;
        },
        async showTableForPhonePay(month, index) {
            let result = this.vaildBeforeShowSel(month, index);
            if (!result.vaild) {
                this.$message.error(result.msg);
                return;
            }
            this.selIndex = index;
            let cacheList = [];
            if (this.approveBuild[index].movePayment.length > 0) {
                cacheList = this.approveBuild[index].movePayment;
            }
            let params = {
                approveList: cacheList,
                index: this.selIndex,
                authorizeType: 0
            };
            this.$bus.$emit("showSelList", params);
        },
        showTableForCard(month, index) {
            let result = this.vaildBeforeShowSel(month, index);
            if (!result.vaild) {
                this.$message.error(result.msg);
                return;
            }
            this.selIndex = index;
            let cacheList = [];
            if (this.approveBuild[index].swipeCard.length > 0) {
                cacheList = this.approveBuild[index].swipeCard;
            }
            let params = {
                approveList: cacheList,
                index: this.selIndex,
                authorizeType: 1
            };
            this.$bus.$emit("showSelList", params);
        },
        showTableForAdjust(month,index){
            let result = this.vaildBeforeShowSel(month, index);
            if (!result.vaild) {
                this.$message.error(result.msg);
                return;
            }
            this.selIndex = index;
            // let cacheList = [];
            // if (this.approveBuild[index].adjustNos.length > 0) {
            //     cacheList = this.approveBuild[index].adjustNos;
            // }
            //  this.approveBuild
            let params = {
                approveList: this.approveBuild,
                index: this.selIndex
            };
            this.$bus.$emit("showAdjustSelList", params);
        },
        vaild() {
            let result = {
                msg: "",
                vaild: true
            };
            let haveOption = this.$vaild.haveOption(this.approveBuild);
            let haveMonth = this.$vaild.haveMonth(this.approveBuild);
            let haveRepeactOpt = this.$vaild.haveRepeactOpt(this.approveBuild);
            if(!haveMonth){
                result.msg = "请选择月份";
                result.vaild = false;
                return result;                
            }else if (!haveOption) {
                result.msg = "请选择核准记录";
                result.vaild = false;
                return result;
            } else if (!haveRepeactOpt.vaild) {
                result.msg = haveRepeactOpt.msg;
                result.vaild = false;
                return result;
            }
            return result;
        },
        async addReport() {
            let result = this.vaild();
            if (!result.vaild) {
                this.$message.error(result.msg);
                return;
            }
            let addReportVoList = this.filterApproveBuild();
            let res = await addReport({
                addReportVoList
            });
            if (res.data.code === 0) {
                this.$message({
                    type: "success",
                    message: "生成成功!"
                });
                this.$emit("reGetList");
                this.dialogFormVisible = false;
                this.approveBuild = this.$options.data().approveBuild;
            } else {
                this.$message({
                    type: "error",
                    message: res.data.errMsg
                });
                // this.dialogFormVisible = false;
            }
        },
        filterApproveBuild() {
            let addReportVoList = [];
            this.approveBuild.forEach(item => {
                if (
                    item.month !== "" &&
                    (item.movePayment.length > 0 || item.swipeCard.length > 0)
                ) {
                    addReportVoList.push(item);
                }
            });
            return addReportVoList;
        }
    },
    mounted() {
        this.$bus.$on("hadSelectApprove", params => {
            let { index, approveList, authorizeType } = params;
            if (authorizeType === 1) {
                this.approveBuild[index].swipeCard = approveList;
            } else {
                this.approveBuild[index].movePayment = approveList;
            }
        });
    }
};
</script>

<style></style>
