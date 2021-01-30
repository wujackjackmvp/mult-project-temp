<template>
  <div class="c-content-inner">
    <el-form :inline="true" ref="form" :model="form" label-width="80px">
          <el-form-item label="选择月份:">
            <el-date-picker
             clearable
             v-model="form.month" 
             value-format="yyyy-MM"
             type="month" 
             placeholder="选择月"></el-date-picker>
          </el-form-item>
          <el-form-item label="部门:">
            <el-select clearable v-model="form.deptId" placeholder="请选择">
              <el-option
                    v-for="item in deparList"
                    :key="item.departId"
                    :label="item.name"
                    :value="item.departId"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="拓展人:">
              <el-input
                v-model="form.expanderName"
                clearable
                placeholder="请输入拓展人名称"
            ></el-input>
          </el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="expanderExport">导出</el-button> 
    </el-form>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane 
      v-for="(item, index) in compList" 
      :key="index" 
      :label="item.title"
      :name="item.name"
    >
        <components 
        :list="list"
        :loading="loading"
         v-if="activeName === item.name" 
         :is="item.comp">
        </components>
      </el-tab-pane>
    </el-tabs>
    <div class="table-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  pageSummy,
  pageProfitMerchant,
  pageMerchantSupply,
  pageAdjust,
  expanderExport
} from "@/sercive/api/financeSercive";
import { getDepartment} from "@/sercive/api/configMsgSercive";
import summarized from "./expanderComp/summarized.vue";
import adjustment from "./expanderComp/adjustment.vue";
import hb from "./expanderComp/hb.vue";
import mobile from "./expanderComp/mobile.vue";
import reissue from "./expanderComp/reissue.vue";
export default {
  name: "ExpanderReport",
  components: {
    summarized,
    adjustment,
    hb,
    mobile,
    reissue,
  },
  data() {
    return {
      deparList: [],
      compList: [
        {
          title: "汇总表",
          name: "pageSummy",
          comp: 'summarized'
        },
        {
          title: "移动支付",
          name: "pageProfitMerchant1",
          comp: 'mobile'
        },
        {
          title: "花呗分期",
          name: "pageProfitMerchant2",
          comp: 'hb'
        },
        {
          title: "调整明细",
          name: "pageAdjust",
          comp: 'adjustment'
        },
        {
          title: "补发达标移动支付",
          name: "pageMerchantSupply1",
          comp: 'reissue'
        },
        {
          title: "补发达标花呗分期",
          name: "pageMerchantSupply2",
          comp: 'reissue'
        },
      ],
      form: {
        deptId: "",
        expanderName: "",
        month: "",
        page: 1,
        size: 10,
      },
      total: 0,
      activeName: "pageSummy",
      loading: false,
      list: [],
    };
  },
  methods: {
    init() {
      this.list = [];
      this.form.page = 1;
      this.form.size = 10;
      this.total = 0;
      this.loading = false;
    },
    search(){
      this.init()
      this.getData()
    },
    changeTab(){
      this.init()
      this.getData()     
    },
    async getData() {
      let options = {...this.form}
      if(this.activeName.indexOf('1') > -1){
        options.type = 1
      }
      if(this.activeName.indexOf('2') > -1){
        options.type = 2
      }
      let eventFun = {
        'pageSummy': pageSummy,
        'pageProfitMerchant1': pageProfitMerchant,
        'pageProfitMerchant2': pageProfitMerchant,
        'pageMerchantSupply1': pageMerchantSupply,
        'pageMerchantSupply2': pageMerchantSupply,
        'pageAdjust': pageAdjust,
      };
      this.loading = true;
      let res = await eventFun[this.activeName](options);
      this.list = res.data.extra.rows;
      this.total = res.data.extra.total;
      this.loading = false;
    },
    async getDepartment() {
      let {page, size} = this
      let res = await getDepartment({
          page: 0,
          size: 300
      })
      this.deparList = res.data.extra.rows
    },
    async expanderExport(){
      let params = {
        deptId: this.form.deptId,
        expanderName: this.form.expanderName,
        month: this.form.month
      }
      let res = await expanderExport(params)
      if(res.data.code === 1){
        this.$message.error(res.data.errMsg)
      } else {
        this.$message.success(res.data.errMsg)
      }
    },
    handleSizeChange(val) {
      this.form.size = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.form.page = val;
      this.getData();
    },
  },
  mounted(){
      this.getData()
      this.getDepartment()
  }
};
</script>

<style scoped>
.table-page {
  margin: 20px 10px;
  text-align: right;
}
</style>
