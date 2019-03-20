/* eslint-disable linebreak-style,indent,no-var,complexity */
//调用接口及相关依赖库
import Util from '../../../libs/util'
//使用的接口
const GetPageCfgUrl = require('../../../libs/api').GetPageCfgUrl


export default {
    /*==================初始化页面==================*/
    //获取页面配置
    initPageCfg(state, data) {
        Util.ojax.post(GetPageCfgUrl, {menuId: data.menuId, roleId: data.roleId}).then(function (res) {
            // console.log(res)
            if (res.data.code == 0) {
                if (state.pageCfg == null) {
                    console.log('不存在')
                } else {
                    console.log('存在')
                    for (var i in state.pageCfg) {
                        if (state.pageCfg[i].menuId == data.menuId) {
                            state.pageCfg.slice(i, 1)
                        }
                    }
                }

                //变更页面配置,前端处理回传的数据
                let pageCfg = {
                    menuId: data.menuId,
                    monitorButton: res.data.detail.monitorButton
                }

                for (var i in pageCfg.monitorButton) {
                    let componetsArray = pageCfg.monitorButton[i].name.split(',')
                    pageCfg.monitorButton[i].name = componetsArray[0]
                    pageCfg.monitorButton[i].type = componetsArray[1]
                }
                state.pageCfg = [].concat(pageCfg)

                //临时保存
                //localStorage.setItem('$tempCfg2', JSON.stringify(state.pageCfg))

            }
        }).catch(function (error) {
            console.log(error)
        })
    },


    /*=========================*/
    toMapModuleData(state, data) {
        state.mapModuleData = data
    }
}
