/* eslint-disable linebreak-style,indent,no-var,complexity */
import Vue from 'vue'
import Vuex from 'vuex'
import userState from './userState'
import platformState from './platformState'
import tableState from './tableState'
import monitorState from './monitorState'



Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        namespaced: true,  //多出的一行
        userState,
        platformState,
        tableState,
        monitorState
    }
})
