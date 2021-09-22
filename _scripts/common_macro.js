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
		var iframeContent = iframe.contentWindow;
		iframe.height = iframeContent.document.body.scrollHeight;
	}
}