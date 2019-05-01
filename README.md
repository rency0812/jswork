# jswork
- 什么是`window.performance.timing?`
* 性能分析。
```
//  .navigationStart 准备加载页面的起始时间
//  .unloadEventStart 如果前一个文档和当前文档同源,返回前一个文档开始unload的时间
//  .unloadEventEnd 如果前一个文档和当前文档同源,返回前一个文档开始unload结束的时间
//  .redirectStart   如果有重定向,这里是重定向开始的时间.
//  .redirectEnd     如果有重定向,这里是重定向结束的时间.
//  .fetchStart        开始检查缓存或开始获取资源的时间
//  .domainLookupStart   开始进行dns查询的时间
//  .domainLookupEnd     dns查询结束的时间
//  .connectStart                  开始建立连接请求资源的时间
//  .connectEnd                     建立连接成功的时间.
//  .secureConnectionStart      如果是https请求.返回ssl握手的时间
//  .requestStart                     开始请求文档时间(包括从服务器,本地缓存请求)
//  .responseStart                   接收到第一个字节的时间
//  .responseEnd                      接收到最后一个字节的时间.
//  .domLoading                       ‘current document readiness’ 设置为 loading的时间 (这个时候还木有开始解析文档)
//  .domInteractive               文档解析结束的时间
//  .domContentLoadedEventStart    DOMContentLoaded事件开始的时间
//  .domContentLoadedEventEnd      DOMContentLoaded事件结束的时间
//  .domComplete        current document readiness被设置 complete的时间
//  .loadEventStart      触发onload事件的时间
//  .loadEventEnd       onload事件结束的时间
// DNS查询耗时 = domainLookupEnd - domainLookupStart
// TCP链接耗时 = connectEnd - connectStart
// request请求耗时 = responseEnd - responseStart
// 解析dom树耗时 = domComplete - domInteractive
// 白屏时间 = domloadng - fetchStart
// domready时间 = domContentLoadedEventEnd - fetchStart
// onload时间 = loadEventEnd - fetchStart
console.log('首屏图片加载完成 : ',window.lastImgLoadTime - window.performance.timing.navigationStart); //在最后一张图出来的时候打时间点
console.log('HTML加载完成 : ',window.loadHtmlTime - window.performance.timing.navigationStart);//在HTML后打时间点
console.log('首屏接口完成加载完成 : ',Report.SPEED.MAINCGI - window.performance.timing.navigationStart);//在首屏的接口打时间点
console.log('接口完成加载完成 : ',Report.SPEED.LASTCGI - window.performance.timing.navigationStart);//在所有接口打时间点
```
