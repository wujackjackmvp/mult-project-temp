<template>
  <div>
      <!-- {{channelList}} -->
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
        <el-form-item label="拓展人名称">
          <el-input clearable style="width:200px" v-model.trim="formInline.expander" placeholder="请输入代理商名称"></el-input>
        </el-form-item>
        <el-form-item label="归属月份">
            <el-date-picker
                clearable
                v-model="formInline.belongMonth"
                type="month"
                value-format="yyyy-MM"
            />
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="clearFrom">重置</el-button>
        <el-button type="primary" @click="downloadMerchant">下载模板</el-button>
        <el-upload
            style="display:inline-block;margin-left:10px;"
            class="upload-demo"
            ref="upload"
            :action="uploadMerchant"
            :headers="{'token':access_token}"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="uploadSuccess"
            :file-list="fileList"
            :on-error="onError"
        >
            <el-button :loading="isupload" slot="trigger" type="primary">上传文件</el-button>
        </el-upload>
        <!-- <el-button type="primary" @click="uploadMerchant">上传文件</el-button> -->
    </el-form>
    <div class="table-box">
      <el-table v-loading="loading" border :data="tableData" style="width: 100%">
        <el-table-column prop="repChannelName" label="渠道" />
        <el-table-column prop="jhAccount" label="账号" />
        <el-table-column prop="merchantId" label="商户编号" />
        <el-table-column prop="merchantName" label="商户名称" />

        <el-table-column prop="firstOrderTime" label="首笔交易时间" />
        <el-table-column prop="expander" label="拓展人名称" />
        <el-table-column 
          prop="status" 
          label="拓展人状态" 
          :formatter="formatter.expandStatusFormat"
        />
        <el-table-column prop="departName" label="归属指标部门" />
        <el-table-column prop="belongMonth" label="归属月份" />
        <!-- <el-table-column prop="backRate" label="返佣费率" width="400">
        </el-table-column> -->
      </el-table>
    </div>

    <div class="table-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page "
        :page-sizes="[10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { apiHost2 } from '@/utils/ajax.js'
  import formatter from "@/utils/filter/formatter";

  // import { repChannelList } from "@/sercive/api/channelSercive";
  import { pageMerchantNew, downloadMerchant } from "@/sercive/api/configMsgSercive";
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        formatter,
        uploadMerchant: apiHost2 + '/v3/configInfo/uploadMerchant',
        access_token: '',
        fileList: [],
        channelIdListData: [],
        formInline: {
            repChannelId: undefined,
            merchantName: '',
            merchantId: undefined,
            expander: '',
            belongMonth: ''
        },
        dataTime: '',
        tableData: [],
        currentRow: null,
        // 翻页
        page: 1,
        size: 10,
        loading: false,
        total: 0,
        isupload: false
      }
    },
    computed:{
      ...mapState([
        'channelList'
      ])
    },
    methods: {
      handleRemove(file, fileList) {
          console.log(file, fileList)
      },
      handlePreview(file) {
          console.log(file)
      },
      beforeUpload() {
          this.isupload = true
      },
      uploadSuccess(res) {
          if (!res.code) {
              this.isupload = false
              this.$message({
                  type: 'success',
                  message: '上传成功'
              })
          } else {
              this.isupload = false
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
      onSubmit() {
        this.page = 1
        this.pageMerchantNew()
      },
      indexMethod(index) {
        return index + 1
      }, 
      async pageMerchantNew() {
        this.loading = true
        let params = {
          ...this.formInline,
          page: this.page,
          size: this.size
        }
        let res = await pageMerchantNew(params)
          this.tableData = res.data.extra.rows
          this.total = res.data.extra.total
          this.loading = false
      },
      clearFrom(){
        this.page = 1
        this.formInline = this.$options.data().formInline
        this.pageMerchantNew()
      },
      // 翻页
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.size = val
        this.loading = true
        this.pageMerchantNew()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page = val
        this.loading = true
        this.pageMerchantNew()
      },
      // 下载模板
      async downloadMerchant(){
        let res = await downloadMerchant({belongMonth: this.formInline.belongMonth})
        console.log("res",res)
        if(res.data.code === 0){
          this.$message({
              type: 'success',
              message: res.data.errMsg
          })
        }
      }
    },
    mounted() {
      this.pageMerchantNew()
      this.access_token = this.$ls.get('access_token')
    }
  }
</script>

<style scoped>
  .search-box {
    width: 100%;
    position: relative
  }
  .table-page {
    margin: 20px 10px;
    text-align: right
  }
  #search-box .el-tabs__item {
    font-size: 16px;
  }
  .tabs_color {
    color: red
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
