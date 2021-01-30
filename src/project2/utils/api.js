export default {

    // 本地
    // host:'test.luckypay.net',
    // redirect:'http://139.199.213.105:8092//login?backUrl=http://'+'localhost'+'&appCode=tgjf-aggcode',

    // 测试服务器
    host:'reporttest.yltg.com.cn',
    redirect:'http://139.199.213.105:8092//login?backUrl=http://'+'reporttest.yltg.com.cn'+'&appCode=tgjf-aggcode',

    // 腾讯云开发环境
    // host:'pcdev.luckypay.net',
    // redirect:'http://139.199.213.105:8092/login?backUrl=http://'+'pcdev.luckypay.net'+'&appCode=tgjf-report',

    // 华为云正式环境
    //host:'report.yltg.com.cn',
    //redirect:'http://139.159.155.88:20003/smart-sso/login?backUrl=http://'+'report.yltg.com.cn'+'&appCode=tgjf-report',


    // 首页
    index: {
        user: '/user/info'
    },
    // 系统管理
    system: {
        // 日志管理
        list: '/log/list',
        // 字典管理
        dictList: '/dict/list',
        // 添加字典
        dictAdd: '/dict/add',
        // 删除字典
        dictDel: '/dict/delete',
        // 修改字典
        dictUpdate: '/dict/update'
    },
    // 个人中心
    member: {
        // 个人信息
        new: '/user/info',
        // 修改密码
        changePwd: '/user/modifyPass'
    },

    // 系统监控
    control: {
        //在线系统监控列表
        list: '/user/onlineList',
        //强制下线
        downline: '/user/forceOffLine'
    },
    // 门店管理
    shop: {
        // 门店列表
        store: '/shop/search-shop-list',
        // 门店详情
        storeDetail: '/shop/get-shop-info',
        // 聚合码列表
        code: '/aggcode/list-by-code',
        // 禁用聚合码
        disable: '/aggcode/disable',
        // 启用聚合码
        enable: '/aggcode/enable',
        // 门店绑定聚合码
        bindCode: '/aggcode/bind-to-shop',
        // 添加聚合码
        addCode: '/aggcode/add-by-count',
        // 订单列表
        order: '/order/list',
        // 导出聚合码
        downCode: '/aggcode/list-export',
        // 查询导出进度
        downCodeIng: '/aggcode/export-status'
    },
    // 商户管理
    merchant: {
        list: '/merchant/search-merchant-list',
        // 商户详情
        merDetail: '/merchant/get-merchant',
        // 商户下的所有门店
        shop: '/shop/list',
        // 员工管理
        staff: '/assistant/list',
        // 员工详情
        staffDetail: '/assistant/trade-list'

    },
    // 审核管理
    examine: {
        // 审核管理列表
        list: '/aggcode/stopping-request-list',
        // 禁用
        reject: '/aggcode/reject-stopping-request',
        // 恢复
        pass: '/aggcode/pass-stopping-request'
    },
    // 权限管理
    power: {
        tree: '/h5Permisson/nodes',
        // 修改权限
        savePower: '/h5Permisson/save',
        // 删除权限
        delPower: '/h5Permisson/delete'
    },
    // 权限角色管理
    powerRole: {
        // 角色列表
        list: '/h5Role/list',
        // 新增角色
        addRole: '/h5Role/save',
        // 角色授权提交
        roleTree: '/h5Role/allocateSave',
        // 删除角色
        delRole: '/h5Role/delete',
        // 角色权限对应关系数据
        getRoleTree: '/h5Role/allocate',
        // 修改角色
        changeRole: '/h5Role/update',
        // 校验角色名称是否重复
        hasRole: '/h5Role/selectByName'
    },
    shareProfit: {
        // 查询分润日报创建情况
        getReqProfit: '/v3/repAgentProfit/pageList',
        // 预估重新生成
        createReqProfit: '/v3/repAgentProfit/Create',
        // 重新推送预估结果
        sendReqProfit: '/v3/repAgentProfit/reSend',
        // 分润预估明细
        pageReqProfit: '/v3/repAgentProfit/pageAgentProfit',
        // 导出代理商分润估算报表
        exportReqProfit: '/v3/repAgentProfit/export',
        // 导出核准代理商分润报表
        exportRepProfitRatify: '/v3/repAgentProfitRatify/export',
        // 代理商分润推送情况列表
        repAgentMonthSend: '/v3/repAgentMonthSend/pageList',
        // 预估推送
        preSend: '/v3/repAgentMonthSend/preSend',
        // 核准分润推送
        ratifySend: '/v3/repAgentMonthSend/ratifySend',
        // 分润报表生成总数查询
        repAgentProfitCount: '/v3/repAgentProfit/count',
    },
    // 使用请求2
    statement: {
        // 核准生成列表
        pageList: '/v3/repRatity/pageList',
        // 生成核准
        ratityAdd: '/v3/repRatity/ratityAdd',
        // 代理商数据同步
        synchAgent: '/v3/configInfo/synchAgent',
        // 查询代理商信息
        pageAgent: '/v3/configInfo/pageAgent',        
        // 查询日志列表
        dailyList: '/dailyReport/generatePageList',
        // 创建日报
        dailyBuild: '/dailyReport/generate',
        // 查询渠道母公司日报
        dailyParentCompany: '/dailyReport/channelParentCompaney',
        // 查询渠道子公司日报
        dailyChildCompany: '/dailyReport/channelSubCompaney',
        // 查询区域日报
        dailyRegion: '/dailyReport/area',
        // 查询商户交易日报
        dailyMerchant: '/dailyReport/merch',
        // 查询客户经理日报
        dailyManager: '/dailyReport/expander',
        // 查询代理商日报
        dailyAgent: '/dailyReport/agent',
        // 上传记录列表
        uploadList: '/v3/uploadRecord/pageRepRecordUpload',
        // 撤销上传
        uploadCancel: '/v3/uploadRecord/revoke',
        // 重新上传
        reUploadData: '/v3/uploadRecord/remake',
        // 上传数据
        uploadData: '/uploadRecord/uploadData',
        // // TODO:上传数据
        // uploadDataFile: '/uploadRecord/uploadData',
        //对接数据
        uploadData2: '/v3/uploadRecord/addData',
        // 查询所有启用渠道
        channelQueryAll: '/channel/queryAll',  // 原先：'/channel/*'
        // 分页查询渠道
        channelPageList: '/v3/repChannel/pageList',
        // 分页查询渠道
        specialChannelList: '/v3/repChannel/getSpecialChannel',
        // 渠道禁用
        channelDisAble: '/v3/repChannel/disAble',
        // 删除渠道
        channelDelete: '/channel/delete',
        // 启用渠道
        channelEnAble: '/v3/repChannel/enAble',
        // 修改渠道信息
        channelModify: '/v3/repChannel/edit',
        // 删除渠道成本费率
        deleteModifyRecord: '/v3/channelCostRate/delete',
        //变更各个渠道的成本费率
        upCostRate: '/v3/channelCostRate/modify',
        //点击成本费率显示所有变更历史记录，生效开始日期倒序排列
        displayCostRate: '/v3/channelCostRate/selectByRepChannelId',
        //获取最新的费率信息
        getNewestCostRate: '/v3/channelCostRate/selectTheNewByRepChannelId',
        //根据输入的成本费率生效和失效日期，会把渠道表各个渠道对应生效日期到失效日期这段时间的成本费率与汇总表对应渠道的成本费率和公司类型对应更改
        updateDataAggCostRate: '/channel/updateDataAggCostRate',
        // 管理配置信息拓展人
        MerchantList: '/v3/configInfo/pageAreaExpander',
        // 配置--区域信息
        DistrictList: '/v3/configInfo/pageArea',
        // 管理配置信息代理商
        agentList: '/config/pageAgentList',
        // 管理配置信息服务商渠道商户
        wxMerchantList: '/v3/configInfo/pageMerchant',
        // 管理配置信息讯联商户
        channelList: '/config/pageXlChannelList',
        // 管理配置信息公立医院商户
        hospitalList: '/config/pageHospitalList',
        // 上传配置
        UploadConfig: '/v3/configInfo/uploadConfig',
        // 添加渠道
        addchannel: '/channel/save',
        // 特殊商户
        SpecialRatetList: '/v3/configInfo/pageMerchantSpecial',
        // 下载配置模板
        configDownload: '/v3/configInfo/downloadConfigTemplate',
        // 下载核准模板
        ratifyDownload: '/v3/uploadRecord/downloadRatifyData',
        // 配置出来数据
        dealDataAggByConfig: '/config/dealDataAggByConfig',
        // 汇总数据
        dataAggList: '/v3/repData/pageList',
        // 查询所有渠道
        dataAggAllArea: '/dataAgg/allArea',
        // 下载汇总数据
        dataAggDownload: '/v3/repData/pageListDownload',
        // 汇总检查
        dataAggDataCheck: '/dataAgg/checkData',
        // 数据检查下载汇总数据
        dataAggDataCheckDownload: '/dataAgg/checkDataDownload',
        // 结算加费费率保存
        addFeeConfigSave: '/v3/repAddFee/addFeeConfigSave',
        // 结算加费率下拉列表
        getAddFeeParams: '/v3/common/getAddFeeParams',
        // 结算加费率列表查询
        addFeeConfigList: '/v3/repAddFee/addFeeConfigList',
        // 结算加费率删除
        addFeeConfigDel: '/v3/repAddFee/addFeeConfigDel',
        // 选择核准记录
        authorizeReport: '/v3/authorizeUpload/authorizeReport',
        // 核准生成
        addReport: '/v3/repRatity/addReport',
        // 渠道核准上传
        pageAuthorize: '/v3/authorizeUpload/pageAuthorize',
        // 模板下载
        downAuthorizeTemplate: '/v3/authorizeUpload/downAuthorizeTemplate',
        // 下载核准内容
        downloadAuthorize: '/v3/authorizeUpload/downloadAuthorize',
        // 分润核准数据上传
        uploadAuthorizeData:　'/v3/authorizeUpload/uploadAuthorizeData',
        // 撤销
        undoAuthorize: '/v3/authorizeUpload/undoAuthorize',
        // 代理商分润生成
        financeAuthorize: '/v3/repRatity/financeAuthorize',
        // 重新生成
        reboot: '/v3/repRatity/reboot',
        // 发放回填
        handOut: '/v3/repRatity/handOut',
        // 撤销
        discard: '/v3/repRatity/discard',
    },
    //日报
    report:{
        list: '/v3/repDaily/pageList',
        create: '/v3/repDaily/Create',
        channel: '/v3/repDaily/channelStatistics',
        area: '/v3/repDaily/areaStatistics',
        merchant: '/v3/repDaily/merchantStatistics',
        expander: '/v3/repDaily/expanderStatistics',
        newMechant: '/v3/repDaily/newMechantStatistics',
        export : '/v3/repDaily/export',
        exportRatify : '/v3/repDaily/exportRatify',
        allExport : '/v3/repDaily/allExport'
    },
}
