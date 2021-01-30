<template>
  <div>
    <el-table :data="list" style="width: 100%;" v-loading="loading">
      <el-table-column align="center" prop="repChannelName" label="渠道"></el-table-column>
      <el-table-column width="200" align="center" prop="merchantId" label="商户编号"></el-table-column>
      <el-table-column width="200" align="center" prop="merchantName" label="商户名称"></el-table-column>
      <el-table-column align="center" prop="expansionName" label="拓展人"></el-table-column>
      <el-table-column align="center" prop="region" label="区域"></el-table-column>
      
      <el-table-column align="center" prop="payMoney" label="交易金额"></el-table-column>
      <el-table-column align="center" prop="profit" label="分润额"></el-table-column>
      <el-table-column align="center" prop="projectCommission" label="总提成"></el-table-column>

      <!-- 两个月份 -->
      <el-table-column align="center" prop="remarks" label="备注"></el-table-column>
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