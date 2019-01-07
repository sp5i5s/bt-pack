const watch = require('watch');
const utils = require('./utils');
require('bt-utils');

watch.watchTree(global.listenDirectory, function (f, curr, prev) {
    bt.log('文件监听中' + new Date().toLocaleString());
    if (typeof f == "object" && prev === null && curr === null) {
    }else{
        bt.log('正在重新打包 - ' + new Date().toLocaleString());
        utils.queryFolderFiles();
        bt.log('打包完成 - ' + new Date().toLocaleString());
    }
})
