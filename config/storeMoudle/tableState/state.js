/* eslint-disable linebreak-style,indent,no-var,complexity */

export default {
    // menuId: null,
    //页面配置初始化数据池
    pageCfg: null,

    //页面表格配置
    gridCfg: {cfg: [], gridLoading: false},

    //高级查询配置
    searchCfg: {cfg: [], button: []},

    //表格展现数据
    tableData: null,
    tablePage: null,

    // 表格加载
    loadigValue: false,


    //信息变化
    errorTip:null,


    /*暂时用不上*/


    //利用到的组件初始数据池
    componentCfg: [],

    buttonRoleCfg: [],

    //查询条件
    searchParmas: {},

    //新增条件
    editParmas: {},

    //删除条件
    deleteModel: {},
    // 弹窗数据/查看数据.....
    popData: [],
    // 删除Ids
    delIds: []

}