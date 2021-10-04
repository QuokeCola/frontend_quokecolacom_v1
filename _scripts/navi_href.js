// JavaScript Document
// Author: Chen Qian

document.write("<script language=javascript src='/_scripts/bodypage.js'></script>");
function homepagebtn_pressed() {
    Bodypage.loadcontent('/_htmls/homepage.html');
    NavigationBar.set_enable_expanded(true);
}
function passagebtn_pressed() {
    Bodypage.loadcontent('/_htmls/testbody.html');
    NavigationBar.set_enable_expanded(false);
}