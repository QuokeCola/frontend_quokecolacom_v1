// JavaScript Document
// Author: Chen Qian

document.write("<script language=javascript src='/_scripts/bodypage.js'></script>");
function homepagebtn_pressed() {
    Bodypage.loadcontent('/_htmls/homepage.html');
    setTimeout(function () {
        NavigationBar.set_enable_expanded(true);
    },10);

}
function passagebtn_pressed() {
    Bodypage.loadcontent('/_htmls/testbody.html');
    setTimeout(function () {
        NavigationBar.set_enable_expanded(false);
    },10);
}

function aboutbtn_pressed() {
    Bodypage.loadcontent('/_htmls/about.html');
    setTimeout(function () {
        NavigationBar.set_enable_expanded(false);
    },10);
}