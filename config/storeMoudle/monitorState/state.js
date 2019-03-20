/* eslint-disable linebreak-style,indent,no-var,complexity */
export default {

    //页面配置初始化数据池
    pageCfg: {
        monitorButton: [
            {
                i: 0,
                label: '组织架构',
                icon: 'md-git-merge',
                name: 'structureVechile',
                api: '../'
            },
            {
                id: 1,
                label: '车辆列表',
                icon: 'md-car',
                name: 'vechileLists',
                api: '../'
            },
            {
                id: 2,
                label: '关注',
                icon: 'md-star',
                name: 'vechileLists',
                api: '../'
            }
        ]
    },

    //
    mapData: {
        zoom: 14, //级别
        searchPoiList: [], //中心点坐标
        mapStyle: 'amap://styles/whitesmoke',
        viewMode: '3D', //使用3D视图
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        pitch: 0,
        rotation: 0,
        expandZoomRange: true,
        zooms: [3, 20]
    },

     //与地图模块进行数据交换的池子
    mapModuleData: {},

    //与视频模块进行数据交换的池子
    videoModuleData: {}


}
