<template>
  <div>
    <div>
      <el-form :inline="true" :model="formInline">
        <el-form-item label="渠道">
          <el-select
            clearable
            v-model="formInline.repChannelId"
            collapse-tags
            style="width:300px;"
            placeholder="请选择渠道"
          >
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.repChannelName"
              :value="item.repChannelId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户编号">
          <el-input clearable style="width:200px" v-model.trim="formInline.merchantId" placeholder="请输入代理商名称"></el-input>
        </el-form-item>
        <el-form-item label="商户名称">
          <el-input clearable style="width:200px" v-model.trim="formInline.merchantName" placeholder="请输入代理商名称"></el-input>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="clearFrom">重置</el-button>
        <!-- <el-button type="primary" @click="uploadData()">费率上传</el-button> -->
      </el-form>
    </div>
    <div class="table-box">
      <el-table v-loading="loading" border :data="tableData" style="width: 100%">
        <el-table-column prop="repChannelId" label="渠道编号" width="180" />
        <el-table-column prop="merchantId" label="商户编号" />
        <el-table-column prop="merchantName" label="商户名称" width="230" />
        <el-table-column prop="costRate" label="成本" />
        <el-table-column prop="rebateRate" label="返佣费率" />
        <el-table-column prop="ratio" label="比率" />
        <el-table-column prop="industryIdDesc" label="商户性质" />
        <el-table-column prop="startDate" label="生效日期" />
      </el-table>
    </div>

    <div class="table-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 特殊商户费率上传 -->
    <el-dialog
      title="特殊商户费率上传"
      width="540px"
      :visible.sync="dialogFormVisible1"
      class="dialog"
      element-loading-text="上传数据中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-form :model="dataUploadfrom">
        <div class="filter-area">
          <el-form-item label="渠道名称" :label-width="formLabelWidth">
            <el-select
              v-model="dataUploadfrom.channelId"
              collapse-tags
              style="margin-left: 0px;width:350px;"
              placeholder="请选择渠道"
            >
              <el-option
                v-for="item in channelList"
                :key="item.id"
                :label="item.repChannelName"
                :value="item.repChannelId"
              ></el-option>
            </el-select>
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
            :data="dataUploadfrom"
          >
            <el-form-item label="费率文件" :label-width="formLabelWidth">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">仅支持xls、xlsx、csv文件格式</div>
            </el-form-item>
          </el-upload>
        </div>

        <div style="height: 30px;"></div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { apiHost2 } from "../../../../utils/ajax.js";
import { pageMerchantSpecial } from "@/sercive/api/configMsgSercive";
import { repChannelList } from "@/sercive/api/channelSercive";
  import { mapState } from 'vuex'
// pageMerchantSpecial
export default {
  data() {
    return {
      channelIdListData: [],
      formInline: {
        repChannelId: undefined,
        merchantName: "",
        merchantId: undefined,
        expander: "",
        belongMonth: "",
      },
      dataTime: "",
      uploadExcelUrl3: apiHost2 + "/v3/configInfo/uploadMerchantSpceial",
      tableData: [],
      currentRow: null,
      dialogFormVisible1: false,
      // 翻页
      page: 1,
      size: 10,
      loading: true,
      total: 0,
      form: {
        region: "",
        dataTime: [],
      },
      formLabelWidth: "120px",
      dataUploadfrom: {
        channelId: undefined
      },
      aggcode_token: "",
      fileList: [],
      channelIdListData: [],
      access_token: "",
    };
  },
  computed:{
    ...mapState([
      'channelList'
    ])
  },
  methods: {
    onSubmit() {
      this.page = 1;
      this.pageMerchantSpecial();
    },
    indexMethod(index) {
      return index + 1;
    },
    async pageMerchantSpecial() {
      this.loading = true;
      let params = {
        ...this.formInline,
        page: this.page,
        size: this.size,
      };
      let res = await pageMerchantSpecial(params);
      this.tableData = res.data.extra.rows;
      this.total = +res.data.extra.total;
      this.loading = false;
    },
    handleEdit(index, row) {
      //  console.log(index,row)
      this.$router.push({
        path: "/merchant/merDetail",
        query: { page: this.page + 1, id: row.merchantId },
      });
      //  console.log(row.id)
    },
    // 翻页
    clearFrom() {
      this.page = 1;
      this.formInline = this.$options.data().formInline;
      this.pageMerchantSpecial();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.pageMerchantSpecial();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.pageMerchantSpecial();
    },
    uploadSuccess(res) {
      console.log(res, "upload");
      if (!res.code) {
        this.uploadMask.close();
        this.$message({
          type: "success",
          message: "上传成功",
        });
        this.activeCode = new Date() * 1;
      } else {
        this.$alert(res.errMsg, "提示", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "error",
              message: res.errMsg,
            });
          },
        });
      }
    },
    beforeUpload() {
      if (!this.dataUploadfrom.channelId) {
        this.$message.warning("请先选择渠道");
        return false;
      }
      this.uploadMask = this.$loading({
        lock: true,
        text: "文件上传中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    uploadData() {
      this.dialogFormVisible1 = true;
    },
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    dataUploadSuccess(res) {
      console.log(res, "upload");
      if (!res.code) {
        this.uploadMask.close();
        this.$message({
          type: "success",
          message: "上传成功",
        });
        this.dialogFormVisible1 = false;
        this.pageMerchantSpecial();
        this.activeCode = new Date() * 1;
      } else {
        this.$alert(res.errMsg, "提示", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.uploadMask.close();
          },
        });
      }
    },
    onError(res) {
      this.$message({
        type: "error",
        message: "上传失败，重新上传",
      });
    }
  },
  mounted() {
    this.access_token = this.$ls.get("access_token");
    this.pageMerchantSpecial();
  },
};
</script>

<style scoped>
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
