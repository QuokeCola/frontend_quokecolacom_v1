// JavaScript Document
// Author: Chen Qian

document.write("<script language=javascript src='/_scripts/dynamic_loader.js'></script>");
function homepagebtn_pressed() {
    DynamicLoader.loadcontent('/_htmls/intro.html');
    setTimeout(function () {
        NavigationBar.set_enable_expanded(true);
    },10);

}
function passagebtn_pressed() {
    DynamicLoader.loadcontent('/_htmls/psglist.html');
    setTimeout(function () {
        NavigationBar.set_enable_expanded(false);
    },10);
}

function aboutbtn_pressed() {
    DynamicLoader.loadcontent('/_htmls/about.html');
    setTimeout(function () {
        NavigationBar.set_enable_expanded(false);
    },10);
}