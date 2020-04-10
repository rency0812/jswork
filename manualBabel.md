##### webpack dllPlugin[vue cli3]
* vue add dll
* vue.config.js添加选项
```
pluginOptions: {
  dll: {
    // 要处理的库
    entry: ['vue', 'vue-router', 'axios'],
    // dll 编译后的链接库的地址
    cacheFilePath: path.resolve(__dirname, './public')
  }
}
```
* 听说还要在vue.config加这个（可能是cli2），不是很清楚。如下：
```
const webpack = require("webpack");
plugins.push(
  new webpack.DllReferencePlugin({
    context: process.cwd(),
    manifest: require('./public/dll/dll.manifest.json')
  })
);
```

##### ES6手动转码；
* 全局安装babel-cli npm i babel-cli -g
* npm i babel-core -D
* npm i babel-preset-es2015 -D
* npm i babel-plugin-transform-es2015-arrow-functions -D
* 添加.babelrc文件
```
{
  "presets": ["es2015"],
  "plugins": []
}
```
* 全局安装uglifyjs 就可命令式压缩js
* uglifyjs index.min.js -o index.min.d.js
* 同时开启两个命令：npm run [name1] && npm run [name2]
##### webpack 构建
* 安装脚手架 npm webpack webpack-cli -D
* 添加配置文件webpack.config.js
```
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './test.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```
* package.json添加命令
```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack" // 添加这一行
},
```
