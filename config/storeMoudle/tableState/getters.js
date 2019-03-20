/* eslint-disable linebreak-style,indent,no-var,complexity */
export default {

    pageCfg(state) {
        return state.pageCfg
    },

    gridCfg(state) {
        return state.gridCfg
    },
    searchCfg(state) {
        return state.searchCfg
    },
    //观察表格数据变化
    tableData(state) {
        return state.tableData
    },
    tablePage(state) {
        return state.tablePage
    },
    //观察表格高度变化
    tableHeight() {
        return window.innerHeight - 220
    },
    //初始化权限按钮
    buttonRoleCfg(state) {
        return state.buttonRoleCfg
    },

    //通讯信息变化
    errorTip(state, getters, rootState) {
        rootState.platformState.errorTip = state.errorTip
        return state.errorTip
    },

    //查询条件的变化
    searchParmas(state) {
        return state.searchParmas
    },
    // 增改查数据的变化
    editParmas(state) {
        return state.editParmas
    },
    // 删除数据的变化
    deleteModel(state) {
        return state.deleteModel
    },
    // 编辑查看数据变化
    popData(state) {
        return state.popData
    },
    // delete ids
    delIds(state){
        return state.delIds 
    },

    //表格的加载
    loadigValue(state){
        return state.loadigValue
    }
}