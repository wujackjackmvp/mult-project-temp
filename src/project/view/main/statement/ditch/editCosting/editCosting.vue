<template>
    <div class="c-content-inner">
        
        <div class="search-box">
            <el-button size="mini" @click="goBack" style="margin-bottom:20px">返回</el-button>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="日期">
                <!-- <el-date-picker 
                v-model="dataTime" 
                type="daterange" 
                range-separator="至" 
                start-placeholder="开始日期" 
                end-placeholder="结束日期"  
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions1"></el-date-picker> -->
                <el-date-picker
                  v-model="startDate"
                  type="date"
                  placeholder="选择开始日期">
                </el-date-picker>
                <el-date-picker
                  v-model="endDate"
                  type="date"
                  placeholder="选择结束日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="新费率">
                <el-input v-model="formInline.ip" placeholder=""></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">确认</el-button>
              </el-form-item>
            </el-form>
            <p style="margin-top:30px;font-size:14px;">缺失信息列表</p>
        </div>

        <div class="table-box">
            <el-table v-loading="loading" border :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="时间">
                </el-table-column>
                <el-table-column prop="date" label="费率" width="400">
                </el-table-column>
                <el-table-column label="操作" width="400">
                    <template slot-scope="scope">
                        <p class="editStyle" @click="dialogFormVisible = true">修改</p>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="editInfo">
            <el-dialog title="修改信息" :visible.sync="dialogFormVisible" style="text-align: center;">
            <el-form :model="form">
                <!-- 时间显示，只能更改费率 -->
                <el-form-item label="时间" :label-width="formLabelWidth">
                <el-input v-model="form.time" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="费率" :label-width="formLabelWidth">
                <el-input v-model="form.rate" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
                <el-button size="medium" type="primary" @click="dialogFormVisible = false" style="width:150px">确 定</el-button>
            </div>
            </el-dialog>
        </div>

        <div class="table-page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="parseInt(size)"
            layout="total, sizes, prev, pager, next, jumper"
            :total="parseInt(total)">
          </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      pickerOptions: {
        disabledDate: (time) => {
          var date1 = new Date(this.startDate);
          var date2 = new Date(date1);
          date2.setDate(date1.getDate() + 87);
          return time.getTime() > date2.getTime();

        }
      },
      dialogFormVisible: false,
      form: {
        time: '',
        rate: '',
      },
      formLabelWidth: '120px',
      formInline: {
        operation: "",
        user: "",
        ip: "",
        region: ""
      },
      dataTime: "",
      tableData: [],
      currentRow: null,
      // 翻页
      currentPage4: 0,
      page: "0",
      size: "8",
      loading: true,
      total: "400",
   
    };
  },
  methods: {
    goBack(){
        this.$router.push({path:'/statement/ditch'})
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
    indexMethod(index) {
      return index + 1;
    },
    dataList() {
      this.ajax
        .commonApi2("post", "JSON", this.api.statement.MerchantList, this.formInline)
        .then(res => {
          console.log('111',res);
          this.tableData = res.data.extra.data;
          this.total = res.data.extra.total;
          if (res.data.extra) {
            this.loading = false;
          } else {
            this.loading = true;
          }
        });
    },
    handleEdit(index, row) {

      this.$router.push({
        path: "/system/systemLogDetail",
        query: { page:this.formInline.page + 1,id: row }
      });

    },
    // 翻页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.formInline.size = val;
      this.dataList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.formInline.page = val - 1;
      this.loading = true;
      this.dataList();
    }
  },
  mounted() {
    this.formInline.size = 10;
    if(this.$route.query.page){
      // alert(this.$route.query.page)
       this.currentPage4 = this.$route.query.page * 1
    }else{
       this.formInline.page = this.page;
    }
  }
};
</script>

<style scoped>
/* .search-box{border-bottom:1px solid #eee} */
.table-page {
  margin: 20px 10px;
  text-align: right;
}
.more {
  height: 20px;
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.editStyle{
    text-decoration:underline;
    color: blue;
}
</style>