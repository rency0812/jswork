/* eslint-disable linebreak-style,indent,no-var,complexity */
export default {
    platformState(state) {
        return state.platformState
    },
    //通讯信息变化
    errorTip(state, getters, rootState) {
        return  rootState.tableState.errorTip
    },
}