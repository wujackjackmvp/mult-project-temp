<template>
    <div class="c-wrapper">
        <el-container style="overflow-x:hidden">
            <el-aside width="230px" class="c-left-wrapper">
                <div class="c-header-left" :class="{ closeLeft: isCollapse }">
                    <router-link to="/index" class="logo-box">
                        <img
                            class="logo"
                            src="./../../assets/images/logo.png"
                        />
                        <span>佣金报表系统</span>
                        <!-- <div class="c-user-profile">
                            sdfsd
                         </div> -->
                    </router-link>
                </div>
                <!-- 菜单 -->
                <div class="c-content-menu">
                    <el-menu
                        default-active="1-4-1"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        :collapse="isCollapse"
                    >
                        <template v-for="(item, index1) in slideMenusList">
                            <template v-if="item.status === '0'">
                                <template v-if="!item.childMenus.length">
                                    <el-menu-item
                                            :index="item.href"
                                            :key="index1"
                                            @click="
                                                select(
                                                    item.menuName,
                                                    item.href
                                                )
                                            "
                                        >
                                            {{ item.menuName }}
                                    </el-menu-item>
                                </template>
                                <el-submenu
                                    :index="index1 + ''"
                                    :key="index1"
                                    v-else
                                >
                                    <template slot="title">
                                        <div class="li-bg2"></div>
                                        <div class="li-bg"></div>
                                        <!-- <i class="icon-6"></i> -->
                                        <span slot="title">{{
                                            item.menuName
                                        }}</span>
                                    </template>
                                    <el-menu-item-group :collapse="isCollapse">
                                        <template
                                            v-for="(itemList,
                                            index2) in item.childMenus"
                                        >
                                            <el-menu-item
                                                :index="itemList.href"
                                                v-if="itemList.status === '0'"
                                                :key="index2"
                                                @click="
                                                    select(
                                                        itemList.menuName,
                                                        itemList.href
                                                    )
                                                "
                                                style="padding-left:60px;"
                                            >
                                                {{ itemList.menuName }}
                                            </el-menu-item>
                                        </template>
                                    </el-menu-item-group>
                                </el-submenu>
                            </template>
                        </template>
                    </el-menu>
                </div>
                <!-- 菜单结束 -->
            </el-aside>
            <el-container>
                <el-header>
                    <div class="c-header">
                        <div class="c-title">
                            <div class="title">{{ title }}</div>
                        </div>
                        <div class="c-tools">
                            <el-dropdown>
                                <div class="el-dropdown-link">
                                    <img
                                        class="person-box"
                                        src="../../assets/img/user.png"
                                    />
                                    <span>{{userInfo.userName}}</span>
                                </div>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="loginOut"
                                        >退出登录</el-dropdown-item
                                    >
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </el-header>
                <el-main style="main-scroll">
                    <div class="c-content-wrapper">
                        <div class="c-content">
                            <router-view></router-view>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import config from "@/config";
