// JavaScript Document
// Author: Chen Qian

document.write("<script language=javascript src='/_scripts/dynamic_loader.js'></script>");
function homepagebtn_pressed() {
    DynamicLoader.loadcontent('/_htmls/intro.html', true);
}
function passagebtn_pressed() {
    DynamicLoader.loadcontent('/_htmls/psgbrsr.html', false);
}

function aboutbtn_pressed() {
    DynamicLoader.loadcontent('/_htmls/about.html', false);
}

function websrvbtn_pressed() {
    DynamicLoader.loadcontent('/_htmls/webservice.html', true);
}