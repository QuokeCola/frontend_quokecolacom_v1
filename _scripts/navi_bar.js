// JavaScript Document
// Author: Chen Qian

document.write("<script language=javascript src='/_scripts/common_macro.js'></script>");
function navigationbar () {
	/*** Parameters ***/
	let title 				= document.getElementById("navi_title_obj");
	let enable_expanded 	= document.getElementById("navi_enable_expanded");
	let mobile_menu_button 	= document.getElementById("navi_mobile_menu_button");
	let mobile_menu_state 	= document.getElementById("navi_mobile_menu_state_obj");
	let mobile_menu_box		= document.getElementById("navi_mobile_page_button_background");
	let mobile_menu_title	= document.getElementById("navi_mobile_menu_title");
	let pc_decoration 		= document.getElementById("navi_pc_decoration_obj");
	let pc_box_placeholder 	= document.getElementById("navi_pc_box_placeholder");
	let pc_menu_box 		= document.getElementById("navi_pc_menu_box");
	let bodypage_obj 		= document.getElementById("bodypage");

	let pc_menu_box_width 					= 0;
	let pc_title_padding_bottom				= "70vh";
	let pc_bottom_box_expanded_radius		= 7;
	let pc_bottom_box_shrink_radius		= 0;

	let mobile_title_padding					= "5vh";
	let mobile_menu_linkbutton_shrink_height 	= "10vh";
	let mobile_menu_linkbutton_expanded_height 	= "15vh";
	let shrink_threshold 						= 1;

	let unblur									= "blur(0px)"
	let blur									= "blur(20px)"
	let previousIsPC							= getLayoutID();

	/**
	 * @description Initiate the navigation bar. Register the event listeners.
	 * */
	this.initiate = function() {
		enable_expanded.checked = 1;
		setTimeout(function(){
			switch_view();
			pc_menu_box_width = get_navi_pc_menu_box_width();
		}, 100);
		this.scroll();
		bodypage_obj.contentWindow.addEventListener('scroll', this.scroll);
		window.addEventListener('resize', this.resize);
		window.addEventListener('orientationchange', function() {
			setTimeout(function(){switch_view();}, 20);
		}, false);
	}

	/**
	 * @description Invoke when window resized.
	 * */
	this.resize = function () {
		let currentIsPC = getLayoutID();
		if (currentIsPC === this.previousIsPC) {
		} else {
			switch_view();
		}
		this.previousIsPC = currentIsPC;
		if(bodypage_obj.contentWindow.pageYOffset > shrink_threshold || enable_expanded.checked === false){
			pc_menu_box.style.width=String(document.body.offsetWidth+30)+"px";
			set_title_bar_visible(true);
			pc_menu_box.style.borderRadius=String(pc_bottom_box_shrink_radius)+"px";
		} else {
			pc_menu_box.style.borderRadius=String(pc_bottom_box_expanded_radius)+"px";
		}
	}

	/**
	 * @description Invoke when page scrolled. Control whether the navigation bar expand or not.
	 * */
	this.scroll = function() {
		let currentY = bodypage_obj.contentWindow.pageYOffset;
		if(currentY > shrink_threshold) {
			if(getLayoutID() === 2 || (mobile_menu_state.checked === false && enable_expanded.checked === true)){
				set_title_bar_shrink(true);
			}
			set_title_bar_visible(true);
		} else {
			if((getLayoutID() === 2 || mobile_menu_state.checked === false) && enable_expanded.checked === true){
				set_title_bar_visible(false);
				set_title_bar_shrink(false);
			}
		}
	}

	/**
	 * @description Invoke when mobile menu button was clicked. Control the mobile navigation panel shrink or expand.
	 * */
	this.mobile_menu_button_clk = function () {
		if(mobile_menu_state.checked) {	// Click to uncheck
			if(bodypage_obj.contentWindow.pageYOffset>0) {
				set_title_bar_shrink(true);
			} else if(enable_expanded.checked === true){
				set_title_bar_visible(false);
			} else if(enable_expanded.checked === false) {
				set_title_bar_shrink(true);
			}
			set_mobile_menubox_visible(false);
		} else {								// Click to check
			set_title_bar_shrink(false);
			set_title_bar_visible(true);
			set_mobile_menubox_visible(true);
		}
	}

	/**
	 * @abstract Set whether the navigation bar is expanded.
	 * @param input (True/False), whether enable the expand function.
	 * */
	this.set_enable_expanded = function(input) {
		if(bodypage_obj.contentWindow.pageYOffset < shrink_threshold && !mobile_menu_state.checked) {
			if(input === true) {
				set_title_bar_visible(false);
				set_title_bar_shrink(false);
			} else if (input === false) {
				set_title_bar_shrink(true);
				set_title_bar_visible(true);
			}
		}
		enable_expanded.checked = input;
	}

	/**
	 * @abstract Set whether the title bar is transparent.
	 * @param input (True/False), true: blurred title bar; false: transparent titlebar.
	 * */
	let set_title_bar_visible = function(input) {
		if(input) {
			// Navigation Background
			title.style['-webkit-backdrop-filter']=blur;
			title.style['backdrop-filter']=blur;

			// Change color for navigation title.
			title.style.backgroundColor = "rgba(12, 40, 82, 0.9)";
		} else {
			// Navigation Background
			title.style['-webkit-backdrop-filter']=unblur;
			title.style['backdrop-filter']=unblur;

			// Change color for navigation title.
			title.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
		}
	}

	/**
	 * @abstract Set whether the title is shrink.
	 * @param input (True/False), true: title bar shrink; false: title bar expanded.
	 * */
	let set_title_bar_shrink = function (input) {
		if(input) {
			title.style.paddingTop = "10px";
			title.style.paddingBottom = "10px";
			if(getLayoutID() === 2){
				pc_menu_box.style.width=String(document.body.offsetWidth+30)+"px";
				pc_menu_box.style.borderRadius = String(pc_bottom_box_shrink_radius)+"px";
			}
		} else {
			if(getLayoutID() === 2) {
				title.style.paddingTop = "20px";
				title.style.paddingBottom = pc_title_padding_bottom;
				pc_menu_box.style.width = pc_menu_box_width+"px";
				pc_menu_box.style.borderRadius = String(pc_bottom_box_expanded_radius)+"px";
			} else {
				title.style.paddingTop = mobile_title_padding;
				title.style.paddingBottom = mobile_title_padding;
			}
		}
	}

	/**
	 * @abstract Set if the mobile menu box is visible
	 * @param input (True/False), true: visible; false: invisible.
	 * */
	let set_mobile_menubox_visible = function(input) {
		if(input) {
			mobile_menu_box.style["-webkit-backdrop-filter"] = blur;
			mobile_menu_box.style["backdrop-filter"] = blur;
			mobile_menu_box.style.height = "100%";
			for (let i=0; i < mobile_menu_box.children.length; i++) {
				mobile_menu_box.children[i].style.opacity = "1";
				if(i > 2 && i < 7){
					mobile_menu_box.children[i].style.height = mobile_menu_linkbutton_expanded_height;
				}
			}
			mobile_menu_title.style.height="30px";
			mobile_menu_box.style.backgroundColor="rgba(255,255,255,0.7)";
		} else {
			mobile_menu_box.style["-webkit-backdrop-filter"] = unblur;
			mobile_menu_box.style["backdrop-filter"] = unblur;
			mobile_menu_box.style.height = "0px";
			for (let i=0; i < mobile_menu_box.children.length; i++) {
				mobile_menu_box.children[i].style.opacity = "0";
				if(i > 2 && i < 7){
					mobile_menu_box.children[i].style.height = mobile_menu_linkbutton_shrink_height;
				}
			}
			mobile_menu_title.style.height="10px";
			mobile_menu_box.style.backgroundColor="rgba(255,255,255,0.0)";
		}
	}

	/**
	 * @description Get navigation box width based on children width.
	 * */
	let get_navi_pc_menu_box_width = function(){
		let width = 0;
		for (let i = 0; i < pc_menu_box.childElementCount; i+=1){
			let bound = pc_menu_box.children[i].getBoundingClientRect();
			width = width+bound.width;
		}
		return width;
	}

	/**
	 * @description Configure layout based on the aspect ratio of window.
	 * */
	let switch_view = function() {
		if(getLayoutID() === 2) {
			// Control components visibility.
			mobile_menu_button.style.display = "none";
			mobile_menu_box.style.display = "none";
			pc_menu_box.style.display = "flex";
			pc_decoration.style.display = "block";
			pc_box_placeholder.style.display = "flex";
			pc_menu_box.style.width = get_navi_pc_menu_box_width()+"px";
			pc_menu_box_width = get_navi_pc_menu_box_width();
			if(bodypage_obj.contentWindow.pageYOffset < shrink_threshold && enable_expanded.checked === true) {
				set_title_bar_shrink(false);
				set_title_bar_visible(false);
			} else {
				set_title_bar_shrink(true);
				set_title_bar_visible(true);
			}
		} else {
			// Control components visibility.
			pc_menu_box.style.display = "none";
			pc_decoration.style.display = "none";
			pc_box_placeholder.style.display = "none";
			mobile_menu_button.style.display = "flex";
			mobile_menu_box.style.display = "flex";

			if(bodypage_obj.contentWindow.pageYOffset < 1 && enable_expanded.checked) {
				set_title_bar_visible(false);
				set_title_bar_shrink(false);
			} else if(!mobile_menu_state.checked){
				set_title_bar_shrink(true);
				set_title_bar_visible(true);
			}

			if(mobile_menu_state.checked) {
				set_title_bar_shrink(false);
				set_title_bar_visible(true);
				set_mobile_menubox_visible(true);
				if(getLayoutID() === 2) {
					title.style.paddingBottom = pc_title_padding_bottom;
				} else {
					title.style.paddingBottom = mobile_title_padding;
				}
			}
			if(getLayoutID() === 1){
				for (let i=0; i < 7; i++) {
					if(i>2){
						mobile_menu_box.children[i].style.width = "23.75vw";
						mobile_menu_box.children[i].style.borderTopWidth = "1px";
						if(i === 4) {
							mobile_menu_box.children[i].style.borderRightWidth = "0px";
						}
					}
				}
			} else {
				for (let i=0; i < 7; i++) {
					if(i>2){
						if(i>4){
							mobile_menu_box.children[i].style.borderTopWidth = "0px";
						}
						if(i === 4) {
							mobile_menu_box.children[i].style.borderRightWidth = "1px";
						}
						mobile_menu_box.children[i].style.width = "47.5vw";
					}
				}
			}
		}
	}
}