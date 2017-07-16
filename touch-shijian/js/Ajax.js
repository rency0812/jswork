/**
 * Created by Kyogre on 2017/2/18.
 */



// (function(){    //控制缩放比例
//     var sw = window.screen.width,
//         createMeta = document.createElement("meta"),
//         scale = sw/320;
//     var metaAttr = {
//         "name" : "viewport",
//         "content" : "width=320,initial-scale="+scale+",maximum-scale="+scale+",minimum-scale="+scale+",user-scalable=no"
//     }
//     for(var key in metaAttr){
//         createMeta[key] = metaAttr[key];
//     }
//     document.getElementsByTagName("head")[0].appendChild(createMeta);
// })()

/*

(function (win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;

        if (width > 768) { // 最大宽度
            width = 768;
        }
        var rem = width / 10; // 将屏幕宽度分成10份， 1份为1rem
        docEl.style.fontSize = rem + 'px';
    }

    win.addEventListener('resize', function () {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);
    refreshRem();
})(window);
*/

function ajax(opt) {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.dataType = opt.dataType || 'JSON';
    opt.success = opt.success || function () {
        };
    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var params = [];
    for (var key in opt.data)params.push(key + '=' + opt.data[key]);
    var postData = params.join('&');
    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
    }
    else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
        xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            if (opt.dataType === 'JSON') {
                opt.success(JSON.parse(xmlHttp.response));
            }
        }
    };
}
