// JavaScript Document
// Author: Chen Qian

function bodypage() {
    let bodypage_obj = document.getElementById("bodypage");

    this.loadcontent = function (url) {
        bodypage_obj.src = url;
        setTimeout(function () {
            bodypage_obj.contentWindow.addEventListener('scroll', NavigationBar.scroll);
        },10);
    }
}