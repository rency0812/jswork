/**
 * Created by aflyi on 2017/5/11.
 */


    var oLocation = document.querySelector('#location');
    // 国家 country 省份 province 市 city
    var city = remote_ip_info['city'];
   //alert( oLocation )
    oLocation.innerHTML = city;
