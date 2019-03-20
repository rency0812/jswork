/* eslint-disable linebreak-style,indent,no-var,complexity */
export default {

    //保存平台配置
    storePlatSet(context, data) {
        context.commit('addPlatFormState', data)
        context.commit('storePlatFormState', data)
        return true
    },


    //登录保存菜单
    loginAddMenu(context, data) {
        context.commit('addMenu', data)
        context.commit('storeMenu', data)
        return true
    }


}