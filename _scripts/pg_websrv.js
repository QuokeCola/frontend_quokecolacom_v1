// JavaScript Document
// Author: Chen Qian

document.write("<script language=javascript src='/_scripts/common_macro.js'></script>");
function pg_websrv() {
    let showcase_subblocks = document.getElementsByClassName('showcase_subblock');
    let previousIsPC = getLayoutID();
    let banner_comp    = document.getElementById("websrv_banner_comp");
    let website_subblock = document.getElementById("websrv_websites_subblock");

    this.initiate = function () {
        switch_view();
        window.addEventListener('resize', this.resize);
        document.addEventListener('orientationchange', switch_view);
    }

    let switch_view = function () {
        for (let i = 0; i < showcase_subblocks.length; i++) {
            if(getLayoutID() === 2) {
                banner_comp.style.justifyContent = "center";
                website_subblock.style.justifyContent = "center";
                showcase_subblocks[i].style.width = "45%";
            } else {
                banner_comp.style.justifyContent = "flex-start";
                website_subblock.style.justifyContent = "flex-start";
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