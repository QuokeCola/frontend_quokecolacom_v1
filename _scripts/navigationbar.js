// JavaScript Document
document.write("<script language=javascript src='./_scripts/isPC.js'></script>");
var navi_title 				= document.getElementById("navi_title_obj");
var navi_logo_line 			= document.getElementById("navi_titleline_obj");
var navi_logo_union 		= document.getElementById("navi_title_union");
var navi_background 		= document.getElementById("navi_background_obj");
var navi_enable_expanded 	= document.getElementById("navi_enable_expanded");
navi_enable_expanded.checked= 1;
var navi_mobile_menu_button = document.getElementById("navi_mobile_menu_button");
var navi_mobile_menu_state 	= document.getElementById("navi_mobile_menu_state_obj");
var navi_mobile_menu_box	= document.getElementById("navi_mobile_page_button_background");
var navi_mobile_menu_title	= document.getElementById("navi_mobile_menu_title");
var navi_pc_decoration 		= document.getElementById("navi_pc_decoration_obj");
var navi_pc_strip 			= document.getElementById("navi_pc_strip");
var navi_pc_page_button_background 			= document.getElementById("navi_pc_page_button_background");
var navi_pc_page_button_background_width 	= 0;

if(isPC()) {
	navi_mobile_menu_button.style.display = "none";
	navi_mobile_menu_box.style.display = "none";
	navi_pc_page_button_background.style.width = get_navi_pc_page_button_background_width();
	navi_pc_page_button_background_width = get_navi_pc_page_button_background_width();
} else {
	navi_pc_page_button_background.style.display = "none";
	navi_pc_decoration.style.display = "none";
	navi_pc_strip.style.display = "none";
}

var previousY = window.pageYOffset;

window.onscroll = function(e) {
	if(navi_enable_expanded.checked) {
		var currentY = window.pageYOffset;
		var diff = currentY - previousY;
		if(currentY > 0) {
			set_title_bar_collapse();
			set_title_bar_colored();
		} else if (diff < 0){
			set_title_bar_transparent();
			set_title_bar_expanded();
		}
		previousY = currentY;
	}
}

function navi_initiate(){
	navi_pc_page_button_background_width = get_navi_pc_page_button_background_width();
}

function set_title_bar_colored() {
	// PC navigation decoration "</>"
	navi_pc_decoration.style.backgroundColor="rgba(255,255,255,0.0)";
	navi_pc_decoration.style['-webkit-backdrop-filter']='blur(0px)';
	navi_pc_decoration.style['backdrop-filter']='blur(0px)';
	navi_pc_decoration.style.color="white";
	
	// Navigation Background
	navi_title.style['-webkit-backdrop-filter']='blur(10px)';
	navi_title.style['backdrop-filter']='blur(20px)';

	// Navigation button background
	if(isPC()){
		navi_pc_page_button_background.style.width=String(document.body.offsetWidth+30)+"px";
		navi_pc_page_button_background.style.borderRadius = "0px";
	}
	
	// Change color for navigation title.
	navi_title.style.backgroundColor = "rgba(12, 40, 82, 0.9)";
	
	// Change color for navigation title background.
	navi_logo_union.style['-webkit-backdrop-filter']='blur(0px)';
	navi_logo_union.style['backdrop-filter']='blur(0px)';
	navi_logo_union.style.backgroundColor="rgba(0,0,0,0.0)";
}

function set_title_bar_transparent() {
	// PC navigation decoration "</>"
	navi_pc_decoration.style.backgroundColor="rgba(255,255,255,0.9)";
	navi_pc_decoration.style['-webkit-backdrop-filter']='blur(10px)';
	navi_pc_decoration.style['backdrop-filter']='blur(20px)';
	navi_pc_decoration.style.color="black";
	
	// Navigation Background
	navi_title.style['-webkit-backdrop-filter']="blur(0px)";
	navi_title.style['backdrop-filter']="blur(0px)";
	
	// Navigation button background
	if(isPC()){
		navi_pc_page_button_background.style.width=navi_pc_page_button_background_width+"px";
		navi_pc_page_button_background.style.borderRadius = "7px";
	}
	
	// Change color for navigation title.
	navi_title.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
	
	// Change color for navigation title background.
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

function set_mobile_menu_box_expanded() {
	navi_mobile_menu_box.style["-webkit-backdrop-filter"] = "blur(10px)";
	navi_mobile_menu_box.style["backdrop-filter"] = "blur(20px)";
	navi_mobile_menu_box.style.height = "100%";
	for (var i=0; i < navi_mobile_menu_box.children.length; i++) {
		navi_mobile_menu_box.children[i].style.opacity = "1";
		if(i>2){
			navi_mobile_menu_box.children[i].style.height = "15vh";
		}
	}
	navi_mobile_menu_title.style.height="30px";
	navi_mobile_menu_box.style.backgroundColor="rgba(255,255,255,0.7)";
}

function set_mobile_menu_box_collapse() {
	navi_mobile_menu_box.style["-webkit-backdrop-filter"] = "blur(0px)";
	navi_mobile_menu_box.style["backdrop-filter"] = "blur(0px)";
	navi_mobile_menu_box.style.height = "0px";
	for (var i=0; i < navi_mobile_menu_box.children.length; i++) {
		navi_mobile_menu_box.children[i].style.opacity = "0";
		if(i>2){
			navi_mobile_menu_box.children[i].style.height = "10vh";
		}
	}
	navi_mobile_menu_title.style.height="10px";
	navi_mobile_menu_box.style.backgroundColor="rgba(255,255,255,0.0)";
}

function navi_mobile_menu_button_clk() {
	if(navi_mobile_menu_state.checked) {	// Click to uncheck
		if(window.pageYOffset>0) {
			set_title_bar_collapse();
		} else {
			set_title_bar_transparent();
		}
		navi_enable_expanded.checked = 1;
		if(!isPC()) {
			set_mobile_menu_box_collapse();
		}
	} else {								// Click to check
		set_title_bar_expanded();
		set_title_bar_colored();
		navi_enable_expanded.checked = 0;
		if(!isPC()) {
			set_mobile_menu_box_expanded();
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