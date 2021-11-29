// JavaScript Document
// Author: Chen Qian

document.write("<script language=javascript src='/_scripts/common_macro.js'></script>");
function pg_intro() {
    let paths     = [];
    let hello     = document.getElementById("homepage_hello");
    let stroke_animations = ["stroke-dashoffset 0.5s ease-in 1.5s", "stroke-dashoffset 1.0s ease-in 2.0s", "stroke-dashoffset 0.3s ease-in 3.0s", "stroke-dashoffset 0.2s ease-in-out 3.3s", "stroke-dashoffset 0.7s ease-in-out 3.5s", "stroke-dashoffset 0.1s ease-in-out 4.2s", "stroke-dashoffset 0.1s ease-in-out 4.3s", "stroke-dashoffset 1.5s ease-out 4.4s", "stroke-dashoffset 1.5s ease-in-out 5.1s", "stroke-dashoffset 0.3s ease-out 5.9s"];
    let pcb1      = document.getElementById("pcb1");
    let pcb2      = document.getElementById("pcb2");
    let pcb3      = document.getElementById("pcb3");
    let showcase_subblocks = document.getElementsByClassName('showcase_subblock');
    let terminalsc= document.getElementById("meta_scrshot");
    let previousIsPC = getLayoutID();
    let terminal_img_subblock = document.getElementById("TerminalSubblock");

    let pcb1_loc  = ["-100%", "-80%",  "-60%"];
    let pcb2_loc  = ["-200%", "-170%", "-140%"];
    let pcb3_loc  = ["-300%", "-260%", "-220%"];

    this.initiate = function () {
        switch_view();
        window.addEventListener('resize', this.resize);
        document.addEventListener('orientationchange', switch_view);
        for (let i = 0; i < 10; i++){
            paths[i] = document.getElementById("homepage_line"+i);
            paths[i].style.strokeDashoffset = paths[i].getTotalLength();
            paths[i].style.strokeDasharray  = paths[i].getTotalLength();
        }
        hello.style.strokeDasharray  = "2100";
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
        let pcb1ScrTop = pcb1.getBoundingClientRect().top;

        if(pcb1ScrTop < 0.1*window.innerHeight) {
            if(pcb1.style.top !== pcb1_loc[0])pcb1.style.top = pcb1_loc[0];
            if(pcb2.style.top !== pcb2_loc[0])pcb2.style.top = pcb2_loc[0];
            if(pcb3.style.top !== pcb3_loc[0])pcb3.style.top = pcb3_loc[0];
        } else if(pcb1ScrTop < 0.3*window.innerHeight) {
            if(pcb1.style.top !== pcb1_loc[1])pcb1.style.top = pcb1_loc[1];
            if(pcb2.style.top !== pcb2_loc[1])pcb2.style.top = pcb2_loc[1];
            if(pcb3.style.top !== pcb3_loc[1])pcb3.style.top = pcb3_loc[1];
        } else if(pcb1ScrTop < 0.5*window.innerHeight) {
            if(pcb1.style.top !== pcb1_loc[2])pcb1.style.top = pcb1_loc[2];
            if(pcb2.style.top !== pcb2_loc[2])pcb2.style.top = pcb2_loc[2];
            if(pcb3.style.top !== pcb3_loc[2])pcb3.style.top = pcb3_loc[2];
        }
    }

    let switch_view = function () {
        for (let i = 0; i < showcase_subblocks.length; i++) {
            if(getLayoutID() === 2) {
                terminalsc.style.marginTop = "0";
                showcase_subblocks[i].style.width = "45%";
                terminalsc.style.height = "100%";
                terminalsc.style.width = "initial";
                terminal_img_subblock.style.height = "40vh";
            } else {
                showcase_subblocks[i].style.width = "90%";
                terminalsc.style.width = "100%";
                terminalsc.style.height= "inherit";
                terminalsc.style.marginTop = "100px";
                terminal_img_subblock.style.height = "inherit";
            }
        }
    }

    this.resize = function () {
        let currentIsPC = getLayoutID();
        if (currentIsPC !== previousIsPC) {
            switch_view();
        }
        previousIsPC = currentIsPC;
    }
}






