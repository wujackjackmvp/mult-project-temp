<template>
    <div>
        <div class="table-box">
            <el-table v-loading="loading" border :data="tableData" style="width: 100%">
                <el-table-column  prop="agentName" label="代理商名称">
                </el-table-column>
                <el-table-column prop="merchName" label="商户名称">
                </el-table-column>
                <el-table-column prop="costRate" label="成本费率">
                </el-table-column>
                <el-table-column prop="merchRate" label="商户费率">
                </el-table-column>
            </el-table>
        </div>

        <div class="table-page">
          <el-pagination
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="currentPage4"
                 :page-sizes="[10, 20]"
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
      formInline: {
        merchantName: ""
      },
      dataTime: "",
      tableData: [],
      currentRow: null,
      // 翻页
      currentPage4: 1,
      page:"1",
      size:"8",
      loading: true,
      total:'400',
    };
  },
  methods: {
    onSubmit() {
      
        if(this.dataTime){
           this.formInline.startAt = this.dataTime[0]+" "+"00:00:00"
           this.formInline.endAt = this.dataTime[1]+" "+"23:59:59"
        }else{
           this.formInline.startAt = ''
           this.formInline.endAt = ''
        }
        this.currentPage4 = 1
        this.dataList()

    },
    indexMethod(index) {
      return index + 1;
    },dataList(){
      
      this.ajax.commonApi2('get','X',this.api.statement.agentList+'?page='+ this.formInline.page +'&size='+ this.formInline.size)
        .then(res => {
          console.log('111',res);
          this.tableData = res.data.extra.rows
          this.total = res.data.extra.total
          if(res.data.extra){
               this.loading = false
          }else{
               this.loading = true
          }
          
        });
    },handleEdit(index,row){
        //  console.log(index,row)
         this.$router.push({path:'/merchant/merDetail',query:{page:this.formInline.page + 1,id:row.merchantId}})
        //  console.log(row.id)
    },
    // 翻页
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
         this.formInline.size = val
        this.dataList()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        // this.formInline.page = val -1 
        this.formInline.page = val
        this.loading = true
        this.dataList()
      }
  
  },
  mounted() {
    this.formInline.size = 10
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
.search-box{width: 100%; position: relative}
.table-page{margin:20px 10px;text-align: right}
#search-box .el-tabs__item{font-size: 16px;}
.tabs_color{color: red}
.primaryBut{width: 80px;height: 28px; position: absolute;right: 10px;top: 0px;}
a:-webkit-any-link {
    text-decoration: none;
}
</style>