<template>
  <div class="c-content-inner">
    <!--暂时隐藏添加渠道-->
    <div class="table-box">
      <el-table v-loading="loading" border :data="tableData" style="width: 100%">
        
        <el-table-column prop="repChannelName" label="渠道名称" />
        <el-table-column prop="repChannelId" label="渠道编号" />
        <el-table-column prop="repChannelAcc" label="账号" />
        <el-table-column label="所属">
          <template slot-scope="scope">
            <span v-if="scope.row.companyType == 1">母公司</span>
            <span v-if="scope.row.companyType == 2">子公司</span>
          </template>
        </el-table-column>
        <el-table-column prop="channelLeader" label="负责人" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">启用</span>
            <span v-if="scope.row.status == 1">禁用</span>
            <span v-if="scope.row.status == 2">删除</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="changeEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="warning"
              v-if="scope.row.status == 0"
              @click="stopEdit(scope.$index, scope.row)"
            >禁用</el-button>
            <el-button
              size="mini"
              type="success"
              v-if="scope.row.status == 1"
              @click="useEdit(scope.$index, scope.row)"
            >启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑导入模板 -->
    <div class="editTemplate">
      <el-dialog title="编辑导入模板" :visible.sync="dialogTemplateVisible" style="text-align: center;">
        <el-form :model="template">
          <div class="editWidth">
            <el-form-item label="商户编码" :label-width="formLabelWidth" style="display: inline-block">
              <el-select v-model="form.coding" placeholder="商户编号">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> -->
              </el-select>
            </el-form-item>
            <el-form-item label="支付金额" :label-width="formLabelWidth" style="display: inline-block">
              <el-select v-model="form.money" placeholder="支付金额">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> -->
              </el-select>
            </el-form-item>
          </div>
          <div class="editWidth">
            <el-form-item label="支付类型" :label-width="formLabelWidth" style="display: inline-block">
              <el-select v-model="form.type" placeholder="支付类型">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> -->
              </el-select>
            </el-form-item>
            <el-form-item label="商户名称" :label-width="formLabelWidth" style="display: inline-block">
              <el-select v-model="form.tenantName" placeholder="商户名称">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> -->
              </el-select>
            </el-form-item>
          </div>
          <div class="editWidth">
            <el-form-item label="日结时间" :label-width="formLabelWidth" style="display: inline-block">
              <el-select v-model="form.endDate" placeholder="日结时间">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> -->
              </el-select>
            </el-form-item>
            <el-form-item label="成本费率" :label-width="formLabelWidth" style="display: inline-block">
              <el-select v-model="form.editCosting" placeholder="成本费率">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> -->
              </el-select>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <!-- <el-button @click="dialogTemplateVisible = false">取 消</el-button> -->
          <el-button
            size="medium"
            type="primary"
            @click="dialogTemplateVisible = false"
            style="width:150px"
          >
            确
            定
          </el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 添加渠道 -->
    <div class="addDitcd">
      <el-dialog
        title="添加渠道"
        width="500px"
        :visible.sync="dialogaddDitcdVisible"
        style="text-align: center;"
      >
        <el-form :model="formAdd">
          <el-form-item label="渠道" :label-width="formLabelWidth">
            <el-input v-model="name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="uname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="渠道编码" :label-width="formLabelWidth">
            <el-input v-model="code" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属" :label-width="formLabelWidth">
            <el-select v-model="companyType" placeholder="所属">
              <el-option label="母公司" value="1"></el-option>
              <el-option label="子公司" value="2"></el-option>
              <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> -->
            </el-select>
          </el-form-item>

          <!-- <el-form-item label="所属" :label-width="formLabelWidth">
                    <el-input v-model="formAdd.companyType" auto-complete="off"></el-input>
          </el-form-item>-->
          <el-form-item label="负责人" :label-width="formLabelWidth">
            <el-input v-model="leader" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="成本费率" :label-width="formLabelWidth">
            <el-input v-model="rate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="分润比例" :label-width="formLabelWidth">
            <el-input v-model="shareProfitRatio" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
          <el-button
            size="medium"
            type="primary"
            class="dis"
            disabled
            @click="addChanl"
            style="width:150px"
            v-if="clickbtn1 || clickbtn2 || clickbtn3 || clickbtn4 || clickbtn5 || clickbtn6 || clickbtn7"
          >确 定</el-button>

          <el-button
            size="medium"
            type="primary"
            @click="addChanl"
            style="width:150px"
            v-if="!clickbtn1 && !clickbtn2 && !clickbtn3 && !clickbtn4 && !clickbtn5 && !clickbtn6 && !clickbtn7"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 变更详情 -->
    <div class="detail-box">
      <el-dialog title="详情" width="500px" :visible="dialogFormVisible1">
        <div class="dialog-row">
          <div class="row-item">
            <div class="item-label">变更人</div>
            <div class="item-value">2018-12-01</div>
          </div>
        </div>
        <div class="dialog-row">
          <div class="row-item">
            <div class="item-label">生效时间</div>
            <div class="item-value">2018-12-01</div>
          </div>
          <div class="row-item">
            <div class="item-label">失效时间</div>
            <div class="item-value">2018-12-01</div>
          </div>
        </div>
        <div class="dialog-row">
          <div class="row-item">
            <div class="item-label">变更时间</div>
            <div class="item-value">2018-12-01</div>
          </div>
        </div>
        <table class="detail-table" :data="tableData">
          <thead class="table-header">
            <tr>
              <th width="30%" class="header-item">信息的名称</th>
              <th width="30%" class="header-item">当前</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr class="item-line">
              <td class="item-title">成本费率</td>
              <td class="item-value">0.0023</td>
            </tr>
            <tr class="item-line">
              <td class="item-title">成本费率</td>
              <td class="item-value">0.0023</td>
            </tr>
            <tr class="item-line">
              <td class="item-title">成本费率</td>
              <td class="item-value">0.0023</td>
            </tr>
            <tr class="item-line">
              <td class="item-title">成本费率</td>
              <td class="item-value">0.0023</td>
            </tr>
            <tr class="item-line">
              <td class="item-title">成本费率</td>
              <td class="item-value">0.0023</td>
            </tr>
          </tbody>
        </table>
      </el-dialog>
    </div>
    <div class="table-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20]"
        :page-size="parseInt(size)"
        layout="total, sizes, prev, pager, next, jumper"
        :total="parseInt(total)"
      ></el-pagination>
    </div>
    <!-- 渠道配置编辑 -->
    <el-dialog
      :title="editType"
      width="1200px"
      top="5vh"
      :visible.sync="showChangeBox"
      element-loading-text="变更成本费率中，loading....."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-form :model="form">
        <el-form-item label="渠道名称" :label-width="formLabelWidth">
          <el-input v-model="currentPreData.repChannelName" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="生效时间段" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.dataTime"
            type="daterange"
            range-separator="至"
            start-placeholder="生效日期"
            end-placeholder="失效日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <table class="edit-table">
          <thead class="table-header">
            <tr>
              <th width="30%" class="header-item">信息的名称</th>
              <th width="30%" class="header-item">当前</th>
              <th width="40%" class="header-item">变更</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr class="item-line">
              <td class="item-title">成本费率</td>
              <td class="item-value">{{currentPreData.costRate}}</td>
              <td class="item-edit">
                <input type="text" v-model="currentEditData.costRate" />
              </td>
            </tr>
            <tr class="item-line">
              <td class="item-title">微信费率</td>
              <td class="item-value">{{currentPreData.wxRate}}</td>
              <td class="item-edit">
                <input type="text" v-model="currentEditData.wxRate" />
              </td>
            </tr>
            <tr class="item-line">
              <td class="item-title">支付宝费率</td>
              <td class="item-value">{{currentPreData.zfbRate}}</td>
              <td class="item-edit">
                <input type="text" v-model="currentEditData.zfbRate" />
              </td>
            </tr>
            <tr class="item-line">
              <td class="item-title">分润比例</td>
              <td class="item-value">{{currentPreData.ratio}}</td>
              <td class="item-edit">
                <input type="text" v-model="currentEditData.ratio" />
              </td>
            </tr>
            <tr class="item-line">
              <td class="item-title">特殊返佣费率</td>
              <td class="item-value">{{currentPreData.rebateRate}}</td>
              <td class="item-edit">
                <input type="text" v-model="currentEditData.rebateRate" />
              </td>
            </tr>
            <tr class="item-line">
              <td class="item-title">刷卡封顶金额</td>
              <td class="item-value">{{currentPreData.cappingAmount}}</td>
              <td class="item-edit">
                <input type="text" v-model="currentEditData.cappingAmount" />
              </td>
            </tr>
            <tr class="item-line">
              <td class="item-title">单笔封顶金额</td>
              <td class="item-value">{{currentPreData.capptingAmountSingle}}</td>
              <td class="item-edit">
                <input type="text" v-model="currentEditData.capptingAmountSingle" />
              </td>
            </tr>
            <tr class="item-line">
              <td class="item-title">未封顶借记卡费率</td>
              <td class="item-value">{{currentPreData.debitLowrate}}</td>
              <td class="item-edit">
                <input type="text" v-model="currentEditData.debitLowrate" />
              </td>
            </tr>
            <tr class="item-line">
              <td class="item-title">封顶借记卡费率</td>
              <td class="item-value">{{currentPreData.debitUprate}}</td>
              <td class="item-edit">
                <input type="text" v-model="currentEditData.debitUprate" />
              </td>
            </tr>
            <tr class="item-line">
              <td class="item-title">未封顶贷记卡费率</td>
              <td class="item-value">{{currentPreData.creditLowrate}}</td>
              <td class="item-edit">
                <input type="text" v-model="currentEditData.creditLowrate" />
              </td>
            </tr>
            <tr class="item-line">
              <td class="item-title">封顶贷记卡费率</td>
              <td class="item-value">{{currentPreData.creditUprate}}</td>
              <td class="item-edit">
                <input type="text" v-model="currentEditData.creditUprate" />
              </td>
            </tr>
            <tr class="item-line">
              <td class="item-title">DCC费率</td>
              <td class="item-value">{{currentPreData.dccRate}}</td>
              <td class="item-edit">
                <input type="text" v-model="currentEditData.dccRate" />
              </td>
            </tr>
            <tr class="item-line">
              <td class="item-title">EDC费率</td>
              <td class="item-value">{{currentPreData.edcRate}}</td>
              <td class="item-edit">
                <input type="text" v-model="currentEditData.edcRate" />
              </td>
            </tr>
          </tbody>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showChangeBox = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="handleSure()" style="width:150px">确定</el-button>
      </div>
    </el-dialog>

    <!-- 渠道配置编辑 -->
    <el-dialog
      @close="handleConfClose"
      title="渠道配置编辑"
      width="1200px"
      :visible.sync="dialogFormVisible">
      <!-- 行业费率设置 -->
      <el-form v-if="rateTab === 'industry'" :model="rateConfigParam" :rules="rules">
        <el-form-item label="渠道名称:" :label-width="formLabelWidth">{{editInfoData.repChannelName}}</el-form-item>
          <el-row :gutter="30">
            <el-col :span="10">
              <el-form-item label="负责人:" :label-width="formLabelWidth" prop="channelLeader">
                <el-input v-model="rateConfigParam.channelLeader" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所属:" :label-width="formLabelWidth" prop="companyType">
                <el-select v-model="rateConfigParam.companyType" placeholder="所属">
                  <el-option label="母公司" :value="1"></el-option>
                  <el-option label="子公司" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="进位方式:" :label-width="formLabelWidth" prop="ratioCalculationRules">
                <el-select v-model="rateConfigParam.ratioCalculationRules" placeholder="所属">
                  <el-option label="四舍五入" :value="'1'"></el-option>
                  <el-option label="向下取舍" :value="'2'"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <!-- 结算加费率 -->
      <el-form v-else :model="SettlementAndRateParams" :rules="rules">
        <el-form-item label="渠道名称:" :label-width="formLabelWidth">{{editInfoData.repChannelName}}</el-form-item>
          <el-row :gutter="30">
            <el-col :span="10">
              <el-form-item label="负责人:" :label-width="formLabelWidth" prop="channelLeader">
                <el-input v-model="SettlementAndRateParams.channelLeader" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所属:" :label-width="formLabelWidth" prop="companyType">
                <el-select v-model="SettlementAndRateParams.companyType" placeholder="所属">
                  <el-option label="母公司" :value="1"></el-option>
                  <el-option label="子公司" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="进位方式:" :label-width="formLabelWidth" prop="ratioCalculationRules">
                <el-select v-model="SettlementAndRateParams.ratioCalculationRules" placeholder="所属">
                  <el-option label="四舍五入" :value="'1'"></el-option>
                  <el-option label="向下取舍" :value="'2'"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <el-tabs v-model="rateTab">
        <!-- 行业费率设置 -->
        <el-tab-pane label="行业费率设置" name="industry">
          <el-row>
            <el-col :span="24">
              <div
                style="cursor:pointer;width: 100%;height: 30px;line-height: 30px; text-align: center;color: #fff;background: #409eff; border-radius: 5px;"
                @click="addRateConf"
              >+&nbsp; 添加费率配置</div>
            </el-col>
          </el-row>
          <rate-config
            v-for="(item, index) in rateConfigParam.costRatetings"
            :tbdata="item"
            :key="index"
            @destroyconf="deleteConf(index)"
            :pardata="rateConfigParam"
          ></rate-config>
        </el-tab-pane>
        <!-- 结算加费率设置 -->
        <el-tab-pane label="结算加费费率设置" name="settlement">
          <el-row>
            <el-col :span="24">
              <div
                style="cursor:pointer;width: 100%;height: 30px;line-height: 30px; text-align: center;color: #fff;background: #409eff; border-radius: 5px;"
                @click="addRateConf02"
              >+&nbsp; 添加费率配置</div>
            </el-col>
          </el-row>
          <rate-config02
            v-for="(item, index) in SettlementAndRateParams.addFeeSettings"
            :ref="'rate-config'+index"
            :tbdata="item"
            :key="index"
            @destroyconf="deleteConf02(index)"
            :pardata="SettlementAndRateParams"
          ></rate-config02>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="sumbit" style="width:150px">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { 
  RateConfigSave,
  RateConfigPageList,
  modify,
  enAble,
  channelDelete,
  repChannelList,
  disAble
} from '@/sercive/api/rateSercive'
import RateConfig from "@/components/RateConfig.vue";
import RateConfig02 from "@/components/RateConfig02.vue";
import addFeeConfig from './mixin/addFeeConfig'
export default {
  mixins: [addFeeConfig],
  components: {
    RateConfig,
    RateConfig02
  },
  data() {
    return {
      // 渠道配置
      rateTab: "industry",
      rules: {
        channelLeader: [{ required: true, message: "负责人不能为空" }],
        companyType: [{ required: true, message: "所属公司不能为空" }],
        ratioCalculationRules: [{ required: true, message: "进位方式不能为空" }]
      },
      value1: null,
      formInline: {
        merchantName: ""
      },
      dataTime: "",
      tableData: [],
      tableData2: [], // 当前选中行的成本信息
      currentRow: null,
      // 翻页
      currentPage4: 1,
      page: "1",
      size: "8",

      loading: true,
      total: "400",
      activeName: "third",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {
        dataTime: []
      },
      type: "",
      leader: "",
      cleader: "",
      formLabelWidth: "120px",
      dialogTemplateVisible: false,
      template: {
        coding: "",
        money: "",
        region: "",
        type: "",
        tenantName: "",
        endDate: "",
        editCosting: ""
      },
      dialogaddDitcdVisible: false,
      addDitcdform: {
        name: "",
        user: "",
        belong: "",
        principal: "",
        costParities: ""
      },
      formAdd: {},
      clickbtn: true,
      name: "",
      uname: "",
      code: "",
      companyType: "",
      rate: "",

      beginDate: "",
      endDate: "",
      createTime: "",

      shareProfitRatio: "",
      clickbtn1: true,
      clickbtn2: true,
      clickbtn3: true,
      clickbtn4: true,
      clickbtn5: true,
      clickbtn6: true,
      clickbtn7: true,
      clickbtnfrom1: true,
      clickbtnfrom2: true,
      // 窗口显隐
      showChangeBox: false,
      channelname: "",
      // 修改成本
      currentPreData: {},
      currentEditData: {},
      // 编辑渠道信息
      editInfoData: {},
      // 是否新增数据
      isAddRecord: false,
      editType: "修改",
      payTypeList: null,
      profitExpressionList: null,
      settlementTimeList: null,
      merchantTypeList: null,
      specialIndusrtyList: null,
      payType: null,
      profitExpression: null,
      settlementTime: null,
      merchantType: null,
      specialIndusrty: null,
      isExpand: true,
      isDelete: false,
      rateConfigParam: {
        repChannelId: null,
        channelLeader: null,
        companyType: null,
        ratioCalculationRules: null,
        costRatetings: [
          {
            startTime: null,
            endTime: null,
            setting: [
              {
                id: null,
                payType: null,
                settlementTime: null,
                merchantType: null,
                specialIndusrty: null,
                profitExpression: null,
                costRate: {
                  maxMoney: null,
                  maxfee: null,
                  upRate: null,
                  lowRate: null,
                  rate: null,
                  ratio: null,
                  merchantRate: null,
                  minfee: null
                }
              }
            ]
          }
        ]
      },
    };
  },
  methods: {
    /* =================两个费率设置共用部分=================== */
    handleConfClose() {
      this.rateTab = "industry"
      this.rateConfigParam = Object.assign({},this.$options.data().rateConfigParam) 
      this.SettlementAndRateParams = Object.assign({},this.$options.data().SettlementAndRateParams) 
    },
    // 编辑
    changeEdit(index, row) {
      this.editInfoData = Object.assign({}, row);
      this.rateConfigParam.repChannelId = row.repChannelId;
      this.rateConfigParam.channelLeader = row.channelLeader;
      this.rateConfigParam.companyType = row.companyType;
      this.rateConfigParam.ratioCalculationRules = row.ratioCalculationRules;

      this.SettlementAndRateParams.repChannelId = row.repChannelId;
      this.SettlementAndRateParams.channelLeader = row.channelLeader;
      this.SettlementAndRateParams.companyType = row.companyType;
      this.SettlementAndRateParams.ratioCalculationRules = row.ratioCalculationRules;
      this.RateConfigPageList(row);
      this.addFeeConfigList(row);
    },
    sumbit() {
      this.rateTab === "industry" ? this.sureModify() : this.sureModify02();
    },
    /* =================行业费率设置=================== */
    hasNullTest(arr) {
      let hasNull = false;
      for (let i = 0; i < arr.length; i++) {
        let settings = arr[i].setting;
        if (settings && settings.length > 0) {
          for (let j = 0; j < settings.length; j++) {
            let v = settings[j];
            if (!v || !v.payType || !v.settlementTime || !v.merchantType) {
              hasNull = true;
            }
          }
        } else {
          hasNull = true;
        }
      }
      return hasNull;
    },
    async sureModify() {
      if (!this.rateConfigParam.ratioCalculationRules || this.rateConfigParam.ratioCalculationRules === null) {
        this.$message.error("进位方式不能为空！");
        return;
      }
      if (!this.rateConfigParam.channelLeader  || this.rateConfigParam.channelLeader === null) {
        this.$message.error("负责人不能为空！");
        return;
      }
      let arr = this.rateConfigParam.costRatetings;
      if (arr && arr.length > 0) {
        if (this.hasNullTest(arr)) {
          this.$message.error("必填项不能为空！");
          return;
        }
      } else {
        this.$message.error("请填写项目！");
        return;
      }
      let booleans = this.rateConfigParam.costRatetings.map(v =>
        this.testPar(v.setting)
      );
      if (booleans.includes(true)) {
        this.$message.error("在同一时间段存在相同条件，请修改或删除！");
      } else {
        this.rateConfigParam.calculationRules = this.rateConfigParam.ratioCalculationRules
        delete this.rateConfigParam.ratioCalculationRules
        let res = await RateConfigSave(
            this.rateConfigParam
          )
        if (res.data.code == 0) {
          this.$message.success("修改成功");
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.data.errMsg);
        }
      }
    },
    deleteConf(index) {
      console.log("!212121", index)
      this.rateConfigParam.costRatetings.splice(index, 1);
    },
    profitChange(v) {
    },
    async RateConfigPageList(row) {
        try {
          let res = await RateConfigPageList(
              "?repChannelId=" +
              encodeURIComponent(row.repChannelId)
          )
          if (res.data.code == 0 && !!res.data.extra) {
            this.rateConfigParam = res.data.extra;
            if (this.rateConfigParam.costRatetings.length === 0) {
              this.addRateConf();
            }
          }
          this.dialogFormVisible = true;
        } catch (error) {
          console.log(error)
        }
    },
    addRateConf() {
      this.rateConfigParam.costRatetings.push({
        startTime: null,
        endTime: null,
        setting: [
          {
            id: null,
            payType: null,
            settlementTime: null,
            merchantType: null,
            specialIndusrty: null,
            profitExpression: null,
            costRate: {
              maxMoney: null,
              maxfee: null,
              upRate: null,
              lowRate: null,
              rate: null,
              ratio: null,
              merchantRate: null,
              minfee: null
            }
          }
        ]
      });
    },
    resetEditData() {
      this.form.dataTime = [];
      this.currentPreData = {};
      this.currentEditData = {};
    },
    // 页面相关的其他
    handleSure() {
      this.$confirm(
        "修改渠道成本费率将影响渠道分润计算，确定要修改吗?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          const data = {
            id: this.isAddRecord ? "" : this.currentEditData.id,
            repChannelId: this.currentEditData.repChannelId,
            costRate: this.currentEditData.costRate,
            ratio: this.currentEditData.ratio,
            rebateRate: this.currentEditData.rebateRate,
            cappingAmount: this.currentEditData.cappingAmount,
            capptingAmountSingle: this.currentEditData.capptingAmountSingle,
            debitLowrate: this.currentEditData.debitLowrate,
            debitUprate: this.currentEditData.debitUprate,
            creditLowrate: this.currentEditData.creditLowrate,
            creditUprate: this.currentEditData.creditUprate,
            startDate: this.form.dataTime[0],
            endDate: this.form.dataTime[1],
            wxRate: this.currentEditData.wxRate,
            zfbRate: this.currentEditData.zfbRate,
            dccRate: this.currentEditData.dccRate,
            edcRate: this.currentEditData.edcRate
          };
          let res = await modify(data)
          if (!res.data.code) {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.showChangeBox = false;
            this.currentEditData = {};
            this.dataList();
          } else {
            this.$message({
              type: "error",
              message: "修改失败!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    async useEdit(index, row) {
      let res = await enAble("?id=" + row.id)
      if (!res.data.code) {
        this.$message({
          type: "success",
          message: "启用成功!"
        });
        this.dataList();
      } else {
        this.$message({
          type: "error",
          message: "启用失败!"
        });
      }
    },
    remove(index, row) {
      this.$confirm("此操作将删除该渠道, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await channelDelete(
              "?id=" + row.id
            )
            if (!res.data.code) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.dataList();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消禁用"
          });
        });
    },
    handleClick(tab, event) {
      if (tab.index == 0) {
        this.$router.push({ path: "/statement/deploy/special" });
      }
      if (tab.index == 1) {
        this.$router.push({ path: "/statement/deploy/expand" });
      }
      if (tab.index == 2) {
        this.$router.push({ path: "/statement/deploy/area" });
      }
      if (tab.index == 3) {
        this.$router.push({ path: "/statement/deploy/agent" });
      }
    },
    indexMethod(index) {
      return index + 1;
    },
    async dataList() {
        let res = await repChannelList(
              "?page=" +
              this.formInline.page +
              "&size=" +
              this.formInline.size
          )
        if (res.data.code === 0) {
          this.tableData = res.data.extra.rows;
          this.total = res.data.extra.total;
        } else {
          this.$message({
            message:res.data.msg,
            type:'error'
          })
          // this.loading = true;
        }
        this.loading = false;
    },
    // 翻页
    handleSizeChange(val) {
      this.formInline.size = val;
      this.dataList();
    },
    handleCurrentChange(val) {
      // this.formInline.page = val - 1;
      this.formInline.page = val;
      this.loading = true;
      this.dataList();
    },
    testPar(settings){
        if(settings.length > 1){
            let settingsStr = settings.map( v => {
                return v.payType  + v.settlementTime + v.merchantType + v.specialIndusrty
            })
            return  this.isRepeat(settingsStr)
        }
        return  false
    },
    isRepeat(arr) {
      let hash = {};
      for (let i in arr) {
        if (hash[arr[i]]) return true;
        hash[arr[i]] = true;
      }
      return false;
    },
    /** ======================== 这里没有调用又不敢删除系列 ===================== */
    stopEdit(index, row) {
      this.$confirm(
        "渠道禁用后将无法上传此渠道交易数据，确定禁用「" +
          row.repChannelName +
          "」吗?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          let params = "?id=" + row.id
          let res = await disAble(params)
          if (!res.data.code) {
            this.$message({
              type: "success",
              message: "禁用成功!"
            });
            this.dataList();
          } else {
            this.$message({
              type: "error",
              message: "禁用失败!"
            });
          }
        })
    },
    onSubmit() {
      if (this.dataTime) {
        this.formInline.startAt = this.dataTime[0] + " " + "00:00:00";
        this.formInline.endAt = this.dataTime[1] + " " + "23:59:59";
      } else {
        this.formInline.startAt = "";
        this.formInline.endAt = "";
      }
      this.currentPage4 = 1;
      this.dataList();
    },
    handleEdit(index, row) {
      this.$router.push({
        path: "/system/systemLogDetail",
        // query: { page: this.formInline.page + 1, id: row }
        query: { page: this.formInline.page, id: row }
      });
    },
    changeEditCostRate(index, rowData) {
      this.editType = "变更";
      this.resetEditData();
      this.ajax
        .commonApi2(
          "get",
          "X",
          this.api.statement.getNewestCostRate +
            "?repChannelId=" +
            encodeURIComponent(rowData.repChannelId)
        )
        .then(res => {
          if (res.data.code === 0) {
            // this.tableData2 = res.data.extra
            this.showChangeBox = true;
            this.isAddRecord = true;
            this.currentPreData.repChannelName = rowData.repChannelName;
            this.currentEditData.repChannelId = rowData.repChannelId;
            if (res.data.extra.id) {
              this.currentPreData = res.data.extra;
              this.currentPreData.repChannelName = rowData.repChannelName;
              this.currentEditData.id = this.currentPreData.id;
              this.currentEditData.repChannelId =
                this.currentPreData.repChannelId || rowData.repChannelId;
              this.form.dataTime = [
                this.currentPreData.startDate,
                this.currentPreData.endDate
              ];
            }
          }
        });
    },
    // 添加渠道
    addChanl() {
      this.ajax
        .commonApi2("post", "JSON", this.api.statement.addchannel, this.formAdd)
        .then(res => {
          if (!res.data.code) {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.dataList();
          } else {
            this.$message({
              type: "error",
              message: "添加失败!"
            });
          }
        })
        .catch(err => {
          if (err.code) {
            this.$message({
              type: "error",
              message: "添加失败!" + err.errMsg
            });
          }
        });
      this.dialogaddDitcdVisible = false;
    },
    toEditChange(rowData) {
      this.editType = "修改";
      this.showChangeBox = true;
      this.isAddRecord = false;
      this.currentEditData.id = rowData.id;
      this.currentEditData.repChannelId = rowData.repChannelId;
      this.currentPreData = rowData;
      this.form.dataTime = [rowData.startDate, rowData.endDate];
    },
    toDeleteChange(scope) {
      this.$confirm("确定要删除该变更记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRow(scope.$index, this.tableData2);
          this.ajax
            .commonApi2(
              "get",
              "X",
              this.api.statement.deleteModifyRecord +
                "?id=" +
                encodeURIComponent(scope.row.id)
            )
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success("删除成功");
                this.dataList();
              } else {
                this.$message.success("删除失败");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    getRateData(id) {
      this.ajax
        .commonApi2(
          "get",
          "X",
          this.api.statement.displayCostRate +
            "?repChannelId=" +
            encodeURIComponent(id)
        )
        .then(res => {
          if (res.data.code === 0) {
            this.tableData2 = res.data.extra;
          }
        });
    },
    isDeleteFuc() {
      this.isDelete = true;
    },
    changeDetail() {
      this.ajax
        .commonApi2("post", "JSON", this.api.statement.channelModify, {
          id: this.editInfoData.id,
          repChannelName: this.editInfoData.repChannelName,
          companyType: this.editInfoData.companyType,
          channelLeader: this.editInfoData.channelLeader
        })
        .then(res => {
          if (!res.data.code) {
            this.$message({
              type: "success",
              message: "编辑成功!"
            });
            this.dataList();
          } else {
            this.$message({
              type: "error",
              message: "编辑失败!"
            });
          }
        });
      this.dialogFormVisible = false;
    }
  },
  watch: {
    name(newValue, oldValue) {
      this.formAdd.name = newValue;
      if (newValue) {
        this.clickbtn1 = false;
      } else {
        this.clickbtn1 = true;
      }
    },
    uname(newValue, oldValue) {
      this.formAdd.uname = newValue;
      if (newValue) {
        this.clickbtn2 = false;
      } else {
        this.clickbtn2 = true;
      }
    },
    code(newValue, oldValue) {
      this.formAdd.code = newValue;
      if (newValue) {
        this.clickbtn3 = false;
      } else {
        this.clickbtn3 = true;
      }
    },
    companyType(newValue, oldValue) {
      this.formAdd.companyType = newValue;
      if (newValue) {
        this.clickbtn4 = false;
      } else {
        this.clickbtn4 = true;
      }
    },
    leader(newValue, oldValue) {
      this.formAdd.leader = newValue;
      if (newValue) {
        this.clickbtn5 = false;
      } else {
        this.clickbtn5 = true;
      }
    },
    rate(newValue, oldValue) {
      this.formAdd.rate = newValue;
      if (newValue) {
        this.clickbtn6 = false;
      } else {
        this.clickbtn6 = true;
      }
    },
    shareProfitRatio(newValue, oldValue) {
      this.formAdd.shareProfitRatio = newValue;
      if (newValue) {
        this.clickbtn7 = false;
      } else {
        this.clickbtn7 = true;
      }
    },
    cleader(newValue, oldValue) {
      this.form.leader = newValue;
      if (newValue) {
        this.clickbtnfrom1 = false;
      } else {
        this.clickbtnfrom1 = true;
      }
    },
    type(newValue, oldValue) {
      this.form.type = newValue;
    }
  },
  mounted() {
    this.companyType = "1";
    this.formInline.size = 10;
    if (this.$route.query.page) {
      this.currentPage4 = this.$route.query.page * 1;
    } else {
      this.formInline.page = this.page;
    }
    this.dataList();
  }
};
</script>

