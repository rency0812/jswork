###### ES6手动转码；
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
