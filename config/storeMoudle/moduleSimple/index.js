/* eslint-disable linebreak-style,indent,no-var,complexity */
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
    namespaced: true,  //多出的一行
    state,
    mutations,
    actions,
    getters
}