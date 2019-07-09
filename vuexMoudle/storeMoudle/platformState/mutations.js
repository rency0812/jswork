/* eslint-disable linebreak-style,indent,no-var,complexity */

import alg from '../../../libs/common'

import Util from '../../../libs/util'


export default {

    //页面控制相关
    //变化全屏
    changeScreen(state) {
        var docElm = document.documentElement
        if (!state.pageState.pageScreen) {
            //W3C
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen()
            }
            //FireFox
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen()
            }
            //Chrome等
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen()
            }
            //IE11
            else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen()
            }

        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        }
        state.pageState.pageScreen = !state.pageState.pageScreen


    },

    //头部变化
    ctrlHeader(state) {
        state.pageState.headerControl = !state.pageState.headerControl
    },

    //报警声开关
    switchVoice(state) {
        state.pageState.voiceControl = !state.pageState.voiceControl


    },

    //打开警告
    switchAlerm(state) {
        let alermBox = state.pageState.alermBox
        if (alermBox) {
            state.pageState.pageColCoum = 21
        } else {
            state.pageState.pageColCoum = 24
        }
    },


    //报警推送数据交换
    changeAlermData(state, data) {
        state.alermState.alermData = data


    },


    /*=========================平台相关=========================*/

    addPlatFormState(state, data) {
        state.platformState = data
    },


    loadPlatFormState(state) {
        state.platformState = JSON.parse(localStorage.$platformState)
    },

    storePlatFormState(state, data) {
        localStorage.setItem('$platformState', JSON.stringify(data))
    },


    /*======================菜单相关====================*/
    //加载菜单
    addMenu(state, data) {
        state.menuState.menuData = data
    },
    //读取本地缓存的菜单
    loadMenu(state) {
        state.menuState.menuData = JSON.parse(localStorage.$menuData)
    },
    //保存菜单到本地缓存
    storeMenu(state, data) {
        localStorage.setItem('$menuData', JSON.stringify(data))
    },
    //选中的菜单
    storeMenuActive(state, data) {
        state.menuState.menuActive = data
    },

    //添加菜单标签
    addMenuTag(state, data) {
        let menuTagArr = state.menuState.menuTag
        if (data.path !== '/index') {
            menuTagArr.push(data)
            state.menuState.menuTag = uniqueArrayPath(menuTagArr)
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
    },
    //删除菜单标签
    removeMenuTag(state, data) {
        let menuTagArr = state.menuState.menuTag
        for (var i in menuTagArr) {
            if (data == menuTagArr[i].url) {
                menuTagArr.splice(i, 1)
            }
        }
        state.menuState.menuTag = menuTagArr
    },
    removeAllMenuTag(state) {
        state.menuState.menuTag = []
    },


    /*==========================语言切换==========================*/
    switchLangTxt(state, data) {
        state.pageState.lang = data
    }




}