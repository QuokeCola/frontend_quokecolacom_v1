// JavaScript Document
var title = document.getElementById("navi_title_obj");
var line = document.getElementById("navi_titleline_obj");
var logo_union = document.getElementById("navi_title_union");
var navi_background = document.getElementsByClassName("navigation_box");
var navi_buttonbox = document.getElementById("navi_buttonbox");
if(screen.width > 800) {
	
} else {
	navi_buttonbox.style.display = "none";
	var button = document.createElement("button");
	button.id = "navi_expansion_button";
	button.style.width = "30px";
	button.style.height = "30px";
	button.style.backgroundColor = "red";
	button.style.float = "right";
	button.style.position = "relative";
	button.style.marginLeft = "auto";
	button.style.marginRight = "20px";
	title.appendChild(button);
}

var previousY = window.pageYOffset;
window.onscroll = function(e) {
	var currentY = window.pageYOffset;
	var diff = currentY - previousY;
	if(diff > 1 && currentY > 0) {
		title.style.paddingTop = "10px";
		title.style.paddingBottom = "10px";
		line.height ="2px";
	} else if (diff < 0){
		title.style.paddingTop = "20px";
		title.style.paddingBottom = "20px";
		line.height ="5px";
	}
	previousY = currentY;
}