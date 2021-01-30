<template>
    <el-dialog
        :visible="show"
        width="40vw"
        title="批量查询导出"
        append-to-body
        @close="closeXlsDialog"
    >
        <p>
            第一步：下载批量查询导出模板
            <a
                :href="`../../../../../static/excel/${downLoadName}.xlsx`"
                class="template-a"
                >点击下载</a
            >
        </p>
        <p>
            第二步：上传填写好的查询模板文件
            <!-- , .xls -->
            <input
                id="uploadTemplate"
                type="file"
                hidden
                accept=".xlsx"
                @change="uploadTemplate($event)"
            />
            <label for="uploadTemplate" class="uploadbtn">
                <span>选择文件</span>
            </label>
        </p>
        <p>文件名：{{ fileName }}</p>
        <div slot="footer" class="sn-container-footer">
            <el-button type="success" @click="importExData">提交导入</el-button>
            <el-button type="warning" @click="closeXlsDialog">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import XLSX from 'xlsx'
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        downLoadName:{
            type:String,
            default:'交易明细批量查询导出'
        }
    },
    data() {
        return {
            fileName: "",
            file:''
        };
    },
    methods: {
        closeXlsDialog() {
            this.$emit("update:show", false);
        },
        uploadTemplate(e) {
            const event = e;
            const _this = this;
            const file = event.target.files[0];
            // const reg = /\.(?:xls|xlsx)$/;
            const reg = /\.(xlsx)$/;
            if (!reg.test(file.name)) {
                this.$message.error("只能上传execl后缀.xlsx文件！");
                return;
            }
            this.file = file
            console.log('file')
            console.log(file)
            this.fileName = file.name;
            // console.log(this.file)
            // console.log('??',this.fileName)
            // file文件流读取数据
            // const reader = new FileReader();
            // reader.onload = function (e) {
            //     try {
            //         const data = e.target.result;
            //         // 解析xls
            //         const workbook = XLSX.read(data, {
            //             type: "binary",
            //         });
            //         // 取第一列的数据 {header : 1} 读取表头
            //         event.target.value = null;
            //         const resolveData = XLSX.utils.sheet_to_json(
            //             workbook.Sheets[workbook.SheetNames[0]]
            //         );
            //           console.log('resolveData')
            //           console.log(resolveData)
                 
            //         // const result = resolveData.map((i) => {
            //         //     // 取每行第一二格数据
            //         //     return [i["退费申请号"], i["是否退费"]];
            //         // });
            //         _this.fileName = file.name;
            //         // _this.exportPostData = exportPostData;
            //     } catch (error) {
            //         _this.$message.error("文件解析失败:" + error);
            //         console.error(error);
            //     }
            // };
            // reader.readAsBinaryString(file);
        },
        importExData() {
            if(!this.file){
                this.$message.error('请选择上传文件');
            }
            this.$emit('importSuccess',this.file)
        },
    },
};
</script>

<style lang="less" scoped>
.uploadbtn {
    margin-left: 12px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
    margin-right: 10px;
}
</style>
