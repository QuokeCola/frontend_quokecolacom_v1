let homepage_paths = [];
let homepage_hello = document.getElementById("homepage_hello");
let homepage_reference = parent.document.getElementById("bodypage_reference");
let homepage_title = document.getElementById("homepage_title");
let homepage_banner = document.getElementById("homepage_banner");
let homepage_img = document.getElementById("homepage_banner_img");
let homepage_img_top = parseInt(homepage_img.style.marginTop)-parent.window.pageYOffset*0.3;
let stroke_animations = ["stroke-dashoffset 0.5s ease-in 1.5s", "stroke-dashoffset 1.0s ease-in 2.0s", "stroke-dashoffset 0.3s ease-in 3.0s", "stroke-dashoffset 0.2s ease-in-out 3.3s", "stroke-dashoffset 0.7s ease-in-out 3.5s", "stroke-dashoffset 0.1s ease-in-out 4.2s", "stroke-dashoffset 0.1s ease-in-out 4.3s", "stroke-dashoffset 1.5s ease-out 4.4s", "stroke-dashoffset 1.5s ease-in-out 5.1s", "stroke-dashoffset 0.3s ease-out 5.9s"];
function homepage_handwriting_initiate() {
    homepage_title.style.top = homepage_reference.clientHeight*0.3+"px";
    homepage_title.style.height = homepage_reference.clientHeight*0.4+"px";
    homepage_banner.style.height = homepage_reference.clientHeight*0.7+90+"px";
    for (let i = 0; i < 10; i++){
        homepage_paths[i] = document.getElementById("homepage_line"+i);
        homepage_paths[i].style.strokeDashoffset = homepage_paths[i].getTotalLength();
        homepage_paths[i].style.strokeDasharray = homepage_paths[i].getTotalLength();
    }
    homepage_hello.style.strokeDasharray = "2100";
    homepage_hello.style.strokeDashoffset = "2100";
    setTimeout(function () {
        homepage_hello.style.transition = "stroke-dashoffset 1.5s ease-out";
        for (let i = 0; i < 10; i++){
            homepage_paths[i].style.transition = stroke_animations[i];
        }
    }, 10);

    setTimeout(function() {
        homepage_hello.style.strokeDashoffset = "0";
        for (let i = 0; i < 10; i++){
            homepage_paths[i].style.strokeDashoffset = "0";
        }
    },100);

    parent.window.addEventListener('resize', homepage_resize);
    parent.document.addEventListener('scroll', homepage_scroll);
    homepage_img.style.marginTop = 20+"%";
}

function homepage_resize() {
    homepage_title.style.top = homepage_reference.clientHeight*0.3+"px";
    homepage_title.style.height = homepage_reference.clientHeight*0.4+"px";
    homepage_banner.style.height = homepage_reference.clientHeight*0.7+90+"px";
}

function homepage_scroll() {
    homepage_img_top = (100-parent.window.pageYOffset)*0.2;
    if (homepage_img_top<-20) {
        homepage_img_top = -20;
    } else if (homepage_img_top>20){
        homepage_img_top = 20;
    }
    homepage_img.style.marginTop = homepage_img_top + "%";
}

