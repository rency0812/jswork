# jswork
* http contentType
```
1, application/x-www-form-urlencoded;
>Form Data
name: 123
age: 123
2, multipart/form-data;
一般用于文件上传；
3，application/json；
>Request payLoad
{
 name: 123
 age: 123
}
```
- 什么是`window.performance.timing?`
* 性能分析。
```
//  .navigationStart      准备加载页面的起始时间
//  .unloadEventStart     如果前一个文档和当前文档同源,返回前一个文档开始unload的时间
//  .unloadEventEnd       如果前一个文档和当前文档同源,返回前一个文档开始unload结束的时间
//  .redirectStart        如果有重定向,这里是重定向开始的时间.
//  .redirectEnd          如果有重定向,这里是重定向结束的时间.
//  .fetchStart           开始检查缓存或开始获取资源的时间
//  .domainLookupStart    开始进行dns查询的时间
//  .domainLookupEnd      dns查询结束的时间
//  .connectStart                  开始建立连接请求资源的时间
//  .connectEnd                    建立连接成功的时间.
//  .secureConnectionStart         如果是https请求.返回ssl握手的时间
//  .requestStart                  开始请求文档时间(包括从服务器,本地缓存请求)
//  .responseStart                 接收到第一个字节的时间
//  .responseEnd                   接收到最后一个字节的时间.
//  .domLoading                    ‘current document readiness’ 设置为 loading的时间 (这个时候还木有开始解析文档)
//  .domInteractive                文档解析结束的时间
//  .domContentLoadedEventStart    DOMContentLoaded事件开始的时间
//  .domContentLoadedEventEnd      DOMContentLoaded事件结束的时间
//  .domComplete                   current document readiness被设置 complete的时间
//  .loadEventStart                触发onload事件的时间
//  .loadEventEnd                  onload事件结束的时间
```
* 主要性能分析指标
```
// DNS查询耗时     = domainLookupEnd - domainLookupStart
// TCP链接耗时     = connectEnd - connectStart
// request请求耗时 = responseEnd - responseStart
// 解析dom树耗时   = domComplete - domInteractive
// 白屏时间        = domloadng - fetchStart
// domready时间    = domContentLoadedEventEnd - fetchStart
// onload时间      = loadEventEnd - fetchStart
////////////////////////////////////////
console.log('首屏图片加载完成 : ',window.lastImgLoadTime - window.performance.timing.navigationStart); //在最后一张图出来的时候打时间点
console.log('HTML加载完成 : ',window.loadHtmlTime - window.performance.timing.navigationStart); //在HTML后打时间点
console.log('首屏接口完成加载完成 : ',Report.SPEED.MAINCGI - window.performance.timing.navigationStart); //在首屏的接口打时间点
console.log('接口完成加载完成 : ',Report.SPEED.LASTCGI - window.performance.timing.navigationStart); //在所有接口打时间点
```
* 请你描述下一个网页是如何渲染出来的，dom树和css树是如何合并的，浏览器的运行机制是什么，什么会造成渲染阻塞?
```
1.首先当用户输入一个URL的时候，浏览器就会发送一个请求，请求URL对应的资源,请求成功的话，浏览器会收到一个html文件。
2.然后浏览器的HTML解析器会对这个文件自上而下开始解析，尝试去构建一棵完整的Dom树。
3.在构建DOM树的时候，当遇到JS元素时，HTML解析器就会将控制权转让给JS解析器，浏览器会开启JavaScript引擎线程，该线程会阻断HTML解析器的 进程，相当于与此同时，没有其他资源会被继续加载与解析，dom树的构建与渲染都会被阻塞；当遇到css元素时，HTML解析器就换将控制权转让给css解 析器，浏览器会开启一个异步请求线程，在该线程上，浏览器会去请求相应的css文件，并且根据该文件去构建cssDom树(也叫css rule)，该线程会阻塞 JavaScript引擎线程（即css后面的js模块的解析会在css解析完毕后执行），但是不会阻塞dom树的构建。具体案例可以参考
`https://www.cnblogs.com/chenjg/p/7126822.html（async，defer这两个属性说白了就是用来控制js的执行开始时间的）`
4.DOM树构建完之后，浏览器把DOM树中的一些不可视元素去掉，然后与CSSOM合成一棵render树。
5.接着浏览器根据这棵render树，计算出各个节点(元素)在屏幕的位置。这个过程叫做layout，输出的是一棵layout树。
7.最后浏览器根据这棵layout树，将页面渲染到屏幕上去。
--------------------- 
* `具体详细参考：https://blog.csdn.net/lxsjh/article/details/79158820`

```
* js是怎样处理事件的eventloop，宏任务源tasks和微任务源jobs分别有哪些
```
*JavaScript是单线程的语言(又分为同步任务,异步任务)
*Event Loop是javascript的执行机制
> 总体上来讲，setTimeout，setTimeInterval粒度更大，属于宏任务，promise.then中的回调粒度小，是微任务。
 setTimeout，在0ms后将callback加入到宏任务的queue中，而promise的回调放在微任务的queue中
 当前JS线程中的任务执行完成后(正常代码都会放入执行栈中，执行栈中空闲后)，queue中的函数会按队列执行。
 先去微任务的queue，再去执行宏任务队列中的callback。
 /****************************/ js先执行同步任务，即先执行栈中的任务，最后执行挂起（异步）任务队列。
 首先执行同步代码，这属于宏任务
 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
 执行所有微任务
 当执行完所有微任务后，如有必要会渲染页面
 然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数

* 宏任务有
> I/O	
  setTimeout	
  setInterval	
  setImmediate	(nodejs)
  requestAnimationFrame
* 微任务有
process.nextTick（nodejs）	
MutationObserver	
Promise.then catch finally
```









