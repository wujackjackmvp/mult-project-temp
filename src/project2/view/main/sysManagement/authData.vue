<template>
  <div class="c-content-inner">
    <!-- 编辑添加探矿 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名" style="width:260px">
        <el-input v-model="formInline.qUserName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="用户名" style="width:280px">
        <el-input v-model="formInline.qLoginAccount" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="角色" style="width:280px">
        <el-select v-model="formInline.qRoleId" placeholder="请选择角色">
          <el-option
            v-for="item in roleList"
            :key="item.value"
            :label="item.roleName"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据查看范围">
        <el-select v-model="formInline.qUserType" placeholder="请选择数据查看范围">
          <el-option
            v-for="item in userTypeList"
            :key="item.value"
            :label="item.userTypeDesc"
            :value="item.userTypeId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="clearFormData">清空</el-button>
      </el-form-item>
    </el-form>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <div>
          <el-table v-loading="isLoading" :data="userList" style="width: 100%">
            <el-table-column label="姓名" width="120" prop="userName"></el-table-column>
            <el-table-column label="用户名" width="200" prop="loginAccount"></el-table-column>
            <el-table-column width="120" label="所属部门" prop="departName">
              <template slot-scope="scope">
                {{getdepartName(scope.row)}}
              </template>
            </el-table-column>
            <el-table-column width="180" label="角色" prop="roleName"></el-table-column>
            <el-table-column label="数据查看范围" prop="userType">
              <template slot-scope="scope">
                {{filterUserType(scope.row.userType)}}
              </template>
            </el-table-column>
            <el-table-column label="更新时间" prop="updatedTime"></el-table-column>
            <el-table-column label="操作" width="260">
              <template slot-scope="scope">
                <el-button size="mini" @click.native="showEditDialog(scope.row)">设定</el-button>
                <el-button size="mini" @click.native="delUser(scope.row)">撤销</el-button>
              </template>
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
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>

    <!-- 编辑添加探矿 -->
    <el-dialog :title="'设置'" :visible.sync="dialogFormVisible" width="800px">
      <el-form :model="userInline" :inline="true">
        <el-form-item label="姓名 :" label-width="120px" style="width:48%">
          <span>{{ userInline.duserName }}</span>
        </el-form-item>
        <el-form-item label="用户名 :" label-width="120px" style="width:48%">
          <span>{{ userInline.dLoginAccount }}</span>
        </el-form-item>
        <el-form-item label="所属部门 :" label-width="120px" style="width:48%">
          <span>{{ userInline.departName }}</span>
        </el-form-item>
        <el-form-item label="角色 :" label-width="120px" style="width:48%">
          <span>{{ userInline.roleName }}</span>
        </el-form-item>
        <el-form-item label="数据查看范围 :" label-width="120px" style="width:90%">
          <el-select v-model="userInline.dUserType" placeholder="请选择角色" style="width:475px">
            <el-option
              v-for="item in userTypeList"
              :key="item.value"
              :label="item.userTypeDesc"
              :value="item.userTypeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理部门:" label-width="120px" style="width:90%" v-if="userInline.dUserType === 4">
          <el-select v-model="userInline.userDeparts" multiple placeholder="请选择" style="width:475px">
            <el-option
              v-for="item in departmentSelectDate"
              :key="item.id"
              :label="item.departName"
              :value="item.departId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="sureSumbit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, getUserType, getRoleList, getDepartmentList, getUserDetail, userEdit } from '@/sercive/api/authSercive' 
