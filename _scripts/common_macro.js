// JavaScript Document
function getLayoutID() { 
	if(window.outerWidth>window.outerHeight) {
		return 2;
	} else if(window.outerWidth>0.6*window.outerHeight) {
		return 1;
	} else {
		return 0;
	}
}

function iframeOptmizeHeight(iframe) {
	if(iframe) {
		var iframeContent = iframe.contentWindow || iframe.contentDocument.parentWindow;
		if(iframeContent.document.body) {
			iframe.height = iframeContent.document.documentElement.scrollHeight || iframeContent.document.body.scrollHeight;
		}
	}
}

function checkVisible(elm) {
	var rect = elm.getBoundingClientRect();
	var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
	return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function throttle(fn, delay) {
	var timer;
	return function () {
		var _this = this;
		var args = arguments;
		if (timer) {
			return;
		}
		timer = setTimeout(function () {
			fn.apply(_this, args);
			timer = null;
		}, delay)
	}
}