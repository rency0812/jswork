/**
 * Created by aflyi on 2017/5/8.
 */
window.onload = function () {
    var oSlide = document.querySelector('.slide');
    var oUl = oSlide.querySelector('ul');
    var aLi = oUl.querySelectorAll('li');
    var aTab = oSlide.querySelectorAll('.tab span');

    oUl.style.width = aLi.length+'00%';
    aTab[0].className = 'on';

    var startPoint = 0;
    var startX = 0;
    var translateX = 0;
    oSlide.addEventListener('touchstart',function (e) {
        oUl.style.transition = '';
        startPoint = e.changedTouches[0].pageX;
        startX = translateX;
    });
    oSlide.addEventListener('touchmove',function (e) {
        var nowPoint = e.changedTouches[0].pageX;
        var disX = nowPoint - startPoint;
        translateX = startX + disX;
        oUl.style.WebkitTransform = oUl.style.transform = 'translateX('+translateX+'px)'
    });
    oSlide.addEventListener('touchend',function (e) {
        var l = translateX;
        var num= Math.round(-l/oSlide.offsetWidth);
        console.log(num);
        translateX = -num*oSlide.offsetWidth;
        oUl.style.transition = '0.5s';
        oUl.style.WebkitTransform = oUl.style.transform = 'translateX('+translateX+'px)'

        for(var i=0;i<aTab.length;i++){
            aTab[i].className = '';
        }
        aTab[num].className = 'on';
    });
};