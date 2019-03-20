/* eslint-disable linebreak-style,indent,no-var,complexity */
export default {
    user: localStorage.$userstatus ? JSON.parse(localStorage.$userstatus) : {}, //用户信息
    token: localStorage.$userstatus ? JSON.parse(localStorage.$userstatus).token : null,      //登录token
    tokenDate: localStorage.$userstatus ? JSON.parse(localStorage.$userstatus).tokenDate : null,  //登录token时间


    //登录辅助
    loginLoading: false,
    //登录用传递参数
    loginPost: {
        account: null,
        password: null
    },
    //用户信息
    userInfo: {name: '', roleName: ''} //用户信息



}