import treeSelect from "@/components/selectTree";
import { mapState } from 'vuex';
export default {
  name: "daily",
  components: {
    treeSelect
  },
  data() {
    return {
      userList: [],
      userTypeList: [],
      roleList: [],
      returnArray: [],
      // table
      isLoading: false,
      formInline: {
        qUserType: "",
        qRoleId: "",
        qUserName: "",
        qLoginAccount: "",
        pageNum: 1, 
        countNum: 10
      },
      tableData: [],
      page: 1,
      size: 10,
      total: 0,
      count: 0,
      fanweiList: [
        { label: "全部", value: null },
        { label: "范围", value: 0 },
        { label: "角色三", value: 1 }
      ],
      apiList: {
        getReqProfit: this.api.shareProfit.getReqProfit,
        createReqProfit: this.api.shareProfit.createReqProfit,
        sendReqProfit: this.api.shareProfit.sendReqProfit,
        repAgentProfitCount: this.api.shareProfit.repAgentProfitCount
      },
      // 操作框
      currentUserId: undefined,
      defaultProps: {
        children: "childrenList",
        label: "departName"
      },
      nodeKey: "menuId",
      defaultCheckedKeys: [],
      menus: [
        {
          menuId: 1,
          menuName: "系统管理",
          childrenList: [
            {
              menuId: 100,
              menuName: "用户管理",
              childrenList: [
                {
                  menuId: 1000,
                  menuName: "用户查询"
                },
                {
                  menuId: 1001,
                  menuName: "用户新增"
                },
                {
                  menuId: 1002,
                  menuName: "用户修改"
                },
                {
                  menuId: 1003,
                  menuName: "用户删除"
                }
              ]
            },
            {
              menuId: 101,
              menuName: "角色管理",
              childrenList: [
                {
                  menuId: 1006,
                  menuName: "角色查询"
                },
                {
                  menuId: 1007,
                  menuName: "角色新增"
                },
                {
                  menuId: 1008,
                  menuName: "角色修改"
                },
                {
                  menuId: 1011,
                  menuName: "删除角色"
                }
              ]
            }
          ]
        }
      ],
      departmentSelectDate: [],
      dialogFormVisible: false,
      userInline: {
        dUserId: "",
        dDepartId: "",
        dUserType: "",
        userName: "",
        dLoginAccount: "",
        departName: "",
        roleName: "",
        userDeparts: [],
        duserName: "",
        dLoginPass: "",
        dRoleId: "",
      }
    };
  },
  computed:{
    ...mapState({
      'userId': ( state ) => state.userInfo.userId,
      'roleName': ( state ) => state.userInfo.roleName
    })
  },
  created() {
    this.defaultCheckedKeys = [1000];
  },
  mounted() {
    this.defaultCheckedKeys = [1001];
    this.init();
  },
  methods: {
    getdepartName(row){
      let departName = ''
      if(row.departName !== null){
        departName =row.departName
      } else {
        // departName = row.userDeparts.map(item=> item.departName).join(' ')
      }
      return departName
    },
    filterUserType(userType){
      let fineOne = this.userTypeList.find(item => item.userTypeId === userType)
      console.log("fineOne", fineOne)
      return (fineOne ? fineOne.userTypeDesc : '')
    },
    /** =================== http请求 ======================== */
    init() {
      this.getUserList();
      this.getUserType();
      this.getRoleList();
      this.getDepartmentList()
    },
    search(){
      this.formInline.pageNum = 1
      this.getUserList()
    },
    async getUserList() {
      let { qUserType, qRoleId, qUserName, qLoginAccount, pageNum, countNum} = this.formInline;
      let params = {
        qUserType: qUserType === '' ? undefined : qUserType,
        qRoleId: qRoleId === '' ? undefined : qRoleId,
        qUserName: qUserName === '' ? undefined : qUserName,
        qLoginAccount: qLoginAccount === '' ? undefined : qLoginAccount,
        userId: this.userId,
        pageNum,
        countNum
      };
      let res = await getUserList(params);
      if (res.data.code === 200) {
        this.userList = res.data.data.datas;
        // this.page = res.data.data.pageNum + 1
        this.page = res.data.data.pageNum
        this.size = res.data.data.countNum
        this.total = res.data.data.totalNum
      }
    },
    async getUserType() {
      let res = await getUserType();
      if (res.data.code === 200) {
        this.userTypeList = res.data.data;
      }
    },
    async getRoleList() {
      let res = await getRoleList({
        // pageNum: 0,
        pageNum: 1,
        countNum: 1000,
        status: 0
      });
      if (res.data.code === 200) {
        console.log("resrrole", res)
        this.roleList = res.data.data.datas;
      }
    },
    async getDepartmentList(){
        let res = await getDepartmentList()
        if (res.data.code === 200) {
            this.departmentSelectDate = res.data.data
        }
    },
    /** ==================== 用户操作 ====================== */
    cancenl() {},
    handleSizeChange(val) {
      this.formInline.countNum = val;
      this.getUserList()
    },
    handleCurrentChange(val) {
      // this.formInline.pageNum = val - 1;
      this.formInline.pageNum = val;
      this.getUserList()
    },
    clearFormData() {
      this.formInline = {
        qUserType: "",
        qRoleId: "",
        qUserName: "",
        qLoginAccount: "",
        // pageNum: 0, 
        pageNum: 1, 
        countNum: 10
      };
      this.getUserList();
    },
    /** ==================== 弹框 ====================== */
    async showEditDialog(item) {
      // if (this.roleName !== '超级管理员') {
      //   this.$message.error('当前用户没有权限编辑该目标用户')
      //   return
      // }
      let res = await getUserDetail({userId: item.userId})
      let userInfo = res.data.data
      this.userInline = {
        dUserId: userInfo.userId,
        userDeparts: userInfo.userDeparts.map(item=> item.departId),
        dUserType: userInfo.userType,
        dLoginAccount: userInfo.loginAccount,
        departName: userInfo.departName,
        roleName: userInfo.roleName,
        duserName: userInfo.userName,
        dLoginPass: userInfo.loginPass,
        dRoleId: userInfo.roleId,
        dDepartId: userInfo.departNo
      }
      this.dialogFormVisible = true;
    },
    async edit() {
      let { dUserId, dDepartId, dUserType, userDeparts, dLoginAccount, duserName, dLoginPass, dRoleId} = this.userInline;
      const submitData = {
        userId: this.userId,
        option: dUserId ? "upd" : "ins",
        dUserId,
        dLoginAccount,
        userDeparts,
        dUserType,
        duserName,
        dLoginPass,
        dRoleId,
        dDepartId
      };
      let res = await userEdit(submitData);
      if (res.data.code === 200) {
        if (this.$route.query.id) {
          this.$message.success("编辑成功");
          this.dialogFormVisible = false;
          this.getUserList();
        } else {
          this.$message.success("新增成功");
          this.dialogFormVisible = false;
          this.getUserList();
        }
      }
    },
    async delUser(item){
      let res = await getUserDetail({userId: item.userId})
      let userInfo = res.data.data
      const submitData = {
        userId: this.userId,
        option: "upd",
        dUserId: userInfo.userId,
        dLoginAccount: userInfo.loginAccount,
        userDeparts: [],
        dUserType: 1,
        duserName: userInfo.userName,
        dLoginPass: userInfo.loginPass,
        dRoleId: userInfo.roleId,
        dDepartId: userInfo.departNo
      }
      let editRes = await userEdit(submitData);
      if(res.data.code === 200){
        this.$message.success('撤销成功')
        this.getUserList()
      }
    },

    cancelDialog() {
      let userInline = {
        dUserId: "",
        dDepartId: "",
        dUserType: "",
        userName: '',
        dLoginAccount: '',
        departName: '',
        roleName: "",
        userDeparts: [],
        duserName: "",
        dLoginPass: "",
        dRoleId: "",
      };
      this.dialogFormVisible = false;
    },
    sureSumbit() {
      this.edit()
    },
    popoverHide(checkedIds, checkedData) {
      console.log(checkedIds);
      console.log(checkedData);
    }
  }
};
</script>

<style>
.el-table .cell {
  text-align: center;
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
