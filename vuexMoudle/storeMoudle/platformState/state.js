/* eslint-disable linebreak-style,indent,no-var,complexity */
export default {

    //页面状态变化
    pageState: {
        pageScreen: false,
        headerControl: true,
        voiceControl: true,
        localHost: location.host,
        pageContentWidth: window.innerWidth,
        pageContentHeight: window.innerHeight,
        pageContentH: window.innerHeight - 64,
        pageColCoum: 24,
        alermBox: false,
        floatAlermBox: false,
        lang: '中文'
    },

    //平台配置
    platformState: {
        platformName: null,
        theme:null,
        name: '依迅车联网大数据通用监管系统',
        platformId: 1,
        platformTheme: 'blue',
        masterLogo: '/assets/img/exhibition_logo.png',
        platformSplash: '/assets/img/login_bg_01.jpg',
        platformSideMenu: true,
        copyright: '<p>技术支持：武汉依迅北斗空间技术有限公司 &nbsp;&nbsp;&nbsp;&nbsp; 服务热线：87773501</p><p>Copyright©2015-2019 增值电信业务许可证号：B2-20150538 备案号:鄂ICP备10014997号-1</p>'
    },

    //平台菜单显示相关
    menuState: {
        menuData: {},
        menuActive: null,
        menuTag: []
    },
    //报警相关
    alermState: {
        alermData: [],
        msgData: []
    },

    //通讯信息提示
    errorTip:null
}