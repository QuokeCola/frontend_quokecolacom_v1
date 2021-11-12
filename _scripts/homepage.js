// JavaScript Document
// Author: Chen Qian

document.write("<script language=javascript src='/_scripts/common_macro.js'></script>");
function homepage() {
    let paths = [];
    let hello = document.getElementById("homepage_hello");
    let img = document.getElementById("homepage_banner_img");
    let img_top = parseInt(img.style.marginTop);//+parent.window.pageYOffset*0.3;
    let stroke_animations = ["stroke-dashoffset 0.5s ease-in 1.5s", "stroke-dashoffset 1.0s ease-in 2.0s", "stroke-dashoffset 0.3s ease-in 3.0s", "stroke-dashoffset 0.2s ease-in-out 3.3s", "stroke-dashoffset 0.7s ease-in-out 3.5s", "stroke-dashoffset 0.1s ease-in-out 4.2s", "stroke-dashoffset 0.1s ease-in-out 4.3s", "stroke-dashoffset 1.5s ease-out 4.4s", "stroke-dashoffset 1.5s ease-in-out 5.1s", "stroke-dashoffset 0.3s ease-out 5.9s"];
    let pcb1 = document.getElementById("pcb1");
    let pcb2 = document.getElementById("pcb2");
    let pcb1HeightRange = [-60,60]
    let pcb2HeightRange = [0,100]
    let prev_sclHeight = 0;
    let pcb1topVal = pcb1.offsetParent.clientTop;
    let pcb2topVal = pcb2.offsetParent.clientTop;
    this.initiate = function () {
        for (let i = 0; i < 10; i++){
            paths[i] = document.getElementById("homepage_line"+i);
            paths[i].style.strokeDashoffset = paths[i].getTotalLength();
            paths[i].style.strokeDasharray = paths[i].getTotalLength();
        }
        hello.style.strokeDasharray = "2100";
        hello.style.strokeDashoffset = "2100";
        setTimeout(function () {
            hello.style.transition = "stroke-dashoffset 1.5s ease-out";
            for (let i = 0; i < 10; i++){
                paths[i].style.transition = stroke_animations[i];
            }
        }, 10);

        setTimeout(function() {
            hello.style.strokeDashoffset = "0";
            for (let i = 0; i < 10; i++){
                paths[i].style.strokeDashoffset = "0";
            }
        },100);
        document.addEventListener('scroll', this.scroll);
    }
    this.scroll = function () {
        let curr_sclHeight = Number(document.documentElement.scrollTop);
        let displacement = curr_sclHeight-prev_sclHeight;
        if(checkVisible(pcb1)) {
            if(pcb1topVal+ 0.1*displacement > pcb1HeightRange[0] &&
                pcb1topVal+0.1*displacement < pcb1HeightRange[1]) {
                pcb1topVal += 0.1*displacement;
                pcb1.style.top = String(pcb1topVal) + "px";
            }
        }
        if(checkVisible(pcb2)) {
            if(pcb2topVal + 0.15*displacement > pcb2HeightRange[0] &&
                pcb2topVal + 0.15*displacement < pcb2HeightRange[1]) {
                pcb2topVal += 0.15*displacement;
                pcb2.style.top = String(pcb2topVal) + "px";
            }
        }
        prev_sclHeight = curr_sclHeight;
    }
}






