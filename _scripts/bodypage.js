// JavaScript Document
// Author: Chen Qian

function bodypage() {
    let bodypage_obj = document.getElementById("bodypage");

    this.initiate = function(){
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    this.resize = function (){
        iframeOptmizeHeight(bodypage_obj);
    }

    this.loadcontent = function (url) {
        bodypage_obj.src = url;
        setTimeout(function () {
            iframeOptmizeHeight(bodypage_obj);
        },1);
    }
}