import { submitLogout } from "@/sercive/api/loginSercive";
import { mapGetters, mapState } from "vuex";
import { redirectUrl } from "@/utils/url";
export default {
    data() {
        return {
            isCollapse: false,
            title: "",
            menuData: [
                {
                    show: true,
                    name: "财务报表",
                    icon: "icon-6",
                    children: [
                        {
                            show: true,
                            name: "汇总表",
                            link: "/finance/SummaryTables"
                        },
                        {
                            show: true,
                            name: "日报",
                            link: "/finance/detail"
                        },
                        {
                            show: true,
                            name: "代理商分润查看",
                            link: "/finance/agencyShareDetail"
                        }
                    ]
                },
                {
                    show: true,
                    name: "数据管控",
                    icon: "icon-6",
                    children: [
                        {
                            show: true,
                            name: "渠道核准上传",
                            link: "/statement/channelApproval"
                        },
                        {
                            show: true,
                            name: "网关数据对接",
                            link: "/statement/uploadData"
                        },
                        {
                            show: true,
                            name: "日报生成",
                            link: "/sysManagement/createDaily"
                        },
                        {
                            show: true,
                            name: "代理商分润生成",
                            link: "/sysManagement/createAgencyShare"
                        }
                    ]
                },
                {
                    show: true,
                    name: "配置管理",
                    icon: "icon-6",
                    children: [
                        {
                            show: true,
                            name: "渠道成本费率配置",
                            link: "/statement/ditch"
                        },
                        {
                            show: true,
                            name: "配置信息",
                            link: "/statement/deploy"
                        }
                    ]
                },
                {
                    show: true,
                    name: "数据权限管理",
                    icon: "icon-6",
                    children: [
                        {
                            show: true,
                            name: "数据权限管理",
                            link: "/sysManagement/authData"
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        ...mapState(["userInfo"])
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath)
        },
        select(title, name) {
            if(this.$route.name === name) return
            this.title = title;
            this.$router.push({ name });
        },
        loginOut() {
            this.$confirm("退出登录, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(async () => {
                let userId = this.$ls.get("userId") || this.userInfo.userId;
                let res = await submitLogout({ userId });
                if (res.data.code === 0) {
                    window.localStorage.clear();
                    redirectUrl();
                } else {
                    this.$message({
                        type: "error",
                        message: "网络超时"
                    });                   
                }
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "取消操作"
                });
            });
        },
        home() {
            this.$router.push("/index");
        }
    },
    computed: {
        ...mapGetters(["slideMenusList"]),
        ...mapState(["userInfo"])
    },
    mounted() {
        console.log("this.slideMenusList", this.slideMenusList);
        console.log("this.userInfo", this.userInfo);
    }
};
</script>

