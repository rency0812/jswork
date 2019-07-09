/* eslint-disable linebreak-style,indent,no-var,complexity */
//调用接口及相关依赖库
import Util from '../../../libs/util'
// 调用表格的操作按钮组件
// import gridButtons from '../../../views/components/table/buttons'


//使用的接口
const GetPageCfgUrl = require('../../../libs/api').GetPageCfgUrl
const GetTableDataUrl = require('../../../libs/api').GetTableDataUrl

// 部门接口
const SaveDepartment = require('../../../libs/api').saveDepartment // 新增部门
const UpdateDepartment = require('../../../libs/api').updateDepartment // 编辑部门

// 修改密码接口
const updatePassword = require('../../../libs/api').updatePassword // 修改密码接口

// 数据类型接口
const saveDataType = require('../../../libs/api').saveDataType // 新增数据类型
const updateDataType = require('../../../libs/api').saveDataType // 编辑数据类型

export default {

    /*==================初始化页面==================*/
    //获取页面配置
    initPageCfg(state, data) {
        let self = this
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
                // 处理查询接口
                let queryApi
                let searchButton = res.data.detail.searchButton
                for (var i in searchButton) {
                    if (searchButton[i].name.indexOf('query') > -1) {
                        queryApi = searchButton[i].api
                    }
                }

                // 变更页面配置
                state.pageCfg = [].concat({
                    menuId: data.menuId,
                    cfg: res.data.detail,
                    // pageCfg: res.data.detail.pageCfg,
                    // gridCfg: res.data.detail.pageCfg.cfg.grid,
                    searchButton: searchButton,
                    queryApi: queryApi
                })


                // 临时保存
                // localStorage.setItem('$tempCfg1', JSON.stringify(state.pageCfg))


            }
        }).catch(function (error) {
            console.log(error)
        })


        //数组排重
        function uniqueArrayId(array) {
            var newArr = []
            for (var i in array) {
                var Item = array[i]
                var repeat = false
                for (var j in newArr) {
                    if (Item.menuId === newArr[j].menuId) {
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
    //初始化树
    initPageTree(state, data) {
        let index = data.index
        let treeData = data.treeData
        state.pageCfg.pageTree[index]['treeData'] = treeData
    },


    /*=================查询表格数据===================*/
    //******************通用查询方法 传入查询的路径和查询的参数***************//
    /*
    *
    *  传递过来的查询参数包含
    *  {
    *    queryApi //该模块的查询地址
    *    pamars   //该模块的查询条件
    *    menuId   //该模块的页面menuId
    *  }
    *
    *
    */
    queryGridData(state, data) {
        let queryApi = data.queryApi
        let self = this
        console.log('查询开始')
        console.log(data.pamars)
        if (!queryApi) return
        state.loadigValue = true
        Util.ojax.post(queryApi, {pageIndex:data.pamars.pageIndex||1,pageSize:data.pamars.pageSize||20,...data.pamars}).then(function (res) {
            console.log(res)
            if (res.data.code == 0) {
                if (state.tableData == null) {
                    console.log('不存在')
                } else {
                    console.log('存在')
                    for (var i in state.tableData) {
                        if (state.tableData[i].menuId == data.menuId) {
                            state.tableData.slice(i, 1)
                        }
                    }
                }
                state.tableData = [].concat({
                    menuId: data.menuId,
                    data: res.data.detail.list,
                    pageInfo: {
                        pageNum: res.data.detail.pageNum,
                        pageSize: res.data.detail.pageSize,
                        size: res.data.detail.size,
                        startRow: res.data.detail.startRow,
                        endRow: res.data.detail.endRow,
                        total: res.data.detail.total,
                        pages: res.data.detail.pages
                    }
                })
            } else {
                console.log(res.data)
            }
            state.loadigValue = false
        }).catch(function (error) {
            state.loadigValue = false
            console.log(error)
        })
    },

    //************************************菜单配置*******************************************//
    //添加菜单方法
    saveMenu(state, data) {
        const api = data.api
        const pamars = data.pamars
        Util.ojax.post(api, pamars).then(function (res) {
            state.errorTip = res.data.msg
        }).catch(function (error) {
            console.log(error)
        })
    },



    //************************************部门配置*******************************************//
    // 新增部门弹窗
    saveDepartment(state, data) {
        console.log(data)
        let menuId = data.menuId
        state.editParmas['editParmas' + menuId] = data.params

        // Util.ojax.post(SaveDepartment, data).then(function (res) {
        //     console.log(res)
        //     // if(res.data.code == 0){
        //     //     self.$Notice.success({
        //     //         title: '提示',
        //     //         desc: '操作成功!',
        //     //         duration: 3
        //     //     })
        //     //     self.modalShow = false
        //     // }else{
        //     //     self.$Message.error(res.data.msg)
        //     // }
        // })
    },

    // 编辑部门弹窗
    updateDepartment(state, data) {
        console.log(data)
        Util.ojax.post(UpdateDepartment, data).then(function (res) {
            console.log(res)
            // if(res.data.code == 0){
            //     self.$Notice.success({
            //         title: '提示',
            //         desc: '操作成功!',
            //         duration: 3
            //     })
            //     self.modalShow = false
            // }else{
            //     self.$Message.error(res.data.msg)
            // }
        })
    },


    //作废，以queryGirdData方法为主
    initGridData(state, pamars) {
        //数据接口接收表格数据
        Util.ojax.get(GetTableDataUrl, {pamars}).then(function (res) {
            // console.log(pamars)
            state.tableData[pamars] = res.data.list
            //分页数据
            let tablePage = {
                total: res.data.total,
                pageSize: res.data.pageSize,
                pageNum: res.data.pageNum
            }
            state.tablePage['table' + pamars] = tablePage
            // console.log(state.tablePage)
        }).catch(function (error) {
            // console.log(error)
        })
    },


    /*=================增删改查参数的变化===================*/
    //查询表格接口
    //作废，以queryGirdData方法为主
    searchGrid(state, data) {

        // if(state.pageCfg.length == 0){
        //     return
        // }
        let menuId = data.menuId
        let searchParmas = state.searchParmas['search' + menuId] ? state.searchParmas['search' + menuId] : {}
        let tableData = state.tableData['table' + menuId] ? state.tableData['table' + menuId] : {}
        let tablePage = state.tablePage['table' + menuId] ? state.tablePage['table' + menuId] : {}
        // state.pageCfg[['cfg' + menuId]].gridCfg.gridLoading = true
        // //数据接口接收表格数据
        let path = data.path
        console.log('path:++++++++++' + path)
        // Util.ojax.post(path, searchParmas).then(function (res) {
        Util.ojax.post(path, {pageSize: 15, pageIndex: 1, ...data.query}).then(function (res) {
            // console.log(res)
            tableData = res.data.detail
            //分页数据
            let tablePageData = {
                total: tableData.total,
                pageSize: tableData.pageSize,
                pageNum: tableData.pageNum
            }
            tablePage = tablePageData
            state.tableData['table' + menuId] = tableData.list
            state.tablePage['table' + menuId] = tablePage
            // state.pageCfg[['cfg' + menuId]].gridCfg.gridLoading = false
            // console.log(state.tablePage)
        }).catch(function (error) {
            // console.log(error)
            // state.pageCfg[['cfg' + menuId]].gridCfg.gridLoading = false
        })
    },

    // 添加表格的遮罩层
    changeLoading(state, data) {
        state.gridCfg.gridLoading = data
    },

    // 导出页面数据
    exportGrid(state, data) {
        let menuId = data.menuId

        function toParams(param) {
            var result = ""
            for (let name in param) {
                if (typeof param[name] != 'function' && param[name] != null) {
                    result += "&" + name + "=" + encodeURI(param[name]);
                }
            }
            return result.substring(1)
        }

        let params = toParams(data.parmas)
        window.open(data.path + '?' + params, '_blank')
        // let searchParmas = state.searchParmas['search' + menuId] ? state.searchParmas['search' + menuId] : {}
    },

    // 批量删除数据
    deleteGridData(state, data) {
        let ids = data.ids // 勾选的id数组
        state.deleteModel.ids = ids
    },
    // 初始化page
    initPageCfgClone(state, data) {
        let self = this
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


                //处理查询接口
                let queryApi
                let searchButton = res.data.detail.searchButton
                for (var i in searchButton) {
                    if (searchButton[i].name.indexOf('query') > -1) {
                        queryApi = searchButton[i].api
                    }
                }

                //变更页面配置
                state.pageCfg = [].concat({
                    menuId: data.menuId,
                    cfg: res.data.detail,
                    // pageCfg: res.data.detail.pageCfg,
                    // gridCfg: res.data.detail.pageCfg.cfg.grid,
                    searchButton: searchButton,
                    queryApi: queryApi
                })
            }
        }).catch(function (error) {
            console.log(error)
        })



        //数组排重
        function uniqueArrayId(array) {
            var newArr = []
            for (var i in array) {
                var Item = array[i]
                var repeat = false
                for (var j in newArr) {
                    if (Item.menuId === newArr[j].menuId) {
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

    // 传递编辑 查看数据
    tranData(state, data) {
        state.popData = data
    },
    // commit delIds
    tranDelData(state, data){
        state.delIds = data
    },

    //************************************设置/修改密码*******************************************//
    // 修改密码方法
    updatePassword(state, data) {
        console.log(data)
        let self = this
        Util.ojax.post(updatePassword, data).then(function (res) {
            if (res.data.code == 1) {
                console.log(res.data)
            } else {
                console.log(res.data)
            }
        }).catch(function (error) {
            console.log(error)
        })
    },

    // 修改查询参数
    setSearchParams(state, data){
        state.searchParmas = data
    },


    /*
    // 新增数据类型方法
    saveDataType(state, data) {
        console.log(data)
        let self = this
        Util.ojax.post(saveDataType, data).then(function (res) {
            if (res.data.code == 1) {
                console.log(res.data)
            }
        }).catch(function (error) {

        })
    },
     // 修改数据类型方法
    updateDataType(state, data) {
        console.log(data)
        let self = this
        Util.ojax.post(updateDataType, data).then(function (res) {
            if (res.data.code == 1) {
                console.log(res.data)
            } else {
                console.log(res.data)
            }
        }).catch(function (error) {
            console.log(error)
        })
    },

    //************************************客户配置*******************************************/
    /*
    // 新增客户配置方法
    saveClientConfig(state, data) {
        console.log(data)
        let self = this
        Util.ojax.post(saveDataType, data).then(function (res) {
            if (res.data.code == 1) {
                console.log(res.data)
            } else {
                console.log(res.data)
            }
        }).catch(function (error) {
            console.log(error)
        })
    },
    // 修改客户方法
    updateClientConfig(state, data) {
        console.log(data)
        let self = this
        Util.ojax.post(updateDataType, data).then(function (res) {
            if (res.data.code == 1) {
                console.log(res.data)
            } else {
                console.log(res.data)
            }
        }).catch(function (error) {
            console.log(error)
        })
    },
    */

}
