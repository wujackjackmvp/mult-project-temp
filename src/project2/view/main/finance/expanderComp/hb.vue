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
      <el-table-column align="center" prop="personProfit" label="提成"></el-table-column>

      <!-- 两个月份 -->
      <el-table-column align="center" prop="billMonth" label="月份"></el-table-column>
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