import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/index',
        },
        {
            path: '/index',
            component: ()=> import('@/view/home/home') ,
            children: [
                {
                    path: '/index',
                    name: 'Index',
                    component: ()=> import('@/view/home/index')
                },
                /** ============财务报表============= */
                {
                    path: '/finance/SummaryTables',
                    name: 'SummaryTables',
                    meta:{
                        title: '汇总表'
                    },
                    component: ()=> import('@/view/main/finance/SummaryTables.vue')
                },
                {
                    path: '/finance/transactionDetail',
                    name: 'transactionDetail',
                    meta:{
                        title: '交易明细表'
                    },
                    component: ()=> import('@/view/main/finance/transactionDetail.vue')
                },
                {
                    path: '/finance/detail',
                    name: 'FinanceDetail',
                    meta:{
                        title: '日报表'
                    },
                    component: ()=> import('@/view/main/finance/detail.vue')
                },
                {
                    path: '/finance/agencyShareDetail',
                    name: 'AgencyShareDetail',
                    meta:{
                        title: '代理商分润详情'
                    },
                    component: ()=> import('@/view/main/finance/agencyShareDetail.vue')
                },   
                {
                    path: '/finance/expanderReport',
                    name: 'ExpanderReport',
                    meta:{
                        title: '拓展人提成报表'
                    },
                    component: ()=> import('@/view/main/finance/expanderReport.vue')
                },   
                /** ============数据管控============= */
                {
                    path: '/statement/upOrderConfirm',
                    name: 'UpOrderConfirm',
                    component: ()=> import('@/view/main/statement/upOrderConfirm.vue'),
                    meta:{
                        title: '上游账单更新确认'
                    }
                },
                {
                    path: '/statement/channelApproval',
                    name: 'ChannelApproval',
                    component: ()=> import('@/view/main/statement/channelApproval.vue'),
                    meta:{
                        title: '渠道核准上传'
                    }
                },
                {
                    path: '/statement/adjustManage',
                    name: 'AdjustManage',
                    component: ()=> import('@/view/main/statement/adjustManage'),
                    meta:{
                        title: '调整明细管理'
                    }
                },
                {
                    path: '/sysManagement/createDaily',
                    name: 'CreateDaily',
                    meta:{
                        title: '日报生成'
                    },
                    component: ()=> import('@/view/main/sysManagement/createDaily/createDaily.vue')
                },
                {
                    path: '/sysManagement/createAgencyShare',
                    name: 'CreateAgencyShare',
                    meta:{
                        title: '代理商分润生成'
                    },
                    component: ()=> import('@/view/main/sysManagement/createAgencyShare/createAgencyShare.vue')
                },
                {
                    path: '/sysManagement/createExpander',
                    name: 'CreateExpander',
                    meta:{
                        title: '拓展人提成生成'
                    },
                    component: ()=> import('@/view/main/sysManagement/createExpander/index.vue')
                },
                {
                    path: '/statement/uploadData',
                    name: 'UploadData',
                    component: ()=> import('@/view/main/statement/uploadData.vue')
                },
                /** ============配置管理============= */
                {
                    path: '/statement/ditch',
                    name: 'Ditch',
                    component: ()=> import('@/view/main/statement/ditch/ditch.vue')
                },
                {
                    path: '/statement/ditch/editCosting',
                    name: 'EditCosting',
                    component: ()=> import('@/view/main/statement/ditch/editCosting/editCosting.vue')
                },
                {
                    path: '/statement/deploy',
                    name: 'Deploy',
                    redirect: '/statement/deploy/departMent',
                    component: ()=> import('@/view/main/statement/deploy/deployHome'),
                    children: [
                        {
                            path: '/',
                            component: ()=> import('@/view/main/statement/deploy/expand'),
                        },
                        {
                            path: '/statement/deploy/district',
                            name: 'District',
                            component: ()=> import('@/view/main/statement/deploy/district'),
                        },
                        // 代理商
                        {
                            path: '/statement/deploy/agent',
                            name: 'Agent',
                            component: ()=> import('@/view/main/statement/deploy/agent.vue'),
                        },
                        // 服务商渠道商户信息
                        {
                            path: '/statement/deploy/service',
                            name: 'Service',
                            component: ()=> import('@/view/main/statement/deploy/service.vue'),
                        },
                        // 讯联渠道商户信息
                        {
                            path: '/statement/deploy/relation',
                            name: 'Relation',
                            component: ()=> import('@/view/main/statement/deploy/relation.vue'),
                        },
                        // 特殊商户
                        {
                            path: '/statement/deploy/special',
                            name: 'Special',
                            component: ()=> import('@/view/main/statement/deploy/special.vue'),
                        },
                        // 代理商信息
                        {
                            path: '/statement/deploy/agentMsg',
                            name: 'AgentMsg',
                            component: ()=> import('@/view/main/statement/deploy/agentMsg.vue'),
                        },
                        // 部门信息
                        {
                            path: '/statement/deploy/departMent',
                            name: 'DepartMent',
                            component: ()=> import('@/view/main/statement/deploy/departMent.vue'),
                        },

                    ]
                },
                {
                    path: '/statement/expander',
                    name: 'Expander',
                    meta:{
                        title: '拓展人提成配置'
                    },
                    component: ()=> import('@/view/main/statement/expander/index.vue'),  
                },
                /** ============系统管理============= */
                {
                    path: '/sysManagement/authData',
                    name: 'AuthData',
                    component: ()=> import('@/view/main/sysManagement/authData'),  
                },
                /** ============系统管理============= */
                {
                    path: '/download/list',
                    name: 'DownloadList',
                    component: ()=> import('@/view/main/download/index')
                },
                {
                    path: '*',
                    name: 'error',
                    component: ()=> import('@/view/home/404.vue')
                },
            ]
        },
        {
            path: '*',
            name: 'error',
            component: ()=> import('@/view/home/404.vue')
        },
    ]
})

export default router
