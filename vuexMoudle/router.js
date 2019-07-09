/* eslint-disable indent,linebreak-style,no-sparse-arrays,complexity,no-case-declarations */


const routers = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: (resolve) => require(['../views/index'], resolve),
        meta: {requireAuth: true, title: '大数据分析', keepAlive: false},
        children:
            [{
                path: '/index',
                component: (resolve) => require(['../views/portal/index'], resolve),
                meta: {requireAuth: true, title: '大数据分析', keepAlive: false, menuId: 20}
            }, {
                path: '/portal/index',
                component: (resolve) => require(['../views/portal/index'], resolve),
                meta: {requireAuth: true, title: '大数据分析', keepAlive: false, menuId: 15}
            }, {
                path: '/table/funcRoleManage',
                component: (resolve) => require(['../views/table/funcRoleManage'], resolve),
                meta: {requireAuth: true, title: '功能角色管理', keepAlive: false, menuId: 15}
            }, {
                path: '/table/dataRoleManage',
                component: (resolve) => require(['../views/table/dataRoleManage'], resolve),
                meta: {requireAuth: true, title: '数据角色管理', keepAlive: false, menuId: 14}
            }, {
                path: '/table/userManage',
                component: (resolve) => require(['../views/table/userManage'], resolve),
                meta: {requireAuth: true, title: '用户管理', keepAlive: false, menuId: 13}
            }, {
                path: '/table/departmentManage',
                component: (resolve) => require(['../views/table/departmentManage'], resolve),
                meta: {requireAuth: true, title: '组织机构管理', keepAlive: false, menuId: 16}
            }, {
                path: '/table/userGridConfig',
                component: (resolve) => require(['../views/table/userGridConfig'], resolve),
                meta: {requireAuth: true, title: 'Grid配置', keepAlive: false, menuId: 1}
            }, {
                path: '/table/loginLogManage',
                component: (resolve) => require(['../views/table/loginLogManage'], resolve),
                meta: {requireAuth: true, title: '登录日志', keepAlive: false, menuId: 17}
            }, {
                path: '/table/operationManage',
                component: (resolve) => require(['../views/table/operationManage'], resolve),
                meta: {requireAuth: true, title: '操作日志', keepAlive: false, menuId: 18}
            }, {
                path: '/table/menuManage',
                component: (resolve) => require(['../views/table/menuManage'], resolve),
                meta: {requireAuth: true, title: '菜单管理', keepAlive: false, menuId: 20}
            }, {
                path: '/table/deviceManage',
                component: (resolve) => require(['../views/table/deviceManage'], resolve),
                meta: {requireAuth: true, title: '设备管理', keepAlive: false, menuId: 86}
            }, {
                path: '/table/deviceTypeManage',
                component: (resolve) => require(['../views/table/deviceTypeManage'], resolve),
                meta: {requireAuth: true, title: '设备类型管理', keepAlive: false, menuId: 78}
            }, {
                path: '/table/dataDictionary',
                component: (resolve) => require(['../views/table/dataDictionary'], resolve),
                meta: {requireAuth: true, title: '数据字典', keepAlive: false, menuId: 21}
            }, {
                path: '/table/driverManage',
                component: (resolve) => require(['../views/table/driverManage'], resolve),
                meta: {requireAuth: true, title: '驾驶员管理', keepAlive: false, menuId: 101}
            }, {
                path: '/table/clientConfig',
                component: (resolve) => require(['../views/table/clientConfig'], resolve),
                meta: {requireAuth: true, title: '客户配置', keepAlive: false, menuId: 22}
            }, {
                path: '/monitor/vechileMap',
                component: (resolve) => require(['../views/monitor/vechileMapV'], resolve),
                meta: {requireAuth: true, title: '车辆监控', keepAlive: false, menuId: 99}
            }, {
                path: '/monitor/vechileVideo',
                component: (resolve) => require(['../views/monitor/vechileVideo'], resolve),
                meta: {requireAuth: true, title: '车辆视频', keepAlive: false, menuId: 139}
            }, {
                path: '/table/vehicleManage',
                component: (resolve) => require(['../views/table/vehicleManage'], resolve),
                meta: {requireAuth: true, title: '车辆管理', keepAlive: false, menuId: 111}
            }, {
                path: '/table/simManage',
                component: (resolve) => require(['../views/table/simManage'], resolve),
                meta: {requireAuth: true, title: 'SIM管理', keepAlive: false, menuId: 132}
            }, {
                path: '/table/gridColumnConfig',
                component: (resolve) => require(['../views/table/gridColumnConfig'], resolve),
                meta: {requireAuth: true, title: '列项配置', keepAlive: false, menuId: 132}
            }, {
                path: '/table/alertPushSet',
                component: (resolve) => require(['../views/table/alertPushSet'], resolve),
                meta: { requireAuth: true, title: '报警推送配置', keepAlive: false, menuId: '' }
            }, {
                path: '/table/ruleSet',
                component: (resolve) => require(['../views/table/ruleSet'], resolve),
                meta: { requireAuth: true, title: '规则管理', keepAlive: false, menuId: 1000 }
            }, {
                path: '/pages/railMap',
                component: (resolve) => require(['../views/components/cloudMap/pages/railMap'], resolve),
                meta: { requireAuth: true, title: '围栏', keepAlive: false, menuId: 1000 }
            }, {
                path: '/table/devStateCount',
                component: (resolve) => require(['../views/countAnalysis/devStateCount'], resolve),
                meta: { requireAuth: true, title: '设备状态统计', keepAlive: false, menuId: 153 }
            }, {
                path: '/table/vehStateCount',
                component: (resolve) => require(['../views/countAnalysis/vehStateCount'], resolve),
                meta: { requireAuth: true, title: '车辆状态统计', keepAlive: false, menuId: 159 }
            }]
    }, {
        path: '/doc',
        component: (resolve) => require(['../views/index'], resolve),
        meta: {requireAuth: true, title: '页面布局示例', keepAlive: false},
        children: [{
            path: '/doc',
            component: (resolve) => require(['../views/doc/login'], resolve),
            meta: {requireAuth: true, title: '登录布局示例', keepAlive: false}
        }, {
            path: '/doc/login',
            component: (resolve) => require(['../views/doc/login'], resolve),
            meta: {requireAuth: true, title: '登录布局示例', keepAlive: false}
        }, {
            path: '/doc/layout',
            component: (resolve) => require(['../views/doc/layout'], resolve),
            meta: {requireAuth: true, title: '框架布局示例', keepAlive: false}
        }, {
            path: '/doc/grid',
            component: (resolve) => require(['../views/doc/grid'], resolve),
            meta: {requireAuth: true, title: '报表页面布局', keepAlive: false}
        }, {
            path: '/doc/overview',
            component: (resolve) => require(['../views/doc/overview'], resolve),
            meta: {requireAuth: true, title: '特殊页面布局', keepAlive: false}
        }, {
            path: '/doc/components/common',
            component: (resolve) => require(['../views/doc/components/common'], resolve),
            meta: {requireAuth: true, title: '通用组件示例', keepAlive: false}
        }, {
            path: '/doc/components/grid',
            component: (resolve) => require(['../views/doc/components/grid'], resolve),
            meta: {requireAuth: true, title: '表单组件示例', keepAlive: false}
        }, {
            path: '/doc/components/window/loginbox',
            component: (resolve) => require(['../views/doc/components/window/loginBox'], resolve),
            meta: {requireAuth: true, title: '登录框组件示例', keepAlive: false}
        }, {
            path: '/doc/components/common/handlescreen',
            component: (resolve) => require(['../views/doc/components/common/handleScreen'], resolve),
            meta: {requireAuth: true, title: '全屏按钮组件示例', keepAlive: false}
        }]
    },
    {
        path: '/login',
        component: (resolve) => require(['../views/login/index'], resolve),
        meta: {title: '登录', keepAlive: false}
    }
]


export default routers
