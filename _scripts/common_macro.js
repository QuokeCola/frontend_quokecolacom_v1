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

class HTML_Parser {
	constructor(url) {
		this._XMLRequest = new XMLHttpRequest();
		this.rel_css = [];
		this.rel_js  = [];
		this.title = "";
		this._url = url;
		let _thisRef = this;
		this._XMLRequest.open("get", url);
		this._XMLRequest.send(null);
		this.onload = null;
		this._XMLRequest.onload = function () {
			if(_thisRef._XMLRequest.status === 200) {
				let parser = new DOMParser();
				let result = parser.parseFromString(_thisRef._XMLRequest.responseText,"text/html");
				_thisRef.header = result.documentElement.children[0];
				_thisRef.body = result.documentElement.children[1];
				_thisRef.title = result.title;
				for (let i = 0; i < _thisRef.header.childNodes.length; i++) {
					try{
						if (_thisRef.header.childNodes[i].nodeName === "LINK" && _thisRef.header.childNodes[i].type ==="text/css"){
							if (!_thisRef.rel_css.includes(_thisRef.header.childNodes[i].href)) _thisRef.rel_css.push(_thisRef.header.childNodes[i].href);
						}
					} catch (e) {
						console.log("Error Occur in HTML Parser, header Reader:"+e);
					}
				}
				for (let i = 0; i < _thisRef.body.childNodes.length; i++) {
					try{
						if (_thisRef.body.childNodes[i].nodeName === "SCRIPT"){
							if (!_thisRef.rel_js.includes(_thisRef.body.childNodes[i].src)) _thisRef.rel_js.push(_thisRef.body.childNodes[i].src);
						}
					} catch (e) {
						console.log("Error Occur in HTML Parser, body Reader:"+e);
					}
				}
				try {
					_thisRef.onload();
				} catch (e) {
					console.log("Error Occur in HTMLParser, Onload:" + e)
				}
			}
		}
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}