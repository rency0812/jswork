/**
 * Created by Administrator on 2017/2/28.
 * version fly-1.0
 * 
 */
!function(){
    //$外界接口函数
    function $(options) {

        return new Init(options);
    }

    //构建Fly对象的构造函数
    function Init( bear ) { //彩蛋 bear
        this.exe(bear);
    }
    Init.prototype = {
        //获取参数对应的js对象
        exe: function (bear) {
            var typeBear = typeof bear;
            switch (typeBear) {
                case 'string':
                    if (/^<[^><]+>/.test(bear)) {
                        var oDiv = document.createElement('div');
                        oDiv.innerHTML = bear;
                        this.length = oDiv.children.length;
                        for (var i=0; i<this.length; i++) {
                            this[i] = oDiv.children[i];
                        }
                    } else {
                        var arrObj = document.querySelectorAll(bear);

                        //设置了Fly对象的length属性
                        this.length = arrObj.length;

                        //将获取的js对象存储在Fly对象的数字下标下
                        for (i = 0; i < this.length; i++) {
                            this[i] = arrObj[i];
                        }
                    }
                    break;
                case "object":
                    if (bear.nodeType || bear === window) {
                        this.length = 1;
                        this[0] = bear;
                    } else {
                        this.length = bear.length;
                        for (i = 0; i < this.length; i++) {
                            this[i] = bear[i];
                        }
                    }
                    break;
                case "function":
                    window.onload = bear;
                    break;
            }
        },

        //遍历each方法
        each: function (xLong) { //彩蛋 小龙
            for (var i = 0; i < this.length; i++) {
                xLong.call(this[i], i);
            }
        },

        //get 获取对于的js对象
        get: function (fzc) { //彩蛋 風之彩
            return this[fzc];
        },

        //eq 获取对应的Fly对象
        eq: function (fzc) { //彩蛋 風之彩
            return $(this[fzc]);
        },

        //设置/获取样式
        css: function () {
            var lxy = arguments; //彩蛋 lxy
            if (lxy.length === 2) {
                this.each(function () {
                    this.style[lxy[0]] = lxy[1];
                });
            } else if (lxy.length === 1) {
                if (typeof lxy[0] === 'object') {
                    this.each(function () {
                        for (var key in lxy[0]) {
                            this.style[key] = lxy[0][key];
                        }
                    });
                } else if (typeof lxy[0] === 'string') {
                    var obj = this[0], val = '';
                    if (lxy[0] === 'left') {
                        val = obj.offsetLeft + 'px';
                    } else if (lxy[0] === 'right') {
                        val = obj.offsetLeft + obj.offsetWidth + 'px';
                    } else if (lxy[0] === 'top') {
                        val = obj.offsetTop + 'px';
                    } else if (lxy[0] === 'bottom') {
                        val = obj.offsetTop + obj.offsetHeight + 'px';
                    } else {
                        val = obj.currentStyle ? obj.currentStyle[lxy[0]] : getComputedStyle(obj)[lxy[0]];
                    }
                    return val;
                }
            }
            return this;
        },

        //attr
        attr: function () {
            var lxy = arguments; //彩蛋 lxy
            if (lxy.length === 2) {
                this.each(function () {
                    this.setAttribute(lxy[0], lxy[1]);
                });
            } else if (lxy.length === 1) {
                if (typeof lxy[0] === 'object') {
                    this.each(function () {
                        for (var key in lxy[0]) {
                            this.setAttribute(key, lxy[0][key]);
                        }
                    });
                } else if (typeof lxy[0] === 'string') {
                    return this[0].getAttribute(lxy[0]);
                }
            }
            return this;
        },

        //removeAttr
        removeAttr: function () {
            var attr = arguments[0];
            this.each(function () {
                this.removeAttribute(attr);
            });
            return this;
        },

        //addClass
        addClass: function (smile) { //彩蛋 微笑君
            this.each(function () {
                if (this.className) {
                    var arrSmile = smile.split(' '), className = this.className;
                    for (var i = 0; i < arrSmile.length; i++) {
                        if (!new RegExp("(^|\\s)" + arrSmile[i] + "(\\s|$)").test(className)) {
                            className += ' ' + arrSmile[i];
                        }
                    }
                    this.className = className;
                } else {
                    this.className = smile;
                }
            });
            return this;
        },

        removeClass: function (jiaZ) { //彩蛋 潭州假装
            this.each(function () {
                var arrClass = this.className.split(' ');
                var arrJiaZ = jiaZ.split(' ');
                for (var i = arrClass.length; i >= 0; i--) {
                    for (var j = 0; j < arrJiaZ.length; j++) {
                        if (arrClass[i] === arrJiaZ[j]) {
                            arrClass.splice(i, 1);
                        }
                    }
                }
                this.className = arrClass.join(' ');
            });
            return this;
        },

        toggleClass: function (wi3124) { //彩蛋 wi3124
            this.each(function () {
                var arrClass = this.className.split(' ');
                var arrWi = wi3124.split(' ');
                for (var i = 0; i < arrWi.length; i++) {
                    for (var j = arrWi.length - 1; j > i; j--) {
                        if (arrWi[i] === arrWi[j]) {
                            arrWi.splice(j, 1);
                        }
                    }
                }
                for (i = 0; i < arrWi.length; i++) {
                    var bool = false;
                    for (j = arrClass.length; j >= 0; j--) {
                        if (arrWi[i] === arrClass[j]) {
                            arrClass.splice(j, 1);
                            bool = true;
                        }
                    }
                    if (!bool) {
                        arrClass.push(arrWi[i])
                    }
                }
                this.className = arrClass.join(' ');
            });
            return this;
        },

        html: function (buku) { //彩蛋 不哭
            if (typeof buku !== 'undefined') {
                this.each(function () {
                    this.innerHTML = buku;
                });
            } else {
                return this[0].innerHTML;
            }
            return this;
        },

        text: function (buku) { //彩蛋 不哭
            if (typeof buku !== 'undefined') {
                this.each(function () {
                    this.innerText = buku;
                });
            } else {
                return this[0].innerText;
            }
            return this;
        },

        val: function (buku) { //彩蛋 不哭
            if (typeof buku !== 'undefined') {
                this.each(function () {
                    this.value = buku;
                });
            } else {
                return this[0].value;
            }
            return this;
        },

        offset: function () {
            var json = {left: 0, top: 0}, obj = this[0];
            while (obj !== document.body) {
                json.left += obj.offsetLeft;
                json.top += obj.offsetTop;
                obj = obj.offsetParent;
            }
            var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            json.left -= scrollLeft;
            json.top -= scrollTop;
            return json;
        },

        position: function () {
            var json = {
                left: this[0].offsetLeft,
                top: this[0].offsetTop
            };
            return json;
        },

        scrollTop: function (byc) { //彩蛋 百叶草
            if (this[0] === window || this[0] === document || this[0] === document.body) {
                if (typeof byc !== 'undefined') {
                    document.documentElement.scrollTop = byc;
                } else {
                    return document.documentElement.scrollTop || document.body.scrollTop;
                }
            } else {
                if (typeof byc !== 'undefined') {
                    this[0].scrollTop = byc;
                } else {
                    return this[0].scrollTop;
                }
            }
            return this;
        },

        scrollLeft: function (byc) { //彩蛋 百叶草
            if (this[0] === window || this[0] === document || this[0] === document.body) {
                if (typeof byc !== 'undefined') {
                    document.documentElement.scrollLeft = byc;
                } else {
                    return document.documentElement.scrollLeft || document.body.scrollLeft;
                }
            } else {
                if (typeof byc !== 'undefined') {
                    this[0].scrollLeft = byc;
                } else {
                    return this[0].scrollLeft;
                }
            }
            return this;
        },

        height: function (kawayi) { //彩蛋 卡哇伊
            if (typeof kawayi !== 'undefined') {
                this.css('height', kawayi + 'px');
            } else {
                return parseFloat(this.eq(0).css('height'));
            }
            return this;
        },

        width: function (kawayi) { //彩蛋 卡哇伊
            if (typeof kawayi !== 'undefined') {
                this.css('width', kawayi + 'px');
            } else {
                return parseFloat(this.eq(0).css('width'));
            }
            return this;
        },

        innerHeight: function () {
            return this[0].clientHeight;
        },

        innerWidth: function () {
            return this[0].clientWidth;
        },

        outerHeight: function () {
            return this[0].offsetHeight;
        },

        outerWidth: function () {
            return this[0].offsetWidth;
        },

        append: function (sloth) { //彩蛋 sloth
            var typeS = typeof sloth;
            if (typeS === 'string') {
                if (/^<[^><]+>/.test(sloth)) {
                    this.append($(sloth));
                } else {
                    var oTxt = document.createTextNode(sloth);
                    this[0].appendChild(oTxt);
                }
            } else if (typeS === 'object') {
                if (sloth.constructor === Init) {
                    var This = this[0];
                    sloth.each(function (i) {
                        This.appendChild(sloth[i]);
                    });
                } else {
                    this.append($(sloth));
                }
            }
            return this;
        },

        prepend: function (sloth) { //彩蛋 sloth
            var typeS = typeof sloth;
            if (typeS === 'string') {
                if (/^<[^><]+>/.test(sloth)) {
                    this.prepend($(sloth));
                } else {
                    var oTxt = document.createTextNode(sloth);
                    this[0].insertBefore(oTxt, this[0].children[0]);
                }
            } else if (typeS === 'object') {
                if (sloth.constructor === Init) {
                    var This = this[0];
                    sloth.each(function (i) {
                        This.insertBefore(sloth[sloth.length - 1 - i], This.children[0]);
                    });
                } else {
                    this.prepend($(sloth));
                }
            }
            return this;
        },

        wrap: function (rainday) { //彩蛋 雨天5,莫
            var typeR = typeof rainday;
            if (typeR === 'string' && /^<[^><]+>/.test(rainday)) {
                rainday = $(rainday)[0];
            } else {
                if (rainday.constructor === Init) {
                    rainday = rainday[0];
                } else if (!rainday.nodeType && rainday.length) {
                    rainday = rainday[0];
                }
            }
            var thisParent = this[0].parentNode;
            thisParent.insertBefore(rainday, this[0]);
            this.each(function () {
                rainday.appendChild(this);
            });
            return this;
        },

        unwrap: function () {
            this.each(function () {
                var parent = this.parentNode;
                var aSiblings = parent.children;
                var pParent = parent.parentNode;
                for (var i = aSiblings.length - 1; i >= 0; i--) {
                    pParent.insertBefore(aSiblings[aSiblings.length - 1 - i], parent);
                }
                pParent.removeChild(parent);
            });
            return this;
        },

        empty: function () {
            this.each(function () {
                this.innerHTML = '';
            });
            return this;
        },

        remove: function () {
            this.each(function () {
                this.parentNode.removeChild(this);
            });
            return this;
        },

        children: function (juhao) { //彩蛋 。
            var arr = [];
            if (typeof juhao === 'string') {
                this.each(function () {
                    var all = this.querySelectorAll(juhao);
                    for (var i = 0; i < all.length; i++) {
                        if (all[i].parentNode === this) {
                            arr.push(all[i]);
                        }
                    }
                });
            } else {
                this.each(function () {
                    for (var i = 0; i < this.children.length; i++) {
                        arr.push(this.children[i]);
                    }
                });
            }
            return $(arr);
        },

        find: function (juhao) { //彩蛋 。
            var arr = [];
            if (typeof juhao === 'string') {
                this.each(function () {
                    var all = this.querySelectorAll(juhao);
                    for (var i = 0; i < all.length; i++) {
                        arr.push(all[i]);
                    }
                });
            }
            return $(arr);
        },

        siblings: function (juhao) { //彩蛋 。
            var arr = [];
            if (typeof juhao === 'string') {
                this.each(function () {
                    var all = this.parentNode.querySelectorAll(juhao);
                    for (var i = 0; i < all.length; i++) {
                        if (all[i].parentNode === this.parentNode && all[i] !== this) {
                            arr.push(all[i]);
                        }
                    }
                });
            } else {
                this.each(function () {
                    var all = this.parentNode.children;
                    for (var i = 0; i < all.length; i++) {
                        if (all[i] !== this) {
                            arr.push(all[i]);
                        }
                    }
                });
            }
            return $(arr);
        },

        hasClass: function (juhao) { //彩蛋 。
            var bool = false, arrJ = juhao.split(' '), cName = this[0].className;
            for (var i = 0; i < arrJ.length; i++) {
                if ((new RegExp("(^|\\s)" + arrJ[i] + "(\\s|$)")).test(cName)) {
                    bool = true;
                } else {
                    bool = false;
                    break;
                }
            }
            return bool;
        },

        //事件
        on: function (eName, eFn) {
            if (eName === 'mousewheel'){
                this.each(function () {
                    if (this[eName + 'FLY']) {
                        this[eName + 'FLY'].push(eFn);
                    } else {
                        this[eName + 'FLY'] = [eFn];
                    }
                    document.onmousewheel===null?this.onmousewheel=eFn:this.addEventListener('DOMMouseScroll',eFn);
                });
            }else{
                this.each(function () {
                    if (this[eName + 'FLY']) {
                        this[eName + 'FLY'].push(eFn);
                    } else {
                        this[eName + 'FLY'] = [eFn];
                    }
                    if (document.addEventListener) {
                        this.addEventListener(eName, eFn);
                    } else {
                        this.attachEvent('on' + eName, eFn);
                    }
                });
            }
            return this;
        },

        off: function (eName) {
            this.each(function () {
                if (this[eName + 'FLY']) {
                    for (var i = 0; i < this[eName + 'FLY'].length; i++) {
                        if (document.removeEventListener) {
                            this.removeEventListener(eName, this[eName + 'FLY'][i]);
                        } else {
                            this.detachEvent('on' + eName, this[eName + 'FLY'][i]);
                        }
                    }
                    if(eName === 'mousewheel'){
                        this.onmousewheel = null;
                    }
                }
            });
            return this;
        },

        hover: function () {
            var huamei = arguments; //彩蛋 華魅
            if (huamei.length) {
                if (huamei.length === 1) {
                    huamei[1] = huamei[0]
                }
                this.on('mouseenter', huamei[0]);
                this.on('mouseleave', huamei[1]);
            }
            return this;
        },

        click: function (huamei) { //彩蛋 華魅
            return this.on('click', huamei);
        },

        mouseenter: function (huamei) { //彩蛋 華魅
            this.on('mousenter', huamei);
        },

        mouseleave: function (huamei) { //彩蛋 華魅
            return this.on('mouseleave', huamei);
        },

        mouseover : function (huamei) { //彩蛋 華魅
            return this.on('mouseover' , huamei);
        },

        mouseout : function (huamei) { //彩蛋 華魅
            return this.on('mouseout' , huamei);
        },

        mousedown : function (huamei) { //彩蛋 華魅
            return this.on('mousedown' , huamei);
        },

        mousemove : function (huamei) { //彩蛋 華魅
            return this.on('mousemove' , huamei);
        },

        mouseup : function (huamei) { //彩蛋 華魅
            return this.on('mouseup' , huamei);
        },

        focus : function (huamei) { //彩蛋 華魅
            return this.on('focus' , huamei);
        },

        blur : function (huamei) { //彩蛋 華魅
            return this.on('blur' , huamei);
        },

        change : function (huamei) { //彩蛋 華魅
            this.on('change' , huamei);
        },

        submit : function (huamei) { //彩蛋 華魅
            return this.on('submit' , huamei);
        },

        dblclick : function (huamei) { //彩蛋 華魅
            return this.on('dblclick' , huamei);
        },

        keydown : function (huamei) { //彩蛋 華魅
            return this.on('keydown' , huamei);
        },

        keyup : function (huamei) { //彩蛋 華魅
            return this.on('keyup' , huamei);
        },

        keypress : function (huamei) { //彩蛋 華魅
            return this.on('keypress' , huamei);
        },

        scroll : function (huamei) { //彩蛋 華魅
            return this.on('scroll' , huamei);
        },

        resize : function (huamei) { //彩蛋 華魅
            return this.on('resize' , huamei);
        },

        load : function (huamei) { //彩蛋 華魅
            return this.on('load' , huamei);
        },

        mousewheel : function (huamei) { //彩蛋 華魅
            return this.on('mousewheel' , huamei);
        },

        show : function () {
            var changan = arguments; //彩蛋 chang_an
            if (changan.length === 0){
                this.each(function () {
                    this.style.display = 'block';
                });
            }else{
                var time ,
                    callBack;
                if(typeof changan[0] === 'number'){
                    time = changan[0];
                    if (typeof changan[1] === 'function'){
                        callBack = changan[1];
                    }
                }else if (typeof changan[0] === 'function'){
                    time = 300;
                    callBack = changan[0];
                }
                this.each(function () {
                    if ( $(this).css('display') === 'none'){
                        var sWidth,
                            sHeight;
                        this.style.display = 'block';
                        sWidth = this.clientWidth;
                        sHeight = this.clientHeight;
                        this.style.width = '0';
                        this.style.height = '0';
                        this.style.opacity = 0;
                        $(this).animate({
                            width : sWidth,
                            height : sHeight,
                            opacity : 1
                        },time,callBack);
                    }
                });
            }
            return this;
        },

        hide : function () {
            var changan = arguments; //彩蛋 chang_an
            if (changan.length === 0){
                this.each(function () {
                    this.style.display = 'none';
                });
            }else{
                var time ,
                    callBack;
                if(typeof changan[0] === 'number'){
                    time = changan[0];
                    if (typeof changan[1] === 'function'){
                        callBack = changan[1];
                    }
                }else if (typeof changan[0] === 'function'){
                    time = 300;
                    callBack = changan[0];
                }
                this.each(function () {
                    if ( $(this).css('display') !== 'none'){
                        $(this).animate({
                            width : 0,
                            height : 0,
                            opacity : 0
                        },time,function () {
                            this.style.display = 'none';
                            callBack&&callBack.bind(this);
                        });
                    }
                });
            }
            return this;
        },

        toggle : function () {
            var changan = arguments; //彩蛋 chang_an
            this.each(function () {
                if($(this).css('display')!=='none'){
                    $(this).hide.apply($(this),changan);
                }else{
                    $(this).show.apply($(this),changan);
                }
            });
        },

        fadeIn : function (qx,qz) {
            var time = typeof qx==='number'?qx:300,
                callBack = typeof qx==='function'?qx:qz;
            this.each(function () {
                if ($(this).css('display')==='none'){
                    this.style.opacity = 0;
                    this.style.display = 'block';
                    $(this).animate({
                        opacity : 1
                    },time,callBack);
                }
            });
            return this;
        },

        fadeOut : function (qx,qz) {
            var time = typeof qx==='number'?qx:300,
                callBack = typeof qx==='function'?qx:qz;
            this.each(function () {
                if ($(this).css('display')!=='none'){
                    $(this).animate({
                        opacity : 0
                    },time,function () {
                        this.style.display = 'none';
                        callBack && callBack.call(this);
                    });
                }
            });
            return this;
        },

        fadeToggle : function () {
            var changan = arguments; //彩蛋 chang_an
            this.each(function () {
                if($(this).css('display')!=='none'){
                    $(this).fadeOut.apply($(this),changan);
                }else{
                    $(this).fadeIn.apply($(this),changan);
                }
            });
        },

        slideDown : function (qx,qz) {
            var time = typeof qx==='number'?qx:300,
                callBack = typeof qx==='function'?qx:qz;
            this.each(function () {
                if ($(this).css('display')==='none'){
                    var sHeight = 0;
                    this.style.display = 'block';
                    sHeight = this.clientHeight;
                    this.style.overflow = 'hidden';
                    this.style.height = '0';
                    $(this).animate({
                        height : sHeight
                    },time,callBack);
                }
            });
            return this;
        },

        slideUp : function (qx,qz) {
            var time = typeof qx==='number'?qx:300,
                callBack = typeof qx==='function'?qx:qz;
            this.each(function () {
                if ($(this).css('display')!=='none'){
                    this.style.overflow = 'hidden';
                    $(this).animate({
                        height : 0
                    },time,function () {
                        this.style.display = 'none';
                        callBack && callBack.call(this);
                    });
                }
            });
            return this;
        },

        slideToggle : function () {
            var changan = arguments; //彩蛋 chang_an
            this.each(function () {
                if($(this).css('display')!=='none'){
                    $(this).slideUp.apply($(this),changan);
                }else{
                    $(this).slideDown.apply($(this),changan);
                }
            });
        },

        animate : function (qx,qz,ht) { //彩蛋 浅笑+茄子+HT
            if (typeof qx === 'object'){
                var target = qx,
                    time = (typeof qz==='number')?qz:300,
                    callBack = (typeof qz==='function')?qz:ht,
                    sTime = new Date();
                this.each(function () {
                    var start = {},json={};
                    for (var attr in target){
                        start[attr] = parseFloat($(this).css(attr));
                        json[attr] = target[attr] - start[attr];
                    }
                    (function Fn() {
                        var nTime = new Date();
                        var prop = (nTime - sTime) / time;
                        if (prop >= 1)prop = 1;
                        for (var attr in start){
                            var val = '';
                            if (attr !== 'opacity' && attr !== 'zIndex'){
                                val = 'px';
                            }
                            this.style[attr] = start[attr] + json[attr]*prop + val;
                        }
                        if(prop===1){
                            callBack&&callBack.call(this);
                        }else{
                            timer = requestAnimationFrame(Fn.bind(this));
                        }
                    }.bind(this))();
                });
            }
            return this;
        }
    };
    Init.prototype.constructor = Init;

    window.$ = $;
}();
