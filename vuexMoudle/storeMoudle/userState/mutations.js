/* eslint-disable linebreak-style,indent,no-var,complexity */

const Base64 = require('../../../libs/util').Base64
import iView from 'iview'

export default {


    /*========================登录页用的方法==========================*/
    //更改登录状态
    changeLoading(state, data) {
        state.loginLoading = data
    },

    //添加传输参数，并BASE64加密密码后反转组合
    addPostValue(state, data) {
        state.loginPost.account = data.userAccount
        state.loginPost.password = data.userPassword
        if (data.userPassword) state.loginPost.password =  Base64.encode(data.userPassword) + Base64.encode(data.userPassword).split('').reverse().join('')
    },
    //保存用户信息
    recodeUserInfo(state, data) {
        state.userInfo = data
        localStorage.setItem('$userState', JSON.stringify(data))
    },
    //读取用户信息
    readUserInfo(state) {
        state.userInfo = localStorage.$userState ? JSON.parse(localStorage.$userState) : {
            account: null,
            RemberName: true,
            AutoLogin: true
        }
    },

    //用户退出
    userLogOut(state) {
        localStorage.clear()
        sessionStorage.clear()
    }

    /*============================系统头部用户状态变更=============================*/


}
