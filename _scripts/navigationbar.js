// JavaScript Document
document.write("<script language=javascript src='./_scripts/isPC.js'></script>");
var title = document.getElementById("navi_title_obj");
var line = document.getElementById("navi_titleline_obj");
var logo_union = document.getElementById("navi_title_union");
var navi_background = document.getElementById("navi_background_obj");
var navi_page_button_pcbox = document.getElementById("navi_page_button_pcbox");
var navi_mobile_menu_button = document.getElementById("navi_mobile_menu_button");
var navi_mobile_menu_state = document.getElementById("navi_mobile_menu_state_obj");
var navi_pc_decoration = document.getElementById("navi_pc_decoration_obj");
var navi_pc_placeholder_left = document.getElementById("navi_pc_placeholder_left");
var navi_pc_placeholder_right = document.getElementById("navi_pc_placeholder_right");
var navi_pc_strip = document.getElementById("navi_pc_strip");

if(isPC()) {
	navi_mobile_menu_button.style.display = "none";
} else {
	navi_page_button_pcbox.style.display = "none";
	navi_pc_decoration.style.display = "none";
	navi_pc_strip.style.display = "none";
}

var previousY = window.pageYOffset;
window.onscroll = function(e) {
	var currentY = window.pageYOffset;
	var diff = currentY - previousY;
	if(currentY > 0) {
		title.style.paddingTop = "10px";
		title.style.paddingBottom = "10px";
		line.height ="2px";
		set_title_bar_colored();
	} else if (diff < 0){
		title.style.paddingTop = "20px";
		title.style.paddingBottom = "20px";
		line.height ="5px";
		set_title_bar_transparent();
	}
	previousY = currentY;
}

function set_title_bar_colored() {
	navi_pc_decoration.style.backgroundColor="rgba(255,255,255,0.0)";
	navi_pc_decoration.style['-webkit-backdrop-filter']='blur(0px)';
	navi_pc_decoration.style['backdrop-filter']='blur(0px)';
	navi_pc_decoration.style.color="white";
	navi_pc_decoration.style['backdrop-filter']='blur(0px)';
	navi_background.style['-webkit-backdrop-filter']='blur(10px)';
	navi_background.style['backdrop-filter']='blur(20px)';
	navi_background.style.backgroundColor = "rgba(12, 40, 82, 0.9)";
	navi_page_button_pcbox.style.width="100%";
	navi_page_button_pcbox.style.borderRadius = "0px";
	navi_page_button_pcbox.style["-webkit-backdrop-filter"]='blur(0px)';
	navi_page_button_pcbox.style['backdrop-filter']='blur(0px)';
	title.style.backgroundColor="rgba(0,0,0,0.0)";
	logo_union.style["-webkit-backdrop-filter"]='blur(0px)';
	logo_union.style['backdrop-filter']='blur(0px)';
	logo_union.style.backgroundColor="rgba(0,0,0,0.0)";
}

function set_title_bar_transparent() {
	navi_pc_decoration.style.backgroundColor="rgba(255,255,255,0.9)";
	navi_pc_decoration.style['-webkit-backdrop-filter']='blur(10px)';
	navi_pc_decoration.style['backdrop-filter']='blur(20px)';
	navi_pc_decoration.style.color="black";
	navi_background.style['-webkit-backdrop-filter']="blur(0px)";
	navi_background.style['backdrop-filter']="blur(0px)";
	navi_background.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
	navi_page_button_pcbox.style.width="434px";
	navi_page_button_pcbox.style.borderRadius = "7px";
	navi_page_button_pcbox.style["-webkit-backdrop-filter"]='blur(10px)';
	navi_page_button_pcbox.style['backdrop-filter']='blur(20px)';
	title.style.backgroundColor="rgba(255,255,255,0.0)";
	logo_union.style["-webkit-backdrop-filter"]='blur(10px)';
	logo_union.style['backdrop-filter']='blur(20px)';
	logo_union.style.backgroundColor="rgb(12, 40, 82, 0.9)";
}