/**
 * Created by aflyi on 2017/5/8.
 */
window.onload = function () {
    var oSlide = document.querySelector('.slide');
    var oUl = oSlide.querySelector('ul');
    oUl.innerHTML +=  oUl.innerHTML;
    var aLi = oUl.querySelectorAll('li');
    var aTab = oSlide.querySelectorAll('.tab span');
    aTab[0].className = 'on';
    oUl.style.width = aLi.length+'00%';

    var startPoint = 0;
    var startX = 0;

    //console.log(aLi.length);
    cssTransform(oUl,'translateX',0);

    oSlide.addEventListener('touchstart',function (e) {
        oUl.style.transition = '';
        var l = cssTransform(oUl,'translateX');
        var num = Math.round(-l/oSlide.offsetWidth);

        if( num == 0 ){
            num = aTab.length;
        }
        if( num == aLi.length-1 ){
            num = aTab.length-1;
        }
        cssTransform(oUl,'translateX',-num*oSlide.offsetWidth);

        startPoint = e.changedTouches[0].pageX;
        startX = cssTransform(oUl,'translateX');
    });

    oSlide.addEventListener('touchmove',function (e) {
        var nowPoint = e.changedTouches[0].pageX;
        var disX = nowPoint - startPoint;
        translateX = disX + startX;
        //oUl.style.transform = 'translateX('+translateX+'px)';
        cssTransform(oUl,'translateX',translateX);
    });
    oSlide.addEventListener('touchend',function (e) {
        var l = cssTransform(oUl,'translateX');
        var num = Math.round(-l/oSlide.offsetWidth);

        translateX = -num*oSlide.offsetWidth;
        oUl.style.transition = '0.5s';
        //oUl.style.transform = 'translateX('+translateX+'px)';
        cssTransform(oUl,'translateX',translateX);
        for (var i=0;i<aTab.length;i++){
            aTab[i].className = '';
        }
        aTab[num%aTab.length].className = 'on';
    })

};