const utils = require('./system/utils');
const watch = require('watch');

module.exports = {
    run(){
        utils.queryFolderFiles();
        watch.watchTree(global.listenDirectory, function (f, curr, prev) {
            bt.log('文件监听中 > ' + (global.singleListen ? 'File' : 'Directory') + ' > ' + new Date().toLocaleString());
            if (typeof f == "object" && prev === null && curr === null) {
            }else{
                bt.log('正在重新打包 > ' + new Date().toLocaleString());
                if(global.singleListen){
                    if(f.indexOf('less') == -1){
                        utils.readTeamplate('.\\' + f);
                    }
                }else{
                    utils.queryFolderFiles();
                }
                bt.log('打包完成 > ' + new Date().toLocaleString());
            }
        })
    }
};