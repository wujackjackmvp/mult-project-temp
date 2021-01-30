<template>
  <div class="c-content-inner agencyShareDetail">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-form-item label="日期">
          <!-- {{formInline.date}} -->
          <el-date-picker placeholder="请选择日期" v-model="formInline.date" data-formatas="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="代理商名称">
          <el-input style="width:200px" v-model="formInline.agentName" placeholder="请输入代理商名称"></el-input>
        </el-form-item>
        <el-form-item label="拓展人名称">
          <el-input style="width:200px" v-model="formInline.expendName" placeholder="请输入拓展人名称"></el-input>
        </el-form-item>
        <el-form-item>
          <template>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button
              type="primary"
              :loading="isExportIng"
              @click="exportReqProfit()"
            >导出估算版</el-button>
            <el-button
              type="primary"
              :loading="isExportIng2"
              @click="exportRepProfitRatify()"
            >导出核准版</el-button>
          </template>
        </el-form-item>
      </el-row>
      <el-row style="position:relative">
        <el-tabs v-model="formInline.bizType" @tab-click="selbizType">
          <el-tab-pane label="移动支付" :name="'0'"></el-tab-pane>
          <el-tab-pane label="刷卡" :name="'1'"></el-tab-pane>
        </el-tabs>
        <!-- <div class="send-button" @click="showAgentDialog">推送代理商系统</div> -->
      </el-row>
    </el-form>

    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <div>
          <el-table
            ref="treeTable"
            class="showTableData"
            v-loading="isLoading"
            :data="tableData"
            style="width: 100%"
            :row-key="getRowKeys"
            :border="true"
            @expand-change="expandSelect"
            :expand-row-keys="expands"
            :tree-props="{children: 'merchantList', hasChildren: 'hasChildren'}"
          >
            <el-table-column
              class="first-table-column"
              width="240"
              align="left"
              label="代理商名称/商户名称"
              prop="agentName"
            >
              <template slot-scope="scope">
                <el-popover
                  disabled
                  placement="top-start"
                  trigger="hover"
                  :close-delay="0"
                  :open-delay="0"
                  :content="scope.row.agentName"
                >
                  <div class="ellipsis" slot="reference">
                    <div>{{scope.row.agentName}}</div>
                  </div>
                </el-popover>
                <!-- <el-popover
                    placement="top-start"
                    width="auto"
                    trigger="hover"
                    :content="scope.row.agentName">
                    <div>{{scope.row.agentName}}</div>
                </el-popover>-->
              </template>
            </el-table-column>
            <el-table-column width="100" align="center" label="拓展人" prop="agentExpandName"></el-table-column>
            <el-table-column width="100" align="center" label="商户账户" prop="merchantId">
              <el-table-column width="160" label="渠道名称" prop="repChannelId"></el-table-column>
              <el-table-column
                align="left"
                :width="formInline.bizType === '0' ? 350 : 250"
                label="商户/代理商费率"
              >
                <template slot-scope="scope">
                  <div
                    class="rate-tags"
                    v-if="scope.row.t1WeixxinRate !== null || scope.row.t1AlipayRate !== null || scope.row.specialRate !== null || scope.row.cardRate !== null"
                  >
                    <span
                      style="color: #67c23a"
                      v-if="scope.row.t1WeixxinRate && scope.row.t1WeixxinRate !== null && formInline.bizType === '0'"
                    >{{scope.row.t1WeixxinRate}}(微信)</span>
                    <span
                      style="color: #409EFF"
                      v-if="scope.row.t1AlipayRate && scope.row.t1AlipayRate !== null && formInline.bizType === '0'"
                    >{{scope.row.t1AlipayRate}}(支付宝)</span>
                    <span
                      style="color: #f56c6c"
                      v-if="scope.row.cardRate && scope.row.cardRate !== null && formInline.bizType === '1'"
                    >{{scope.row.cardRate}}(刷卡)</span>
                    <span
                      style="color: #e6a23c"
                      v-if="scope.row.specialRate && scope.row.specialRate !== null && formInline.bizType === '0'"
                    >{{scope.row.specialRate}}(特殊)</span>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="交易金额（元）">
              <el-table-column label="1月" prop="month1Pay" v-if="1 <= currentMonth+1" width="100px"></el-table-column>
              <el-table-column
                label="2月"
                v-if=" 2 <= currentMonth+1"
                prop="month2Pay"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 3 <= currentMonth+1"
                label="3月"
                prop="month3Pay"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 4 <= currentMonth+1"
                label="4月"
                prop="month4Pay"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 5 <= currentMonth+1"
                label="5月"
                prop="month5Pay"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 6 <= currentMonth+1"
                label="6月"
                prop="month6Pay"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 7 <= currentMonth+1"
                label="7月"
                prop="month7Pay"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 8 <= currentMonth+1"
                label="8月"
                prop="month8Pay"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 9 <= currentMonth+1"
                label="9月"
                prop="month9Pay"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 10 <= currentMonth+1"
                label="10月"
                prop="month10Pay"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 11 <= currentMonth+1"
                label="11月"
                prop="month11Pay"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 12 <= currentMonth+1"
                label="12月"
                prop="month12Pay"
                width="100px"
              ></el-table-column>
              <el-table-column label="合计" width="100px">
                <template slot-scope="scope">
                  <span class="count">
                    {{new Number(scope.row.month1Pay
                    + scope.row.month2Pay
                    + scope.row.month3Pay
                    + scope.row.month4Pay
                    + scope.row.month5Pay
                    + scope.row.month6Pay
                    + scope.row.month7Pay
                    + scope.row.month8Pay
                    + scope.row.month9Pay
                    + scope.row.month10Pay
                    + scope.row.month11Pay
                    + scope.row.month12Pay).toFixed(2)
                    }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="代理商分润（元）">
              <el-table-column
                label="1月"
                prop="month1AgentProfit"
                v-if="1 <= currentMonth+1"
                width="100px"
              ></el-table-column>
              <el-table-column
                label="2月"
                v-if=" 2 <= currentMonth+1"
                prop="month2AgentProfit"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 3 <= currentMonth+1"
                label="3月"
                prop="month3AgentProfit"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 4 <= currentMonth+1"
                label="4月"
                prop="month4AgentProfit"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 5 <= currentMonth+1"
                label="5月"
                prop="month5AgentProfit"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 6 <= currentMonth+1"
                label="6月"
                prop="month6AgentProfit"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 7 <= currentMonth+1"
                label="7月"
                prop="month7AgentProfit"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 8 <= currentMonth+1"
                label="8月"
                prop="month8AgentProfit"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 9 <= currentMonth+1"
                label="9月"
                prop="month9AgentProfit"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 10 <= currentMonth+1"
                label="10月"
                prop="month10AgentProfit"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 11 <= currentMonth+1"
                label="11月"
                prop="month11AgentProfit"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 12 <= currentMonth+1"
                label="12月"
                prop="month12AgentProfit"
                width="100px"
              ></el-table-column>
              <el-table-column label="合计" width="100px">
                <template slot-scope="scope">
                  <span class="count">
                    {{
                    new Number(scope.row.month1AgentProfit
                    + scope.row.month2AgentProfit
                    + scope.row.month3AgentProfit
                    + scope.row.month4AgentProfit
                    + scope.row.month5AgentProfit
                    + scope.row.month6AgentProfit
                    + scope.row.month7AgentProfit
                    + scope.row.month8AgentProfit
                    + scope.row.month9AgentProfit
                    + scope.row.month10AgentProfit
                    + scope.row.month11AgentProfit
                    + scope.row.month12AgentProfit
                    ).toFixed(2)
                    }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="公司营收（元）">
              <el-table-column
                label="1月"
                prop="month1PayRevenue"
                v-if="1 <= currentMonth+1"
                width="100px"
              ></el-table-column>
              <el-table-column
                label="2月"
                v-if=" 2 <= currentMonth+1"
                prop="month2PayRevenue"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 3 <= currentMonth+1"
                label="3月"
                prop="month3PayRevenue"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 4 <= currentMonth+1"
                label="4月"
                prop="month4PayRevenue"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 5 <= currentMonth+1"
                label="5月"
                prop="month5PayRevenue"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 6 <= currentMonth+1"
                label="6月"
                prop="month6PayRevenue"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 7 <= currentMonth+1"
                label="7月"
                prop="month7PayRevenue"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 8 <= currentMonth+1"
                label="8月"
                prop="month8PayRevenue"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 9 <= currentMonth+1"
                label="9月"
                prop="month9PayRevenue"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 10 <= currentMonth+1"
                label="10月"
                prop="month10PayRevenue"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 11 <= currentMonth+1"
                label="11月"
                prop="month11PayRevenue"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if=" 12 <= currentMonth+1"
                label="12月"
                prop="month12PayRevenue"
                width="100px"
              ></el-table-column>
              <el-table-column align="center" label="合计" width="100px">
                <template slot-scope="scope">
                  <span class="count">
                    {{new Number(scope.row.month1PayRevenue
                    + scope.row.month2PayRevenue
                    + scope.row.month3PayRevenue
                    + scope.row.month4PayRevenue
                    + scope.row.month5PayRevenue
                    + scope.row.month6PayRevenue
                    + scope.row.month7PayRevenue
                    + scope.row.month8PayRevenue
                    + scope.row.month9PayRevenue
                    + scope.row.month10PayRevenue
                    + scope.row.month11PayRevenue
                    + scope.row.month12PayRevenue).toFixed(2)
                    }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="block" style="margin-top: 20px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="size"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "daily",
  data() {
    return {
      getRowKeys(row) {
        return row.id;
      },
      expands: [],
      // 代理商
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
      // 分润明细
      tableData: [],
      activeName: "second",
      allExport: 0,
      isLoading: false,
      formInline: {
        expendName: "",
        agentName: "",
        bizType: "0",
        date: ""
      },
      page: 1,
      size: 10,
      total: 0,
      apiList: {
        pageReqProfit: this.api.shareProfit.pageReqProfit,
        exportReqProfit: this.api.shareProfit.exportReqProfit,
        exportRepProfitRatify: this.api.shareProfit.exportRepProfitRatify,
        repAgentMonthSend: this.api.shareProfit.repAgentMonthSend,
        preSend: this.api.shareProfit.preSend,
        ratifySend: this.api.shareProfit.ratifySend
      },
      buildDate: "2019-12-31",
      currentMonth: new Date().getMonth(),
      isExportIng: false,
      isExportIng2: false
    };
  },
  mounted() {
    this.formInline.date = moment().subtract(2,'days').format("yyyy-MM-DD");
    this.pageReqProfit();
  },
  methods: {
    /**一些状态的过滤 */
    evalDeal(array) {
      return array.reduce(function(prev, curr, idx, arr) {
        return +prev + +curr;
      });
    },
    bizTypeFormat(row, col, cellValue, index) {
      return +cellValue === 1 ? "刷卡" : "移动支付";
    },
    sendAgentFormat(row, col, cellValue, index) {
      return +cellValue === 1 ? "已推送" : "未推送";
    },
    ratifyFormat(row, col, cellValue, index) {
      return +cellValue === 1 ? "已推送" : "未推送";
    },
    /** =============== 查分润 ================= */
    async pageReqProfit() {
      this.isLoading = true;
      let { page, size } = this;
      let { expendName, agentName, bizType, date } = this.formInline;
      date = moment(date).format("yyyy-MM-DD");
      let res = await this.ajax.commonApi2(
        "post",
        "JSON",
        this.apiList.pageReqProfit,
        {
          expendName,
          agentName,
          bizType: +bizType,
          page,
          size,
          date // 之前这个date是具体日选择是月份
        }
      );
      if(res.data.code === 1){
        this.$message.error(res.data.errMsg)
        this.isLoading = false
        return
      }
      res.data.extra.rows.forEach((item, index) => {
        item.id = "p" + index;
        item.merchantId = "";
        item.repChannelName = "";
        item.merchantName = "";
        item.hasChildren = false;
        item.merchantList.forEach((child, childIndex) => {
          child.id = "p" + index + "c" + childIndex;
          child.agentName = child.merchantName;
          child.hasChildren = false;
        });
      });
      this.tableData = res.data.extra.rows;
      this.total = res.data.extra.total || 0;
      this.isLoading = false;
    },
    onSubmit() {
      this.page = 1
      this.pageReqProfit();
    },
    // 展开相关
    expandSelect(row, expandedRows) {
      if (!expandedRows) return;
      let $table = this.$refs.treeTable;
      this.tableData.map(item => {
        if (row.id != item.id) {
          $table.toggleRowExpansion(item, false);
        }
      });
      this.expands.push(row);
    },
    // 分页相关
    handleSizeChange(val) {
      this.size = val;
      this.pageReqProfit();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.pageReqProfit();
    },
    showMsg(type, message) {
      this.$message({
        type,
        message
      });
    },
    // 导出相关
    async exportReqProfit() {
      this.isExportIng = true;
      let { expendName, agentName, date } = this.formInline;
      date = moment(date).format("yyyy-MM-DD");
      try {
        let resError = await this.ajax.commonApi2(
          "post",
          "JSON",
          this.apiList.exportReqProfit,
          {
            date,
            agentName,
            expendName,
            check: 1
          }
        );
        if (resError.data.code === 1) throw resError.data.errMsg;
        let response = await this.ajax.commonApi2(
          "post",
          "down",
          this.apiList.exportReqProfit,
          {
            date,
            agentName,
            expendName,
            check: 0,
          }
        );
        this.$message({ message: "操作成功，请到下载列表统一下载",type: "success"});
        // let blob = new Blob([response.data]);
        // let downloadElement = document.createElement("a");
        // let href = window.URL.createObjectURL(blob); //创建下载的链接
        // downloadElement.href = href;
        // downloadElement.download = "估算版.xlsx"; //下载后文件名
        // document.body.appendChild(downloadElement);
        // downloadElement.click(); //点击下载
        // document.body.removeChild(downloadElement); //下载完成移除元素
        // window.URL.revokeObjectURL(href); //释放掉blob对象
        this.isExportIng = false;
      } catch (error) {
        this.isExportIng = false;
        this.$message.error(error);
      }
    },
    async exportRepProfitRatify() {
      this.isExportIng2 = true;
      let { expendName, agentName, date } = this.formInline;
      date = moment(date).format("yyyy-MM-DD");
      try {
        let resError = await this.ajax.commonApi2(
          "post",
          "JSON",
          this.apiList.exportRepProfitRatify,
          {
            date,
            expendName,
            agentName,
            check: 1
          }
        );
        if (resError.data.code === 1) throw resError.data.errMsg;
        let response = await this.ajax.commonApi2(
          "post",
          "down",
          this.apiList.exportRepProfitRatify,
          {
            date,
            expendName,
            agentName,
            check: 0,
          }
        );
        this.$message({ message: "操作成功，请到下载列表统一下载",type: "success"});
        // let blob = new Blob([response.data]);
        // let downloadElement = document.createElement("a");
        // let href = window.URL.createObjectURL(blob); //创建下载的链接
        // downloadElement.href = href;
        // downloadElement.download = "核准版.xlsx"; //下载后文件名
        // document.body.appendChild(downloadElement);
        // downloadElement.click(); //点击下载
        // document.body.removeChild(downloadElement); //下载完成移除元素
        // window.URL.revokeObjectURL(href); //释放掉blob对象
        this.isExportIng2 = false;
      } catch (error) {
        this.isExportIng2 = false;
        this.$message.error(error);
      }
    },
    selbizType(tab, event) {
      this.page = 1;
      this.pageReqProfit();
    }
    /** =============== 代理商推送情况 =  ================ */
    // async repAgentMonthSend() {
    //   this.agentIsLoading = true;
    //   let { agentPage, agentSize } = this;
    //   let { bizType, buildMonth } = this.formDialog;
    //   let res = await this.ajax.commonApi2(
    //     "post",
    //     "JSON",
    //     this.apiList.repAgentMonthSend,
    //     {
    //       buildMonth,
    //       bizType: bizType ? +bizType : undefined,
    //       page: agentPage,
    //       size: agentSize
    //     }
    //   );
    //   this.agentData = res.data.extra.rows || [];
    //   this.agentTotal = res.data.extra.total || 0;
    //   this.agentIsLoading = false;
    // },
    // async preSend(id) {
    //   let res = await this.ajax.commonApi2(
    //     "post",
    //     "JSON",
    //     this.apiList.preSend,
    //     {
    //       id
    //     }
    //   );
    //   if (res.data.code === 0) {
    //     this.$message({
    //       type: "success",
    //       message: "成功推送"
    //     });
    //     this.repAgentMonthSend();
    //   } else {
    //     this.$message({
    //       type: "error",
    //       message: res.data.errMsg
    //     });
    //   }
    // },
    // async ratifySend(id) {
    //   let res = await this.ajax.commonApi2(
    //     "post",
    //     "JSON",
    //     this.apiList.ratifySend,
    //     {
    //       id
    //     }
    //   );
    //   if (res.data.code === 0) {
    //     this.$message({
    //       type: "success",
    //       message: "成功推送"
    //     });
    //     this.repAgentMonthSend();
    //   } else {
    //     this.$message({
    //       type: "error",
    //       message: res.data.errMsg
    //     });
    //   }
    // },
    // showAgentDialog() {
    //   this.dialogFormVisible = true;
    //   this.repAgentMonthSend();
    // },
    // handleAgentSizeChange(val) {
    //   this.agentSize = val;
    //   this.repAgentMonthSend();
    // },
    // handleAgentCurrentChange(val) {
    //   this.agentPage = val;
    //   this.repAgentMonthSend();
    // }
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