<style lang="less" scoped>
.el-form-item.is-success .el-input__inner,
.el-form-item.is-success .el-input__inner:focus,
.el-form-item.is-success .el-textarea__inner,
.el-form-item.is-success .el-textarea__inner:focus {
  border-color: none !important;
}
.w12 {
  width: 15%;
  text-align: center;
  margin: 0 10px;
}
.w40 {
  width: 25%;
  text-align: right;
}
/* .search-box{width: 100%; position: relative} */
.df {
  display: flex;
}
.df .el-input {
  width: 50px !important;
}
.mt10 {
  margin-top: 10px;
}
.table-page {
  margin: 20px 10px;
  text-align: right;
}
a:-webkit-any-link {
  text-decoration: none;
}
.text_decoration {
  text-decoration: underline;
}
.combat {
  color: #336600;
}
.green {
  color: #009900;
}
.blue {
  color: blue;
}
.yellow {
  color: #ffcc00;
}
.red {
  color: red;
}
.editWidth {
  width: 100%;
  height: 100%;
}
.addDitcd .dis {
  background: #999 !important;
}
.edit-table,
.detail-table {
  width: 100%;
  border: 1px solid #cad9ea;
  border-collapse: collapse;
  th,
  td {
    height: 27px;
    border: 1px solid #cad9ea;
    text-align: center;
  }
  .table-header {
    background-color: rgb(247, 249, 254);
    .header-item {
    }
  }
  .table-body {
    .item-line {
      .item-title {
      }
      .item-value {
      }
      .item-edit {
        padding: 4px;
        input {
          width: 100%;
          height: 100%;
          border: 1px solid rgb(206, 216, 206);
          padding: 0 5px;
          box-sizing: border-box;
          line-height: 22px;
          text-align: center;
          font-size: 14px;
          border-radius: 4px;
        }
      }
    }
  }
}
.detail-box {
  .dialog-row {
    width: 100%;
    display: flex;
    align-items: center;
    .row-item {
      height: 36px;
      margin-right: 30px;
      display: flex;
      align-items: center;
      .item-label {
        width: 80px;
        color: #333;
      }
      .item-value {
        color: #999;
      }
    }
  }
  .detail-table {
    margin-top: 10px;
  }
}
.edit-btn {
  color: #66cccc;
  border-color: #66cccc;
  &:active {
    background: #66cccc;
    color: #fff;
  }
}
.delete-btn {
  color: #ff6666;
  border-color: #ff6666;
  &:active {
    background: #ff6666;
    color: #fff;
  }
}
.is-required {
  color: #f56c6c;
  margin-right: 4px;
  font-style: normal;
}
</style>
<style>
.el-tag--medium {
  min-width: 50px;
}
</style>
