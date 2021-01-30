<template>
    <div class="c-content-inner">
        <el-row style="position:relative">
            <el-tabs>
                <el-tab-pane label="代理商信息同步" :name="'0'">
                    <agent-sync></agent-sync>
                </el-tab-pane>
                <el-tab-pane label="系统自动生成" :name="'1'">
                    <auto-create></auto-create>
                </el-tab-pane>
                <el-tab-pane label="财务核准生成" :name="'2'">
                    <finance></finance>
                </el-tab-pane>
                <el-tab-pane label="代理商分润推送" :name="'3'">
                    <send></send>
                </el-tab-pane>
            </el-tabs>
        </el-row>
    </div>
</template>

<script>
import agentSync from "./components/agentSync";
import autoCreate from "./components/autoCreate";
import finance from "./components/finance";
import send from "./components/send";
export default {
    components: {
        agentSync,
        autoCreate,
        finance,
        send
    }
};
</script>

<style></style>
