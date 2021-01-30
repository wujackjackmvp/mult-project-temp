<template>
  <div>
    <div class="table-box">
      <el-table v-loading="loading" border :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="拓展人ID" />
        <el-table-column prop="name" label="拓展人名称" />
        <el-table-column prop="reportDepart" label="所属日报部门" />
        <el-table-column prop="bonusDepart" label="所属普通提成部门" />
        <el-table-column prop="bonusGroup" label="所属项目组提成部门" />
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
  import { pageAreaExpander } from "@/sercive/api/configMsgSercive";

  export default {
    data() {
      return {
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
      indexMethod(index) {
        return index + 1
      },
      async pageAreaExpander() {
        // todo
        let {page, size} = this
        this.loading = true
        let res = await pageAreaExpander({
            page,
            size
        })
        this.tableData = res.data.extra.rows
        this.total = +res.data.extra.total
        this.loading = false
      },
      // 翻页
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.size = val
        this.loading = true
        this.pageAreaExpander()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page = val
        this.loading = true
        this.pageAreaExpander()
      }
      
    },
    mounted() {
      this.pageAreaExpander()
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
