// JavaScript Document
// Author: Chen Qian

document.write("<script language=javascript src='/_scripts/common_macro.js'></script>");
function pg_websrv() {
    let showcase_subblocks = document.getElementsByClassName('showcase_subblock');
    let previousIsPC = getLayoutID();

    this.initiate = function () {
        switch_view();
        window.addEventListener('resize', this.resize);
        document.addEventListener('orientationchange', switch_view);
    }

    let switch_view = function () {
        for (let i = 0; i < showcase_subblocks.length; i++) {
            if(getLayoutID() === 2) {
                showcase_subblocks[i].style.width = "45%";
            } else {
                showcase_subblocks[i].style.width = "90%";
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