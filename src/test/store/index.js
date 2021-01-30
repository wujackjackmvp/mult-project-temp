import Vuex from "vuex";
import Vue from "vue";
import { getUserInfo } from "@/sercive/api/loginSercive";
import { repChannelList } from "@/sercive/api/channelSercive";

Vue.use(Vuex);

function sortData(list) {
    return list.map(item => {
        if (item.childMenus) {
            item.childMenus = item.childMenus.sort((a, b) => a.sort - b.sort);
            item.childMenus = sortData(item.childMenus);
        }
        return item;
    });
}
export default new Vuex.Store({
    state: {
        userInfo: {
            userId: 0,
            name: "",
            position: "",
            department: "",
            avatar: "",
            role: null, // administrator-管理员 manager-对账主管 normal-操作员
            menu: "",
            roleId: "",
            menusList: []
        },
        channelList: [],
        token: ""
    },
    mutations: {
        token: (state, data) => {
            localStorage.token = data;
            state.token = data;
        },
        GETUSERINFO(state, data) {
            state.userInfo = data;
        },
        GETCHANNElLIST(state, data){
            state.channelList = data;
        }
    },
    actions: {
        getUserInfo({ commit }, params) {
            return new Promise((resolve)=>{
                getUserInfo(params).then(res => {
                    commit("GETUSERINFO", res.data.data);
                    resolve()
                });
            })
        },
        repChannelList({ commit }) {
            return new Promise((resolve)=>{
                let params = "?page=1&size=500&status=0";
                repChannelList(params).then(res => {
                    commit("GETCHANNElLIST", res.data.extra.rows);
                    resolve()
                });
            })
        },
    },
    getters: {
        slideMenusList: state => {
            let menuList = [];
            if (
                state.userInfo.menusList &&
                state.userInfo.menusList.length !== 0
            ) {
                const treeList = state.userInfo.menusList.filter(
                    item => item.menuName === "佣金报表系统" && item.grade === 0
                );
                if (treeList && treeList.length > 0) {
                    menuList = sortData(treeList)[0].childMenus;
                }
            }
            return menuList;
        }
    }
});