<style scoped>
.logo-box {
    display: flex;
    align-items: center;
}
.el-aside {
    overflow: hidden;
}
.c-header {
    margin-top: 10px;
    height: 60px;
}
.c-header-left {
    margin-top: 10px;
}
.c-header-left img {
    margin-left: 30px;
    margin-right: 10px;
    height: 45px;
}
.c-header-left span {
    color: #fff;
}
.c-wrapper .closeLeft {
    width: 65px;
    height: 60px;
}
.c-wrapper .closeLeft img {
    margin-left: 10px;
    height: 16px;
    width: 65px;
}
.c-left-wrapper {
    height: 100vh;
    overflow: auto;
    float: left;
    display: block;
    background-image: linear-gradient(-186deg, #77b0f1 0%, #566fe2 100%);
}
.c-left-wrapper::-webkit-scrollbar,
.el-main::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}
.c-left-wrapper::-webkit-scrollbar-thumb,
.el-main::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #e1e1e1;
}
.c-left-wrapper::-webkit-scrollbar-track,
.el-main::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
}
.c-user-profile {
    margin-top: 5px;
}
.c-user-profile span {
    color: blue;
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
}
/* 右边 */
.c-right-wrapper {
    margin-left: 235px;
}
.c-right-wrapper .c-header {
    background-color: white;
    height: 60px;
    line-height: 60px;
    /* -webkit-box-shadow: $c-header-shadow;
              box-shadow: $c-header-shadow;
              -moz-box-shadow: $c-header-shadow; */
    /* border-bottom: 1px solid #10a2e9; */
    box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.3);
    border-radius: 0 0 4px 4px;
}
.c-title {
    padding-left: 15px;
    float: left;
    color: #878d99;
}
.c-tools {
    position: inherit;
    float: right;
    margin-right: 40px;
    display: flex;
    align-items: center;
}
.c-tools span{
    padding-left:10px;
    color: rgba(0,0,0,.65);
}
.pull-right {
    float: right;
}
.c-title .title {
    float: left;
}
.c-item {
    padding-left: 15px;
    padding-right: 15px;
    transition: 0.35s;
    -moz-transition: 0.35s;
    -webkit-transition: 0.35s;
    -o-transition: 0.35s;
    float: left;
    font-size: 15px;
    color: #878d99;
}
.c-item:hover {
    background: white;
    cursor: pointer;
}
.c-user {
    color: #878d99;
    float: left;
    padding-left: 16px;
    padding-right: 26px;
    margin-left: 10px;
    cursor: pointer;
}
.c-user img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-top: -3px;
}
.dropdown-item {
    height: 35px;
    line-height: 0px;
    cursor: pointer;
}
/* 中间  */
.c-content-wrapper {
    width: 100%;
    height: calc(100vh - 81px);
    height: -moz-calc(100vh - 81px);
    height: -webkit-calc(100vh - 81px);
    height: calc(100vh - 81px);
}
.c-content {
    width: 100%;
    /* padding: 15px; */
}
.c-wrapper .c-right-wrapper-o {
    margin-left: 65px;
}
.c-right-wrapper-c {
    margin-left: 0px;
}
.nav-pills {
    margin: 0px;
}
.pull-right {
    float: right;
}
ul li {
    display: block;
}
.el-submenu__title:hover .li-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    left: 0px;
    opacity: 0.2;
}
.el-submenu__title:hover .li-bg2 {
    width: 4px;
    height: 100%;
    left: 0px;
    background: #fff;
    position: absolute;
}
</style>
<style>
.c-wrapper .el-menu-item-group__title {
    display: none;
}
.c-wrapper .el-menu {
    border: 0px;
    background: none;
}
.c-wrapper .el-submenu__title {
    position: relative;
    color: #eaeaea;
}
.c-wrapper .is-opened .el-submenu__title {
    color: #fff;
}
.c-wrapper .is-opened .el-submenu__title i {
    color: #fff;
}
.c-wrapper .el-submenu__title:hover {
    background: none;
}
.c-wrapper .el-menu-item {
    height: 45px;
    line-height: 45px;
}
.c-wrapper .el-menu-item-group > ul {
    padding: 10px 0;
}
.c-wrapper .el-menu-item.is-active {
    background: none;
}
.c-wrapper .el-menu-item.is-active .li-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    left: 0px;
    opacity: 0.2;
}
.c-wrapper .el-menu-item.is-active .li-bg2 {
    width: 4px;
    height: 100%;
    left: 0px;
    background: #fff;
    position: absolute;
}
.c-wrapper .is-active::before {
    background: red;
    position: absolute;
    width: 20px;
    height: 20px;
    display: block;
    top: 0;
    left: 0;
}
.c-wrapper .el-menu-item {
    color: #fff;
}
.c-wrapper .el-submenu__title i {
    color: #eaeaea;
    opacity: 0.5;
    padding-right: 9px;
    font-size: 14px;
}
.c-wrapper .el-submenu__title .el-icon-arrow-down {
    padding-right: 0;
}
.c-wrapper .el-menu-item:hover {
    background: none;
}
.c-wrapper .el-menu-item:hover .li-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    left: 0px;
    opacity: 0.2;
}
.c-wrapper .el-menu-item:hover .li-bg2 {
    width: 4px;
    height: 100%;
    left: 0px;
    background: #fff;
    position: absolute;
}
.c-wrapper .el-menu--collapse .el-submenu .el-menu {
    background: #86cef6;
}
.c-wrapper .el-main {
    padding: 0px;
    background: #f6f6f6;
}
.c-wrapper .el-header {
    padding: 0px;
    background: #fff;
}
.c-wrapper .is-opened .el-icon-arrow-down {
    opacity: 1;
}
.c-wrapper .el-icon-arrow-down:before {
    /* content: "\E60C"; */
}
.c-wrapper .is-opened .el-icon-arrow-down:before {
    /* content: "\E60C"; */
}
.person-box {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.el-dropdown-link{

    display: flex;
    align-items: center;
}
</style>
