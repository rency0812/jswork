/**
 * Created by aflyi on 2017/5/11.
 */

window.onload = function () {
    // 选项卡数据
    ajax({
        method:'GET',
        url:'http://route.showapi.com/181-1',
        data:{
            showapi_appid:'37928',
            showapi_sign:'d0ca1605e19241c38849c3fb9a56b447',
            num:5,
            rand:1
        },
        success:function (data) {
            var newsList = data.showapi_res_body.newslist;
            var oFirstPage = document.querySelectorAll('.WX_content .page_wrap .page')[0];
            console.log( newsList );
            var str = '';
            for( var i=0;i<newsList.length;i++ ){
                str += '<a href="'+newsList[i].url+'" class="weui-cell weui-cell_access clearFix">' +
                    '<div class="weui-cells"><div class="weui-cell__hd">' +
                    '<img src="'+newsList[i].picUrl+'" width="100%" height="100%" alt="">' +
                    '</div><div class="weui-cell__bd">' +
                    '<p class="weui-grid__label">'+newsList[i].title+'</p>' +
                    '</div><div class="weui-cell__ft">&gt;</div>' +
                    '</div></a>';
            }
            oFirstPage.innerHTML = str;
        }
    });

    // 选项卡效果
    var oNav = document.querySelector('.WX_content .WX_navbar').querySelectorAll('div');
    var oPage = document.querySelector('.WX_content').querySelectorAll('.page');
    var length = oPage.length;
    var oPageWrap = document.querySelector('.WX_content .page_wrap');
    var start = {
        x:0,
        y:0
    };
    var end = {
        x: 0,
        y: 0
    };
    var index = 0;

    oPageWrap.addEventListener('touchstart',touch,false);
    oPageWrap.addEventListener('touchmove',touch,false);
    oPageWrap.addEventListener('touchend',touch,false);

    for( var i=0;i<length;i++ ){
        (function (i) {
            oNav[i].onclick =function () {
                AddClass(i);
            }
        })(i)
    }

    function touch(event) {
        //console.log( event.type )
        switch ( event.type ){
            case 'touchstart':
                start.x = event.changedTouches[0].pageX;
                start.y = event.changedTouches[0].pageY;
                break;
            case 'touchmove':
                end.x = event.changedTouches[0].pageX;
                end.y = event.changedTouches[0].pageY;
                break;
            case 'touchend':
                if( (start.x - end.x) > ( Math.abs(end.y - start.y)*2 ) ){
                    index ++;
                    index = index > length-1 ? length-1 : index;
                    AddClass(index);
                }
                if( (end.x - start.x) > (Math.abs(end.y - start.y)*2) ){
                    index--;
                    index = index < 0 ? 0 : index;
                    AddClass(index);
                }
                break;
        }
    }
    
    function AddClass(k) {
        for( var i=0;i<oNav.length;i++ ){
            //oNav[i].className = 'navbar-item';
            oNav[i].setAttribute('class','navbar-item');
            oPage[i].setAttribute('class','page');
        }
        oNav[k].setAttribute('class','navbar-item navbar-item_on');
        oPage[k].setAttribute('class','page page_on');
    }

};




















