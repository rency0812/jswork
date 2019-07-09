/* eslint-disable linebreak-style,indent,no-var,complexity */
export default {
    initTable(context) {
        // context.commit('initPageCfg')
        context.commit('initGridData');
    },
    initComponentCfg(context, state) {
        console.log(context.state)
        context.commit('initPageCfg')
        context.commit('initButtonRoleCfg');
    },

    // 增删改的数据
    handlePost({commit, state}, data){
        let self = this
        let menuId = data.menuId
        let searchParmas = state.editParmas['editParmas' + menuId]
        commit('handleModalPost', {menuId: menuId, path: data.path, data:data.postData})
        Util.ojax.post(data.path, data.postData).then(function (res) {
            if(res.data.code == 0){
                self.$Notice.success({
                    title: '提示',
                    desc: '操作成功!',
                    duration: 3
                })
                self.modalShow = false
                self.searchGrid()
            }else{
                self.$Message.error(res.data.msg)
            }
        }).catch(function (error) {
            self.$Notice.error({
                title: '提示',
                desc: '操作失败!',
                duration: 3
            })
        })
    },

    //查询条件的存储
    searchPamas({commit, state}, data) {
        console.log(data)
        let menuId = data.menuId
        let searchParmas = state.searchParmas['search' + menuId]
        state.searchParmas['search' + menuId] = concat(searchParmas, data.parmas)

        //合并查询条件
        function concat(obj1, obj2) {
            var resultJsonObject = {}
            for (var i in obj1) {
                resultJsonObject[i] = obj1[i]
            }
            for (var x in obj2) {
                resultJsonObject[x] = obj2[x]
            }
            return resultJsonObject
        }
        commit('searchGrid', {menuId: menuId, path: data.path})
    },

    // 导出条件
    exportPamas({commit, state}, data) {
        const menuId = data.menuId
        const searchParmas = state.searchParmas[`search${  menuId}`]
        state.searchParmas['search' + menuId] = concat(searchParmas, data.parmas)

        //合并查询条件
        function concat(obj1, obj2) {
            var resultJsonObject = {}
            for (var i in obj1) {
                resultJsonObject[i] = obj1[i]
            }
            for (var x in obj2) {
                resultJsonObject[x] = obj2[x]
            }
            return resultJsonObject
        }
        commit('exportGrid', {menuId: menuId, path: data.path})
    },


    //搜索树节点
    searchTreeNode({commit, state}, data) {
        let menuId = data.menuId
        let treeType = data.treeType
        state.searchParmas['search' + menuId] =  {}
        state.searchParmas['search' + menuId][treeType] = data.treeNodes
        commit('searchGrid', {menuId: menuId})
    },

    // 清空弹窗内的数据
    clearFormData(state, data){
        if(data.params){
            for(let i in data.params){
                data.params[i] = ''
            }
        }
    },
    handleSaveDept(state, data){

    }
}