const path = require('path');
const fs = require("fs");
require('bt-utils');

let rule = {
    _ruleList : ['LINK','TITLE','SCRIPT'],
    _replace(){
        for(let rule of this._ruleList){
            let links_reg = new RegExp('{__'+rule+'="([\\s\\S]*?)"__}','g');
            if(links_reg.test(this.htmlContent)){
                let links_url = '';
                for(let patt of this.htmlContent.match(links_reg)){
                    this.htmlContent = this.htmlContent.replace(patt,'');
                    links_url += this._teamplate(rule,patt.replace(links_reg,'$1','')) + '\n';
                }
                if(links_url){
                    this.htmlContent = this.htmlContent.replace(new RegExp('{__'+rule+'S__}','g'), links_url );
                    this.htmlContent = this.htmlContent.replace(new RegExp('{__'+rule+'__}','g'), links_url );
                }
            }else{
                this.htmlContent = this.htmlContent.replace(new RegExp('{__'+rule+'S__}','g'), '' );
                this.htmlContent = this.htmlContent.replace(new RegExp('{__'+rule+'__}','g'), '' );
            }
        }
        return this.htmlContent;
    },
    _teamplate( _rule,_value){
        if(_rule == 'LINK'){
            return  `<link href="${_value}" rel="stylesheet" />`;
        }
        else if(_rule == 'SCRIPT'){
            return  `<script src="${_value}"></script>`;
        }
        else if(_rule == 'TITLE'){
            return _value;
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