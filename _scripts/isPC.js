// JavaScript Document
function isPC () { 
	if(window.outerWidth>window.outerHeight) {
		return 2;
	} else if(window.outerWidth>0.7*window.outerHeight) {
		return 1;
	} else {
		return 0;
	}

}