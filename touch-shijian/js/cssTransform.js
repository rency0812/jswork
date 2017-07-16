/**
 * Created by aflyi on 2017/5/8.
 */

function cssTransform( obj,attr,val ) {
    if( !obj.transform ){
        obj.transform = {};
    }
    if( arguments.length === 3 ){  // 3个实参 设置
        obj.transform[attr] = val;
        var strVal = '';
        for ( var key in  obj.transform){
            switch (key){
                case 'rotate':
                case 'rotateX':
                case 'rotateY':
                case 'skewX':
                case 'skewY':
                    strVal += key + '('+obj.transform[key]+'deg) ';
                    break;
                case 'translate':
                case 'translateX':
                case 'translateY':
                    strVal += key + '('+obj.transform[key]+'px) ';
                    break;
                case 'scale':
                case 'scaleX':
                case 'scaleY':
                    strVal += key + '('+obj.transform[key]+'px) ';
                    break;
            }
            obj.style.WebkitTransform = obj.style.transform =  strVal;
        }
    }else {  // 2个实参 获取
        val = obj.transform[attr];
        if ( typeof val === 'undefined'){
            if( attr === 'scale' || attr === 'scaleX' || attr === 'scaleY') {
                val = 1;
            }else{
                val = 0;
            }
        }
        return val;
    }


}