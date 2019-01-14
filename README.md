![https://img.shields.io/badge/vscode-1.25.0-brightgreen.svg](https://img.shields.io/badge/vscode-1.30.2-brightgreen.svg) ![https://img.shields.io/badge/typescript-passing-blue.svg](https://img.shields.io/badge/javascript-passing-blue.svg)

## BT-Pack
可伸缩的前端模板组合打包工具，提供多页组件化的开发方式，同时支持Vue及Comment开发。
## 安装
cnpm | npm install bt-pack
## 运行
在根目录中新建任何Js文件，复杂以下内容

- const pack = require('bt-pack');
- require('bt-utils');
- // 监听的主目录
- global.listenDirectory = './app/';
- // 监听的模板路径
- global.templateDirectory = './app/teamplate/';
- // 公共模板目录
- global.commonDirectory = './app/teamplate/common/';
- // 打包输出目录
- global.outDirectory = '/dist/';
- // 是否格式化代码
- global.formatHtml = false;
- // 是否单文件改变打包
- global.singleListen = false;
- // 是否包括公共组件
- global.hasCommon = false;
- // 是否开启px转Em模式
- global.hasLessPx2Em = false
- // 开始运行
- pack.run();