var bodypage = document.getElementById("bodypage");

function bodypage_initiate(){
    window.addEventListener('resize', bodypage_resize);
    bodypage_resize();
}

function bodypage_resize() {
    iframeOptmizeHeight(bodypage);
}

function bodypage_loadcontent(url) {
    bodypage.src = url;
    setTimeout(function () {
        iframeOptmizeHeight(bodypage);
    },1);
}