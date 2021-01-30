<template>
    <div class="c-content-inner">
        <el-tabs v-model="activeName">
            <el-tab-pane label="系统自动生成" name="daily">
                <dailyPage></dailyPage>
            </el-tab-pane>
            <el-tab-pane label="财务核准生成" name="repRatity">
                <repRatityPage></repRatityPage>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import dailyPage from './components/daily'
    import repRatityPage from './components/repRatity'
    export default {
        name: "daily",
        components:{
            dailyPage,
            repRatityPage
        },
        data(){
            return {
               activeName: 'daily'
            }
        },
        mounted(){

        },
        methods: {
        }
    }
</script>

<style>
    .el-table .cell{
        text-align: center;
    }
    .el-pagination{
        display: flex;
        justify-content: flex-end;
    }
</style>
