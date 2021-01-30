<template>
  <div>
    <el-table :data="list" style="width: 100%;" v-loading="loading">
      <el-table-column align="center" prop="repChannelName" label="渠道"></el-table-column>
      <el-table-column align="center" prop="merchantId" label="商户编号"></el-table-column>
      <el-table-column width="200" align="center" prop="merchantName" label="商户名称"></el-table-column>
      <el-table-column align="center" prop="expanderName" label="拓展人"></el-table-column>
      <el-table-column align="center" prop="areaName" label="区域"></el-table-column>
      
      <el-table-column align="center" prop="payAmt" label="交易金额"></el-table-column>
      <el-table-column align="center" prop="payProfit" label="分润额"></el-table-column>
      <el-table-column align="center" prop="personProfit" label="个人提成"></el-table-column>
      <!--  -->
      <el-table-column align="center" prop="projectProfit" label="项目组"></el-table-column>

      <el-table-column width="200" align="center" prop="incentiveProfit" label="激励金"></el-table-column>
      <!-- 两个月份 -->
      <el-table-column align="center" prop="billMonth" label="月份"></el-table-column>
      <!--  -->
      <el-table-column width="200" align="center" prop="firstOrderTime" label="首次交易时间"></el-table-column>
      <!--  -->
      <el-table-column 
        align="center" 
        prop="merchantProfitType" 
        label="提成性质"
        :formatter="formatter.merchantProfitType"
      >
      </el-table-column>
      <!--  -->
      <el-table-column align="center" prop="deptName" label="部门归属"></el-table-column>
      <!--  -->
      <el-table-column width="200" align="center" prop="deptRate" label="部门完成率"></el-table-column>
      <el-table-column 
        align="center" 
        prop="giveProfit" 
        label="是否发放"
        :formatter="formatter.sendType"
      >
      </el-table-column>
      <!--  -->
      <el-table-column 
        align="center" 
        prop="isReach" 
        label="达标情况"
        :formatter="formatter.isReachFormat"
      >
      <!--  -->
      <!--  -->
      <el-table-column width="200" align="center" prop="needPersonProfit" label="个人完成应发"></el-table-column>
      <!--  -->
      <el-table-column width="200" align="center" prop="needProjectProfit" label="项目组应发"></el-table-column>
      <!--  -->
      <el-table-column width="200" align="center" prop="needIncentiveProfit" label="激励金应发"></el-table-column>
      <el-table-column width="200" align="center" prop="needAllProfit" label="完成后应发放总计"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import formatter from "@/utils/filter/formatter";
export default {
  data(){
    return {
      formatter
    }
  },
  props: {
    list: {
      type: Array,
    },
    loading: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
</style>