const path = require('path');
const fs = require("fs");
const minify = require('html-minifier').minify;
const rule = require('./rule');

let utils = {
    queryFolderFiles( globPath  = global.templateDirectory){
        var files = fs.readdirSync( globPath );
        for(let file of files){
            let file_path = globPath + path.sep + file;
           
            if(file_path.indexOf('common') > -1 || file_path.indexOf('less') > -1){
                continue;
            }
            if( fs.statSync(file_path).isDirectory()){
                fs.mkdir(file_path,(err) => {
                    this.queryFolderFiles( file_path )
                });
            }else{
                this.readTeamplate(file_path);
            }
        }
    },
    readTeamplate(_path){
        let content = rule.run(_path);
        content = content.replace(/{__VER__}/g, bt.tool.uniqueId );
        if(formatHtml){
            content = minify(content,{removeComments: false,collapseWhitespace: true,minifyJS:true, minifyCSS:true});
        }
        this.regDirectory(_path,content);
    },
    regDirectory(_path,content){
        _path = _path.replace(/\\/g, "/");
        _path = _path.replace(global.templateDirectory.replace('.',''),global.outDirectory);
        let filepath = path.resolve(_path);
        let dirpath = path.dirname(filepath);
        fs.exists(dirpath,exists => {
            if(exists == false){
                fs.mkdir(dirpath,(err)=>{
                    this.regDirectory(_path,content);
                    fs.writeFileSync(_path,content);
                });    
            }else{
                fs.writeFileSync(_path,content);
            }
        });
    }
}

module.exports = utils;