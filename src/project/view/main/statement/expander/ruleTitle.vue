<template>
  <el-row :gutter="24" style="display: flex;align-items: center;">
        <el-col :span="12">
            <h2>{{title}}</h2>
        </el-col>
        <el-col :span="12" style="text-align:right;">
            <el-button type="primary" @click="update">更新信息</el-button>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        props:{
            title:{
                type:String,
                default:''
            }
        },
        methods:{
            update(){
                this.$emit('onUpdate')
            }
        }
    }
</script>

<style lang="less" scoped>

</style>