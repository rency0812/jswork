/* eslint-disable no-console,indent,linebreak-style */
import Vue from 'vue'
import VueRouter from 'vue-router'
import iView from 'iview'

import Routers from './router'
import App from '../app.vue'
import Util from '../libs/util'
import Store from './storeMoudle'
import * as types from '../libs/types'
import '../exui/index.less'
// import '../exui/dist/iview.css'
// import 'leaflet/dist/leaflet.css'


import VueI18n from 'vue-i18n'

Vue.use(VueI18n) // 通过插件的形式挂载


const i18n = new VueI18n({
    locale: 'CN',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
        'CN': require('./local/lang/CN'),   // 中文语言包
        'EN': require('./local/lang/EN')    // 英文语言包
    }
})


Vue.use(VueRouter)
Vue.use(iView)


// 页面刷新时，重新赋值token
if (localStorage.$userState) {
    // Store.commit(types.LOGIN, localStorage.$token)
    // Store.commit(types.USER, localStorage.$userstatus)
}

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
}
const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {

    //测试用 不用授权
    // iView.LoadingBar.start()
    // Util.title(to.meta.title)
    // next()

    // 进入路由前判断是否有用户信息授权
    setTimeout(function () {
        if (to.matched.some(r => r.meta.requireAuth)) {
            // console.log('menuId ============' + to.meta.menuId)
            let tokenDate = localStorage.$userState ? JSON.parse(localStorage.$userState).tokenDate : new Date().getTime()

            // 暂时使用userGuid参数  正式的要后台返回token之后使用token参数
            // let Token = localStorage.$userState ? JSON.parse(localStorage.$userState).token : null

            let Token = localStorage.$userState ? JSON.parse(localStorage.$userState).userGuid : null
            let nowDate = new Date().getTime()
            let passTime = parseInt(nowDate - tokenDate)
            let Days = passTime / (24 * 3600 * 1000)
            let AutoLogin = localStorage.$userState ? JSON.parse(localStorage.$userState).AutoLogin : true
            // console.log(Days)
            if (Token && Days <= 14 && AutoLogin) {
                iView.LoadingBar.start()
                Util.title(to.meta.title)
                next()
            } else {
                localStorage.clear()
                next('/login')
            }
        } else {
            iView.LoadingBar.start()
            Util.title(to.meta.title)
            next()
        }
    }, 300)

})
router.afterEach((to) => {
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
    let menuTagArr = Store.state.platformState.menuState.menuTag
    for (let i in menuTagArr) {
        menuTagArr[i].active = false
        if (to.path == menuTagArr[i].url) {
            menuTagArr[i].active = true
        }
    }
    if (to.path != '/index' && to.path !== '/login') {
        menuTagArr.push({
            title: to.meta.title,
            url: to.path,
            active: true
        })
        Store.state.platformState.menuState.menuTag = uniqueArrayPath(menuTagArr)
    }

    function uniqueArrayPath(array) {
        let newArr = []
        for (let i in array) {
            let Item = array[i]
            let repeat = false
            for (let j in newArr) {
                if (Item.url === newArr[j].url) {
                    repeat = true
                    break
                }
            }
            if (!repeat) {
                newArr.push(Item)
            }
        }
        return newArr
    }
})

new Vue({
    el: '#WebApp',
    router: router,
    store: Store,
    i18n,
    render: h => h(App)
})