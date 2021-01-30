<template>
  <div class="c-content-inner">
    
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <!-- <el-form-item label="选择日期"> -->
        <!-- <el-date-picker v-model="date" type="date" value-format="yyyy-MM-dd"></el-date-picker> -->
        <el-form-item label="选择日期:">
            <el-date-picker
                v-model="dataTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
            ></el-date-picker>
        </el-form-item>
      <!-- </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading2">查询</el-button>
        <el-button type="primary" @click="onExport" :loading="isLoading">导出估算版</el-button>
        <el-button type="primary" @click="onExportRatify" :loading="isLoading3">导出核准版</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="24">
        <el-tabs
          type="border-card"
          @tab-click="handleTabClick"
          v-model="activeName"
          v-loading="isTabLoading"
        >
          <el-tab-pane label="渠道" name="chanel">
            <div v-html="chanelTb" class="tableWrap"></div>
          </el-tab-pane>
          <el-tab-pane label="区域" name="area">
            <div v-html="areaTb" class="tableWrap"></div>
          </el-tab-pane>
          <el-tab-pane label="商户交易" name="trade">
            <div v-html="merchantTb" class="tableWrap"></div>
          </el-tab-pane>
          <el-tab-pane label="客户经理应收" name="expander">
            <div v-html="expanderTb" class="tableWrap"></div>
          </el-tab-pane>
          <el-tab-pane label="新增商户" name="newMech">
            <div v-html="newMechTb" class="tableWrap"></div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  repDailyExport,
  repDailyExportVaild,
  exportRatify,
  exportRatifyVaild,
  channelStatistics,
  areaStatistics,
  merchantStatistics,
  expanderStatistics,
  newMechantStatistics
} from "@/sercive/api/financeSercive";
// console.log("repDailyExport", repDailyExport)
import moment from "moment";
export default {
  name: "detail",
  data() {
    return {
      isLoading: false,
      isLoading2: false,
      isLoading3: false,
      isTabLoading: false,
      chanelTb: null,
      areaTb: null,
      merchantTb: null,
      expanderTb: null,
      newMechTb: null,
      formInline: null,
      date: null,
      dataTime:[moment().startOf('month').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')],
      activeName: "chanel",
      form:{
        startDate:moment().startOf('month').format('YYYY-MM-DD'),
        endDate:moment().format('YYYY-MM-DD')
      }
    };
  },
  watch:{
    dataTime(val){
      if(val){
           const start = moment(val[0]);
           const end = moment(val[1]);
          if(start.years() != end.years()){
              this.$message({
                    message:`选择日期不支持跨年`,
                    type:'warning'
              })
              this.dataTime = null
              return
          }
        this.form.startDate = val[0]
        this.form.endDate = val[1]
      }else{
        this.form.startDate = null
        this.form.endDate = null
      }
    }
  },
  methods: {
    handleTabClick(tabs) {
      let index = tabs.index;
      if (index == 0 && !this.chanelTb) this.getChannel();
      if (index == 1 && !this.areaTb) this.getArea();
      if (index == 2 && !this.merchantTb) this.getMerchant();
      if (index == 3 && !this.expanderTb) this.getExpander();
      if (index == 4 && !this.newMechTb) this.getNewMechant();
    },
    onSubmit() {
      // this.isLoading2 = true;
      if (this.activeName == 'chanel') this.getChannel();
      if (this.activeName == 'area') this.getArea();
      if (this.activeName == 'trade') this.getMerchant();
      if (this.activeName == 'expander') this.getExpander();
      if (this.activeName == 'newMech') this.getNewMechant();
      // this.activeName = "chanel";
      // this.getChannel();
    },
    async onExport() {
      this.isLoading = true;
      try {
        let resError = await repDailyExportVaild(
          { startDate:this.form.startDate,endDate:this.form.endDate , check: 1 }
        );
        if (resError.data.code === 1) throw resError.data.errMsg;
        console.log("repDailyExport",repDailyExport)
        let response = await repDailyExport(
          { startDate:this.form.startDate,endDate:this.form.endDate , check: 0 }
        );
        console.log("response", response)
        this.$message({ message: "操作成功，请到下载列表统一下载",type: "success"});
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.$message.error(error);
      }
    },
    async onExportRatify() {
      this.isLoading3 = true;
      try {
        let resError = await this.ajax.commonApi2(
          "post",
          "JSON",
          this.api.report.exportRatify,
          // { date: this.date, check: 1 }
          { startDate:this.form.startDate,endDate:this.form.endDate , check: 1 }
        );
        if (resError.data.code === 1) throw resError.data.errMsg;
        let res = await this.ajax.commonApi2(
          "post",
          "down",
          this.api.report.exportRatify,
          // { date: this.date, check: 0 }
          { startDate:this.form.startDate,endDate:this.form.endDate , check: 0 }
        );
        this.$message({ message: "操作成功，请到下载列表统一下载",type: "success"});
        this.isLoading3 = false;
      } catch (error) {
        console.log("error", error);
        this.isLoading3 = false;
        this.$message.error(error);
      }
    },
    getChannel() {
      if(!this.form.startDate||!this.form.endDate){
        this.$message.error('请选择日期')
        return
      }
      this.isTabLoading = true;
      this.isLoading2 = true;
      this.ajax
        .commonApi2("post", "JSON", this.api.report.channel,this.form )
        .then(res => {
          if (res.data.code === 1) {
            this.$message.error(res.data.errMsg);
            this.isLoading2 = false;
            this.isTabLoading = false;
            return;
          }
          let htmlStr = res.data.extra.result;
          this.chanelTb = htmlStr;
          this.isLoading2 = false;
          this.isTabLoading = false;
        });
    },
    getArea() {
      if(!this.form.startDate||!this.form.endDate){
        this.$message.error('请选择日期')
        return
      }
      this.isTabLoading = true;
      this.isLoading2 = true;
      this.ajax
        .commonApi2("post", "JSON", this.api.report.area,this.form )
        .then(res => {
          let htmlStr = res.data.extra.result;
          this.areaTb = htmlStr;
          this.isLoading2 = false;
          this.isTabLoading = false;
        });
    },
    getMerchant() {
      if(!this.form.startDate||!this.form.endDate){
        this.$message.error('请选择日期')
        return
      }
      this.isTabLoading = true;
      this.isLoading2 = true;
      this.ajax
        .commonApi2("post", "JSON", this.api.report.merchant, this.form)
        .then(res => {
          let htmlStr = res.data.extra.result;
          this.merchantTb = htmlStr;
          this.isLoading2 = false;
          this.isTabLoading = false;
        });
    },
    getExpander() {
      if(!this.form.startDate||!this.form.endDate){
        this.$message.error('请选择日期')
        return
      }
      this.isTabLoading = true;
      this.isLoading2 = true;
      this.ajax
        .commonApi2("post", "JSON", this.api.report.expander, this.form)
        .then(res => {
          let htmlStr = res.data.extra.result;
          this.expanderTb = htmlStr;
          this.isLoading2 = false;
          this.isTabLoading = false;
        });
    },
    getNewMechant() {
      if(!this.form.startDate||!this.form.endDate){
        this.$message.error('请选择日期')
        return
      }
      this.isTabLoading = true;
      this.isLoading2 = true;
      this.ajax
        .commonApi2("post", "JSON", this.api.report.newMechant, this.form)
        .then(res => {
          let htmlStr = res.data.extra.result;
          this.newMechTb = htmlStr;
          this.isLoading2 = false;
          this.isTabLoading = false;
        });
    }
  },
  mounted() {
    this.date = moment()
      .subtract(2, "days")
      .format("YYYY-MM-DD");
    this.isTabLoading = true;
    this.getChannel();
  }
};
</script>

<style>
.tableWrap {
  overflow: auto;
  padding: 10px;
}
.c-content-inner {
  overflow: auto;
}
.tableWrap td {
  border: 1px solid #eee;
  padding: 5px;
  word-break: keep-all;
}
</style>
