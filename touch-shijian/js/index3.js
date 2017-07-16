/**
 * Created by aflyi on 2017/5/8.
 */
window.onload = function () {

    /*轮播图-开始*/
    Banner();
    function Banner() {
        var oSlide = document.querySelector('.slide');
        var oUl = oSlide.querySelector('ul');
        oUl.innerHTML +=  oUl.innerHTML;
        var aLi = oUl.querySelectorAll('li');
        var aTab = oSlide.querySelectorAll('.tab span');
        aTab[0].className = 'on';
        oUl.style.width = aLi.length+'00%';

        var startPoint = 0;
        var startX = 0;

        var timer;
        var num =0;
        var onOff = true;
        var first = true;

        cssTransform(oUl,'translateX',0);

        oSlide.addEventListener('touchstart',function (e) {
            clearInterval(timer);
            oUl.style.WebkitTransition = oUl.style.transition = '';
            var l = cssTransform(oUl,'translateX');
            num = Math.round(-l/oSlide.offsetWidth);

            if( num === 0 ){
                num = aTab.length;
            }
            if( num === aLi.length-1 ){
                num = aTab.length-1;
            }
            cssTransform(oUl,'translateX',-num*oSlide.offsetWidth);

            startPoint = e.changedTouches[0];
            startX = cssTransform(oUl,'translateX');

            onOff = true;
            first = true;
        });

        oSlide.addEventListener('touchmove',function (e) {
            if ( !onOff ){
                return;
            }
            var nowPoint = e.changedTouches[0];
            var disX = nowPoint.pageX - startPoint.pageX;
            var disY = nowPoint.pageY - startPoint.pageY;
            translateX = disX + startX;
            console.log(disY ,disX );
            if( first ){
                first = false;
                if( Math.abs(disY) > Math.abs(disX) ){
                    //return;
                    onOff = false;
                }
            }
            if ( onOff ){
                cssTransform(oUl,'translateX',translateX);
            }

        });
        oSlide.addEventListener('touchend',function (e) {
            var l = cssTransform(oUl,'translateX');
            num = Math.round(-l/oSlide.offsetWidth);

            autoPlay();
            tab();
        });
        autoPlay();
        function autoPlay() {
            timer = setInterval(function () {
                if( num === aLi.length-1 ){
                    num = aTab.length-1;
                }
                oUl.style.WebkitTransition = oUl.style.transition = '';
                cssTransform(oUl,'translateX',-num*oSlide.offsetWidth);
                setTimeout(function () {
                    num++;
                    tab();
                },50)
            },2000);
        }

        function tab() {
            oUl.style.WebkitTransition = oUl.style.transition = '0.5s';

            cssTransform(oUl,'translateX',-num*oSlide.offsetWidth);
            for (var i=0;i<aTab.length;i++){
                aTab[i].className = '';
            }
            aTab[num%aTab.length].className = 'on';
        }
    }
    /*轮播图-结束*/

    /*滑动导航-开始*/
    (function () {
        var nav = document.querySelector('.header .hd-move');
        var oUl = nav.querySelector('ul');

        var startPoint = 0;
        var startX = 0;

        var step = 1;

        var maxX = nav.clientWidth - oUl.offsetWidth;
        //console.log( maxX );

        var lastX = 0;       // 上次的距离
        var lastTime = 0;    // 上次的时间戳
        var lastDis = 0;
        var lastTimeDis = 0;

        cssTransform(oUl,'translateX',0);
        nav.addEventListener('touchstart',function (e) {
            startPoint = e.changedTouches[0].pageX;
            startX = cssTransform(oUl,'translateX');

            step = 1;


            lastX = startX;

            lastTime = new Date().getTime();
            lastDis = 0;
            lastTimeDis = 0;
        });

        nav.addEventListener('touchmove',function (e) {
            var nowPoint = e.changedTouches[0].pageX;
            var disX = nowPoint - startPoint;
            var l = disX+startX;
            var nowTime = new Date().getTime();
            if( l>0 ){
                step =1- l/nav.clientWidth;

                l = parseInt(l*step);
                //l=0;
                //console.log(l)
            }
            if( l<maxX ){
                var L = maxX -l;
                step = 1 - L/nav.clientWidth;
                L = parseInt( L*step );
                l = maxX - L;
                //console.log(l)
                //l = maxX;
            }

            lastDis = l - lastX;
            lastTimeDis = nowTime - lastTime;


            lastX = l;
            lastTime = nowTime;


            cssTransform(oUl,'translateX',l);
        });
        
        nav.addEventListener('touchend',function (e) {

            var speed = ( lastDis / lastTimeDis )*200;
            var l = cssTransform(oUl,'translateX');
            var target = l+speed;

            if( target>0 ){
                target = 0;
            }
            if ( target< maxX ){
                target = maxX;
            }
            oUl.style.WebkitTransition = oUl.style.transition = 'transform 600ms cubic-bezier(0.1, 0.57, 0.1, 1)';
            cssTransform(oUl,'translateX',target);
            //console.log( speed );
            /*
            *  缓冲原理
            *   有移动的最后一次速度有关系
            *   速度快 走的距离就多
            *   速度慢 走的距离就少
            *
            *   速度 = 距离 / 时间
            *
            *   距离 = 上次位置 和 移动后位置的差值
            *   时间 = 上次时间 和 移动后时间的差值
            * */
        });
    })();
    /*滑动导航-结束*/
};
























