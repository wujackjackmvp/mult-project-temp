<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'app',
        mounted(){
            console.log("process", process.env)
            window.addEventListener('offline', () => {
                this.$message.error('网络异常,请检查网络状况!')
            });
        }
    }
</script>
<style>
    html,
    body {
        margin: 0;
        background: #d8d8d8;
        font-family: "PingFang SC";
    }
    .c-content-inner {
        background-color: #fff;
        border: 0;
        border-radius: 1px;
        box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.03);
        -moz-box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.03);
        padding: 30px 15px;
        margin: 15px;
    }
    .table-box {
        margin-top: 30px;
    }
    .el-table th > .cell {
        text-align: center;
    }
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
        display: table;
    }
    .el-form-item {
        display: table;
    }
    a {
        text-decoration: none;
    }
    @font-face {
        font-family: 'icomoon';
        src: url('./assets/fonts/icomoon.eot?c6lnhj');
        src: url('./assets/fonts/icomoon.eot?c6lnhj#iefix') format('embedded-opentype'),
        url('./assets/fonts/icomoon.ttf?c6lnhj') format('truetype'),
        url('./assets/fonts/icomoon.woff?c6lnhj') format('woff'),
        url('./assets/fonts/icomoon.svg?c6lnhj#icomoon') format('svg');
        font-weight: normal;
        font-style: normal;
    }
    [class^="icon-"], [class*=" icon-"] {
        /* use !important to prevent issues with browser extensions that change fonts */
        font-family: 'icomoon' !important;
        speak: none;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        /* Better Font Rendering =========== */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .el-table thead {
        color: #878d99;
        font-weight: 500;
    }
    .el-table thead tr, .el-table thead th, .el-table thead tr {
        background-color: rgba(248, 250, 255, 1);
        height: 42px;
    }
    .el-button--primary {
        color: #fff;
        background-color: #70A2EF !important;
        border-color: #70A2EF !important;
    }
    .el-button--danger {
        color: #fff;
        background-color: #FE5F5F !important;
        border-color: #FE5F5F !important;
    }
    .el-button--warning {
        color: #fff;
        background-color: #FFAD28 !important;
        border-color: #FFAD28 !important;
    }
    .el-button--primary.is-plain {
        background: #fff !important;
    }
    .el-button--primary.is-plain:hover {
        color: #70A2EF !important;
    }
    .table-box .el-table__body {
        margin-left: -1px;
    }
    .el-table--border td, .el-table--border th {
        text-align: center;
    }
    .el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange {
        min-width: 410px;
    }
    .flex-s{
        display: flex;
        align-items: center;
    }
    .c-wrapper .el-icon-arrow-down:before{
        content: "\E6DF";
}
</style>
