<template>
  <div class="c-content-inner agencyShareDetail">
      <el-form :inline="true" :model="formDialog" class="demo-form-inline">
        <el-row>
          <el-form-item label="支付类型">
            <el-select clearable v-model="formDialog.bizType">
              <el-option
                v-for="item in bizTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="月份">
            <el-date-picker
              v-model="formDialog.buildMonth"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择月"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="24">
          <div
            class="grid-content bg-purple-dark flex-s"
            style="background-color: rgb(236, 245, 255);padding:10px"
          >
            <i class="el-icon-info" style="color: cornflowerblue;font-size:30px;margin-right: 10px"></i>
            <div
              class="flex-s"
              style="color:rgb(83, 168, 255);font-size:14px"
            >分润估算分润可多次推送，核准分润只能推送一次</div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="24">
          <div>
            <el-table v-loading="agentIsLoading" :data="agentData" style="width: 100%">
              <el-table-column label="支付类型" width="120" prop="bizType" :formatter="bizTypeFormat"></el-table-column>
              <el-table-column label="月份" prop="buildMonth"></el-table-column>
              <el-table-column
                label="估算分润推送状态"
                prop="sendAgent"
                :formatter="sendAgentFormat"
              ></el-table-column>
              <el-table-column label="估算分润推送时间" prop="sendAgentTime"></el-table-column>
              <el-table-column label="核准分润推送状态" prop="sendAgentRatify" :formatter="ratifyFormat"></el-table-column>
              <el-table-column label="核准分润推送时间" prop="sendAgentRatifyTime"></el-table-column>
              <el-table-column label="操作" width="320">
                <template slot-scope="scope">
                  <el-button size="mini" :loading="curRowId == scope.row.id && loading && type==='Estimate'" @click="preSend(scope.row.id)">推送估算分润</el-button>
                  <el-button size="mini" :loading="curRowId == scope.row.id && loading && type==='Approve'" @click="ratifySend(scope.row.id)">推送核准分润</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block" style="margin-top: 20px;">
            <el-pagination
              @size-change="handleAgentSizeChange"
              @current-change="handleAgentCurrentChange"
              :current-page="agentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="agentSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="agentTotal"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import { repAgentMonthSend, preSend, ratifySend} from '@/sercive/api/agencySercive'
import moment from "moment";
export default {
  name: "daily",
  data() {
    return {
      type:'',
      curRowId:null,
      loading:false,
      getRowKeys(row) {
        return row.id;
      },
      expands: [],
      // 代理商
      dialogFormVisible: false,
      formDialog: {
        bizType: "0",
        buildMonth: ""
      },
      bizTypeList: [
        { label: "全部", value: undefined },
        { label: "刷卡", value: "1" },
        { label: "移动支付", value: "0" }
      ],
      agentData: [],
      agentPage: 1,
      agentSize: 10,
      agentIsLoading: true,
      agentTotal: 0,
      apiList: {
        repAgentMonthSend: this.api.shareProfit.repAgentMonthSend,
        preSend: this.api.shareProfit.preSend,
        ratifySend: this.api.shareProfit.ratifySend
      },
    };
  },
  mounted() {
    this.repAgentMonthSend();
  },
  methods: {
    onSearch(){
      this.agentPage = 1
      this.repAgentMonthSend();
    },
    /**一些状态的过滤 */
    bizTypeFormat(row, col, cellValue, index) {
      return +cellValue === 1 ? "刷卡" : "移动支付";
    },
    sendAgentFormat(row, col, cellValue, index) {
      return +cellValue === 1 ? "已推送" : "未推送";
    },
    ratifyFormat(row, col, cellValue, index) {
      return +cellValue === 1 ? "已推送" : "未推送";
    },
    /** =============== http请求 ================= */
    async repAgentMonthSend() {
      this.agentIsLoading = true;
      let { agentPage, agentSize } = this;
      let { bizType, buildMonth } = this.formDialog;
      let res = await repAgentMonthSend(
        {
          buildMonth,
          bizType: bizType ? +bizType : undefined,
          page: agentPage,
          size: agentSize
        }
      );
      this.agentData = res.data.extra.rows || [];
      this.agentTotal = res.data.extra.total || 0;
      this.agentIsLoading = false;
    },
    /** =============== 用户操作相关 ================= */
    async preSend(id) {
      // let res = await this.ajax.commonApi2(
      //   "post",
      //   "JSON",
      //   this.apiList.preSend,
      //   {
      //     id
      //   }
      // );
      this.type = 'Estimate' // 推送估算分润
      this.curRowId = id
      this.loading = true
      let res = await preSend({id});
      this.loading = false
      if (res.data.code === 0) {
        this.$message({
          type: "success",
          message: "成功推送"
        });
        this.repAgentMonthSend();
      } else {
        this.$message({
          type: "error",
          message: res.data.errMsg
        });
      }
    },
    async ratifySend(id) {
      // let res = await this.ajax.commonApi2(
      //   "post",
      //   "JSON",
      //   this.apiList.ratifySend,
      //   {
      //     id
      //   }
      // );
      this.type = 'Approve' // 推核准分润
      this.curRowId = id
      this.loading = true
      let res = await ratifySend(
        {
          id
        }
      );
      this.loading = false
      if (res.data.code === 0) {
        this.$message({
          type: "success",
          message: "成功推送"
        });
        this.repAgentMonthSend();
      } else {
        this.$message({
          type: "error",
          message: res.data.errMsg
        });
      }
    },
    showAgentDialog() {
      this.dialogFormVisible = true;
      this.repAgentMonthSend();
    },
    handleAgentSizeChange(val) {
      this.agentSize = val;
      this.repAgentMonthSend();
    },
    handleAgentCurrentChange(val) {
      this.agentPage = val;
      this.repAgentMonthSend();
    }
  }
};
</script>

<style lang="less">
.agencyShareDetail {
  overflow-y: hidden;
  .el-pagination {
    display: flex;
    justify-content: flex-end;
  }
  .count {
    color: #409eff;
  }
  .ellipsis {
    display: inline-block;
    font-size: 0;
    vertical-align: top;
    div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 180px;
      font-size: 12px;
    }
  }
  .el-table__expanded-cell[class*="cell"] {
    padding: 0;
  }
  .children-list {
    overflow: hidden;
    border-bottom: 1px solid #ebeef5;
  }
  .children-list > div {
    float: left;
    text-align: center;
    line-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 60px;
  }
  .is-left .cell {
    display: flex;
    text-align: left;
  }
  .send-button {
    cursor: pointer;
    color: #f56c6c;
    background: #fef0f0;
    border-color: #fbc4c4;
    height: 30px;
    text-align: center;
    line-height: 30px;
    position: absolute;
    right: 0;
    top: 0;
    border: 1px solid #f56c6c;
    padding: 0 10px;
    font-size: 12px;
    border-radius: 5px;
  }
  .rate-tags {
    display: flex;
    align-items: center;
  }
  .rate-tags span {
    padding: 0 5px;
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
