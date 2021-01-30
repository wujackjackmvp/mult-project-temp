<template>
  <div>
    <el-alert title="交易金额单位：万元；提成、营收单位：元" style="margin-bottom:20px" type="info"></el-alert>
    <el-table :data="list" style="width: 100%;" v-loading="loading">
      <el-table-column align="center" prop="areaName" label="区域"></el-table-column>
      <el-table-column align="center" prop="expanderName" label="拓展人"></el-table-column>
      <el-table-column label="新增商户分润提成" align="center">
        <el-table-column align="center" label="商户数" prop="newMerchantNum"></el-table-column>
        <el-table-column align="center" label="交易金额" prop="newMerchantPay"></el-table-column>
        <el-table-column align="center" label="公司营收" prop="newMerchantRevenue"></el-table-column>
        <el-table-column align="center" label="提成" prop="newMerchantProfit"></el-table-column>
      </el-table-column>
      <el-table-column label="存量商户分润提成" align="center" prop="test">
        <el-table-column align="center" label="商户数" prop="oldMerchantNum"></el-table-column>
        <el-table-column align="center" label="交易金额" prop="oldMerchantPay"></el-table-column>
        <el-table-column align="center" label="公司营收" prop="oldMerchantRevenue"></el-table-column>
        <el-table-column align="center" label="提成" prop="oldMerchantProfit"></el-table-column>
      </el-table-column>
      <el-table-column align="center" label="移动支付营收" prop="mobileRevenue"></el-table-column>
      <el-table-column align="center" label="花呗分期营收" prop="tokioRevenue"></el-table-column>
      <el-table-column align="center" label="总营收" prop="allRevenue"></el-table-column>
      <el-table-column align="center" label="移动支付提成" prop="mobileProfit"></el-table-column>
      <el-table-column align="center" label="花呗分期提成" prop="tokioProfit"></el-table-column>
      <el-table-column align="center" label="提成调整" prop="adjustProfit"></el-table-column>
      <el-table-column align="center" label="总提成" prop="allProfit"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
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