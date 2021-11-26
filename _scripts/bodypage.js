// JavaScript Document
// Author: Chen Qian

function bodypage() {
    let bodypage_obj = document.getElementById("bodypage");

    this.initiate = function () {
        bodypage_obj.style.width = "100%";
    }

    this.loadcontent = function (url) {
        bodypage_obj.style.transition = "all 0.5s ease-in"
        bodypage_obj.style.opacity = "0.0";
        bodypage_obj.style.marginLeft = "200px";
        console.log("opacity_set!")
        setTimeout(function () {
            bodypage_obj.src = url;
            bodypage_obj.style.transition = "all 0.0s"
            bodypage_obj.style.marginLeft = "-200px"
        },500);
        bodypage_obj.onload = function(){
            bodypage_obj.style.transition = "all 0.5s ease-out"
            bodypage_obj.contentWindow.addEventListener('scroll', NavigationBar.scroll);
            bodypage_obj.style.opacity = "1.0";
            bodypage_obj.style.marginLeft = "0px";
        };
    }
}