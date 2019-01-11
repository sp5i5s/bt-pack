const path = require('path');
const fs = require("fs");
require('bt-utils');

let rule = {
    _ruleList : {group:['LINK','TITLE','SCRIPT'],single:['INCLUDE']},
    _replace(){
        // 组合
        for(let rule of this._ruleList.group){
            let links_reg = new RegExp('{__'+rule+'="([\\s\\S]*?)"__}','g');
            if(links_reg.test(this.htmlContent)){
                let links_url = '';
                for(let patt of this.htmlContent.match(links_reg)){
                    links_url += this._teamplate(patt,rule,patt.replace(links_reg,'$1','')) + '\n';
                }
                if(links_url){
                    this.htmlContent = this.htmlContent.replace(new RegExp('{__'+rule+'S__}','g'), links_url + '{__'+rule+'S__}');
                    this.htmlContent = this.htmlContent.replace(new RegExp('{__'+rule+'__}','g'), links_url );
                }
            }else{
                // 没有附件，将删除父标记
                this.htmlContent = this.htmlContent.replace(new RegExp('{__'+rule+'S__}','g'), '' );
                this.htmlContent = this.htmlContent.replace(new RegExp('{__'+rule+'__}','g'), '' );
            }
        }
        // 单体
        for(let rule of this._ruleList.single){
            let links_reg = new RegExp('{__'+rule+'="([\\s\\S]*?)"__}','g');
            if(links_reg.test(this.htmlContent)){
                for(let patt of this.htmlContent.match(links_reg)){
                    let text = this._teamplate(patt,rule,patt.replace(links_reg,'$1','')) + '\n';
                    if(text){
                        this.htmlContent = this.htmlContent.replace(new RegExp(patt,'g'), text );
                        // 继续查找嵌套标记
                        this._replace();
                    }
                }
            }else{
                this.htmlContent = this.htmlContent.replace(new RegExp('{__'+rule+'__}','g'), '' );
            }
        }
        return this.htmlContent;
    },
    _teamplate( _patt, _rule,_value){
        if(_rule != 'INCLUDE'){
            this.htmlContent = this.htmlContent.replace(_patt,'');
        }
        if(_rule == 'LINK'){
            return  `<link href="${_value}" rel="stylesheet" />`;
        }
        else if(_rule == 'SCRIPT'){
            return  `<script src="${_value}"></script>`;
        }
        else if(_rule == 'TITLE'){
            return _value;
        }
        else if(_rule == 'INCLUDE'){
            let content = fs.readFileSync(global.templateDirectory + _value,'utf-8');
            return content;
        }
    },
    run( _path ){
        this.htmlContent = fs.readFileSync(_path,'utf-8');
        if(global.hasCommon){
            let headerContent = fs.readFileSync(global.commonDirectory + 'header.html','utf-8');
            let footerContent = fs.readFileSync(global.commonDirectory + 'footer.html','utf-8');
            this.htmlContent = this.htmlContent.replace(/{__HEADER__}/g, headerContent );
            this.htmlContent = this.htmlContent.replace(/{__FOOTER__}/g, footerContent );
        }
        return this._replace();
    }
}

module.exports = rule;