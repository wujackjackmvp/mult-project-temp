<template>
  <div>
    <div class="table-box">
      <el-table v-loading="loading" border :data="tableData" style="width: 100%">
        <el-table-column prop="departId" label="部门ID" />
        <el-table-column prop="name" label="部门名称" />
        <el-table-column prop="parentDepart" label="上级部门" />
        <el-table-column 
          prop="moduleIds" 
          label="适用模块" 
          :formatter="formatter.filterDepart"
        />
      </el-table>
    </div>
    
    <div class="table-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  
  </div>
</template>

<script>
  import { getDepartment } from "@/sercive/api/configMsgSercive";
  import formatter from "@/utils/filter/formatter";

  export default {
    data() {
      return {
        formatter,
        formInline: {
          merchantName: ''
        },
        dataTime: '',
        tableData: [],
        currentRow: null,
        // 翻页
        page: 1,
        size: 10,
        loading: false,
        total: 0
      }
    },
    methods: {
      onSubmit() {
        this.getDepartment()
      },
      indexMethod(index) {
        return index + 1
      },
      async getDepartment() {
        this.loading = true
        let {page, size} = this
        let res = await getDepartment({
            page,
            size
        })
        this.tableData = res.data.extra.rows
        this.total = res.data.extra.total
        this.loading = false
      },
      handleEdit(index, row) {
        //  console.log(index,row)
        this.$router.push({
          path: '/merchant/merDetail',
          query: { page: this.formInline.page + 1, id: row.merchantId }
        })
      },
      // 翻页
      handleSizeChange(val) {
        this.size = val
        this.getDepartment()
      },
      handleCurrentChange(val) {
        this.page = val - 1
        this.loading = true
        this.getDepartment()
      }
    },
    mounted() {
      this.getDepartment()
    }
  }
</script>

<style scoped>
  .search-box {
    width: 100%;
    position: relative
  }
  .table-page {
    margin: 20px 10px;
    text-align: right
  }
  #search-box .el-tabs__item {
    font-size: 16px;
  }
  .tabs_color {
    color: red
  }
  .primaryBut {
    width: 80px;
    height: 28px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
  a:-webkit-any-link {
    text-decoration: none;
  }
</style>
