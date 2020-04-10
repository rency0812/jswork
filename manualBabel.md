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
