// JavaScript Document
document.write("<script language=javascript src='./_scripts/isPC.js'></script>");
var navi_title = document.getElementById("navi_title_obj");
var navi_logo_line = document.getElementById("navi_titleline_obj");
var navi_logo_union = document.getElementById("navi_title_union");
var navi_background = document.getElementById("navi_background_obj");
var navi_mobile_menu_button = document.getElementById("navi_mobile_menu_button");
var navi_mobile_menu_state = document.getElementById("navi_mobile_menu_state_obj");
var navi_pc_page_button_background = document.getElementById("navi_pc_page_button_background");
var navi_pc_decoration = document.getElementById("navi_pc_decoration_obj");
var navi_pc_strip = document.getElementById("navi_pc_strip");
var navi_pc_page_button_background_width = 0;

if(isPC()) {
	navi_mobile_menu_button.style.display = "none";
	navi_pc_page_button_background.style.width = get_navi_pc_page_button_background_width();
	navi_pc_page_button_background_width = get_navi_pc_page_button_background_width();
} else {
	navi_pc_page_button_background.style.display = "none";
	navi_pc_decoration.style.display = "none";
	navi_pc_strip.style.display = "none";
}

var previousY = window.pageYOffset;
window.onscroll = function(e) {
	var currentY = window.pageYOffset;
	var diff = currentY - previousY;
	if(currentY > 0 && !navi_mobile_menu_state.checked) {
		set_title_bar_collapse();
		set_title_bar_colored();
	} else if (diff < 0  && !navi_mobile_menu_state.checked){
		set_title_bar_transparent();
		set_title_bar_expanded();
	}
	previousY = currentY;
}

function navi_initiate(){
	navi_pc_page_button_background_width = get_navi_pc_page_button_background_width();
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
	navi_pc_page_button_background.style.width=String(screen.width)+"px";
	navi_pc_page_button_background.style.borderRadius = "0px";
	navi_pc_page_button_background.style['-webkit-backdrop-filter']='blur(0px)';
	navi_pc_page_button_background.style['backdrop-filter']='blur(0px)';
	navi_title.style.backgroundColor="rgba(0,0,0,0.0)";
	navi_logo_union.style['-webkit-backdrop-filter']='blur(0px)';
	navi_logo_union.style['backdrop-filter']='blur(0px)';
	navi_logo_union.style.backgroundColor="rgba(0,0,0,0.0)";
}

function set_title_bar_transparent() {
	navi_pc_decoration.style.backgroundColor="rgba(255,255,255,0.9)";
	navi_pc_decoration.style['-webkit-backdrop-filter']='blur(10px)';
	navi_pc_decoration.style['backdrop-filter']='blur(20px)';
	navi_pc_decoration.style.color="black";
	navi_background.style['-webkit-backdrop-filter']="blur(0px)";
	navi_background.style['backdrop-filter']="blur(0px)";
	navi_background.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
	navi_pc_page_button_background.style.width=navi_pc_page_button_background_width+"px";
	navi_pc_page_button_background.style.borderRadius = "7px";
	navi_pc_page_button_background.style['-webkit-backdrop-filter']='blur(10px)';
	navi_pc_page_button_background.style['backdrop-filter']='blur(20px)';
	navi_title.style.backgroundColor="rgba(255,255,255,0.0)";
	navi_logo_union.style["-webkit-backdrop-filter"]='blur(10px)';
	navi_logo_union.style['backdrop-filter']='blur(20px)';
	navi_logo_union.style.backgroundColor="rgb(12, 40, 82, 0.9)";
}

function set_title_bar_collapse() {
	navi_title.style.paddingTop = "10px";
	navi_title.style.paddingBottom = "10px";
	navi_logo_line.height ="2px";
}

function set_title_bar_expanded() {
	navi_title.style.paddingTop = "20px";
	navi_title.style.paddingBottom = "20px";
	navi_logo_line.height ="5px";
}

function navi_mobile_menu_button_clk() {
	if(navi_mobile_menu_state.checked) {
		if(window.pageYOffset > 0){
			set_title_bar_collapse();
		} else {
			set_title_bar_transparent();
		}
	} else {
		if(window.pageYOffset > 0) {
			set_title_bar_expanded();
		} else {
			set_title_bar_colored();
		}
	}
}

function get_navi_pc_page_button_background_width(){
	var width = 0;
	for (var i = 0; i < navi_pc_page_button_background.childElementCount; i+=1){
		var bound = navi_pc_page_button_background.children[i].getBoundingClientRect();
		width = width+bound.width;
		console.log(bound.width);
	}
	return width;
}