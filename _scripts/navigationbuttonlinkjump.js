document.write("<script language=javascript src='/_scripts/bodypage.js'></script>");
function homepagebtn_pressed() {
    bodypage_loadcontent('/_htmls/homepage.html');
    NavigationBar.set_enable_expanded(true);
}
function passagebtn_pressed() {
    bodypage_loadcontent('/_htmls/testbody.html');
    NavigationBar.set_enable_expanded(false);
}